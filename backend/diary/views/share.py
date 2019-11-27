from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import MyDiary, Category, People, GardenDiary
from django.contrib.auth import get_user_model
from ..serializer import diary_serializer
User = get_user_model()

def share_diary (request, id) : 
    if request.method == 'POST' : 
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        content = request.body.decode()

        diary = MyDiary.objects.get(id = id, author = request.user)
        garden_diary = GardenDiary(author = diary.author, origin_diary=diary, content = content, category=diary.category)
        garden_diary.save()
        response_dict = {
                        'id' : garden_diary.id, 
                        'origin_diary' : garden_diary.origin_diary.id,
                        'author' : garden_diary.author.id, 
                        'content' : garden_diary.content,
                        'category' : garden_diary.category.id
                        }
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])