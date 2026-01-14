import psycopg2

# PostgreSQL
DB_CONFIG = {
    "host": "localhost",
    "port": "5432",
    "database": "auth_system",
    "user": "postgres",
    "password": "14032005" 
}

try:
    print("Verificando tabelas no PostgreSQL...")
    
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()
    
    # 1. Verificar se a tabela 'users' existe
    cur.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'users';
    """)
    
    table_exists = cur.fetchone()
    
    if table_exists:
        print("Tabela 'users' criada com sucesso!")
        
        # 2. Mostrar estrutura da tabela
        print("\nESTRUTURA DA TABELA 'users':")
        print("-" * 50)
        
        cur.execute("""
            SELECT 
                column_name, 
                data_type,
                character_maximum_length,
                is_nullable,
                column_default
            FROM information_schema.columns
            WHERE table_name = 'users'
            ORDER BY ordinal_position;
        """)
        
        columns = cur.fetchall()
        for col in columns:
            col_name, data_type, max_len, nullable, default = col
            print(f"  {col_name:20} {data_type:15} ", end="")
            if max_len:
                print(f"({max_len})", end=" ")
            print(f"{'NULL' if nullable == 'YES' else 'NOT NULL':10}", end="")
            if default:
                print(f" DEFAULT: {default}", end="")
            print()
        
        # 3. Verificar Ã­ndices
        print("\nINDICES DA TABELA 'users':")
        cur.execute("""
            SELECT 
                i.relname as index_name,
                a.attname as column_name
            FROM 
                pg_class t,
                pg_class i,
                pg_index ix,
                pg_attribute a
            WHERE 
                t.oid = ix.indrelid
                AND i.oid = ix.indexrelid
                AND a.attrelid = t.oid
                AND a.attnum = ANY(ix.indkey)
                AND t.relkind = 'r'
                AND t.relname = 'users'
            ORDER BY 
                t.relname,
                i.relname;
        """)
        
        indices = cur.fetchall()
        for idx in indices:
            print(f"  {idx[0]:30} â {idx[1]}")
        
        # 4. Contar registros
        cur.execute("SELECT COUNT(*) FROM users;")
        count = cur.fetchone()[0]
        print(f"\nTotal de usuÃ¡rios registrados: {count}")
        
    else:
        print("Tabela 'users' NÃO encontrada!")
        
        # Mostrar todas as tabelas
        print("\nTodas as tabelas disponÃ­veis:")
        cur.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        """)
        
        for tabela in cur.fetchall():
            print(f"  - {tabela[0]}")
    
    cur.close()
    conn.close()
    
except Exception as e:
    print(f"Erro: {e}")
    print("\nVerifique:")
    print("   1. Se o PostgreSQL estÃ¡ rodando")
    print("   2. Se a senha no cÃ³digo estÃ¡ correta")
    print("   3. Se o banco 'auth_system' existe")