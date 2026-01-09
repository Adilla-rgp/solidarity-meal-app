from .auth import auth_bp
from .doador import doador_bp
from .beneficiario import beneficiario_bp
from .doacao import doacao_bp
from .reservas import reserva_bp

__all__ = ['auth_bp', 'doador_bp', 'beneficiario_bp', 'doacao_bp', 'reserva_bp']