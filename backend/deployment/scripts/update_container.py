import os
import sys
import subprocess
import hmac
import hashlib
from flask import Flask, request, abort
from dotenv import load_dotenv

# Setup Paths
docker_dev_path = sys.argv[1]

# Set the webhook secret
webhook_secret = os.getenv('WEBHOOK_SECRET')

# Create Flask app
app = Flask(__name__)


@app.route('', methods=['POST'])
def update_container():
    # Get the payload from the request body
    payload = request.get_data()

    # Verify GitHub signature
    signature = request.headers.get('X-Hub-Signature-256')
    if signature is None:
        abort(400)

    sha256 = hmac.new(webhook_secret.encode('utf-8'), payload, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(signature.split('=')[1], sha256):
        abort(400)

    # Check event from main
    if request.headers.get('X-GitHub-Event') == 'push' and \
            request.json['ref'] == 'refs/heads/main':

        # Rebuild containers
        subprocess.run(['docker-compose', '-f', docker_dev_path, 'stop'],
                       check=True)
        subprocess.run(['docker-compose', '-f', docker_dev_path, 'up',
                       '--build', '-d'], check=True)

        return 'OK'

    return 'Ignored'


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=1618)
