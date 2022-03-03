from rest_framework import serializers
# password_validation provides the method to check the password meets the minimum requirements
from django.contrib.auth import get_user_model, password_validation
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password

User = get_user_model()

# Serializers


class UserSerializer(serializers.ModelSerializer):
    # never converted into JSON and returned in response
    # so allows us to write to the db when posting, but won't return when being converted back
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    # validate method - will execute on is_valid()
    # check our passwords match
    # hash our passwords
    # reattach the passwords to the request data
    # data arg represents the data that is passed on the data key by the user
    def validate(self, data):
        print('DATA ---->', data)

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        # checking the passwords match
        if password != password_confirmation:
            raise ValidationError({ 'password_confirmation': 'Does not match password' })


        # Validate the password
        try:
            password_validation.validate_password(password)
        except ValidationError as error:
            print(error)
            raise ValidationError({ 'password': error })

    # Hash password to put back on data
        data['password'] = make_password(password)
        print('HASHED PASSWORD --->', data['password'])
        return data

    # Define meta and fields to be serialized
    class Meta:
        model = User
        fields = ("id", "email", "profile_name", "profile_image", "bio", "password", "password_confirmation")