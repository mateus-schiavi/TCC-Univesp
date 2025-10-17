import os
import django 
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ead_chatbot.settings")
django.setup()
from chatbot.models import Resposta

respostas = [
    {"pergunta": "olá", "resposta": "Olá! Que bom te ver por aqui. Como posso ajudar nos seus estudos hoje?"},
    {"pergunta": "bom dia", "resposta": "Bom dia! Preparado para aprender algo novo hoje? Conte comigo!"},
    {"pergunta": "como faço matrícula?", "resposta": "Você pode realizar sua matrícula acessando o portal do aluno e seguindo as instruções na aba “Matrícula”."},
    {"pergunta": "esqueci minha senha", "resposta": "Sem problemas! Clique em “Esqueci minha senha” no portal da UNIVESP para redefini-la."},
    {"pergunta": "qual é a ementa da disciplina de Python?", "resposta": "A ementa da disciplina inclui conceitos de programação, estruturas de dados, funções, orientação a objetos e prática de projetos."},
    {"pergunta": "o que é TCC?", "resposta": "O TCC é o Trabalho de Conclusão de Curso, onde você aplica os conhecimentos adquiridos em um projeto prático ou teórico."},
    {"pergunta": "dicas para organizar estudo", "resposta": "Tente dividir seu estudo em blocos de 50 minutos, faça resumos, revise regularmente e pratique exercícios."},
    {"pergunta": "posso estudar à noite?", "resposta": "Claro! Apenas mantenha uma rotina e tente revisar conteúdos antes de dormir para fixação."},
    {"pergunta": "como consultar calendário acadêmico?", "resposta": "Você pode acessar o calendário acadêmico no portal da UNIVESP, na seção “Calendário”."},
    {"pergunta": "quais disciplinas devo cursar primeiro?", "resposta": "É recomendado seguir a grade curricular do curso e cumprir os pré-requisitos das disciplinas."},
    {"pergunta": "como melhorar meu desempenho?", "resposta": "Organize seu tempo, faça resumos, revise com frequência e tire dúvidas sempre que necessário."},
    {"pergunta": "o que fazer se não entendi uma aula?", "resposta": "Revise o material, assista novamente à aula gravada e busque exemplos práticos. Se precisar, pergunte ao seu tutor."},
    {"pergunta": "posso trancar disciplina?", "resposta": "Sim, consulte o portal do aluno na aba de matrícula para informações sobre trancamento de disciplina."},
    {"pergunta": "dicas para estudar programação", "resposta": "Pratique bastante, resolva exercícios, faça pequenos projetos e revise conceitos regularmente."},
    {"pergunta": "como funciona o EAD da UNIVESP?", "resposta": "As aulas são totalmente online, você pode assistir às gravações quando quiser e interagir nos fóruns com colegas e tutores."},
    {"pergunta": "posso mudar de disciplina?", "resposta": "Sim, dentro do período de matrícula você pode fazer alterações pelo portal do aluno."},
    {"pergunta": "quais áreas de tecnologia estudar?", "resposta": "Depende do seu interesse: desenvolvimento, redes, dados, IA ou cibersegurança são boas opções."},
    {"pergunta": "como se preparar para o mercado de trabalho?", "resposta": "Faça cursos complementares, participe de projetos, aprenda inglês técnico e construa portfólio com projetos práticos."},
    {"pergunta": "tenho dificuldade em matemática, o que fazer?", "resposta": "Revise os conceitos, pratique exercícios e use recursos online. Não hesite em pedir ajuda ao tutor."},
    {"pergunta": "dicas para fazer trabalhos em grupo", "resposta": "Divida tarefas, estabeleça prazos, use ferramentas de colaboração online e mantenha comunicação constante."},
    {"pergunta": "o que é orientação profissional?", "resposta": "É o suporte que te ajuda a identificar carreiras, desenvolver habilidades e planejar sua entrada no mercado de tecnologia."},
    {"pergunta": "posso pedir ajuda ao MentorIA sempre?", "resposta": "Sim! Estou aqui para orientar e esclarecer suas dúvidas sempre que precisar."},
    {"pergunta": "como me organizar para provas?", "resposta": "Crie um cronograma de revisão, faça resumos, pratique exercícios e revise conceitos importantes antes da prova."},
    {"pergunta": "quais cursos extras posso fazer?", "resposta": "Você pode buscar cursos de programação, data science, IA, metodologias ágeis ou workshops oferecidos pela UNIVESP e parceiros confiáveis."}
]

for item in respostas:
    Resposta.objects.create(pergunta=item["pergunta"], resposta=item["resposta"])

print("Banco de respostas populado com sucesso! ✅")