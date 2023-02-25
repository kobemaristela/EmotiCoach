from django.shortcuts import render
from django.http import JsonResponse
from .models import Session, Activity
from .controller import parseActivity

from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

# Create your views here.

class SessionData(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split()[1]
        user_id = Token.objects.get(key=token).user_id
        id = request.POST["id"]

        session = Session.objects.get(id=id, auth_user_id=user_id)

        sessionInfo = dict()
        sessionInfo["session_name"] = session.name
        sessionInfo["session_datetime"] = session.datetime
        sessionInfo["session_duration"] = session.duration

        activity = Activity.objects.filter(session_id = id).values_list("id", "name")
        sessionInfo["activity"] = list(map(parseActivity, activity))

        return JsonResponse(sessionInfo)
    
    