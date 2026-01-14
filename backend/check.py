# check_encoding.py
import os

files_to_check = [
    'models.py',
    'auth_routes.py', 
    'doacao_routes.py',
    'reserva_routes.py',
    'stats_routes.py',
    'extensions.py',
    'config.py',
    'app/__init__.py'
]

print("🔍 Verificando encoding dos arquivos...")
print("=" * 60)

for filename in files_to_check:
    if os.path.exists(filename):
        try:
            # Tentar ler como UTF-8
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
            print(f"✅ {filename}: UTF-8 válido")
            
            # Verificar se tem caracteres problemáticos
            problem_chars = []
            for i, line in enumerate(content.split('\n'), 1):
                for char in line:
                    if ord(char) > 127:  # Caracteres não-ASCII
                        if char not in problem_chars:
                            problem_chars.append(char)
                        print(f"   ⚠️ Linha {i}: caractere '{char}' (U+{ord(char):04X})")
            
        except UnicodeDecodeError as e:
            print(f"❌ {filename}: NÃO é UTF-8 - {e}")
            
            # Tentar descobrir qual encoding
            encodings = ['latin-1', 'iso-8859-1', 'cp1252', 'windows-1252']
            for enc in encodings:
                try:
                    with open(filename, 'r', encoding=enc) as f:
                        content = f.read()
                    print(f"   → Possível encoding: {enc}")
                    
                    # Mostrar linhas com problemas
                    lines = content.split('\n')
                    for i, line in enumerate(lines, 1):
                        if any(ord(c) > 127 for c in line):
                            print(f"   → Linha {i}: {line[:100]}...")
                    
                    break
                except:
                    continue

print("=" * 60)
print("💡 Dica: Adicione '# -*- coding: utf-8 -*-' no início dos arquivos")