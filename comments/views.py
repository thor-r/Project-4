from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 

# Exceptions 
from rest_framework.exceptions import NotFound, PermissionDenied # hybrid response/exception that sends a 404 response to the user
from django.db import IntegrityError
from django.core.exceptions import ImproperlyConfigured


# Permissions Classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Serializers
from .serializers.common import CommentSerializer
from .serializers.populated import PopulatedCommentSerializer

# Models
from .models import Comment

# Create your views here.
class CommentListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, request):
        request.data["owner"] = request.user.id
        print(request.data)
        
        serialized_comment = PopulatedCommentSerializer(data=request.data)
        try:
            serialized_comment.is_valid()
            serialized_comment.save()
            print(serialized_comment.data)
            return Response(serialized_comment.data, status=status.HTTP_201_CREATED)
        except AssertionError as e:
            print(str(e))
            return Response({
                "detail": str(e) # e is a type: AssertionError, we need to convert this into a string, as AssertionError can't be converted into JSON
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response({
                "detail": "Unprocessable Entity"
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

# Add a single comment
    def post(self, request):
        request.data["owner"] = request.user.id
        print(request.data)
        serialized_comment = CommentSerializer(data=request.data)
        try:
            serialized_comment.is_valid()
            serialized_comment.save()
            print(serialized_comment.data)
            return Response(serialized_comment.data, status=status.HTTP_201_CREATED)
        except AssertionError as e:
            print(str(e))
            return Response({
                "detail": str(e) # e is a type: AssertionError, we need to convert this into a string, as AssertionError can't be converted into JSON
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response({
                "detail": "Unprocessable Entity"
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)



    
# Detailed / Single view
class CommentDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_comment(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise NotFound(detail="Comment not found")

    def get(self, _request, pk):
        comment = self.get_comment(pk)
        serialized_comment = PopulatedCommentSerializer(comment)
        return Response(serialized_comment.data, status=status.HTTP_200_OK)


    def put(self, request, pk):
        comment_to_edit = self.get_comment(pk=pk)
        print('TRYING TO EDIT ------>', comment_to_edit)
        serialized_comment = PopulatedCommentSerializer(comment_to_edit, data=request.data, partial=True)
        print('COMMENT ------->', serialized_comment)
        try: 
            serialized_comment.is_valid()
            serialized_comment.save()
            return Response(serialized_comment.data, status=status.HTTP_202_ACCEPTED)
        except ImproperlyConfigured as e:
            print('ERROR --->', e)
            raise PermissionDenied(detail="Unathorised to edit comment")
        except AssertionError as e:
            print('ERROR ---->', e)
            raise PermissionDenied(detail="Unathorised to edit comment")


    def delete(self, request, pk):
        print('USER --->', request.user.id)
        try:
            # Get the comment
            comment_to_delete = Comment.objects.get(pk=pk)

            # make sure the user matches the owner on the comment instance
            if comment_to_delete.owner != request.user:
                # if owner doesn't match, throw an error
                raise PermissionDenied(detail="Unauthorised")
            # if owner matches, delete comment
            comment_to_delete.delete()

            # send a response the user
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist:
            raise NotFound(detail="Comment not found")
        except:
            return Response({
                "detail": "Failed to delete Comment"
            }, status=status.HTTP_401_UNAUTHORIZED)
            