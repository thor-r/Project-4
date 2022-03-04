from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status

# Serializers
from genres.serializers.populated import PopulatedGenreSerializer
from genres.serializers.common import GenreSerializer

# Models
from .models import Genre

# Create your views here.
class GenreListView(APIView):

    def get(self, _request):
        genres = Genre.objects.all()
        serialized_genres = PopulatedGenreSerializer(genres, many=True)
        return Response(serialized_genres.data, status=status.HTTP_200_OK)

class GenreDetailView(APIView):
    def get_genre(self, pk):
        try:
            return Genre.objects.get(pk=pk)
        except Genre.DoesNotExist:
            raise NotFound(detail="genre not Found")
    
    def get(self, _request, pk):
        genre = self.get_genre(pk)
        serialzed_genre = PopulatedGenreSerializer(genre)
        return Response(serialzed_genre.data, status=status.HTTP_200_OK)
