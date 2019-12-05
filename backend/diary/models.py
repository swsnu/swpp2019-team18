from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    nickname = models.CharField(max_length=40)
    REQUIRED_FIELDS = ['nickname', 'email']


class Category(models.Model):
    name = models.CharField(max_length=100)
    category_title = models.CharField(max_length=200, blank=True)
    rating = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name


class People(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=120)
    information = models.TextField(blank=True)
 

    def __str__(self):
        return self.name


class MyDiary(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    people = models.ManyToManyField(People, blank=True, related_name = 'tagged_diary')
    created_date = models.DateTimeField(auto_now_add=False)
    modified_date = models.DateTimeField(auto_now=True)
    emotion_score = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.content


class GardenDiary(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    origin_diary = models.ForeignKey(MyDiary, on_delete=models.CASCADE)
    content = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    flower_users = models.ManyToManyField(User, related_name='flower_users_set', through='DiaryFlower', blank=True)
    shared_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content
    
    @property
    def flower_count(self):
        return self.flower_users.count()


class DiaryFlower(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    garden = models.ForeignKey(GardenDiary, on_delete=models.CASCADE)

def user_path(instance, filename): #파라미터 instance는 Photo 모델을 의미 filename은 업로드 된 파일의 파일 이름
    from random import choice
    import string # string.ascii_letters : ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
    arr = [choice(string.ascii_letters) for _ in range(8)]
    pid = ''.join(arr) # 8자리 임의의 문자를 만들어 파일명으로 지정
    extension = filename.split('.')[-1] # 배열로 만들어 마지막 요소를 추출하여 파일확장자로 지정
    # file will be uploaded to MEDIA_ROOT/user_<id>/<random>
    return '%s/%s.%s' % (instance.user.username, pid, extension) # 예 : wayhome/abcdefgs.png

class Image(models.Model):
    user = models.ForeignKey(User, on_delete =models.CASCADE)
    photo = models.ImageField(upload_to=user_path)
