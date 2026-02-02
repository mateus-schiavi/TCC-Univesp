# 🎓 Chatbot Educacional para Universitários

Projeto desenvolvido como Trabalho de Conclusão de Curso (TCC) da UNIVESP. Trata-se de uma aplicação web com um chatbot educacional voltado para estudantes universitários, utilizando arquitetura full stack com backend em Python (Django) e frontend em TSX.

## 🧠 Sobre o Projeto

O objetivo do projeto é oferecer suporte automatizado aos estudantes por meio de um chatbot educacional, auxiliando na resolução de dúvidas acadêmicas e melhorando a experiência no ambiente educacional digital. A aplicação demonstra a integração entre frontend e backend, consumo de APIs e automação de respostas em um contexto real.

## 🏗️ Arquitetura

O sistema é dividido em duas camadas principais:

- **Backend:** API desenvolvida em Python com Django, responsável pela lógica do chatbot, processamento das requisições e integração de dados.
- **Frontend:** Interface web desenvolvida em TSX, responsável pela interação com o usuário e consumo da API.

Essa separação garante melhor organização, escalabilidade e manutenção do sistema.

## 🚀 Funcionalidades

- 💬 Chatbot educacional interativo
- 🔌 Comunicação via API entre frontend e backend
- 🌐 Interface web para interação com usuários
- 🤖 Automação de respostas para suporte acadêmico
- 📚 Aplicação voltada ao contexto universitário

## 🧰 Tecnologias Utilizadas

### Backend
- Python
- Django
- APIs REST
- SQLite / outro banco de dados (ajuste se necessário)

### Frontend
- TypeScript (TSX)
- Node.js
- NPM
- Framework frontend (ex: React)

## ▶️ Como Executar o Projeto

### Pré-requisitos
- Node.js
- NPM
- Python 3.x
- Virtualenv (opcional, recomendado)

### Backend (Django)

```bash
# Acesse a pasta do backend
cd backend

# Crie e ative o ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Instale as dependências
pip install -r requirements.txt

# Execute as migrações
python manage.py migrate

# Inicie o servidor
python manage.py runserver

# Acesse a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```
🎯 Contexto Acadêmico

Projeto desenvolvido como Trabalho de Conclusão de Curso (TCC) da UNIVESP, aplicando conceitos de desenvolvimento web, integração de sistemas, APIs REST e automação no contexto educacional.

