from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers

from .models import Session, Activity, MuscleGroup, Set
from .controller import parseActivity, getMuscleGroups
import json

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
        sessionInfo["id"] = session.id
        sessionInfo["name"] = session.name
        sessionInfo["datetime"] = session.datetime
        sessionInfo["duration"] = session.duration

        activity = Activity.objects.filter(session_id = id).values_list("id", "name")
        sessionInfo["activities"] = list(map(parseActivity, activity))

        return JsonResponse(sessionInfo)
    
class SetSessionData(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split()[1]

        sessionObject = request.POST["session"]
        sessionObject = json.loads(sessionObject)
        sessionName = sessionObject["name"]
        sessionDuration = sessionObject["duration"]
        sessionDatetime = sessionObject["datetime"]
        userId = Token.objects.get(key=token).user_id

        session = Session.objects.create(name=sessionName,
                                         duration=sessionDuration, 
                                         datetime=sessionDatetime,
                                         auth_user_id=userId)
        
        activitiesObject = sessionObject["activities"]

        for activities in activitiesObject:
            activityName = activities["name"]
            sessionId = session.id

            activity = Activity.objects.create(name=activityName, 
                                               session_id=sessionId)

            muscleGroup = activities["muscleGroups"]
            setsObject = activities["sets"]

            muscle = MuscleGroup.objects.create(activity_id=activity.id)
            if muscleGroup:
                for muscles in muscleGroup:
                    if muscles == "chest":
                        muscle.update(chest=True)
                    if muscles == "tricep":
                        muscle.update(tricep=True)
                    if muscles == "bicep":
                        muscle.update(bicep=True)
                    if muscles == "shoulder":
                        muscle.update(shoulder=True)
                    if muscles == "upper_back":
                        muscle.update(upper_back=True)
                    if muscles == "lower_back":
                        muscle.update(lower_back=True)
                    if muscles == "quadricep":
                        muscle.update(quadricep=True)
                    if muscles == "glute":
                        muscle.update(glute=True)
                    if muscles == "calve":
                        muscle.update(calve=True)
                    if muscles == "abdominal":
                        muscle.update(abdominal=True)
                    if muscles == "hamstring":
                        muscle.update(hamstring=True)
                

            for sets in setsObject:
                activitySetNum = sets["set_num"]
                activityWeight = sets["weight"]
                activityReps = sets["reps"]
                activityRpe = sets["rpe"]
                activityId = activity.id

                set = Set.objects.create(set_num=activitySetNum,
                                         weight=activityWeight,
                                         reps=activityReps,
                                         rpe=activityRpe,
                                         activity_id=activityId)




        return JsonResponse({"status":"0"})


class GetAllSessions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split()[1]
        userId = Token.objects.get(key=token).user_id

        sessions = Session.objects.filter(auth_user_id=userId)
        response = list()

        for session in sessions:
            sessionDict = {"id": session.id,
                           "name": session.name,
                           "duration": session.duration,
                           "datetime": session.datetime,
                           "muscleGroups": getMuscleGroups(session)}
            response.append(sessionDict)

        return JsonResponse(response, safe=False)