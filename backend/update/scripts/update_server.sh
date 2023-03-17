#!/bin/bash

# Go to EmotiCoach directory
cd ~/EmotiCoach/backend

# Update changes from main
git pull

# Install new Python dependencies
pip3 install -r requirements.txt

# Run Django database migrations
python3 manage.py makemigrations
python3 manage.py migrate

# Restart EmotiDev
systemctl restart emotidev.service
