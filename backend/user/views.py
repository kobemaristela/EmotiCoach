import re
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.contrib.auth import authenticate
from .controller import *

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ParseError, ValidationError


class Login(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'username': user.username,
            'user_id': user.pk,
            'token': token.key,
        })

class Register(APIView):
    def post(self, request):
        first_name = request.POST.get("first_name")
        last_name = str(request.POST.get("last_name"))
        username = str(request.POST.get("username"))
        email = str(request.POST.get("email"))
        password = str(request.POST.get("password"))

        # No Blank Fields
        if (first_name == "" or last_name == "" or username == "" or
            email == "" or password == ""):
            raise ParseError()

        # First and Last Name - must be alpha
        if not first_name.isalpha() or not last_name.isalpha():
            raise ParseError()

        # Username must be alphanum
        if not username.isalnum():
            raise ParseError()

        # Email must match email format - test@example.com
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, email):
            raise ParseError()

        # Password Requirements - one lower, upper, number, symbol | more than  8 characters
        password_regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
        if not re.match(password_regex, password):
            raise ParseError()

        if User.objects.filter(username=username).exists():
            raise ValidationError(f"Username ({username}) already exists...")

        User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            password=password
        )

        return JsonResponse({"response": "success"})

class Logout(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        request.user.auth_token.delete()
        return JsonResponse({"response": "success"})
    
class EditAccount(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        first_name = checkIfParameter(request, "first_name")
        last_name = checkIfParameter(request, "last_name")
        email = checkIfParameter(request, "email")
        password = checkIfParameter(request, "password")

        if first_name:
            request.user.first_name = first_name
            request.user.save()
        if last_name:
            request.user.last_name = last_name
            request.user.save()
        if email:
            request.user.email = email
            request.user.email
        if password:
            # user = authenticate(username=request.user.username, password=password)
            # if user:
            #     user.set_password(newpassword)
            #     user.save()
            request.user.set_password(password)
            request.user.save()

        return JsonResponse({"response": "success"})
    
class DeleteAccount(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        request.user.delete()
        return JsonResponse({"response": "success"})
    
class AuthenticateUser(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return JsonResponse({"Status":"Authenticated"})
        else:
            return JsonResponse({"Status":"Not Authenticated"})

def show_database(request):
    if request.method == "GET":
        user_model = get_user_model()
        users = user_model.objects.values()

        tokens = Token.objects.values()

        return JsonResponse({
            'users': list(users),
            'tokens': list(tokens),
        })
