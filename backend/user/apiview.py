from django.http import JsonResponse
from user.models import Weight, UserProfile, Water
from datetime import timedelta
from django.utils.timezone import now

from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

class SetWeight(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        weight = request.POST["weight"]
        dt = request.POST["datetime"]
        user_id = request.user.id

        weightObject = Weight.objects.create(datetime=dt,
                              weight=weight,
                              auth_user_id=user_id)
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

        weights = Weight.objects.filter(auth_user_id=request.user.id).values("id", "datetime", "weight")
        user = UserProfile.objects.get(auth_user_id=request.user.id)

        if range == 7:
            dateRangeStr = (currentDate-timedelta(7)).strftime("%b %d") + " - " + currentDate.strftime("%b %d")
            weights = weights.filter(datetime__date__gte=currentDate-timedelta(7))
            weights = weights.filter(datetime__date__lte=currentDate)
        elif range == 28:
            dateRangeStr = (currentDate-timedelta(28)).strftime("%b %d") + " - " + currentDate.strftime("%b %d")
            weights = weights.filter(datetime__date__gte=currentDate-timedelta(28))
            weights = weights.filter(datetime__date__lte=currentDate)
        elif range == 365:
            dateRangeStr = (currentDate-timedelta(365)).strftime("%b %d") + " - " + currentDate.strftime("%b %d")
            weights = weights.filter(datetime__date__gte=currentDate-timedelta(365))
            weights = weights.filter(datetime__date__lte=currentDate)

        weights = weights.order_by("datetime")
        response = list()

        change = None
        for weight in weights:
            row = dict()

            row["date"] = weight["datetime"].strftime("%b %d")
            row["time"] = weight["datetime"].strftime("%I:%M %p")
            row["weight"] = weight["weight"]
            if change == None:
                row["change"] = 0
                change = weight["weight"]
            else:
                row["change"] = weight["weight"] - change
                change = weight["weight"]
            row["bmi"] = round(703 *  int(weight["weight"]) / (user.height ** 2), 2)

            response.insert(0, row)

        return JsonResponse({"tableData":response, "daterange": dateRangeStr})
                
class SetWater(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        water = request.POST["water"]
        dt = request.POST["datetime"]
        user_id = request.user.id

        waterObject = Water.objects.create(datetime=dt,
                              water=water,
                              auth_user_id=user_id)
        return JsonResponse({"id":waterObject.id})
    
class GetWaterTable(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        range = int(request.POST["range"])
        interval = int(request.POST["interval"])
        interval = interval * range

        currentDatetime = now() - timedelta(days=interval)
        currentDate = currentDatetime.date()

        waters = Water.objects.filter(auth_user_id=request.user.id).values("id", "datetime", "water").order_by("datetime")
        user = UserProfile.objects.get(auth_user_id=request.user.id)

        if range == 1:
            dateRangeStr = (currentDate-timedelta(1)).strftime("%b %d") + " - " + currentDate.strftime("%b %d")
            waters = waters.filter(datetime__date__gte=currentDate-timedelta(1))
            waters = waters.filter(datetime__date__lte=currentDate)
        elif range == 7:
            dateRangeStr = (currentDate-timedelta(7)).strftime("%b %d") + " - " + currentDate.strftime("%b %d")
            waters = waters.filter(datetime__date__gte=currentDate-timedelta(7))
            waters = waters.filter(datetime__date__lte=currentDate)
        elif range == 28:
            dateRangeStr = (currentDate-timedelta(28)).strftime("%b %d") + " - " + currentDate.strftime("%b %d")
            waters = waters.filter(datetime__date__gte=currentDate-timedelta(28))
            waters = waters.filter(datetime__date__lte=currentDate)

        response = list()
        for water in waters:
            row = dict()

            row["date"] = water["datetime"].strftime("%b %d")
            row["time"] = water["datetime"].strftime("%I:%M %p")
            row["water"] = water["water"]

            response.insert(0, row)

        return JsonResponse({"tableData":response, "daterange": dateRangeStr})