from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import MyDiary, Category, People, GardenDiary
from django.contrib.auth import get_user_model
from ..serializer import diary_serializer
User = get_user_model()

def get_all_garden_diary(request) :
    if request.method == 'GET' : 
        if not request.user.is_authenticated:
            return HttpResponse(status=401)  
        garden_all_list = [garden for garden in GardenDiary.objects.all()]
        response_dict = list(map(lambda garden : {'id' : garden.id, 
                                                'content' : garden.content, 
                                                'category_name' : garden.category.name, 
                                                'category_title': garden.category.category_title, 
                                                'flower_count': garden.flower_count, 
                                                'shared_date' : garden.shared_date } , garden_all_list ))  

        return JsonResponse(response_dict, safe=False)
    else :
        return HttpResponseNotAllowed(['GET'])

def give_flower(request, id = None) :
    if request.method == 'POST' : 
        if not request.user.is_authenticated:
            return HttpResponse(status=401)  
        garden_diary = GardenDiary.objects.get(id=id)
        if request.user in garden_diary.flower_users.all():
            garden_diary.flower_users.remove(request.user)
        else : 
            garden_diary.flower_users.add(request.user)
        garden_diary.save()
        print(garden_diary.flower_count)
        response_dict = garden_diary.flower_count
        return JsonResponse(response_dict, safe=False, status=201)
    else :
        return HttpResponseNotAllowed(['POST'])

    