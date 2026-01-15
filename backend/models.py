
from extensions import db, bcrypt
from datetime import datetime, timedelta
import re

class User(db.Model):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha = db.Column(db.String(255), nullable=False)
    telefone = db.Column(db.String(20))
    tipo = db.Column(db.String(20), nullable=False)  
    
    # Campos específicos para doador
    estabelecimento = db.Column(db.String(120))
    localizacao = db.Column(db.Text)
    
    # Campos específicos para beneficiario
    endereco = db.Column(db.Text)
    necessidade = db.Column(db.Text)

    
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    doacoes = db.relationship('Doacao', backref='doador', lazy=True, cascade='all, delete-orphan')
    reservas = db.relationship('Reserva', backref='beneficiario', lazy=True, cascade='all, delete-orphan')
    
    def set_password(self, password):
        self.senha = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self.senha, password)
    
    def to_dict(self):
        """Retorna dicionário com TODOS os campos, incluindo tipo"""
        base = {
            'id': self.id,
            'nome': self.nome,
            'email': self.email,
            'telefone': self.telefone,
            'tipo': self.tipo, 
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
        
        # Adicionar campos específicos do tipo
        if self.tipo == 'doador':
            base['estabelecimento'] = self.estabelecimento
            base['localizacao'] = self.localizacao
        elif self.tipo == 'beneficiario':
            base['endereco'] = self.endereco
            base['necessidade'] = self.necessidade
        
        return base


class Doacao(db.Model):
    __tablename__ = "doacoes"
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), nullable=False)
    tipo = db.Column(db.String(50), nullable=False)  
    quantidade = db.Column(db.Float, nullable=False)
    unidade = db.Column(db.String(20), nullable=False) 
    validade = db.Column(db.DateTime, nullable=False)
    descricao = db.Column(db.Text)
    imagem = db.Column(db.Text)
    status = db.Column(db.String(20), default='ativa')  
    distancia = db.Column(db.String(50))  
    urgente = db.Column(db.Boolean, default=False)
    
    doador_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    reservas = db.relationship('Reserva', backref='doacao', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': str(self.id),  # Converter para string para compatibilidade
            'nome': self.nome,
            'doador': self.doador.nome if self.doador else None,
            'doador_estabelecimento': self.doador.estabelecimento if self.doador and self.doador.tipo == 'doador' else None,
            'tipo': self.tipo,
            'quantidade': self.quantidade,
            'unidade': self.unidade,
            'validade': self.validade.isoformat() if self.validade else None,
            'descricao': self.descricao,
            'imagem': self.imagem,
            'status': self.status,
            'distancia': self.distancia or "5 km",
            'urgente': self.urgente,
            'doador_id': self.doador_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


class Reserva(db.Model):
    __tablename__ = "reservas"
    
    id = db.Column(db.Integer, primary_key=True)
    beneficiario_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    doacao_id = db.Column(db.Integer, db.ForeignKey('doacoes.id'), nullable=False)
    status = db.Column(db.String(20), default='ativa')  
    data_reserva = db.Column(db.DateTime, default=datetime.utcnow)
    data_conclusao = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': str(self.id),
            'beneficiario_id': self.beneficiario_id,
            'doacao_id': str(self.doacao_id),
            'status': self.status,
            'data_reserva': self.data_reserva.isoformat() if self.data_reserva else None,
            'data_conclusao': self.data_conclusao.isoformat() if self.data_conclusao else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'doacao': self.doacao.to_dict() if self.doacao else None
        }