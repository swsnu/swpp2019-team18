from django.shortcuts import render
from .models import MyDiary, People
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt

from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
import json

# Create your views here.
@csrf_exempt
def getDiaryByDate(request, year = None, month = None, day = None) : 
    if request.method == 'GET' : 
        # if not request.user.is_authenticated:
        #     return HttpResponse(status=401)
        try:
            selectedDiary = MyDiary.objects.filter(created_date = datetime(year,month,day))
        except MyDiary.DoesNotExist : 
                return HttpResponse(status = 404)
        response_dict = list(map(lambda diary : {'id' : diary.id, 
                                                'author' : diary.author.id, 
                                                'content' : diary.content, 
                                                'created_date' : dairy.created_date, 
                                                'category_name' : diary.category.name, 
                                                'person_tag' : diary.people.all().values(),
                                                'category_title':diary.category.category_title, 
                                                'rating':diary.category.rating, 
                                                'emotion_score' : diary.emotion_score } , selectedDiary ))
        return JsonResponse(response_dict, safe=False)
    else :
        return HttpResponseNotAllowed(['GET'])

def getDiaryByPerson(request, id = None) : 
    if request.method == 'GET' : 
        # if not request.user.is_authenticated:
        #     return HttpResponse(status=401)
        try : 
            person = People.objects.get(id = id)
            selectedDiary = [diary for diary in person.tagged_diary.all()]
        except People.DoesNotExist:
            return HttpResponse(status = 404)
        response_dict = list(map(lambda diary : {'id' : diary.id, 
                                                'author' : diary.author.id, 
                                                'content' : diary.content, 
                                                'created_date' : dairy.created_date, 
                                                'category_name' : diary.category.name, 
                                                'person_tag' : diary.people.all().values(),
                                                'category_title':diary.category.category_title, 
                                                'rating': diary.category.rating, 
                                                'emotion_score' : diary.emotion_score } , selectedDiary ))  
        return JsonResponse(response_dict, safe=False)
    else :
        return HttpResponseNotAllowed(['GET'])

def getDiaryByCategory(request, name = None) :
    if request.method == 'GET' : 
        # if not request.user.is_authenticated:
        #     return HttpResponse(status=401)
        try:
            selectedDiary = MyDiary.objects.filter(category.name = name)
        except MyDiary.DoesNotExist : 
                return HttpResponse(status = 404)

        response_dict = list(map(lambda diary : {'id' : diary.id, 
                                                'author' : diary.author.id, 
                                                'content' : diary.content, 
                                                'created_date' : dairy.created_date, 
                                                'category_name' : diary.category.name, 
                                                'person_tag' : diary.people.all().values(),
                                                'category_title':diary.category.category_title, 
                                                'rating':diary.category.rating, 
                                                'emotion_score' : diary.emotion_score } , selectedDiary ))  
        return JsonResponse(response_dict, safe=False)
    else :
        return HttpResponseNotAllowed(['GET'])

def shareDiary (request, id=None) : 
    if request.method == 'POST' : 
        # if not request.user.is_authenticated:
        #     return HttpResponse(status=401)
        try : 
            body = request.body.decode()
            diary_content = json.loads(body)['content']
        except (KeyError) as e:
            return HttpResponseBadRequest()
        diary = MyDiary.objects.get(id = id)
        gardenDairy = GardenDiary(author = diary.author, content = diary_content, category=diary.category)
        gardenDairy.save()
        response_dict = {
                        'id' : gardenDiary.id, 
                        'author' : gardenDiary.author.id, 
                        'content' : gardenDiary.content,
                        'category' : gardenDiary.category.id
                        }
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

def diary(request, id = None) : 
    if request.method == 'DELETE' : 
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            diary = MyDiary.objects.get(id = id)
        except MyDiary.DoesNotExist : 
                return HttpResponse(status = 404)
        diary.delete()
        return HttpResponse(status = 200)
    else : 
        return HttpResponseNotAllowed(['DELETE'])

        