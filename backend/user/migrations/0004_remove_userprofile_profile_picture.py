# Generated by Django 4.1.7 on 2023-04-26 04:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_userprofile_profile_picture'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='profile_picture',
        ),
    ]