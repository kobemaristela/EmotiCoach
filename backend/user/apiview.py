from django.http import JsonResponse
from user.models import Weight, UserProfile
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

        weight = request.POST.get("weight")
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

        response = list()

        change = None
        for weight in reversed(weights):
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
                
