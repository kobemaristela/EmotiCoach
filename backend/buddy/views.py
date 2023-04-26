from django.shortcuts import render
from django.contrib.auth.models import User
from buddy.models import Friend
from django.http import JsonResponse

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

        friends = list(User.objects.filter(id__in = friends).values("username"))
        friends = [friend["username"] for friend in friends]


        return JsonResponse({"friends": friends})