#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Starting up postgres database..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "Postgres database is running"
fi

# Flushes all entries and ensure db healthy - disable on prod
# python manage.py flush --no-input

# Always migrate database for changes
# python manage.py migrate

exec "$@"
