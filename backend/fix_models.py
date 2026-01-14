import sqlite3

# Cria (ou abre) o arquivo app.db
conn = sqlite3.connect("app.db")

# Opcional: otimizar o banco
conn.execute("VACUUM;")

conn.close()
print("Banco SQLite app.db criado com sucesso!")
