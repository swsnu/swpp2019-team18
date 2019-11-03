from django.urls import path
from .views import edit_diary
from .views import write_diary
from .views import people
from .views import auth

urlpatterns = [
    path('signup/', auth.signup, name='signup'),
    path('signin/', auth.signin, name = 'signin'),
    path('signout/', auth.signout, name='signout'),
    path('token/', auth.token),
    path('diary/', write_diary.diary, name='diary'),
    path('diary/<int:diary_id>/', edit_diary.diary_detail, name='diary_detail'),
    path('diary/people/', people.people, name='people'),
]