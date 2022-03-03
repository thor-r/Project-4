from .common import CommentSerializer
from jwt_auth.serializers.common import UserSerializer # used to populate the owner field

class PopulatedCommentSerializer(CommentSerializer):
    owner = UserSerializer()