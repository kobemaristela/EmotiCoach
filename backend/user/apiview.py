from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

class SetWeight(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        weight = request.POST["weight"]
        datetime = request.POST["datetime"]

        print(weight)
        print(datetime)

        return JsonResponse({"test":"test"})