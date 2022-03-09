from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.db import IntegrityError
from .serializers.common import UserSerializer
from datetime import datetime, timedelta 
import jwt
from django.conf import settings

# User model
User = get_user_model()

# Create your views here.
class RegisterView(APIView):

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        try:
            user_to_create.is_valid()
            print('TRYING TO REGISTER --------->',user_to_create)
            user_to_create.save()
            return Response(user_to_create.data, status=status.HTTP_201_CREATED)
        except AssertionError as e:
            print('HERES THE ERROR -------->', str(e))
            return Response({
                "detail": str(e) # e is a type: AssertionError, we need to convert this into a string, as AssertionError can't be converted into JSON
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except IntegrityError as e:
            return Response({
                "detail": str(e) # e is a type: AssertionError, we need to convert this into a string, as AssertionError can't be converted into JSON
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            print('ERRORS ------>', user_to_create.errors)
            return Response({ "detail": user_to_create.errors })
          

          
          









          
            # return Response("Failed to create user, password must have numbers and symbols", status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    def post(self, request):
        print(request.data)
        try:
            user_to_login = User.objects.get(email=request.data.get('email'))
        except User.DoesNotExist:
            return PermissionDenied(detail="Unauthorised")
        
        # If we reach this code, the user was found - so we need to now validate the password
        if not user_to_login.check_password(request.data.get('password')):
            return PermissionDenied(detail="Unauthorised")

        # Then if the password is validated we can create the token and return it
        dt = datetime.now() + timedelta(days=7) # today + 7 days for the expiry
        print('DT ----->', int(dt.strftime('%s'))) # strftime with %s converts to a date string of seconds, which we then convert to an int

        # create the token
        # first arg is the payload - we'll add our id as a sub and the dt variable above as the expiry
        # second arg is the secret key (from settings.py)
        # third arg is the algorithm (string)
        token = jwt.encode({
            'sub': user_to_login.id,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY, 'HS256')
        print('TOKEN ----->', token)

        # print(user_to_login.id)
        return Response({
            'token': token,
            'message': f"Welcome back {user_to_login.profile_name}"
        }, status.HTTP_202_ACCEPTED)
