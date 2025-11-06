from django.contrib.postgres.search import TrigramSimilarity
from .models import Resposta, Mensagem
from rest_framework.decorators import api_view
from rest_framework.response import Response
import re
import requests


def consultar_ollama(pergunta, historico=None):
    """
    Consulta o modelo gpt-oss:20b-cloud da Ollama com histórico de conversa,
    focado em Matemática, Física, Cálculo e Álgebra Linear.
    """
    historico = historico or []

    # Monta histórico filtrado
    historico_texto = ""
    for m in historico:
        if m["usuario"] == "user":
            historico_texto += f"Usuário: {m['texto']}\n"
        else:
            historico_texto += f"Assistente: {m['texto']}\n"

    prompt = (
        "Você é o Kombot.IA, assistente virtual universitário especializado em exatas.\n"
        "Responda APENAS sobre Matemática, Física, Cálculo, Álgebra Linear e assuntos relacionados.\n"
        "Forneça respostas claras, corretas e detalhadas, com exemplos ou cálculos quando necessário.\n"
        "Se a pergunta estiver fora do escopo, diga: 'Desculpe, não sei a resposta para isso.'\n\n"
        f"Histórico da conversa:\n{historico_texto}\n"
        f"Nova pergunta do usuário:\n{pergunta}\nAssistente:"
    )

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": "mistral", "prompt": prompt, "stream": False},
            timeout=60
        )
        if response.status_code == 200:
            data = response.json()
            return data.get("response", "").strip()
        else:
            return f"Erro ao consultar o modelo Ollama: {response.status_code}"
    except requests.exceptions.RequestException as e:
        return f"Erro ao conectar ao Ollama: {str(e)}"


def extrair_termo_pergunta(pergunta):
    """Extrai o termo principal da pergunta para buscas rápidas."""
    pergunta = pergunta.strip().rstrip("?!.").lower()
    padrao_inicio = r'^(o que é|quem foi|qual é|quais são|me explique|resolva)\s+'
    pergunta = re.sub(padrao_inicio, '', pergunta, flags=re.I)
    termo = pergunta.strip()
    if not termo:
        return ""
    palavras = termo.split()
    termo_final = []
    for palavra in palavras:
        termo_final.append(palavra.capitalize())
    return " ".join(termo_final)


@api_view(["GET"])
def index(request):
    return Response({"message": "API do Kombot.IA está rodando 🚀"})


@api_view(["POST"])
def chat_view(request):
    try:
        pergunta_usuario = request.data.get("pergunta", "").strip()

        # Salva pergunta do usuário
        Mensagem.objects.create(usuario="user", texto=pergunta_usuario)

        # Busca no banco de dados por similaridade
        respostas = Resposta.objects.annotate(
            similarity=TrigramSimilarity("pergunta", pergunta_usuario)
        ).order_by("-similarity")

        if respostas.exists() and respostas.first().similarity > 0.5:
            resposta_texto = respostas.first().resposta
        else:
            # Pega últimas mensagens do chat como histórico
            historico = Mensagem.objects.order_by("-id")[:10]  # últimas 10 mensagens
            historico_list = [{"usuario": m.usuario, "texto": m.texto} for m in reversed(historico)]

            # Gera resposta com Ollama
            resposta_texto = consultar_ollama(pergunta_usuario, historico=historico_list)

        # Salva a resposta do bot
        Mensagem.objects.create(usuario="bot", texto=resposta_texto)

        return Response({"response": resposta_texto})

    except Exception as e:
        return Response({"error": str(e)}, status=500)
