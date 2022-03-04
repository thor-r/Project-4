from rest_framework import serializers
from ..models import Genre

# Serializers
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'