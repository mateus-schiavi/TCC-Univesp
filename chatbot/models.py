# chatbot/models.py
from django.db import models

class Resposta(models.Model):
    pergunta = models.CharField(max_length=255, unique=True)
    resposta = models.TextField()

    def __str__(self):
        return self.pergunta
class Mensagem(models.Model):
    usuario = models.CharField(max_length=255)  # 'user' ou 'bot'
    texto = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.usuario}: {self.texto[:30]}"