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
        content = req_data['content']
        category_name = req_data['categoryName']
        category_title = req_data['categoryTitle']
        emtion_score = req_data['emotionScore']
        people = req_data['people']
        rating = req_data['rating']
        
        #TODO author = request.user
        author = User.objects.get(id=1)

        category = Category.objects.create(name=category_name, category_title=category_title, rating=rating)
<<<<<<< HEAD
=======
        print(category)
>>>>>>> master
        diary = MyDiary.objects.create(
                author=author, 
                content=content,
                category=category,
                emotion_score=emtion_score,
            )
        diary_dict = diary_serializer(diary)
        diary.save()
        return JsonResponse(diary_dict, status=201)
    else:
        return HttpResponse(status=405)

