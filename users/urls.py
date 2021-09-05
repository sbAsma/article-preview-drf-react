from django.urls import path
from .views import (CustomUserCreate, CustomUserList, 
					CustomUserDetail, BlacklistTokenUpdateView)

app_name = 'users'

urlpatterns = [
	path('create/', CustomUserCreate.as_view(), name='create-user'),
	path('user/', CustomUserList.as_view(), name='user-list'),
	path('user/<str:pk>/', CustomUserDetail.as_view(), name='user-detail'),
	path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), 
		name='blacklist'),
]