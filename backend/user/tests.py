from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from parameterized import parameterized


class TestUserRegister(APITestCase):
    def test_form_field_success(self):
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

    @parameterized.expand(
        [
            (
                {
                    "first_name": "",
                    "last_name": "Maristela",
                    "username": "kobemaristela",
                    "email": "kobe@maristela.com",
                    "password": "Password123$"
                },
                status.HTTP_400_BAD_REQUEST,
            ),
            (
                {
                    "first_name": "Kobe",
                    "last_name": "",
                    "username": "kobemaristela",
                    "email": "kobe@maristela.com",
                    "password": "Password123$"
                },
                status.HTTP_400_BAD_REQUEST,
            ),
            (
                {
                    "first_name": "Kobe",
                    "last_name": "Maristela",
                    "username": "",
                    "email": "kobe@maristela.com",
                    "password": "Password123$"
                },
                status.HTTP_400_BAD_REQUEST,
            ),
            (
                {
                    "first_name": "Kobe",
                    "last_name": "Maristela",
                    "username": "kobemaristela",
                    "email": "",
                    "password": "Password123$"
                },
                status.HTTP_400_BAD_REQUEST,
            ),
            (
                {
                    "first_name": "Kobe",
                    "last_name": "Maristela",
                    "username": "kobemaristela",
                    "email": "kobe@maristela.com",
                    "password": ""
                },
                status.HTTP_400_BAD_REQUEST,
            ),
        ],
    )
    def test_empty_form_fields_fail(self, request_data, expected_status_code):
        request = self.client.post(
            reverse("register"), request_data
        )

        self.assertEqual(request.status_code, expected_status_code)

    @parameterized.expand(
        [
            (
                {
                    "first_name": ">.<",
                    "last_name": "Maristela",
                    "username": "kobemaristela",
                    "email": "kobe@maristela.com",
                    "password": "Password123$"
                },
                status.HTTP_400_BAD_REQUEST,
            ),
            (
                {
                    "first_name": "Kobe",
                    "last_name": ">.<",
                    "username": "kobemaristela",
                    "email": "kobe@maristela.com",
                    "password": "Password123$"
                },
                status.HTTP_400_BAD_REQUEST,
            ),
        ],
    )
    def test_first_and_last_name_not_alpha_fail(self, request_data, expected_status_code):
        request = self.client.post(
            reverse("register"), request_data
        )

        self.assertEqual(request.status_code, expected_status_code)

    def test_username_not_alphanum_fail(self):
        request = self.client.post(
            reverse("register"),
            {
                "first_name": "Kobe",
                "last_name": "Maristela",
                "username": ">.<",
                "email": "kobe@maristela.com",
                "password": "Password123$"
            }
        )

        self.assertEqual(request.status_code, status.HTTP_400_BAD_REQUEST)

    @parameterized.expand(
        [
            (
                {
                    "first_name": "Kobe",
                    "last_name": "Maristela",
                    "username": "kobemaristela",
                    "email": "kobe^maristela.com",
                    "password": "Password123$"
                },
                status.HTTP_400_BAD_REQUEST,
            ),
            (
                {
                    "first_name": "Kobe",
                    "last_name": "Maristela",
                    "username": "kobemaristela",
                    "email": "kobe@maristela^com",
                    "password": "Password123$"
                },
                status.HTTP_400_BAD_REQUEST,
            ),
        ],
    )
    def test_email_format_not_correct_fail(self, request_data, expected_status_code):
        request = self.client.post(
            reverse("register"), request_data
        )

        self.assertEqual(request.status_code, expected_status_code)

    @parameterized.expand(
        [
            (
                {
                    "first_name": "Kobe",
                    "last_name": "Maristela",
                    "username": "kobemaristela",
                    "email": "kobe@maristela.com",
                    "password": "PASSWORD123$"
                },
                status.HTTP_400_BAD_REQUEST,
            ),
            (
                {
                    "first_name": "Kobe",
                    "last_name": "Maristela",
                    "username": "kobemaristela",
                    "email": "kobe@maristela.com",
                    "password": "password123$"
                },
                status.HTTP_400_BAD_REQUEST,
            ),
            (
                {
                    "first_name": "Kobe",
                    "last_name": "Maristela",
                    "username": "kobemaristela",
                    "email": "kobe@maristela.com",
                    "password": "Password1234"
                },
                status.HTTP_400_BAD_REQUEST,
            ),
            (
                {
                    "first_name": "Kobe",
                    "last_name": "Maristela",
                    "username": "kobemaristela",
                    "email": "kobe@maristela.com",
                    "password": "Password!@#$"
                },
                status.HTTP_400_BAD_REQUEST,
            ),
            (
                {
                    "first_name": "Kobe",
                    "last_name": "Maristela",
                    "username": "kobemaristela",
                    "email": "kobe@maristela.com",
                    "password": "Pass1$"
                },
                status.HTTP_400_BAD_REQUEST,
            ),
        ],
    )
    def test_password_not_meet_requirements_fail(self, request_data, expected_status_code):
        """
        Password Requirements

        1. Must contain at least one lowercase letter
        2. Must contain at least one uppercase letter
        3. Must contain at least one symbol
        4. Must contain at least one number
        5. Must be more than 8 characters long
        """
        request = self.client.post(
            reverse("register"), request_data
        )

        self.assertEqual(request.status_code, expected_status_code)

class TestUserLogin(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            first_name="Kobe",
            last_name="Maristela",
            username="kobemaristela",
            email="kobe@maristela.com",
            password="Password123$"
        )

    def test_user_login_success(self):
        response = self.client.post(
            reverse("login"),
            {
                "username": "kobemaristela",
                "password": "Password123$"
            },
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsNotNone(response.data["token"])
        self.assertNotEqual(response.data["token"], '')


    def test_user_login_fail(self):
        response = self.client.post(
            reverse("login"),
            {
                "username": "kobemaristela",
                "password": "WrongPassword123$"
            },
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class TestUserLogout(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            first_name="Kobe",
            last_name="Maristela",
            username="kobemaristela",
            email="kobe@maristela.com",
            password="Password123$"
        )

    def test_user_logout_success(self):
        #  Login User
        response = self.client.post(
            reverse("login"),
            {
                "username": "kobemaristela",
                "password": "Password123$",
            },
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check Active Token
        active_token = response.data["token"]
        self.assertIsNotNone(active_token)
        self.assertNotEqual(active_token, '')


        # Logout User
        response = self.client.get(reverse("logout"))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # Check Token Deleted
        deleted_token = self.client.session.get('auth_token')
        self.assertIsNone(deleted_token)