from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CustomUserSerializer
from .models import CustomUser

class CustomUserCreate(APIView):
	permission_classes = [AllowAny]

	def post(self, request, format='json'):
		serializer = CustomUserSerializer(data=request.data)
		if serializer.is_valid():
			user = serializer.save()
			if user:
				json = serializer.data
				return Response(json, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomUserList(ListAPIView):
	serializer_class = CustomUserSerializer
	queryset = CustomUser.objects.all()

class CustomUserDetail(RetrieveAPIView):
	serializer_class = CustomUserSerializer

	def get_object(self, queryset=None, **kwargs):
		item = self.kwargs.get('pk')
		return get_object_or_404(CustomUser, user_name=item)

class BlacklistTokenUpdateView(APIView):
	permission_classes = [AllowAny]
	authentication_classes = ()

	def post(self, request):
		try:
			refresh_token = request.data["refresh_token"]
			token = RefreshToken(refresh_token)
			token.blacklist()
			return Response(status=status.HTTP_205_RESET_CONTENT)

		except Exception as e:
			return Response(status=status.HTTP_400_BAD_REQUEST)