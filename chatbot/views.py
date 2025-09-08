# chatbot/views.py
from django.shortcuts import render
from .models import Resposta

def index(request):
    resposta_texto = ""
    if request.method == "POST":
        pergunta_usuario = request.POST.get("pergunta").strip().lower()

        try:
            resposta_obj = Resposta.objects.get(pergunta=pergunta_usuario)
            resposta_texto = resposta_obj.resposta
        except Resposta.DoesNotExist:
            resposta_texto = "Desculpe, não entendi. Pode reformular?"

    return render(request, "chatbot/index.html", {"resposta": resposta_texto})
