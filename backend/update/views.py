import subprocess
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings


class Update(APIView):
    def post(self, request):
        # Disable for docker container
        if settings.DOCKER_CONTAINER or not settings.DEBUG:
            return Response('Auto Update Disabled: (Container Mode or Production Mode)', status=status.HTTP_200_OK)

        payload = json.loads(request.body)
        if payload.get('ref') != 'refs/heads/main':
            return Response('Main branch was not updated', status=status.HTTP_200_OK)
            
        subprocess.run(['./update/scripts/update_server.sh'])  # Spawn child process of update_server.sh
        return Response('Starting Update', status=status.HTTP_200_OK)