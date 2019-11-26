from django.urls import path
from .views import diary
from .views import people
from .views import auth
from .views import get_specific_diary
from .views import share
from .views import category
from .views import statistics


urlpatterns = [
    path('signup/', auth.signup, name='signup'),
    path('signin/', auth.signin, name = 'signin'),
    path('signout/', auth.signout, name='signout'),
    path('getuser/', auth.get_user_info, name = 'getuser'),
    path('token/', auth.token),
    path('diary/', diary.write_diary, name='write_diary'),
    path('diary/<int:diary_id>/', diary.diary_detail, name='diary_detail'),
    path('diary/date/<int:year>/<int:month>/<int:day>/', get_specific_diary.get_diary_by_date, name='get_diary_by_date'),
    path('diary/person/<int:id>/', get_specific_diary.get_diary_by_person, name='get_diary_by_person'),
    path('diary/category/<str:name>/', get_specific_diary.get_diary_by_category, name='get_diary_by_category'),
    path('diary/share/<int:id>/', share.share_diary, name='share_diary'),
    path('diary/people/', people.people, name='people'),
    path('diary/category/', category.get_cagegory, name='get_category'),
    path('diary/statcal/', category.get_statcal, name='get_statcal'),
    path('diary/statistics/', statistics.get_statistics, name='get_statistics'),
]