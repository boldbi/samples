from django.urls import include,path
#from rest_framework import routers
from . import views

urlpatterns = [
    path('boldbi', views.indexbi, name='indexbi'),
    path('get_embed_details', views.get_embed_details, name = "get_embed_details"),
]