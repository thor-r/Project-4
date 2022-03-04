from django.db import models

# Create your models here.
class Comment(models.Model):
    text = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    media = models.ForeignKey(
        "medias.Media",
        related_name= "comments", # this field specifies the field the the comments will show as when querying the foreign table (in this case the medias)
        on_delete= models.CASCADE
    )
    # adding an owner field that relates to a record in the User model
    # if we add this field when records already exist, we will get a prompt asking us to set a default value for the field.
    # Alternatively, we can set a default= value on the field, which would do the same thing.
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name='comments',
        on_delete= models.CASCADE
    )

    def __str__(self):
        return f"{self.text} {self.created_at}"