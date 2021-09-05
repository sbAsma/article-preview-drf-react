from django.urls import path
from . import views

app_name = 'articles'

urlpatterns = [
	path('articles/', views.ArticleList.as_view() , name='articles-list'),
	path('articles/<int:pk>', views.ArticleDetail.as_view() , name='articles-detail'),
	path('admin/create/', views.CreateArticle.as_view(), name='create-article'),
	path('admin/article/<int:pk>/', views.AdminManageArticle.as_view(), name='manage-article'),
	# path('admin/edit/articledetail/<int:pk>/', view.AdminArticleDetail.as_view(), 
	# 	name='admin-detail-article'),
	# path('admin/edit/<int:pk>/', views.EditArticle.as_view(), name='edit-article'),
	# path('admin/delete/<int:pk>/', views.DeleteArticle.as_view(), name='delete-article'),
]