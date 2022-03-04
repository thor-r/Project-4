from telnetlib import GA
from .common import GameSerializer
from medias.serializers.populated import PopulatedMediaSerializer
from genres.serializers.populated import PopulatedGenreSerializer

# Serializers
class PopulatedGameSerializer(GameSerializer):
    medias = PopulatedMediaSerializer(many=True)
    genres = PopulatedGenreSerializer(many=True)