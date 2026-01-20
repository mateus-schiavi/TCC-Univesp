# chatbot/urls.py
from django.urls import path
from .views import index, chat_view

urlpatterns = [
    path("", index, name="index"),
    path("chat/", chat_view, name="chat")
]
