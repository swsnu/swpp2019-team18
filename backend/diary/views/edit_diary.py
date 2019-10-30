from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import MyDiary, Category
from django.contrib.auth import get_user_model
from ..serializer import diary_serializer
User = get_user_model()

@csrf_exempt
def diary_detail(request, diary_id):
    if request.method == 'GET':
        # TODO : use request.user
        diary = MyDiary.objects.get(id=diary_id)
        diary_dict = diary_serializer(diary)
        return JsonResponse(diary_dict, status=201)

    elif request.method == 'PUT':
        req_data = json.loads(request.body.decode())
        try:
            diary = MyDiary.objects.get(id=diary_id)
        except:
            return HttpResponse(status=404)
        content = req_data['content']
        category_name = req_data['categoryName']
        category_title = req_data['categoryTitle']
        emtion_score = req_data['emotionScore']
        people = req_data['people']
        rating = req_data['rating']

        diary.category.name = category_name
        diary.category.category_title = category_title
        diary.emtion_score = emtion_score
        # diary.people = people
        diary.rating = rating
        diary.content = content
        diary.save()
        diary_dict = diary_serializer(diary)
        diary.category.save()
        return JsonResponse(diary_dict, status=200)
   
    elif request.method == 'DELETE' : 
        # if not request.user.is_authenticated:
        #     return HttpResponse(status=401)
        try:
            diary = MyDiary.objects.get(id = diary_id)
        except MyDiary.DoesNotExist : 
                return HttpResponse(status = 404)
        diary.delete()
        return HttpResponse(status = 200)
        
    else:
        return HttpResponse(status=405)