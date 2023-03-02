from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from .mqtt import ppg_infrared, ppg_green, ppg_red
from django.http import JsonResponse

# Create your views here.

class getHeartrateData(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        
        return JsonResponse({"test":"Hello"})