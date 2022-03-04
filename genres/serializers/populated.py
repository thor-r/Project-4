from .common import GenreSerializer
from games.serializers.common import GameSerializer

# Serializers
class PopulatedGenreSerializer(GenreSerializer):
    games = GameSerializer(many=True)