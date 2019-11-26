import json
from django.http import HttpResponse, JsonResponse
from ..decorator import is_logged_in

@is_logged_in
def get_cagegory(request):
    if request.method == "GET":
        categories = ["MOVIE", "TRAVEL", "DATE", "PEOPLE"]
        return JsonResponse(categories, safe=False)
    return HttpResponse(status=405)


@is_logged_in
def get_statcal(request):
    if request.method == "GET":
        categories = ["Latests",]
        return JsonResponse(categories, safe=False)
    return HttpResponse(status=405)
