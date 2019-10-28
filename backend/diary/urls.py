from django.urls import path
from .view import edit_diary
from .view import write_diary

urlpatterns = [
    path('diary/', write_diary.diary, name='diary'),
    path('diary/<int:diary_id>/', edit_diary.diary_detail, name='diary'),
]