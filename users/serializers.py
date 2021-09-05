from rest_framework import serializers
from users.models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):

	user_name = serializers.CharField(required=True)
	email = serializers.EmailField(required=True)
	password = serializers.CharField(min_length=8, write_only=True)

	class Meta:
		model = CustomUser
		# fields = ('user_name', 'email', 'password')
		fields = ['id', 'first_name', 'last_name', 'email', 'user_name', 'avatar', 'password']
		# is password safe ?
		extra_kwargs = {'password': {'write_only': True}}

	def create(self, validated_data):
		password = validated_data.pop('password', None)
		instance = self.Meta.model(**validated_data)
		if password is not None:
			instance.set_password(password)
		instance.save()
		return instance

