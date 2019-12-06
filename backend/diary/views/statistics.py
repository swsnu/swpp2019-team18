import json
import django
import datetime
import nltk 
from django.http import HttpResponse, JsonResponse
from ..decorator import is_logged_in
from ..models import MyDiary, People, Category
# nltk.download('punkt')
# nltk.download('averaged_perceptron_tagger')

@is_logged_in
def get_statistics(request):
    if request.method == "GET":
        user = request.user
        mode = request.GET.get('mode')
        if mode == "CALENDAR":
            res = analyze_by_calendar(user, days=30)
        elif mode == "PEOPLE":
            res = analyze_by_people(user)
        elif mode == "CATEGORY":
            res = analyze_by_category(user)
        else:
            return HttpResponse(status=400)
        return JsonResponse(res, status=200, safe=False)
    return HttpResponse(status=405)


def analyze_by_calendar(user, days=15):
    current_date = datetime.datetime.today()
    month_delta = datetime.timedelta(days - 1)
    start_date = current_date - month_delta
    diaries = MyDiary.objects.filter(
        author=user, 
        created_date__gte=start_date, 
        created_date__lte=current_date).order_by('-created_date')
    cur_data = anlayze_by_date_(user, diaries, start_date, days)
    prev_mean, cur_mean = get_average(cur_data)

    if prev_mean > 0:
        percent = int( 100 * (cur_mean - prev_mean) / prev_mean)
    else:
        percent = 0
    graph_data = {}
    graph_data['graph_data'] = cur_data
    graph_data['meta'] = {'percent' : percent, 'prev_mean' : prev_mean, 'cur_mean' : cur_mean}
    return graph_data

def get_average(data):
    prev_total = 0
    prev_cnt = 0
    cur_total = 0
    cur_cnt = 0
    for ele in data:
        if 'cur_score' in ele.keys():
            cur_total += ele['cur_score']
            cur_cnt += 1
        if 'prev_score' in ele.keys():
            prev_total += ele['prev_score']
            prev_cnt += 1
    if prev_cnt > 0:
        prev_mean = prev_total // prev_cnt
    else:
        prev_mean = 0
    if cur_cnt > 0:
        cur_mean = cur_total // cur_cnt
    else:
        cur_mean = 0
    return prev_mean, cur_mean

def anlayze_by_date_(user, diaries, start_date, days):
    cur_data = []
    for day_index in range(days):
        date = start_date + datetime.timedelta(day_index)
        initial_data = {"day" : "{}/{}".format(date.month, date.day), 
                        "cur_scores" : [], 
                        'cur_diary_ids': [], 
                        'prev_scores' : [],
                        'prev_diary_ids' : []}
        cur_data.append(initial_data)
    for diary in diaries:
        day_index = (diary.created_date - start_date).days
        cur_data[day_index]['cur_scores'].append(diary.emotion_score)
        cur_data[day_index]['cur_diary_ids'].append(diary.id)

    for data in cur_data:
        if len(data['cur_scores']) > 0:
            data['cur_score'] = sum(data['cur_scores']) // len(data['cur_scores'])

    if len(cur_data[0]['cur_scores']) == 0:
        cur_data[0]['day'] = cur_data[0]['day'] + '...'
        while(len(cur_data) > 2 and len(cur_data[1]['cur_scores']) == 0):
            cur_data.pop(1)

    if len(cur_data[-1]['cur_scores']) == 0:
        cur_data[-1]['day'] = '...' + cur_data[-1]['day']
        while(len(cur_data) > 2 and len(cur_data[-2]['cur_scores']) == 0):
            cur_data.pop(-2)

    add_prev_month(user, cur_data, start_date)
    return cur_data

def add_prev_month(user, cur_data, start_date):
    get_prev_month = {}
    for i in range(1, 13):
        if i == 1:
            get_prev_month[i] = 12
        else:
            get_prev_month[i] = i - 1

    prev_start_date = start_date - datetime.timedelta(32)  # 넉넉하게 32
    prev_data = MyDiary.objects.filter(
        author=user,
        created_date__gte=prev_start_date,
        created_date__lt=start_date
        ).order_by('-created_date')

    for prev_m_data in prev_data:
        for cur_m_data in cur_data:
            # if "..." in res_data['day']:  # skip on edge case
            stripped_date = cur_m_data['day'].strip("...")
            cur_day = int(stripped_date.split('/')[1])
            cur_month = int(stripped_date.split('/')[0])
            if cur_day  == prev_m_data.created_date.day and get_prev_month[cur_month] == prev_m_data.created_date.month:
                cur_m_data['prev_scores'].append(prev_m_data.emotion_score)
                cur_m_data['prev_diary_ids'].append(prev_m_data.id)

    for ele in cur_data:
        if len(ele['prev_scores']) > 0:
            ele['prev_score'] = sum(ele['prev_scores']) // len(ele['prev_scores'])
    return cur_data

