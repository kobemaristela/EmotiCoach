from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.utils.timezone import make_aware
from django.utils import timezone
from django.db.models import Sum

from .mqtt import ppg_infrared, ppg_green, ppg_red
from django.http import JsonResponse
from datetime import datetime, timedelta
from workout.models import Session, Activity, Set, MuscleGroup
from workout.controller import filterMuscleGroups

# Create your views here.

class getHeartrateData(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        
        return JsonResponse({"test":"Hello"})
    
class GetVolumeData(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = request.META['HTTP_AUTHORIZATION'].split()[1]
            userId = Token.objects.get(key=token).user_id
        except:
            userId = request.user.id

        start_date = request.POST["start_date"]
        start_date = make_aware(datetime.strptime(start_date, "%Y-%m-%d"))

        length = int(request.POST["length"])
        end_date = start_date + timedelta(days=length)

        activity = request.POST["activity"]
 
        sessions = Session.objects.filter(datetime__gte = start_date, auth_user_id=userId)
        sessions = sessions.filter(datetime__lte = end_date).values("id", "datetime").order_by("datetime")

        volume_data = dict()
        for session in sessions:
            activities = Activity.objects.filter(session_id=session["id"], name=activity).values("id")
            sets = Set.objects.filter(activity_id__in=activities).values("weight", "reps")
            volume = 0
            for set in sets:
                volume += set["weight"] * set["reps"]
            date_key = session["datetime"].strftime("%b %d")

            if date_key in volume_data:
                volume_data[date_key] += volume
            else:
                volume_data[date_key] = volume
        
        return JsonResponse({"X":list(volume_data.keys()),
                             "y":list(volume_data.values())})

class GetMuscleGroupData(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split()[1]
        userId = Token.objects.get(key=token).user_id

        week_num = int(request.POST["week_num"])

        today = datetime.now()
        week0 = today - timedelta(days=today.weekday())
        week_begin = week0 - timedelta(days=week_num * 7)
        week_begin = make_aware(week_begin)
        week_end = week_begin + timedelta(days=6)

        sessions = Session.objects.filter(datetime__gte=week_begin, auth_user_id=userId)
        sessions = sessions.filter(datetime__lte=week_end).values("id", "datetime").order_by("datetime")

        muscleDict = dict()
        for session in sessions:
            activity_id = Activity.objects.filter(session_id=session["id"]).values("id")
            # muscleGroups = MuscleGroup.objects.filter(activity_id__in=activity_id)
            # reps = Set.objects.filter(activity_id__in=activity_id)
            muscleList = list()
            for activity in activity_id:
                muscleGroups = MuscleGroup.objects.get(activity_id=activity["id"])
                muscleGroups = filterMuscleGroups(muscleGroups)
                reps = Set.objects.filter(activity_id=activity["id"]).values("reps")
                
                for muscle in muscleGroups:
                    # print(reps.aggregate(Sum('reps'))['reps__sum'])
                    repsToAdd = reps.aggregate(Sum('reps'))['reps__sum']
                    if muscle in muscleDict:
                        if repsToAdd:
                            muscleDict[muscle] += repsToAdd
                    else:
                        muscleDict[muscle] = repsToAdd
                
        return JsonResponse({"X":list(muscleDict.keys()),
                             "y":list(muscleDict.values())})

class GetOneRMData(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = request.META['HTTP_AUTHORIZATION'].split()[1]
            userId = Token.objects.get(key=token).user_id
        except:
            userId = request.user.id

        start_date = request.POST["start_date"]
        start_date = make_aware(datetime.strptime(start_date, "%Y-%m-%d"))

        length = int(request.POST["length"])
        end_date = start_date + timedelta(days=length)

        activity = request.POST["activity"]
 
        sessions = Session.objects.filter(datetime__gte = start_date, auth_user_id=userId)
        sessions = sessions.filter(datetime__lte = end_date).values("id", "datetime").order_by("datetime")

        one_rm_data = dict()
        for session in sessions:
            activities = Activity.objects.filter(session_id=session["id"], name=activity).values("id")
            sets = Set.objects.filter(activity_id__in=activities).values("weight", "reps")
            current_one_rm = 0
            for set in sets:
                one_rm = set["weight"] / ((1.0278) - (0.0278 * set["reps"]))

                if one_rm > current_one_rm:
                    current_one_rm = one_rm

            date_key = session["datetime"].strftime("%b %d")

            one_rm_data[date_key] = current_one_rm

            if date_key in one_rm_data:
                if one_rm_data[date_key] < current_one_rm:
                    one_rm_data[date_key] = current_one_rm
            else:
                one_rm_data[date_key] = current_one_rm

        return JsonResponse({"X":list(one_rm_data.keys()),
                             "y":list(one_rm_data.values())})

class GetPieVolumeData(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = request.META['HTTP_AUTHORIZATION'].split()[1]
            userId = Token.objects.get(key=token).user_id
        except:
            userId = request.user.id

        start_date = request.POST["start_date"]
        start_date = make_aware(datetime.strptime(start_date, "%Y-%m-%d"))

        length = int(request.POST["length"])
        end_date = start_date + timedelta(days=length)

        sessions = Session.objects.filter(datetime__gte = start_date, auth_user_id=userId)
        sessions = sessions.filter(datetime__lte = end_date).values("id")
        activities = Activity.objects.filter(session_id__in=sessions).values("id", "name")

        volume_data = dict()
        for activity in activities:
            activity_id = activity["id"]
            activity_name = activity["name"]
            sets = Set.objects.filter(activity_id=activity_id).values("weight", "reps")

            if activity_name not in volume_data:
                volume_data[activity_name] = 0
            
            volume = 0
            for set in sets:
                volume += set["weight"] * set["reps"]
            volume_data[activity_name] += volume
        
        return JsonResponse({"values":list(volume_data.values()),
                             "labels":list(volume_data.keys())})
    
class GetActivityHeatmap(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = request.META['HTTP_AUTHORIZATION'].split()[1]
            userId = Token.objects.get(key=token).user_id
        except:
            userId = request.user.id

        activity = request.POST["activity"]
        end_date = timezone.now()
        start_date = datetime(year=end_date.year, month=1, day=1, tzinfo=timezone.utc)

        response = [
            [None for i in range(12)],
            [None for i in range(12)],
            [None for i in range(12)],
            [None for i in range(12)],
            [None for i in range(12)],
            [None for i in range(12)],
            [None for i in range(12)],
        ]

        sessions = Session.objects.filter(datetime__gte = start_date, auth_user_id=userId)
        sessions = sessions.filter(datetime__lte = end_date).values("id", "datetime").order_by("datetime")

        for session in sessions:
            activities = Activity.objects.filter(session_id=session["id"], name=activity).values("id")
            sets = Set.objects.filter(activity_id__in=activities).values("weight", "reps")
            volume = 0
            for set in sets:
                volume += set["weight"] * set["reps"]
            month_number = session["datetime"].month - 1
            week_day = session["datetime"].weekday()

            if not response[week_day][month_number]:
                response[week_day][month_number] = 0
            response[week_day][month_number] += volume

        return JsonResponse({"z":response})