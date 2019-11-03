from django.contrib import admin
from .models import User
from .models import People

admin.site.register(User)
admin.site.register(People)