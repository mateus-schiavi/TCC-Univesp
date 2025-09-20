from django.shortcuts import render, redirect
from django.contrib.postgres.search import TrigramSimilarity
from .models import Resposta, Mensagem

def index(request):
    try:
        if request.method == "POST":
            pergunta_usuario = request.POST.get("pergunta", "").strip().lower()

            # Salvar pergunta do usuário
            Mensagem.objects.create(usuario="user", texto=pergunta_usuario)

            # Buscar resposta
            respostas = Resposta.objects.annotate(
                similarity=TrigramSimilarity('pergunta', pergunta_usuario)
            ).filter(similarity__gt=0.3).order_by('-similarity')

            if respostas.exists():
                resposta_texto = respostas.first().resposta
            else:
                resposta_texto = "Desculpe, não entendi. Pode reformular?"

            # Salvar resposta do bot
            Mensagem.objects.create(usuario="bot", texto=resposta_texto)

            # Redirecionar para a mesma página usando GET
            return redirect('index')  # 'index' é o name da URL

        # Carregar histórico
        historico = Mensagem.objects.all().order_by('created_at')

    except Exception as e:
        print("Erro no chatbot:", e)
        historico = []

    return render(request, "chatbot/index.html", {"historico": historico})
