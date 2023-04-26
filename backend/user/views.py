import re
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth import logout
from .controller import *
from user.models import Weight, Icon
from datetime import datetime, timedelta
from django.utils.timezone import now

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
            return JsonResponse({"response": "Blank Field."})

        # First and Last Name - must be alpha
        if not first_name.isalpha() or not last_name.isalpha():
            return JsonResponse({"response": "Invalid name."})

        # Username must be alphanum
        if not username.isalnum():
            return JsonResponse({"response": "Invalid username."})

        # Email must match email format - test@example.com
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, email):
            return JsonResponse({"response": "Invalid Email."})

        # Password Requirements - one lower, upper, number, symbol | more than  8 characters
        password_regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
        if not re.match(password_regex, password):
            return JsonResponse({"response": "Password must contain numbers, upper and lower case, and a symbol."})

        if User.objects.filter(username=username).exists():
            return JsonResponse({"response": "Username already exists."})

        User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            password=password
        )

        return JsonResponse({"response": "success"})

class Logout(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return JsonResponse({"response": "success"})
    def get(self, request):
        request.user.auth_token.delete()
        return JsonResponse({"response": "success"})
    
class EditAccount(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
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
            request.user.save()
        if password:
            # user = authenticate(username=request.user.username, password=password)
            # if user:
            #     user.set_password(newpassword)
            #     user.save()
            request.user.set_password(password)
            request.user.save()

        return JsonResponse({"response": "success"})
    
class DeleteAccount(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        request.user.delete()
        return JsonResponse({"response": "success"})
    def post(self, request):
        request.user.delete()
        return JsonResponse({"response": "success"})
    
class AuthenticateUser(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return JsonResponse({"Status":"Authenticated"})
        else:
            return JsonResponse({"Status":"Not Authenticated"})
        
class SetWeight(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        dt = request.POST.get("datetime")
        weight = request.POST.get("weight")
        user_id = request.user.id

        weightObject = Weight.objects.create(datetime=dt,
                              weight=weight,
                              auth_user=user_id)
        return JsonResponse({"id":weightObject.id})
    
class GetWeightTable(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        range = int(request.POST["range"])
        interval = int(request.POST["interval"])
        interval = interval * range

        currentDatetime = now() - timedelta(days=interval)
        currentDate = currentDatetime.date()

        weights = Weight.objects.filter(auth_user_id=request.user.id).values("id", "datetime")

        if range == 7:
            dateRangeStr = currentDate.strftime("%b %d")
            weights = weights.filter(datetime__date=currentDate)
        elif range == 28:
            dateRangeStr = (currentDate-timedelta(7)).strftime("%b %d") + " - " + currentDate.strftime("%b %d")
            weights = weights.filter(datetime__date__gte=currentDate-timedelta(7))
            weights = weights.filter(datetime__date__lte=currentDate)
        elif range == 365:
            dateRangeStr = (currentDate-timedelta(28)).strftime("%b %d") + " - " + currentDate.strftime("%b %d")
            weights = weights.filter(datetime__date__gte=currentDate-timedelta(28))
            weights = weights.filter(datetime__date__lte=currentDate)

        response = list()

        change = 0
        for weight in weights:
            row = dict()

            row["date"] = weight["datetime"].strftime("%b %d")
            row["time"] = weight["datetime"].strftime("%I:%M %p")
            row["weight"] = weight["weight"]
            row["change"] = change

            if change == 0:
                change = 1
            # else:

class CreateIcon(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        image = request.POST["image"]

        Icon.objects.create(image=image)

        return JsonResponse({"response": "success"})



def show_database(request):
    if request.method == "GET":
        user_model = get_user_model()
        users = user_model.objects.values()

        tokens = Token.objects.values()

        return JsonResponse({
            'users': list(users),
            'tokens': list(tokens),
        })
