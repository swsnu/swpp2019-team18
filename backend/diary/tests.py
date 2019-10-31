from django.test import TestCase, Client
import json
from django.contrib.auth.models import User
from .models import MyDiary, People, Category
from .models import User
import json

class UserTestCase(TestCase):   
    def setUp(self):
        user1 = User.objects.create_user(username='swpp', password='iluvswpp', email = 'email@email.com', nickname = 'testnickname')  # Django default user model
        user2 = User.objects.create_user(username='test', password='iluvswpp', email = 'email@email.com', nickname = 'testnickname')


    def test_csrf(self):
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/signup/', json.dumps({'username': 'chris', 'password': 'chris', 'email' : 'email@email.com', 'nickname' : 'nickname'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)  # Request without csrf token returns 403 response

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.delete('/api/token/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/signup/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        response = client.post('/api/signup/', json.dumps({'username': 'chris', 'password': 'chris','email' : 'email@email.com', 'nickname' : 'nickname'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection

    def test_signin_signout(self):
        client = Client()

        response = client.get('/api/signout/')
        self.assertEqual(response.status_code, 401)

        response = client.get('/api/signin/')
        self.assertEqual(response.status_code, 405)

        response = client.post('/api/signin/', 
            json.dumps({"username": "swpp", "password": "ihateswpp"}), content_type='application/json')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/signin/', json.dumps({"username": "swpp", "password": "iluvswpp"}), content_type='application/json')
        self.assertEqual(response.status_code, 204)

        response = client.delete('/api/signout/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/signout/')
        self.assertEqual(response.status_code, 204)

class DiaryTest(TestCase) :
    def setUp(self):
        user1 = User.objects.create_user(username='swpp', password='iluvswpp', email = 'email@email.com', nickname = 'testnickname')  # Django default user model
        user2 = User.objects.create_user(username='test', password='iluvswpp', email = 'email@email.com', nickname = 'testnickname')
        person1 = People.objects.create(user = user1, name = 'FRIEND1')
        person2 = People.objects.create(user = user1, name = 'FRIEND2')
        category1 = Category.objects.create(name='MOVIE', category_title = 'JOKER', rating = 5)
        diary1 = MyDiary.objects.create(author = user1, content = 'GREAT!', category = category1, emotion_score = 100)
        diary1.people.add(person1)

    def test_get_diary_by_id(self) : 
        client = Client()

        response = client.get('/api/diary/category/MOVIE/')
        self.assertEqual(response.status_code, 200)
        response = client.post('/api/diary/category/MOVIE/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/diary/date/2019/10/31/')
        self.assertEqual(response.status_code, 200)
        response = client.post('/api/diary/date/2019/10/31/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/diary/person/1/')
        self.assertEqual(response.status_code, 200)
        response = client.post('/api/diary/person/1/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/diary/person/10/')
        self.assertEqual(response.status_code, 404)

    def test_share(self):
        client = Client()

        response = client.post('/api/diary/share/1/', json.dumps({'content': 'share test'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)
        response = client.get('/api/diary/share/1/')
        self.assertEqual(response.status_code, 405)

