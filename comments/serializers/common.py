from rest_framework import serializers
from ..models import Comment

# Serializers

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment # specify the model the serializer needs to use
        fields = '__all__' # specify the fields it should return 
        