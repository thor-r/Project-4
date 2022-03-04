from comments.serializers.populated import PopulatedCommentSerializer
from .common import MediaSerializer
from jwt_auth.serializers.common import UserSerializer
from comments.serializers.populated import PopulatedCommentSerializer
from games.serializers.common import GameSerializer

class PopulatedMediaSerializer(MediaSerializer):
    owner = UserSerializer()
    comments = PopulatedCommentSerializer(many=True)
    games = GameSerializer()