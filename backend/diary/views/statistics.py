import json
import datetime
from django.http import HttpResponse, JsonResponse
from ..decorator import is_logged_in
from ..models import MyDiary


@is_logged_in
def get_statistics(request):
    if request.method == "GET":
        user = request.user
        res = analyze_by_cal(user)
        return JsonResponse(res, status=200, safe=False)
    return HttpResponse(status=405)


def analyze_by_cal(user):
    diaries = MyDiary.objects.filter(author=user).order_by('-created_date')[:15]
    size = len(diaries)
    res = []
    for diary in diaries:
        month  = diary.created_date.month
        day  = diary.created_date.day
        serialized = {'day' : str(month) + '/' + str(day), 'score' : diary.emotion_score, 'diary_id' : diary.id}
        res.append(serialized)
    return res