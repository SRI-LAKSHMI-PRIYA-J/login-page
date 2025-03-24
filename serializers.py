from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')  # Remove password from dict
        user = User(**validated_data)  # Create user instance
        user.set_password(password)  # Hash password properly
        user.save()
        return user
