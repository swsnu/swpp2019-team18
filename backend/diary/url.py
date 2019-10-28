  
from django.urls import path
from diary import views

urlpatterns = [
    path('diary/date/<int:id>/', views.getDiaryByDate, name='getDiartByDate'),
    path('diary/person/<int:id>/', views.getDiaryByPerson, name='getDiartByPerson'),
    path('diary/<int:id>/', views.diary, name='diary')
]