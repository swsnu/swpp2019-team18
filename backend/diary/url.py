  
from django.urls import path
from diary import views

urlpatterns = [
    path('diary/date/<int:year>/<int:month>/<int:day>/', views.getDiaryByDate, name='getDiartByDate'),
    path('diary/person/<int:id>/', views.getDiaryByPerson, name='getDiartByPerson'),
    path('diary/category/<str:name>/', views.getDiaryByCategory, name='getDiartByCategory'),

    path('diary/share/<int:id>/', views.shareDiary, name='shareDiary')
    path('diary/<int:id>/', views.diary, name='diary')
]