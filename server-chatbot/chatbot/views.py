from django.contrib.postgres.search import TrigramSimilarity
from .models import Resposta, Mensagem
from rest_framework.decorators import api_view
from rest_framework.response import Response
import wikipedia  # novo pacote
import re

# Define idioma padrão para português
wikipedia.set_lang("pt")

@api_view(["GET"])
def index(request):
    """Endpoint simples para testar se a API está rodando"""
    return Response({"message": "API do chatbot está rodando 🚀"})


@api_view(["POST"])
def chat_view(request):
    try:
        pergunta_usuario = request.data.get("pergunta", "").strip()

        # Salvar pergunta do usuário
        Mensagem.objects.create(usuario="user", texto=pergunta_usuario)

        # Busca no banco de dados por similaridade
        respostas = Resposta.objects.annotate(
            similarity=TrigramSimilarity("pergunta", pergunta_usuario)
        ).order_by("-similarity")

        if respostas.exists() and respostas.first().similarity > 0.5:
            resposta_texto = respostas.first().resposta
        else:
            # Extrai termo principal
            termo_busca = extrair_termo_pergunta(pergunta_usuario)

            # Busca na Wikipédia usando o pacote wikipedia
            wiki_resposta = buscar_wikipedia(termo_busca)
            if wiki_resposta:
                resposta_texto = wiki_resposta
            else:
                resposta_texto = "Desculpe, não encontrei nada sobre isso. Pode reformular?"

        # Salvar resposta do bot
        Mensagem.objects.create(usuario="bot", texto=resposta_texto)

        return Response({"response": resposta_texto})

    except Exception as e:
        return Response({"error": str(e)}, status=500)


def extrair_termo_pergunta(pergunta):
    """Extrai o termo principal completo da pergunta."""
    pergunta = pergunta.strip().rstrip("?!.")
    pergunta = pergunta.lower()

    padrao_inicio = r'^(o que é|quem foi|qual é|quais são|poderia me dizer o que é|me explique o que é)\s+'
    pergunta = re.sub(padrao_inicio, '', pergunta, flags=re.I)

    termo = pergunta.strip()
    if not termo:
        return ""

    palavras = termo.split()
    termo_final = []
    for palavra in palavras:
        if palavra.upper() in ["DNA", "RNA", "CPU", "RAM"]:
            termo_final.append(palavra.upper())
        else:
            termo_final.append(palavra.capitalize())
    return " ".join(termo_final)


def buscar_wikipedia(termo):
    """Busca resumo na Wikipédia usando o pacote wikipedia"""
    try:
        # Tenta em português primeiro
        wikipedia.set_lang("pt")
        resumo = wikipedia.summary(termo, sentences=3)  # limita a 3 frases
        return resumo
    except wikipedia.exceptions.DisambiguationError as e:
        # Se houver ambiguidades, pega a primeira opção
        try:
            resumo = wikipedia.summary(e.options[0], sentences=3)
            return resumo
        except:
            return None
    except wikipedia.exceptions.PageError:
        # Se não encontrar página em pt, tenta em inglês
        try:
            wikipedia.set_lang("en")
            resumo = wikipedia.summary(termo, sentences=3)
            return resumo
        except:
            return None
    except:
        return None
