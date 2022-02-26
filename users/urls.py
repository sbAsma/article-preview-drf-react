from django.urls import path
from .views import (
						CustomUserCreate, CustomUserList, 
						CustomUserManage, CustomUserDetail,
						ChangePasswordView, BlacklistTokenUpdateView
					)

app_name = 'users'

urlpatterns = [
	path('create/', CustomUserCreate.as_view(), name='create-user'),
	path('profile/<int:pk>/', CustomUserManage.as_view(), name='manage-profile'),
	path('user/', CustomUserList.as_view(), name='user-list'),
	path('user/<str:pk>/', CustomUserDetail.as_view(), name='user-detail'),
	path('change_password/<int:pk>/', ChangePasswordView.as_view(), name='user-change-password'),
	path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), 
		name='blacklist'),
]