from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
	path('token/', TokenObtainPairView.as_view(), name='token_optain_pair'),
	path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('', include('articles.urls', namespace='articles')),
    path('user/', include('users.urls', namespace='users')),
    path('admin/', admin.site.urls),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)