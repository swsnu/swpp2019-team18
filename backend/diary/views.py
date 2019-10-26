from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse,HttpResponseBadRequest, HttpResponseNotFound
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
import json

def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        User.objects.create_user(username = username, password= password)
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(request, username = username, password = password)
        if user is not None:
            login(request, user)
            return HttpResponse(status = 204)
        else:
            return HttpResponseBadRequest(status = 401)
    else:
        return HttpResponseNotAllowed(['POST'])

def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status = 204)
        else:
            return HttpResponse(status = 401)
    else:
        return HttpResponseNotAllowed(['GET'])

# Create your views here.
