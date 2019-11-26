import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from ..models import Image
from ..serializer import diary_serializer
from ..decorator import is_logged_in
from django.shortcuts import render
User = get_user_model()

@is_logged_in
def image(request):
    if request.method == 'POST':
        try:
            instance = Image( photo = request.FILES['file'], user = request.user)
            instance.save()
            print(instance.photo.name)
            server_name = 'http://localhost:8000/files/'
            # server_name = server_domain + /files/
            link = { 'link' : server_name + instance.photo.name}
            return JsonResponse(link,status = 200)
        except:
            return HttpResponse(status = 400)
    return HttpResponse(status = 400)

