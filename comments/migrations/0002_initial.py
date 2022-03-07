# Generated by Django 4.0.3 on 2022-03-07 10:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('comments', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('medias', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='media',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='medias.media'),
        ),
        migrations.AddField(
            model_name='comment',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL),
        ),
    ]
