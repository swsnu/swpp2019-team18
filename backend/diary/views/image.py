import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from ..models import Image
from ..serializer import diary_serializer
from ..decorator import is_logged_in
from django.shortcuts import render
import os
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
from PIL import Image
User = get_user_model()

def make_filename(filename): #파라미터 instance는 Photo 모델을 의미 filename은 업로드 된 파일의 파일 이름
    from random import choice
    import string # string.ascii_letters : ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
    arr = [choice(string.ascii_letters) for _ in range(8)]
    pid = ''.join(arr) # 8자리 임의의 문자를 만들어 파일명으로 지정
    extension = filename.split('.')[-1] # 배열로 만들어 마지막 요소를 추출하여 파일확장자로 지정
    # file will be uploaded to MEDIA_ROOT/user_<id>/<random>
    return '%s.%s' % (pid, extension) # 예 : wayhome/abcdefgs.png

@is_logged_in
def image(request):
    if request.method == 'POST':
        try:
            connect_str = os.getenv('CONNECT_STR')
            blob_service_client = BlobServiceClient.from_connection_string(connect_str)
            request_image = request.FILES['file']
            name = request_image.name
            image = request_image.read()
            #process_image = Image.frombytes(image)
            filename = make_filename(name)
            #instance = Image( photo = request.FILES['file'], user = request.user)
            #instance.save()
            blob_client = blob_service_client.get_blob_client(container='images', blob=filename)
            blob_client.upload_blob(image)
            server_name = 'https://sdamedia.blob.core.windows.net/images/'
            # server_name = server_domain + /files/
            link = { 'link' : server_name + filename}
            return JsonResponse(link,status = 200)
        except Exception as e:
            print(e)
            return HttpResponse(status = 400)
    return HttpResponse(status = 400)


