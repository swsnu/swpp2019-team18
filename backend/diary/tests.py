import json
from django.test import TestCase, Client
from django.contrib.auth.models import User
from PIL import Image as img
import tempfile
import os
from .models import MyDiary, People, Category, GardenDiary, User, Image
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
from unittest.mock import MagicMock, patch

class UserTestCase(TestCase):   
    def setUp(self):
        User.objects.create_user(username='swpp', password='iluvswpp', email = 'email@email.com', nickname = 'testnickname')  # Django default user model
        User.objects.create_user(username='test', password='iluvswpp', email = 'email@email.com', nickname = 'testnickname')


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

    def test_getuser(self):
        client = Client()
        response = client.get('/api/getuser/')
        self.assertEqual(response.status_code, 401)
        response = client.post('/api/signin/', json.dumps({"username": "swpp", "password": "iluvswpp"}), content_type='application/json')
        self.assertEqual(response.status_code, 204)
        response = client.get('/api/getuser/')
        self.assertEqual(response.status_code, 200)




class DiaryTest(TestCase) :
    def setUp(self):
        user1 = User.objects.create_user(username='swpp', password='iluvswpp', email = 'email@email.com', nickname = 'testnickname')  # Django default user model
        User.objects.create_user(username='test', password='iluvswpp', email = 'email@email.com', nickname = 'testnickname')
        person1 = People.objects.create(user = user1, name = 'FRIEND1')
        category1 = Category.objects.create(name='MOVIE', category_title = 'JOKER', rating = 5)
        diary1 = MyDiary.objects.create(author = user1, content = 'GREAT!', category = category1, emotion_score = 100, created_date='2019-11-03')
        diary1.people.add(person1)

    def test_get_diary_by_id(self) : 
        client = Client()
    
        response = client.post('/api/signin/', 
            json.dumps({"username": "swpp", "password": "iluvswpp"}), content_type='application/json')


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
        response = client.post('/api/signin/', 
            json.dumps({"username": "swpp", "password": "iluvswpp"}), content_type='application/json')

        response = client.post('/api/diary/share/1/', json.dumps({'content': 'share test'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)
        response = client.get('/api/diary/share/1/')
        self.assertEqual(response.status_code, 405)

class DiaryTestForcedLogin(TestCase):
    diary_data = {
            'content': 'Movie was good',
            'categoryName' : 'MOVIE',
            'plainText' : 'Movie was good',
            'categoryTitle' : 'Terminator',
            'emotionScore' : 100, 
            'people' : [1, 2, 3],
            'rating' : 5,
            'date' : {'year' : 2019, 'month' : 11, 'day' : 3}
        }
    
    def setUp(self):
        self.user = User.objects.create_user(
            username='tester', password='iluvswpp', 
            email = 'email@email.com', nickname = 'testnickname')
        self.another = User.objects.create_user(
            username='another', password='iluvswpp', 
            email = 'email@email.com', nickname = 'testnickname')
        self.category = Category.objects.create(name='MOVIE', category_title = 'JOKER', rating = 5)
        self.client.force_login(self.user)
        
    def test_write(self):
        response = self.client.post('/api/diary/', json.dumps(self.diary_data), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        response = self.client.get('/api/diary/1/')
        self.assertEqual(response.status_code, 200)
        response = self.client.put('/api/diary/', json.dumps(self.diary_data), content_type='application/json')
        self.assertEqual(response.status_code, 405)

    def test_edit(self):
        edit_data = self.diary_data
        edit_data['content'] = 'Actually it was bad'
        self.client.post('/api/diary/', json.dumps(self.diary_data), content_type='application/json')
        response = self.client.put('/api/diary/1/', json.dumps(edit_data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        response = self.client.put('/api/diary/2/', json.dumps(edit_data), content_type='application/json')
        self.assertEqual(response.status_code, 404)
        MyDiary.objects.create(author = self.another, content = 'GREAT!', category = self.category, emotion_score = 100, created_date='2019-11-03')
        response = self.client.put('/api/diary/2/', json.dumps(edit_data), content_type='application/json')
        self.assertEqual(response.status_code, 403)

    def test_delete(self):
        self.client.post('/api/diary/', json.dumps(self.diary_data), content_type='application/json')
        MyDiary.objects.create(author = self.another, content = 'GREAT!', category = self.category, emotion_score = 100, created_date='2019-11-03')

        response = self.client.delete('/api/diary/1/')
        self.assertEqual(response.status_code, 200)

        response = self.client.delete('/api/diary/1/')
        self.assertEqual(response.status_code, 404)

        response = self.client.delete('/api/diary/2/')
        self.assertEqual(response.status_code, 403)

    def test_un_allowed_method(self):
        response = self.client.post('/api/diary/1/', json.dumps(self.diary_data), content_type='application/json')
        self.assertEqual(response.status_code, 405)


class PeopleTest(TestCase):
    def setUp(self):
        self.userA = User.objects.create_user(
            username='A', password='iluvswpp', 
            email='email@email.com', nickname ='A')

        self.userB = User.objects.create_user(
            username='B', password='iluvswpp', 
            email = 'email@email.com', nickname = 'B')

        info = "Sorry This is empty"
        self.A_person1 = People.objects.create(
            user=self.userA,
            name="상원",
            information=info
        )
        self.A_person2 = People.objects.create(
            user=self.userA,
            name="현서",
            information=info
        )
        self.B_person1 = People.objects.create(
            user=self.userB,
            name="영윤",
            information=info
        )
        self.B_person2 = People.objects.create(
            user=self.userB,
            name="준석",
            information=info
        )
        self.client.force_login(self.userA)

    def test_anonymous_user(self):
        client = Client()
        response = client.get('/api/diary/people/')
        self.assertEqual(response.status_code, 401)

    def test_get_people(self):
        response = self.client.get('/api/diary/people/')
        self.assertEqual(response.status_code, 200)
        res_data = json.loads(response.content)
        self.assertEqual(res_data[0]['name'], '상원')

    def test_post_people(self):
        people_data = {'name': '대호', 'information' : "Nothing"}
        response = self.client.post('/api/diary/people/', json.dumps(people_data), content_type='Application/json')
        self.assertEqual(response.status_code, 201)
    
    def test_unallowed_method(self):
        edit_data = {'name': '대호', 'information' : "Nothing"}
        response = self.client.put('/api/diary/people/', edit_data)
        self.assertEqual(response.status_code, 405)

class ImageTest(TestCase):
    def setUp(self):
        User.objects.create_user(username='swpp', password='iluvswpp', email = 'email@email.com', nickname = 'testnickname')  # Django default user model
        client = Client()
        response = client.post('/api/signin/', 
            json.dumps({"username": "swpp", "password": "iluvswpp"}), content_type='application/json')


    @patch('azure.storage.blob.BlobServiceClient')
    @patch('azure.storage.blob.BlobClient')
    def test_upload_file(self, MockBlobClient,MockBlobkServiceClient):

        
        client = Client()
        response = client.post('/api/signin/', 
            json.dumps({"username": "swpp", "password": "iluvswpp"}), content_type='application/json')
        image = img.new('RGB', (100, 100))
        


        tmp_file = tempfile.NamedTemporaryFile(prefix='tmp', suffix='.jpg')
        image.save(tmp_file)
        tmp_file.seek(0)

        os.getenv = MagicMock(return_value=0)
        BlobServiceClient.from_connection_string = MagicMock(return_value = BlobServiceClient('mock_url'))
        BlobServiceClient.get_blob_client = MagicMock(return_value = BlobClient('mock_url','mock_container', 'mock_blob'))
        BlobClient.upload_blob = MagicMock(return_value = 0)
        
        

        response = client.post('/api/diary/image/', {'file': tmp_file}, format='multipart/form-data')
        self.assertEqual(response.status_code, 200)

class GardenTest(TestCase) :
    def setUp(self):
        user1 = User.objects.create_user(username='swpp', password='iluvswpp', email = 'email@email.com', nickname = 'testnickname')  # Django default user model
        User.objects.create_user(username='test', password='iluvswpp', email = 'email@email.com', nickname = 'testnickname')
        person1 = People.objects.create(user = user1, name = 'FRIEND1')
        category1 = Category.objects.create(name='MOVIE', category_title = 'JOKER', rating = 5)
        diary1 = MyDiary.objects.create(author = user1, content = 'GREAT!', category = category1, emotion_score = 100, created_date='2019-11-03')
        diary1.people.add(person1)

    def test_get_garden_diary(self) : 
        client = Client()
    
        response = client.post('/api/signin/', 
            json.dumps({"username": "swpp", "password": "iluvswpp"}), content_type='application/json')
        client.post('/api/diary/share/1/', json.dumps({'content': 'share test'}), content_type='application/json')

        response = client.get('/api/garden/Latest/')
        self.assertEqual(response.status_code, 200)
        response = client.get('/api/garden/Popular/')
        self.assertEqual(response.status_code, 200)
        response = client.post('/api/garden/Latest/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/garden/category/MOVIE/Latest/')
        self.assertEqual(response.status_code, 200)
        response = client.get('/api/garden/category/MOVIE/Popular/')
        self.assertEqual(response.status_code, 200)
        response = client.post('/api/garden/category/MOVIE/Latest/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/garden/flower/Latest/')
        self.assertEqual(response.status_code, 200)
        response = client.get('/api/garden/flower/Popular/')
        self.assertEqual(response.status_code, 200)
        response = client.post('/api/garden/flower/Latest/')
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/garden/mylist/Latest/')
        self.assertEqual(response.status_code, 200)
        response = client.get('/api/garden/mylist/Popular/')
        self.assertEqual(response.status_code, 200)
        response = client.post('/api/garden/mylist/Latest/')
        self.assertEqual(response.status_code, 405)

        response = client.delete('/api/garden/mylist/1/')
        self.assertEqual(response.status_code, 200)
        response = client.delete('/api/garden/mylist/3/')
        self.assertEqual(response.status_code, 404)


    def test_flower(self):
        client = Client()
        response = client.post('/api/signin/', 
            json.dumps({"username": "swpp", "password": "iluvswpp"}), content_type='application/json')
        client.post('/api/diary/share/1/', json.dumps({'content': 'share test'}), content_type='application/json')

        response = client.post('/api/garden/flower/1/')
        self.assertEqual(response.status_code, 201)
        response = client.post('/api/garden/flower/1/')
        self.assertEqual(response.status_code, 201)
        response = client.get('/api/garden/flower/1/')
        self.assertEqual(response.status_code, 405)

        
class StatisticsTest(TestCase):
    def setUp(self):
        user1 = User.objects.create_user(username='swpp', password='iluvswpp', email = 'email@email.com', nickname = 'testnickname')  # Django default user model
        person1 = People.objects.create(user = user1, name = 'FRIEND1')
        person2 = People.objects.create(user = user1, name = 'FRIEND2')
        category1 = Category.objects.create(name='MOVIE', category_title = 'JOKER', rating = 5)
        diary1 = MyDiary.objects.create(author = user1, content = 'GREAT!', category = category1, emotion_score=50, created_date='2019-11-02')
        diary2 = MyDiary.objects.create(author = user1, content = 'GREAT!', category = category1, emotion_score=50, created_date='2019-11-03')
        diary3 = MyDiary.objects.create(author = user1, content = 'GREAT!', category = category1, emotion_score=50, created_date='2019-11-04')
        diary4 = MyDiary.objects.create(author = user1, content = 'GREAT!', category = category1, emotion_score=50, created_date='2019-12-02')
        diary5 = MyDiary.objects.create(author = user1, content = 'GREAT!', category = category1, emotion_score=50, created_date='2019-12-03')
        diary6 = MyDiary.objects.create(author = user1, content = 'GREAT!', category = category1, emotion_score=50, created_date='2019-12-04')
        diary1.people.add(person1)
        diary2.people.add(person1)
        diary3.people.add(person1)
        diary4.people.add(person2)
        diary5.people.add(person2)
        diary6.people.add(person2)
        self.client.force_login(user1)
    
    def test_valid_statistics(self):
        calendar_res = self.client.get('/api/diary/statistics/?mode=CALENDAR')
        people_res = self.client.get('/api/diary/statistics/?mode=PEOPLE')
        category_res = self.client.get('/api/diary/statistics/?mode=CATEGORY')
        self.assertEqual(calendar_res.status_code, 200)
        self.assertEqual(people_res.status_code, 200)
        self.assertEqual(category_res.status_code, 200)

    def test_invalid_querystring(self):
        res = self.client.get('/api/diary/statistics/?mode=WRONGMODE')
        self.assertEqual(res.status_code, 400)
    
    def test_unallowed_method(self):
        res = self.client.post('/api/diary/statistics/?mode=CALENDAR')
        self.assertEqual(res.status_code, 405)

    def test_valid_category_frequency(self):
        res = self.client.get('/api/diary/frequency/category/')
        self.assertEqual(res.status_code, 200)
    
    def test_invalid_category_frequency(self):
        res = self.client.post('/api/diary/frequency/category/')
        self.assertEqual(res.status_code, 405)
