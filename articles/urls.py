from django.urls import path
from . import views

app_name = 'articles'

urlpatterns = [
	path('articles/', views.ArticleList.as_view() , name='articles-list'),
	path('articles/<int:pk>', views.ArticleDetail.as_view() , name='articles-detail'),
	path('articles/create/', views.CreateArticle.as_view(), name='create-article'),
	path('articles/article/<int:pk>/', views.ManageArticle.as_view(), name='manage-article'),
]