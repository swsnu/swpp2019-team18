from django.test import TestCase, Client
from .models import User
import json

# Create your tests here.
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