# Generated by Django 4.1.3 on 2023-02-25 07:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workout', '0007_alter_musclegroup_abdominal_alter_musclegroup_bicep_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='musclegroup',
            name='abdominal',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='bicep',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='calve',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='chest',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='glute',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='hamstring',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='lower_back',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='quadricep',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='shoulder',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='tricep',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='musclegroup',
            name='upper_back',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
