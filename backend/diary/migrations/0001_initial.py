# Generated by Django 2.2.5 on 2019-10-28 01:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('category_title', models.CharField(blank=True, max_length=200)),
                ('rating', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='DiaryFlower',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='People',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('information', models.TextField(blank=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MyDiary',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('date', models.IntegerField()),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
                ('emotion_score', models.IntegerField(blank=True, null=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diary.Category')),
                ('people', models.ManyToManyField(blank=True, null=True, related_name='tagged_diary', to='diary.People')),
            ],
        ),
        migrations.CreateModel(
            name='GardenDiary',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('shared_date', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diary.Category')),
                ('flower_users', models.ManyToManyField(blank=True, related_name='flower_users_set', through='diary.DiaryFlower', to=settings.AUTH_USER_MODEL)),
                ('origin_diary', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diary.MyDiary')),
            ],
        ),
        migrations.AddField(
            model_name='diaryflower',
            name='garden',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diary.GardenDiary'),
        ),
        migrations.AddField(
            model_name='diaryflower',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]