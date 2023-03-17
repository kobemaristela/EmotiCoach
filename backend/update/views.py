import subprocess
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class Update(APIView):
    def post(self, request):
        payload = json.loads(request.body)
        if payload.get('ref') != 'refs/heads/main':
            return Response('Invalid request', status=status.HTTP_400_BAD_REQUEST)
            
        subprocess.Popen(['.update/scripts/update_server.sh'])  # Spawn child process of update_server.sh
