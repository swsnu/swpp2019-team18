from django.shortcuts import render
from .models import MyDiary, People
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt

from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
import json

# Create your views here.
@csrf_exempt
def getDiaryByDate(request, id= None) : 
    if request.method == 'GET' : 
        # if not request.user.is_authenticated:
        #     return HttpResponse(status=401)
        
        try:
            selectedDiary = MyDiary.objects.get(author = request.user and id == id)
        except MyDiary.DoesNotExist : 
                return HttpResponse(status = 404)
        response_dict = [{'id' : diary.id, 'author' : diary.author.id, 'content' : diary.content, 'category_name' : diary.category.name, 'person_tag' : diary.people.all(),
                            'category_title':diary.category.category_title, 'rating':diary.category.rating, 'emotion_score' : diary.emotion_score } for diary in selectedDiary.objects.all().value()]
        return JsonResponse(response_dict, safe=False)
    else :
        return HttpResponseNotAllowed(['GET'])

def getDiaryByPerson(request, id = None) : 
    if request.method == 'GET' : 
        # if not request.user.is_authenticated:
        #     return HttpResponse(status=401)
        try : 
            person = People.objects.get(id = id)
            selectedDiary = person.tagged_diary.all()
        except People.DoesNotExist:
            return HttpResponse(status = 404)
        
        response_dict = selectedDiary.objects.map((diary) => {'id' : diary.id, 'author' : diary.author.id, 'content' : diary.content, 'category_name' : diary.category.name, 'person_tag' : diary.people.all(),
                            'category_title':diary.category.category_title, 'rating':diary.category.rating, 'emotion_score' : diary.emotion_score } 
        return JsonResponse(response_dict, safe=False)
    else :
        return HttpResponseNotAllowed(['GET'])

def diary(request, id = None) : 
    if request.method == 'DELETE' : 
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            diary = MyDiary.objects.get(author = request.user and id == id)
        except MyDiary.DoesNotExist : 
                return HttpResponse(status = 404)
        diary.delete()
        return HttpResponse(status = 200)
    else : 
        return HttpResponseNotAllowed(['DELETE'])

        