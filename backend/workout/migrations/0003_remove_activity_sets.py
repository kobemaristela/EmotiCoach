# Generated by Django 4.1.3 on 2023-02-20 22:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workout', '0002_session_auth_user_alter_session_datetime_musclegroup'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='activity',
            name='sets',
        ),
    ]