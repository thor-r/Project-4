from functools import partial
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status # status gives us a list of possible response codes
from rest_framework.exceptions import NotFound, PermissionDenied # This provides a default response for a not found
from django.db import IntegrityError

from medias.serializers.common import MediaSerializer
from medias.serializers.populated import PopulatedMediaSerializer # this imports a Django core exception: ValidationError

# Models 
from .models import Media # Importing the media model

# Permissions classes 
from rest_framework.permissions import IsAuthenticatedOrReadOnly # this class allows unauthenticated GET requests, but disallows all other routes (except for HEAD and OPTIONS)


# Create your views here.
# Create a list view for media 
# Create a detail view for media 
# Create a post media request (secure - needs an owner)
# Create a delete media request (secure)

class MediaListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )  # This specifies the permissions classes a view should use - tuple with trailing comma

    def get(self, _request):
        medias = Media.objects.all() # this makes request to db for all entries in the medias table
        print('MEDIAS----->', medias)
        serialized_medias = PopulatedMediaSerializer(medias, many=True)
        print('SERIALZED MEDIAS ---->', serialized_medias.data)
        return Response(serialized_medias.data, status=status.HTTP_200_OK)

    # Allow us to post a new record into the Media 
    def post(self, request):
        request.data["owner"] = request.user.id
        print('OWNER DATA ----->', request.data)

        serialized_media = MediaSerializer(data=request.data)
        try:
            serialized_media.is_valid()
            serialized_media.save()
            print(serialized_media.data)
            return Response(serialized_media.data, status=status.HTTP_201_CREATED)
        
        except AssertionError as error:
            print(str(error))
            return Response({
                "detail": str(error)
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except: 
            return Response({
                "detail": "Unprocessable Entity"
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class MediaDetailView(APIView):

    def get_media(self, pk):
        try: 
            # this next line looks at the primary key on the medias table and returns a record that matches the pk passed
            media_to_show = Media.objects.get(pk=pk)
            media_to_show.views = media_to_show.views + 1
            media_to_show.save()
            return media_to_show
        except Media.DoesNotExist:
            raise NotFound(detail="Media not found")

    def get(self, _request, pk):
        # request the database for a record that matches the pk passed in the url
        media = self.get_media(pk)

        # querying using a primary key is always going to return a single result.
        # this will never be a list, so no need to add many=True on the serializer
        serialized_media = PopulatedMediaSerializer(media)
        return Response(serialized_media.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        print('USER ----->', request.user.id)
        try:
            # Get the media
            media_to_delete = Media.objects.get(pk=pk)

            # Make sure the user matches the owner on the media instance
            if media_to_delete.owner != request.user:
                # If owner doesnt match throw error
                raise PermissionDenied(detail="Unathorised to delete")

            # if owner matches, delete review 
            media_to_delete.delete()

            # send a response to the user
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Media.DoesNotExist:
            raise NotFound(detail="Media not found")
        except:
            return Response({
                "detail": "Failed to delete Media"
            }, status=status.HTTP_401_UNAUTHORIZED)
        
    def put(self, request, pk):

        media_to_edit = Media.objects.get(pk=pk)
        serialized_media = MediaSerializer(media_to_edit, data=request.data)

        try: 
            if media_to_edit.owner == request.user and serialized_media.is_valid():
                serialized_media.save()
                return Response(serialized_media.data, status=status.HTTP_202_ACCEPTED)
        except:
            raise PermissionDenied(detail="Unathorised to edit")
                
                

            



    


    
