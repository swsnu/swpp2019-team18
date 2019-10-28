from django.urls import path
from . import views as DiaryView

urlpatterns = [
    path('diary/', DiaryView.diary, name='diary'),
    path('diary/<int:diary_id>/', DiaryView.diary_detail, name='diary'),
]