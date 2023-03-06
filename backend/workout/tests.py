from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
import json
from .test_data import *


# Create your tests here.
    
def RegisterLogin(client):
    client.post(reverse("register"),
                         {'first_name': 'firstName',
                          'last_name': 'lastName',
                          'username': 'testuser',
                          'password': 'Password123$',
                          'email': 'username@emoticoach.net'})
    token = client.post(reverse("login"),
                         {'username': 'testuser',
                          'password': 'Password123$'})
    
    return token


class TestCreateSession(APITestCase):
    def get_set_token(self):
        token = RegisterLogin(self.client)
        userToken = token.data["token"]
        self.userId = token.data["user_id"]

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + userToken)

    def test_create_session_success(self):
        self.get_set_token()
        data = {'session': json.dumps(SetSessionDataGood(self.userId))}
        response = self.client.post(reverse('setsessiondata'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_create_session_missing_fields(self):
        self.get_set_token()
        for session in SetSessionDataMissingFields(self.userId):
            request_data = {'session': json.dumps(session[0])}
            expected_status_code = session[1]
            request = self.client.post(
                reverse("setsessiondata"), request_data
            )
            self.assertEqual(request.status_code, expected_status_code)

class TestGetSession(APITestCase):
    def get_set_token(self):
        token = RegisterLogin(self.client)
        userToken = token.data["token"]
        self.userId = token.data["user_id"]

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + userToken)

    def test_get_session_success(self):
        self.get_set_token()

        data = {'session': json.dumps(SetSessionDataGood(self.userId))}
        session = self.client.post(reverse('setsessiondata'), data)
        session_id = json.loads(session.content)["id"]

        data = {"id": session_id}

        response = self.client.post(reverse('getsessiondata'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_session_no_data(self):
        self.get_set_token()

        data = {"id": 500}

        response = self.client.post(reverse('getsessiondata'), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class TestGetAllSession(APITestCase):
    def get_set_token(self):
        token = RegisterLogin(self.client)
        userToken = token.data["token"]
        self.userId = token.data["user_id"]

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + userToken)

    def test_get_all_session_no_data(self):
        self.get_set_token()
        response = self.client.get(reverse("getallsessions"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_all_session_success(self):
        self.get_set_token()

        data = {'session': json.dumps(SetSessionDataGood(self.userId))}
        self.client.post(reverse('setsessiondata'), data)
        self.client.post(reverse('setsessiondata'), data)

        response = self.client.get(reverse("getallsessions"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)




