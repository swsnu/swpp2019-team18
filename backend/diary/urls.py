from django.urls import path
from .views import diary
from .views import people
from .views import auth
from .views import get_specific_diary
from .views import share


urlpatterns = [
    path('signup/', auth.signup, name='signup'),
    path('signin/', auth.signin, name = 'signin'),
    path('signout/', auth.signout, name='signout'),
    path('token/', auth.token),
    path('diary/', diary.write_diary, name='write_diary'),
    path('diary/<int:diary_id>/', diary.diary_detail, name='diary_detail'),
    path('diary/date/<int:year>/<int:month>/<int:day>/', get_specific_diary.getDiaryByDate, name='getDiartByDate'),
    path('diary/person/<int:id>/', get_specific_diary.getDiaryByPerson, name='getDiartByPerson'),
    path('diary/category/<str:name>/', get_specific_diary.getDiaryByCategory, name='getDiartByCategory'),
    path('diary/share/<int:id>/', share.shareDiary, name='shareDiary'),
    path('diary/people/', people.people, name='people'),
]