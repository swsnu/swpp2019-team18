from django.contrib import admin

# Register your models here.
from .models import MyDiary, People, Category


admin.site.register(MyDiary)
admin.site.register(Category)
admin.site.register(People)