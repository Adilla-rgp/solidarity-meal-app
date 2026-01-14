# fix_encoding_all.py
import os

root_dir = "."  # raiz do projeto
extensions = (".py", ".sql", ".env", ".txt", ".json")

print("🔍 Verificando e corrigindo encoding de TODOS os arquivos...")
print("=" * 60)

for dirpath, _, filenames in os.walk(root_dir):
    for filename in filenames:
        if filename.endswith(extensions):
            filepath = os.path.join(dirpath, filename)
            try:
                # Tentar abrir como UTF-8
                with open(filepath, "r", encoding="utf-8") as f:
                    f.read()
                print(f"✅ {filepath}: UTF-8 válido")
            except UnicodeDecodeError:
                print(f"❌ {filepath}: NÃO é UTF-8, tentando corrigir...")
                # Tentar abrir com encodings comuns
                for enc in ["latin-1", "cp1252", "iso-8859-1"]:
                    try:
                        with open(filepath, "r", encoding=enc) as f:
                            content = f.read()
                        # Regravar em UTF-8
                        with open(filepath, "w", encoding="utf-8") as f:
                            f.write(content)
                        print(f"   ✔ Corrigido: {filepath} convertido de {enc} para UTF-8")
                        break
                    except Exception:
                        continue

print("=" * 60)
print("💡 Todos os arquivos foram verificados. Os que estavam em Latin-1/CP1252 foram regravados em UTF-8.")
