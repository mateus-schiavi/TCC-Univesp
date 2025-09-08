# chatbot/models.py
from django.db import models

class Resposta(models.Model):
    pergunta = models.CharField(max_length=200, unique=True)
    resposta = models.TextField()

    def __str__(self):
        return self.pergunta
