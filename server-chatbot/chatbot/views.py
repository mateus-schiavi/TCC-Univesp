from django.contrib.postgres.search import TrigramSimilarity
from .models import Resposta, Mensagem
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["GET"])
def index(request):
    '''Endpoint simples para testar se a API está rodando'''
    return Response({"message": "API do chatbot está rodando 🚀"})

@api_view(["POST"])
def chat_view(request):
    try:
        pergunta_usuario = request.data.get("pergunta", "").strip().lower()
        
        # Salvar pergunta do usuário
        Mensagem.objects.create(usuario="user", texto=pergunta_usuario)
        
        respostas = Resposta.objects.annotate(
            similarity=TrigramSimilarity("pergunta", pergunta_usuario)
        ).filter(similarity__gt=0.3).order_by("-similarity")
        
        if respostas.exists():
            resposta_texto = respostas.first().resposta
        else:
            resposta_texto = "Desculpe, não entendi. Pode reformular?"
            
        # Salvar resposta do bot
        Mensagem.objects.create(usuario="bot", texto=resposta_texto)
        
        return Response({"response": resposta_texto})
    
    except Exception as e:
        return Response({"error": str(e)}, status=500)