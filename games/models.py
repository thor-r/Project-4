from django.db import models

# Create your models here.
class Game(models.Model):
    name = models.CharField(max_length=50)
    image = models.CharField(max_length=500)
    genres = models.ManyToManyField(
        "genres.Genre",
        related_name="games"
    )


    def __str__(self):
        return f"{self.name}"