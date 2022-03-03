from pickle import TRUE
from django.db import models

# Create your models here.
class Media(models.Model):
    # all fields are blank=False by default - unless we set blank=True we need to set default=None so that we don't get errors when updating later
    title = models.CharField(max_length=100, default=None)
    description = models.CharField(max_length=200, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    file_to_upload = models.CharField(max_length=500)
    video = models.BooleanField(default=False, blank=True)
    screenshot = models.BooleanField(default=False, blank=True)
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="medias",
        on_delete=models.CASCADE
    )


    def __str__(self):
        return f"{self.owner} {self.title} {self.created_at} {self.description}"
    