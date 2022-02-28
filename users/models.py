from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  
from conf import settings

def upload_to(instance, filename):
	return 'media/users/{filename}'.format(filename=filename)

class CustomAccountManager(BaseUserManager):

	def create_superuser(self, user_name, first_name, email, password, **other_fields):

		other_fields.setdefault('is_staff', True)
		other_fields.setdefault('is_superuser', True)
		other_fields.setdefault('is_active', True)

		if other_fields.get('is_superuser') is not True:
			raise ValueError(
				'Superuer must be assigned to is_superuser=True')
		if other_fields.get('is_staff') is not True:
			raise ValueError(
				'Superuser must be assigned to is_staff=True')

		return self.create_user(user_name, first_name, email, password, **other_fields)

	def create_user(self, user_name, first_name, email, password, **other_fields):

		if not user_name:
			raise ValueError('Username is required')

		email = self.normalize_email(email)
		user = self.model(user_name=user_name, first_name=first_name, 
			email=email, **other_fields)

		user.set_password(password)
		user.save()
		return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
	first_name = models.CharField(max_length=100)
	last_name = models.CharField(max_length=100)
	start_date = models.DateTimeField(default=timezone.now)
	email = models.EmailField(_('email address'), unique=True)
	user_name = models.CharField(max_length=50, unique=True)
	avatar = models.ImageField(_("Image"),
		upload_to=upload_to, default='media/users/defaut_avatar.png')
	is_staff = models.BooleanField(default=False)
	is_active = models.BooleanField(default=True) # To change to False for email confirmation
	objects = CustomAccountManager()

	USERNAME_FIELD = 'user_name'
	REQUIRED_FIELDS = ['first_name', 'email']

	def __str__(self):
		return self.user_name

# password reset request handler
@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message = "{}token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Articles Previer"),
        # message:
        "http://localhost:3000" + email_plaintext_message,
        # from:
        settings.EMAIL_HOST_USER,
        # to:
        [reset_password_token.user.email]
    )