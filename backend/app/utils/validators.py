import re

def validate_email(email):
    """Valida formato de email"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def validate_password_strength(password):
    """Valida força da senha"""
    errors = []
    
    if len(password) < 8:
        errors.append("A senha deve ter pelo menos 8 caracteres")
    
    if not re.search(r'[A-Z]', password):
        errors.append("A senha deve conter pelo menos uma letra maiúscula")
    
    if not re.search(r'[a-z]', password):
        errors.append("A senha deve conter pelo menos uma letra minúscula")
    
    if not re.search(r'\d', password):
        errors.append("A senha deve conter pelo menos um número")
    
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        errors.append("A senha deve conter pelo menos um caractere especial")
    
    return errors

def validate_username(username):
    """Valida nome de usuário"""
    if len(username) < 3:
        return False, "Nome de usuário muito curto (mínimo 3 caracteres)"
    
    if len(username) > 20:
        return False, "Nome de usuário muito longo (máximo 20 caracteres)"
    
    if not re.match(r'^[a-zA-Z0-9_]+$', username):
        return False, "Nome de usuário só pode conter letras, números e underscore"
    
    return True, ""