import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from ..models import MyDiary, Category, People
from ..serializer import diary_serializer
from ..decorator import is_logged_in
from django.shortcuts import render
User = get_user_model()

@is_logged_in
def write_diary(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        content = req_data['content']
        category_name = req_data['categoryName']
        category_title = req_data['categoryTitle']
        emtion_score = req_data['emotionScore']
        people_id = req_data['people']
        rating = req_data['rating']

        author = request.user
        tagged_people = People.objects.filter(id__in=people_id)
        category = Category.objects.create(name=category_name, category_title=category_title, rating=rating)
        diary = MyDiary.objects.create(
                author=author, 
                content=content,
                category=category,
                emotion_score=emtion_score,
            )
        for person in tagged_people:
            diary.people.add(person)
        diary.save()
        diary_dict = diary_serializer(diary)
        diary.save()
        return JsonResponse(diary_dict, status=201)
    else:
        return HttpResponse(status=405)


@is_logged_in
def diary_detail(request, diary_id):
    if request.method == 'GET':
        diary = MyDiary.objects.get(id=diary_id)
        diary_dict = diary_serializer(diary)
        return JsonResponse(diary_dict, status=200)

    elif request.method == 'PUT':
        req_data = json.loads(request.body.decode())
        try:
            diary = MyDiary.objects.get(id=diary_id)
        except MyDiary.DoesNotExist:
            return HttpResponse(status=404)

        if request.user != diary.author:
            return HttpResponse(status=403) # forbidden
        content = req_data['content']
        category_name = req_data['categoryName']
        category_title = req_data['categoryTitle']
        emtion_score = req_data['emotionScore']
        people_id = req_data['people']
        rating = req_data['rating']
        people = People.objects.filter(id__in=people_id)

        diary.category.name = category_name
        diary.category.category_title = category_title
        diary.emtion_score = emtion_score
        diary.rating = rating
        diary.content = content
        diary.people.set(people)
        diary.save()

        diary_dict = diary_serializer(diary)
        diary.category.save()
        return JsonResponse(diary_dict, status=200)

    elif request.method == 'DELETE' : 
        try:
            diary = MyDiary.objects.get(id = diary_id)
        except MyDiary.DoesNotExist : 
                return HttpResponse(status = 404)
        if request.user != diary.author:
            return HttpResponse(status=403) # forbidden
        diary.delete()
        return HttpResponse(status = 200)
    else:
        return HttpResponse(status=405)
