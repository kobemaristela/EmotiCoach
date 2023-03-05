from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
import json


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

def SetSessionDataGood(userId):
    setData = [
            {
                "set_num": 1,
                "weight": 135,
                "reps": 1,
                "rpe": 1
            }
        ]
    activityData = [
        {
            "name": "activity1",
            "muscleGroups": ["chest","tricep"],
            "sets": setData
        }
    ]
    sessionData = {
        "name": "session1",
        "duration": "1",
        "datetime": "2000-1-1 1:00:00",
        "auth_user_id": userId,
        "activities": activityData
    }

    return sessionData

class TestCreateSession(APITestCase):
    def test_create_session_success(self):
        token = RegisterLogin(self.client)
        userToken = token.data["token"]
        userId = token.data["user_id"]

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + userToken)
        
        url = reverse('setsessiondata')

        data = {'session': json.dumps(SetSessionDataGood(userId))}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestGetSession(APITestCase):
    def test_get_session_success(self):
        token = RegisterLogin(self.client)
        userToken = token.data["token"]
        userId = token.data["user_id"]
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + userToken)

        data = {'session': json.dumps(SetSessionDataGood(userId))}
        session = self.client.post(reverse('setsessiondata'), data)
        session_id = json.loads(session.content)["id"]

        url = reverse('sessiondata')

        data = {"id": session_id}

        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class TestGetAllSession(APITestCase):
    def test_get_all_session_success(self):
        token = RegisterLogin(self.client)
        userToken = token.data["token"]
        userId = token.data["user_id"]
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + userToken)

        data = {'session': json.dumps(SetSessionDataGood(userId))}
        self.client.post(reverse('setsessiondata'), data)
        self.client.post(reverse('setsessiondata'), data)

        url = reverse("getallsessions")

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)



