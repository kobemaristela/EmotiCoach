# Generated by Django 4.1.3 on 2023-02-25 07:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workout', '0006_alter_musclegroup_abdominal_alter_musclegroup_bicep_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='musclegroup',
            name='abdominal',
            field=models.BooleanField(blank=True, default='false'),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='bicep',
            field=models.BooleanField(blank=True, default='false'),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='calve',
            field=models.BooleanField(blank=True, default='false'),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='chest',
            field=models.BooleanField(blank=True, default='false'),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='glute',
            field=models.BooleanField(blank=True, default='false'),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='hamstring',
            field=models.BooleanField(blank=True, default='false'),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='lower_back',
            field=models.BooleanField(blank=True, default='false'),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='quadricep',
            field=models.BooleanField(blank=True, default='false'),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='shoulder',
            field=models.BooleanField(blank=True, default='false'),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='tricep',
            field=models.BooleanField(blank=True, default='false'),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='upper_back',
            field=models.BooleanField(blank=True, default='false'),
        ),
    ]