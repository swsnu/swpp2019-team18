from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import MyDiary, Category, People, GardenDiary
from django.contrib.auth import get_user_model
from ..serializer import diary_serializer
User = get_user_model()

@csrf_exempt
def shareDiary (request, id) : 
    if request.method == 'POST' : 
        # if not request.user.is_authenticated:
        #     return HttpResponse(status=401)

        content = request.body.decode()

        diary = MyDiary.objects.get(id = id)
        gardenDiary = GardenDiary(author = diary.author, origin_diary=diary, content = content, category=diary.category)
        gardenDiary.save()
        response_dict = {
                        'id' : gardenDiary.id, 
                        'origin_diary' : gardenDiary.origin_diary.id,
                        'author' : gardenDiary.author.id, 
                        'content' : gardenDiary.content,
                        'category' : gardenDiary.category.id
                        }
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])