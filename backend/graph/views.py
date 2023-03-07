from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.utils.timezone import make_aware

from .mqtt import ppg_infrared, ppg_green, ppg_red
from django.http import JsonResponse
from datetime import datetime, timedelta
from workout.models import Session, Activity, Set

# Create your views here.

class getHeartrateData(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        
        return JsonResponse({"test":"Hello"})
    
class GetVolumeData(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.META['HTTP_AUTHORIZATION'].split()[1]
        userId = Token.objects.get(key=token).user_id

        start_date = request.POST["start_date"]
        start_date = make_aware(datetime.strptime(start_date, "%Y-%m-%d"))

        length = int(request.POST["length"])
        end_date = start_date + timedelta(days=length)

        activity = request.POST["activity"]
 
        sessions = Session.objects.filter(datetime__gte = start_date, auth_user_id=userId)
        sessions = sessions.filter(datetime__lte = end_date).values("id", "datetime").order_by("datetime")

        graph_data = dict()
        for session in sessions:
            activities = Activity.objects.filter(session_id=session["id"], name=activity).values("id")
            sets = Set.objects.filter(activity_id__in=activities).values("weight", "reps")
            volume = 0
            for set in sets:
                volume += set["weight"] * set["reps"]
            date_key = session["datetime"].strftime("%m/%d")
            graph_data[date_key] = volume

        
        return JsonResponse({"X":list(graph_data.keys()),
                             "y":list(graph_data.values())})

