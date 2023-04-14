#!/bin/bash

# Go to server directory
# SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
# cd ../..

# Update changes from main
git pull

# Install new Python dependencies
pip3 install -r requirements.txt

# Run Django database migrations
python3 manage.py makemigrations
python3 manage.py migrate

# Restart service
systemctl restart emotidev.service  # Development Service
