from django.shortcuts import render
from django.contrib.auth.models import User
from buddy.models import Friend, Message
from user.models import UserProfile, Icon
from django.http import JsonResponse
from django.utils.timezone import now
from datetime import timedelta

from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

class AddFriend(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split()[1]
        user_id = Token.objects.get(key=token).user_id
        username = request.POST["username"]

        try:
            friend_id = User.objects.get(username__iexact=username).id
            Friend.objects.create(auth_user_id=user_id, friend_id=friend_id)

            return JsonResponse({"response": "success"})
        except:
            return JsonResponse({"response": "No matches or already friends."})

class GetAllFriends(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split()[1]
        user_id = Token.objects.get(key=token).user_id

        users_friends = list(Friend.objects.filter(auth_user_id=user_id).values("friend_id"))
        friends_users = list(Friend.objects.filter(friend_id=user_id).values("auth_user_id"))

        users_friends = [friend["friend_id"] for friend in users_friends]
        friends_users = [friend["auth_user_id"] for friend in friends_users]
        friends = users_friends + friends_users

        if not friends:
            return JsonResponse({"friends": []})

        friends = User.objects.filter(id__in = friends).values("id", "username")
        response = list()
        for friend in friends:
            icon = UserProfile.objects.get(auth_user_id=friend["id"])
            icon = list(Icon.objects.filter(id=icon.profile_picture_id).values("image"))
            icon = icon[0]["image"]
            response.append({"icon": icon, "username":friend["username"], "id":friend["id"]})

        return JsonResponse({"friends": response})
    
class SetMessage(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split()[1]
        user_id = Token.objects.get(key=token).user_id
        message = request.POST["message"]
        topic = request.POST["topic"]

        Message.objects.create(auth_user_id=user_id, message=message, topic=topic)

        return JsonResponse({"response":"success"})

class GetMessagesForDay(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split()[1]
        user_id = Token.objects.get(key=token).user_id
        datetimeBeg = now() - timedelta(days=1)
        topic = request.POST["topic"]

        messages = Message.objects.filter(topic=topic).values("timestamp", "message", "auth_user_id")
        messages = messages.filter(timestamp__gte=datetimeBeg)

        response = list()
        for message in messages:
            data = dict()

            username = User.objects.get(id=message["auth_user_id"]).username
            print(username)

            data["timestamp"] = message["timestamp"].isoformat()
            data["message"] = message["message"]
            data["username"] = username

            if (message["auth_user_id"] == user_id):
                data["isuser"] = 1
            else:
                data["isuser"] = 0
            response.append(data)

        return JsonResponse({"messages":response})
