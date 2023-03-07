from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers

from .models import Session, Activity, MuscleGroup, Set
from .controller import *
from datetime import datetime
from django.utils.timezone import make_aware
import json

from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ParseError

# Create your views here.

class GetSession(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split()[1]
        user_id = Token.objects.get(key=token).user_id
        id = request.POST["id"]

        if Session.objects.filter(id=id):
            session = Session.objects.get(id=id, auth_user_id=user_id)

            sessionInfo = dict()
            sessionInfo["id"] = session.id
            sessionInfo["name"] = session.name
            sessionInfo["datetime"] = session.datetime
            sessionInfo["duration"] = session.duration

            activity = Activity.objects.filter(session_id = id).values_list("id", "name")
            sessionInfo["activities"] = list(map(parseActivity, activity))

            return JsonResponse(sessionInfo)
        else:
            raise ParseError()
    
class SetSession(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split()[1]

        sessionObject = request.POST["session"]
        sessionObject = json.loads(sessionObject)
        sessionName = sessionObject["name"]
        sessionDuration = sessionObject["duration"]
        sessionDatetime = make_aware(datetime.strptime(sessionObject["datetime"], '%Y-%m-%dT%H:%M:%S%z'))
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
            muscle = MuscleGroup.objects.filter(id=muscle.id)
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
                activitySetNum = checkIfInt(sets["set_num"])
                activityWeight = checkIfInt(sets["weight"])
                activityReps = checkIfInt(sets["reps"])
                activityRpe = checkIfInt(sets["rpe"])
                activityId = activity.id

                set = Set.objects.create(set_num=activitySetNum,
                                         weight=activityWeight,
                                         reps=activityReps,
                                         rpe=activityRpe,
                                         activity_id=activityId)




        return JsonResponse({"id":session.id})

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
    
class EditSession(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        id = checkIfParameter(request, "id")
        name = checkIfParameter(request, "name")
        duration = checkIfParameter(request, "duration")
        dt = checkIfParameter(request, "datetime")

        if not id or not Session.objects.filter(id=id):
            raise ParseError()

        session = Session.objects.filter(id=id)
        if name:
            session.update(name=name)
        if duration:
            session.update(duration=duration)
        if dt:
            dt = make_aware(datetime.strptime(dt, '%Y-%m-%dT%H:%M:%S%z'))
            session.update(datetime=dt)

        return JsonResponse({"status": "success"})

class DeleteSession(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split()[1]
        user_id = Token.objects.get(key=token).user_id
        id = checkIfParameter(request, "id")

        if not id or not Session.objects.filter(id=id):
            raise ParseError()

        if Session.objects.filter(id=id):
            session = Session.objects.get(id=id, auth_user_id=user_id)
            activities = Activity.objects.filter(session_id=session.id)

            sets = Set.objects.filter(activity_id__in = activities.values("id")).delete()
            activities.delete()
            session.delete()

            return JsonResponse({"status": "success"})
        else:
            raise ParseError()

class SetActivity(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split()[1]
        sessionId = request.POST["session_id"]

        activityName = request.POST["name"]

        activity = Activity.objects.create(name=activityName, 
                                               session_id=sessionId)

        muscleGroup = request.POST["muscleGroups"]
        setsObject = request.POST["sets"]

        muscle = MuscleGroup.objects.create(activity_id=activity.id)
        muscle = MuscleGroup.objects.filter(id=muscle.id)
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
                activitySetNum = checkIfInt(sets["set_num"])
                activityWeight = checkIfInt(sets["weight"])
                activityReps = checkIfInt(sets["reps"])
                activityRpe = checkIfInt(sets["rpe"])
                activityId = activity.id

                set = Set.objects.create(set_num=activitySetNum,
                                         weight=activityWeight,
                                         reps=activityReps,
                                         rpe=activityRpe,
                                         activity_id=activityId)

class EditActivity(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        id = checkIfParameter(request, "id")
        name = checkIfParameter(request, "name")

        activity = Activity.objects.filter(id=id)

        if name:
            activity.update(name=name)

        return JsonResponse({"status": "success"})

class DeleteActivity(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        id = request.POST["id"]

        if Activity.objects.filter(id=id):
            activities = Activity.objects.filter(session_id=id)
            sets = Set.objects.filter(activity_id__in = activities.values("id")).delete()
            activities.delete()

            return JsonResponse({"status": "success"})
        else:
            raise ParseError()

class SetSet(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        activityId = request.POST["activity_id"]

        sets = request.POST

        setNum = checkIfInt(sets["set_num"])
        weight = checkIfInt(sets["weight"])
        reps = checkIfInt(sets["reps"])
        rpe = checkIfInt(sets["rpe"])

        set = Set.objects.create(set_num=setNum,
                                    weight=weight,
                                    reps=reps,
                                    rpe=rpe,
                                    activity_id=activityId)

class EditSet(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        id = checkIfParameter(request, "id")
        weight = checkIfParameter(request, "weight")
        reps = checkIfParameter(request, "reps")
        rpe = checkIfParameter(request, "rpe")

        set = Set.objects.filter(id=id)

        if weight:
            set.update(weight=weight)
        if reps:
            set.update(reps=reps)
        if rpe:
            set.update(rpe=rpe)

class DeleteSet(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        id = request.POST["id"]

        if Set.objects.filter(id=id):
            Set.objects.filter(id=id).delete()
            return JsonResponse({"status": "success"})
        else:
            raise ParseError()

