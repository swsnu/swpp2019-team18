from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import MyDiary, Category, People
from django.contrib.auth import get_user_model
from ..serializer import diary_serializer
User = get_user_model()



# Create your views here.
def getDiaryByDate(request, year , month , day ) : 
    if request.method == 'GET' : 
        # if not request.user.is_authenticated:
        #     return HttpResponse(status=401)
        print('[date] : '+str(year)+' '+str(month)+' '+str(day))
        
        selectedDiary = MyDiary.objects.filter(created_date__year = year, 
                                                   created_date__month = month,
                                                   created_date__day = day)
        
        response_dict = list(map(lambda diary : {'id' : diary.id, 
                                                'author' : diary.author.id, 
                                                'content' : diary.content, 
                                                'created_date' : diary.created_date, 
                                                'category_name' : diary.category.name, 
                                                'person_tag' : [person for person in diary.people.all().values()],
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
                                                'created_date' : diary.created_date, 
                                                'category_name' : diary.category.name, 
                                                'person_tag' : [person for person in diary.people.all().values()],
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
        
        
        
        selectedDiary = MyDiary.objects.filter(category__name = name)
        response_dict = list(map(lambda diary : {'id' : diary.id, 
                                                'author' : diary.author.id, 
                                                'content' : diary.content, 
                                                'created_date' : diary.created_date, 
                                                'category_name' : diary.category.name, 
                                                'person_tag' : [person for person in diary.people.all().values()],
                                                'category_title':diary.category.category_title, 
                                                'rating':diary.category.rating, 
                                                'emotion_score' : diary.emotion_score } , selectedDiary ))  
        return JsonResponse(response_dict, safe=False)
    else :
        return HttpResponseNotAllowed(['GET'])




    

        