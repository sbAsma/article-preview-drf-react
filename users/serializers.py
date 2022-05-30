from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
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

class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"new_password": {
                                                    "new_password": "New password fields didn't match"
                                              }})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
            
        return value

    def update(self, instance, validated_data):
        user = self.context['request'].user

        if user.pk != instance.pk:
            raise serializers.ValidationError({"authorize": "You dont have permission for this user."})

        instance.set_password(validated_data['password'])
        instance.save()

        return instance
