from django.urls import path
from .views import diary
from .views import people
from .views import auth
from .views import get_specific_diary
from .views import share
<<<<<<< HEAD
from .views import category
from .views import statistics
=======
>>>>>>> d40a78b04ae8d6d579302446362fff31fcfb66e5
from .views import image
from .views import gardendiary

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
<<<<<<< HEAD
    path('diary/category/', category.get_cagegory, name='get_category'),
    path('diary/calendarOption/', category.get_statcal, name='get_statcal'),
    path('diary/statistics/', statistics.get_statistics, name='get_statistics'),
    path('diary/frequency/category/', statistics.by_category_frequency, name='by_category_frequency'),
=======
>>>>>>> d40a78b04ae8d6d579302446362fff31fcfb66e5
    path('diary/image/',image.image),
    path('garden/<str:mode>/', gardendiary.get_all_garden_diary, name='get_all_garden_diary'),
    path('garden/flower/<int:id>/', gardendiary.give_flower, name='give_flower'),
    path('garden/category/<str:name>/<str:mode>/', gardendiary.get_garden_diary_by_category, name='get_garden_diary_by_category'),
    path('garden/flower/<str:mode>/', gardendiary.get_my_flower, name = 'get_my_flower'),
    path('garden/mylist/<str:mode>/', gardendiary.get_my_garden_diary, name='get_my_garden_diary'),
<<<<<<< HEAD
=======

>>>>>>> d40a78b04ae8d6d579302446362fff31fcfb66e5
]