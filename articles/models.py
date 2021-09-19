from django.db import models
from django.utils import timezone
from django.conf import settings
from django.utils.translation import gettext_lazy as _

def upload_to(instance, filename):
    return 'media/articles/{filename}'.format(filename=filename)

class Article(models.Model):
	title = models.CharField(max_length=100)
	picture = models.ImageField(_("Image"), 
		upload_to=upload_to, default='media/articles/default_article.png')
	content = models.CharField(max_length=1000)
	created = models.DateTimeField(default=timezone.now)
	author = models.ForeignKey(settings.AUTH_USER_MODEL, 
		on_delete=models.CASCADE, related_name='articles')

	def __str__(self):
		return self.title