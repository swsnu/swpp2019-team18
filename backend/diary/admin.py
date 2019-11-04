from django.contrib import admin
from .models import User
from .models import MyDiary, People, Category, GardenDiary


admin.site.register(MyDiary)
admin.site.register(Category)
admin.site.register(People)
admin.site.register(User)
admin.site.register(GardenDiary)

