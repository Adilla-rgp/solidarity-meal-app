import psycopg2

# CONFIGURAÇÃO - AJUSTE COM SUAS CREDENCIAIS
config = {
    "host": "localhost",
    "port": "5432",
    "database": "auth_system",
    "user": "postgres",
    "password": "14032005"  # ← COLOQUE A SENHA DO SEU POSTGRES
}

try:
    print("Testando conexão com PostgreSQL...")
    print(f"Host: {config['host']}:{config['port']}")
    print(f"Database: {config['database']}")
    print(f"User: {config['user']}")
    
    conn = psycopg2.connect(**config)
    
    # Testar versão do PostgreSQL
    cur = conn.cursor()
    cur.execute("SELECT version();")
    version = cur.fetchone()
    print(f"PostgreSQL conectado")
    print(f"Versao: {version[0]}")
    
    # Listar bancos de dados
    cur.execute("SELECT datname FROM pg_database WHERE datistemplate = false;")
    databases = cur.fetchall()
    print("\nBancos de dados disponiveis:")
    for db in databases:
        print(f"   - {db[0]}")
    
    cur.close()
    conn.close()
    
except psycopg2.OperationalError as e:
    print(f"ERRO: Nao foi possivel conectar ao PostgreSQL")
    print(f"   Detalhes: {e}")
    print("\nSOLUCOES:")
    print("   1. Verifique se o PostgreSQL esta rodando")
    print("   2. Confira a senha no arquivo .env")
    print("   3. Tente conectar via pgAdmin primeiro")
    
except Exception as e:
    print(f"Erro inesperado: {e}")