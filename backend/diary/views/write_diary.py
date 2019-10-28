from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import MyDiary, Category
from django.contrib.auth import get_user_model
from ..serializer import diary_serializer
User = get_user_model()


@csrf_exempt
def diary(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        print(req_data)
        content = req_data['content']
        category_name = req_data['categoryName']
        category_title = req_data['categoryTitle']
        emtion_score = req_data['emotionScore']
        people = req_data['people']
        rating = req_data['rating']

        # TODO : use request.user
        author_id = 1  
        
        user = User.objects.get(id=author_id)
        category = Category.objects.create(name=category_name, category_title=category_title, rating=rating)
        print(category)
        diary = MyDiary.objects.create(
                author=user, 
                content=content,
                category=category,
                emotion_score=emtion_score,
            )
        diary_dict = diary_serializer(diary)
        diary.save()
        return JsonResponse(diary_dict, status=201)
    else:
        return HttpResponse(status=405)