def analyze_by_category(user):
    diaries = MyDiary.objects.filter(author=user).order_by('-created_date')
    category_book = {}
    for diary in diaries:
        category = diary.category
        if category.name in category_book.keys():
            category_book[category.name]['score'] += diary.emotion_score
            category_book[category.name]['tag_count'] += 1
        else:
            category_book[category.name] = {'category_name' : category.name, 'score' : diary.emotion_score, 'tag_count' : 1}
    
    res = []
    for key, ref in category_book.items():
        if ref['tag_count'] != 0 and ref['category_name'] != "":
            ref['score'] //= ref['tag_count']
            res.append(ref)
    max_score = -1
    best_category = ""
    for ele in res:
        if ele['score'] > max_score:
            max_score = ele['score']
            best_category = ele['category_name']
    graph_data = {}
    graph_data['graph_data'] = res
    graph_data['meta'] = {'best_category' : best_category}
    return graph_data


def by_category_frequency(request):
    if request.method == "GET":
        user = request.user
        categories = Category.objects.filter(mydiary__author=user)
        counter = {}
        for category in categories:
            name = category.name 
            if name in counter.keys():
                counter[name] += 1
            else:
                counter[name] = 0
        if len(counter) != 0:
            data = []
            tmp = [val for key, val in counter.items()]
            tmp.sort()
            tmp = tmp[::-1]
            idx = 4 if len(tmp) > 4 else (len(tmp) - 1)
            thr = max(1, tmp[idx])
            total_cnt = sum([val if val >= thr else 0 for key, val in counter.items()])
            for key, val in counter.items():
                if val >= thr:
                    data.append({'name' : key, 'value' : int((val / total_cnt) * 100), 'count' : val})
        max_value = 0
        frequent_category = ""
        total_count = 0
        for ele in data:
            if ele['value'] > max_value:
                max_value = ele['value']
                frequent_category = ele['name']
            total_count += ele['count']
        graph_data = {'graph_data' : data, 'meta' : {'percent' : max_value, 'frequent_category': frequent_category, 'total_count' : total_count} }
        return JsonResponse(graph_data, safe=False, status=200)
    return HttpResponse(status=405)


def analyze_by_people(user):
    friends = People.objects.filter(user=user)
    diaries = MyDiary.objects.filter(author=user).order_by('-created_date')

    friends_book = {}
    for friend in friends:  # 모든 친구에 대해서 점수와 태그 회수를 기록하는 책. 
        friends_book[friend.id] = {'friend_name' : friend.name, 'score' : 0, 'count' : 0}

    for idx, diary in enumerate(diaries):  # 모든 다이어리에 대해서 각각 태그된 사람들에게 점수를 부여한다. 
        score = diary.emotion_score
        tagged_people = diary.people.all()
        for friend in tagged_people:
            friends_book[friend.id]['score'] += score
            friends_book[friend.id]['count'] += 1

    res = []
    for key, ref in friends_book.items():  # 평균 점수를 계산한다. 
        if ref['count'] != 0:
            ref['score'] //= ref['count']
            ref['friend_id'] = key
            res.append(ref)

    max_score = -1
    best_friend = ""
    for ele in res:
        if ele['score'] > max_score:
            max_score = ele['score']
            best_friend = ele['friend_name']

    graph_data = {}
    graph_data['graph_data'] = res
    graph_data['meta'] = {'best_friend' : best_friend}
    return graph_data


# def get_word_frequency(request):
#     user = request.user 
#     diaries = MyDiary.objects.filter(author=user)
#     whole = ""
#     for diary in diaries:
#         content = diary.content
#         whole += " " + content
#     tokens = nltk.word_tokenize(whole)
#     tagged = nltk.pos_tag(tokens)
#     nouns = [word for word, pos in tagged if pos in ['NN', 'NNP']]
#     print(nouns)
#     return 