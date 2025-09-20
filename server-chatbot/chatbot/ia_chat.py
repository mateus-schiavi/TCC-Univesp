# chatbot/ia_chat.py
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def responder_ia(pergunta):
    try:
        resposta = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Você é um assistente de EAD para estudantes."},
                {"role": "user", "content": pergunta}
            ]
        )
        return resposta.choices[0].message.content.strip()
    except Exception as e:
        print("Erro IA:", e)
        return None
