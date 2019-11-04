import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from ..models import MyDiary, Category, People
from ..serializer import diary_serializer
from ..decorator import is_loggedin
User = get_user_model()

@is_loggedin
def diary(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        content = req_data['content']
        category_name = req_data['categoryName']
        category_title = req_data['categoryTitle']
        emtion_score = req_data['emotionScore']
        people_id = req_data['people']
        rating = req_data['rating']

        #TODO author = request.user
        print(request.user)
        author = User.objects.get(id=1)
        tagged_people = People.objects.filter(id__in=people_id)
        category = Category.objects.create(name=category_name, category_title=category_title, rating=rating)
        diary = MyDiary.objects.create(
                author=author, 
                content=content,
                category=category,
                emotion_score=emtion_score,
            )
        for person in tagged_people:
            diary.people.add(person)
        diary.save()
        diary_dict = diary_serializer(diary)
        diary.save()
        return JsonResponse(diary_dict, status=201)
    else:
        return HttpResponse(status=405)

