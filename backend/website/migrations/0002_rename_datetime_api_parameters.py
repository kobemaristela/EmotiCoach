# Generated by Django 4.1.7 on 2023-04-04 06:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='api',
            old_name='datetime',
            new_name='parameters',
        ),
    ]