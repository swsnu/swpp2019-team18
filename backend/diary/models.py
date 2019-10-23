from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

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
    people = models.ManyToManyField(People, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    emotion_score = 

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

class DiaryFlower(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    garden = models.ForeignKey(GardenDiary, on_delete=models.CASCADE)

