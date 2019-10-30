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
<<<<<<< HEAD
    people = models.ManyToManyField(People, blank=True, related_name = 'tagged_diary')
    created_date = models.DateTimeField(auto_now=True)  #should be changed (not auto)
=======
    people = models.ManyToManyField(People, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
>>>>>>> master
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