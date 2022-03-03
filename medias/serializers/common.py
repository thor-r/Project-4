from rest_framework import serializers # so we can extend django's model serializer
from ..models import Media

# Serializers
class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media # specify the model the serializer needs to use
        fields = '__all__'