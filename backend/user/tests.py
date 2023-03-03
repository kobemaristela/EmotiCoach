from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status


class UserTestCase(APITestCase):
    def testUserRegister(self):
        request = self.client.post(
            reverse("register"),
            {
                "first_name": "Kobe",
                "last_name": "Maristela",
                "username": "kobemaristela",
                "email": "kobe@maristela.com",
                "password": "Password123$"
            },
        )

        self.assertEqual(request.status_code, status.HTTP_200_OK)



    def testUserLogin(self):
        # Register Users
        self.client.post(
            reverse("register"),
            {
                "first_name": "Kobe",
                "last_name": "Maristela",
                "username": "kobemaristela",
                "email": "kobe@maristela.com",
                "password": "Password123$"
            },
        )

        # Login Users
        response = self.client.post(
            reverse("login"),
            {
                "username": "kobemaristela",
                "password": "Password123$",
            },
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=f"token {token}")
        self.assertIsNotNone(token)



    def testUserLogout(self):
        # Register Users
        self.client.post(
            reverse("register"),
            {
                "first_name": "Kobe",
                "last_name": "Maristela",
                "username": "kobemaristela",
                "email": "kobe@maristela.com",
                "password": "Password123$"
            },
        )

        #  Login User
        response = self.client.post(
            reverse("login"),
            {
                "username": "kobemaristela",
                "password": "Password123$",
            },
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=f"token {token}")
        self.assertIsNotNone(token)


        # Logout User
        response = self.client.get(reverse("logout"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)