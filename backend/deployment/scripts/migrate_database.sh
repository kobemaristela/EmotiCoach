#!/bin/sh

# Verifies database is running
echo "Starting up PostgreSQL database..."
while ! nc -z $SQL_HOST $SQL_PORT; do
  sleep 1
done
echo "PostgreSQL database is running"

# Flushes all entries and ensure db healthy - disable on prod
# python manage.py flush --no-input

# Update Repo
git pull

# Always migrate database for changes
python manage.py makemigrations
python manage.py migrate

exec "$@"
