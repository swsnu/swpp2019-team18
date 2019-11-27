import json
import datetime
from django.http import HttpResponse, JsonResponse
from ..decorator import is_logged_in
from ..models import MyDiary, People


@is_logged_in
def get_statistics(request):
    if request.method == "GET":
        user = request.user
        mode = request.GET.get('mode')
        if mode == "CALENDAR":
            res = analyze_by_cal(user)
        elif mode == "PEOPLE":
            res = analyze_by_people(user)
        return JsonResponse(res, status=200, safe=False)
    return HttpResponse(status=405)


def analyze_by_cal(user):
    diaries = MyDiary.objects.filter(author=user).order_by('-created_date')[:15]
    res = anlayze_by_date_(diaries)
    return res


def analyze_by_people(user):
    friends = People.objects.filter(user=user)
    diaries = MyDiary.objects.filter(author=user).order_by('-created_date')

    friends_book = {}
    for friend in friends:  # 모든 친구에 대해서 점수와 태그 회수를 기록하는 책. 
        friends_book[friend.id] = {'friend_name' : friend.name, 'score' : 0, 'tag_count' : 0}

    for idx, diary in enumerate(diaries):  # 모든 다이어리에 대해서 각각 태그된 사람들에게 점수를 부여한다. 
        score = diary.emotion_score
        tagged_people = diary.people.all()
        for friend in tagged_people:
            friends_book[friend.id]['score'] += score
            friends_book[friend.id]['tag_count'] += 1

    for key, ref in friends_book.items():  # 평균 점수를 계산한다. 
        if ref['tag_count'] != 0:
            ref['score'] /= ref['tag_count']
    return friends_book


def anlayze_by_date_(diaries):
    res = []
    for idx, diary in enumerate(diaries):
        if idx == 0:
            prev = diary
            score = diary.emotion_score
            seq_cnt = 1
            diary_ids = [diary.id]
            continue

        month  = diary.created_date.month
        day  = diary.created_date.day
        if month == prev.created_date.month and day == prev.created_date.day:
            score += diary.emotion_score
            seq_cnt += 1
            diary_ids.append(diary.id)
            continue
        
        mean_score = score // seq_cnt  # 같은 날 작성한 일기들의 평균 감정 점수
        serialized = {'day' : str(prev.created_date.month) + '/' + str(prev.created_date.day), 'score' : mean_score, 'diary_ids' : diary_ids}
        res.append(serialized)

        prev = diary  # 초기화    
        score = diary.emotion_score
        seq_cnt = 1
        diary_ids = [diary.id]

    mean_score = score // seq_cnt  # 엣지 케이스 처리
    serialized = {'day' : str(diary.created_date.month) + '/' + str(diary.created_date.day), 'score' : diary.emotion_score, 'diary_ids' : diary_ids}
    res.append(serialized)
    return res


