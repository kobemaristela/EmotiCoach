# Generated by Django 4.1.3 on 2023-02-20 22:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workout', '0003_remove_activity_sets'),
    ]

    operations = [
        migrations.AddField(
            model_name='musclegroup',
            name='hamstring',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
    ]
