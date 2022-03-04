from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Exceptions
from rest_framework.exceptions import NotFound, PermissionDenied # hybrid response/exception that sends a 404 response to the user
from django.db import IntegrityError

# Serializers
from .serializers.common import GameSerializer # generic review serializer
from .serializers.populated import PopulatedGameSerializer

# Models
from .models import Game # import Review model

# Create your views here.
class GameListView(APIView):
    def get(self, request):
        games = Game.objects.all()
        serialized_games = PopulatedGameSerializer(games, many=True)
        return Response(serialized_games.data, status=status.HTTP_200_OK)

class GameDetailView(APIView):
    def get_game(self, pk):
        try:
            return Game.objects.get(pk=pk)
        except Game.DoesNotExist:
            raise NotFound(detail="Game not Found")
    
    def get(self, _request, pk):
        game = self.get_game(pk)
        serialzed_game = PopulatedGameSerializer(game)
        return Response(serialzed_game.data, status=status.HTTP_200_OK)
        
