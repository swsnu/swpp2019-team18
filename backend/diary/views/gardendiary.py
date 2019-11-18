from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import MyDiary, Category, People, GardenDiary
from django.contrib.auth import get_user_model
from ..serializer import diary_serializer
User = get_user_model()

def get_all_garden_diary(request, mode = None) :
    if request.method == 'GET' : 
        if not request.user.is_authenticated:
            return HttpResponse(status=401)  
        garden_all_list = [garden for garden in GardenDiary.objects.all()]
        response_dict = list(map(lambda garden : {'id' : garden.id, 
                                                'content' : garden.content, 
                                                'category_name' : garden.category.name, 
                                                'category_title': garden.category.category_title,
                                                'flower_users' : [user for user in garden.flower_users.all().values_list('username', flat = True)],
                                                'flower_count': garden.flower_count, 
                                                'shared_date' : garden.shared_date } , garden_all_list ))  
        if mode == 'Latest' : 
            response_dict.sort(key = lambda x:x['shared_date'], reverse = True) 
        else : 
            response_dict.sort(key = lambda x:x['flower_count'], reverse = True) 
  
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
        response_dict = {'id' : garden_diary.id, 
                        'content' : garden_diary.content, 
                        'category_name' : garden_diary.category.name, 
                        'category_title': garden_diary.category.category_title,
                        'flower_users' : [user for user in garden_diary.flower_users.all().values_list('username', flat = True)],
                        'flower_count': garden_diary.flower_count, 
                        'shared_date' : garden_diary.shared_date }
        return JsonResponse(response_dict, status=201)
    else :
        return HttpResponseNotAllowed(['POST'])

def get_garden_diary_by_category(request, name = None, mode = None) : 
    if request.method == 'GET' : 
        if not request.user.is_authenticated:
            return HttpResponse(status=401)  
        selected_diary = GardenDiary.objects.filter(category__name = name)
        response_dict = list(map(lambda garden : {'id' : garden.id, 
                                                'content' : garden.content, 
                                                'category_name' : garden.category.name, 
                                                'category_title': garden.category.category_title,
                                                'flower_users' : [user for user in garden.flower_users.all().values_list('username', flat = True)],
                                                'flower_count': garden.flower_count, 
                                                'shared_date' : garden.shared_date } , selected_diary ))  
        
        if mode == 'Latest' : 
            response_dict.sort(key = lambda x:x['shared_date'], reverse = True) 
        else : 
            response_dict.sort(key = lambda x:x['flower_count'], reverse = True) 
        return JsonResponse(response_dict, safe=False)
    else :
        return HttpResponseNotAllowed(['GET'])

def get_my_garden_diary(request, mode = None) :
    if request.method == 'GET' : 
        if not request.user.is_authenticated:
            return HttpResponse(status=401)  
        my_garden = GardenDiary.objects.filter(author = request.user)
        response_dict = list(map(lambda garden : {'id' : garden.id, 
                                                'content' : garden.content, 
                                                'category_name' : garden.category.name, 
                                                'category_title': garden.category.category_title,
                                                'flower_users' : [user for user in garden.flower_users.all().values_list('username', flat = True)],
                                                'flower_count': garden.flower_count, 
                                                'shared_date' : garden.shared_date } , my_garden )) 
            
        if mode == 'Latest' :
            response_dict.sort(key = lambda x:x['shared_date'], reverse = True) 
        else :
            response_dict.sort(key = lambda x:x['flower_count'], reverse = True) 
        return JsonResponse(response_dict, safe=False)
    else :
        return HttpResponseNotAllowed(['GET'])

def delete_my_garden_diary(request, id = None) :
    if request.method == 'DELETE' : 
        try:
            gardendiary = GardenDiary.objects.get(id = id, author = request.user)
        except GardenDiary.DoesNotExist : 
                return HttpResponse(status = 404)
        gardendiary.delete()
        return HttpResponse(status = 200)
    else :
        return HttpResponseNotAllowed(['DELETE'])

    