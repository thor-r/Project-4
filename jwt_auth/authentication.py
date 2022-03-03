from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model 
from django.conf import settings
import jwt

# User model
User = get_user_model()

# Custom Authentication class

# Every route we create that passes through a view we can add authentication to
# Django gives us multiple levels of permissions that do different things but they all will use this authentication that we're about to create
class JWTAuthentication(BasicAuthentication):
    # authenticate() allows us to override the BasicAuthentication default authentication and replace it with our own token based authentication.
    def authenticate(self, request):
        # Check that we have an Authorization header
        header = request.headers.get('Authorization')

        # If header doesn't contain information we want to throw an error
        if not header:
            return None
        
        # Checking the token begins with Bearer
        if not header.startswith('Bearer'):
            raise PermissionDenied(detail="Invalid Token Format")

        # remove Bearer from the beginning of the token
        token = header.replace('Bearer ', '')

        # Get payload - pass it through jwt.decode, with the secret, and also passing the algorithm
        # If token is valid - we'll using the sub from the payload to find an active user
        # If the user exists we'll pass it on to the view
        try:
            # Attempt to decode token
            # First argument is the token as a string
            # Second argument is the secret_key - we get this from our settings.py file - needs importing
            # Third argument is going to be the algorithm to use
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            
            # If jwt.decode is successful, it will return the payload on which we have the sub
            # the sub is uid that we can use to query the User model

            # find the user - takes payload.sub as arg
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidTokenError as error:
            print(error)
            raise PermissionDenied(detail="Invalid Token")
        except User.DoesNotExist as error:
            print(error)
            raise PermissionDenied(detail="User Does Not Exist")
        
        return (user, token) # authenticate() specifies we need to return a tuple of user and auth