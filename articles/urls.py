from django.urls import path
from . import views

urlpatterns = [
	path('articles/', views.ArticleList.as_view() , name='articles-list'),
	path('articles/<int:pk>', views.ArticleDetail.as_view() , name='articles-detail'),
]