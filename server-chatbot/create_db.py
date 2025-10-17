import psycopg2

# configurações de conexão
conn = psycopg2.connect(
    dbname="postgres",  # conecta no banco padrão
    user="postgres",
    password="capoeira",
    host="localhost",
    port="5432"
)
conn.autocommit = True

# cria cursor
cur = conn.cursor()

# cria banco chatbot_db
cur.execute("CREATE DATABASE chatbot_db;")

print("Banco de dados 'chatbot_db' criado com sucesso!")

cur.close()
conn.close()
