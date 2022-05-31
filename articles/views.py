from .models import Article
from .serializers import ArticleSerializer
from rest_framework  import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response


class ArticleList(generics.ListAPIView):
	queryset = Article.objects.all()
	serializer_class = ArticleSerializer

class ArticleDetail(generics.RetrieveAPIView):
	queryset = Article.objects.all()
	serializer_class = ArticleSerializer
	# define new function for get item by slug which would help in search

class CreateArticle(APIView):
	permission_classes = [permissions.IsAuthenticated]
	parser_classes = [MultiPartParser, FormParser]

	def post(self, request, format=None):
		# context={'request': request} helps generate hyperlinks
		# so that I would have the full link to the created image in the response
		serializer = ArticleSerializer(data=request.data, context={'request': request})
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_200_OK)
		else:
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminManageArticle(generics.RetrieveUpdateDestroyAPIView):
	permission_classes = [permissions.IsAuthenticated]
	queryset = Article.objects.all()
	serializer_class = ArticleSerializer

# class AdminArticleDetail(generics.RetrieveAPIView):
# 	permission_classes = [permissions.IsAuthenticated]
# 	queryset = Article.objects.all()
# 	serializer_class = ArticleSerializer

# class EditArticle(generics.UpdateAPIView):
# 	permission_classes = [permissions.IsAuthenticated]
# 	queryset = Article.objects.all()
# 	serializer_class = ArticleSerializer

# class DeleteArticle(generics.DestroyAPIView):
# 	permission_classes = [permissions.IsAuthenticated]
# 	queryset = Article.objects.all()
# 	serializer_class = ArticleSerializer