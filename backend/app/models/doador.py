from ..extensions import db
from datetime import datetime

class Doador(db.Model):
    __tablename__ = 'doadores'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    estabelecimento = db.Column(db.String(200), nullable=False)
    localizacao = db.Column(db.String(300), nullable=False)
    telefone = db.Column(db.String(20), nullable=False)
    cnpj = db.Column(db.String(18))
    endereco = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamento com User
    user = db.relationship('User', backref=db.backref('doador_profile', uselist=False))
    
    # Relacionamento com Doações
    doacoes = db.relationship('Doacao', back_populates='doador', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'estabelecimento': self.estabelecimento,
            'localizacao': self.localizacao,
            'telefone': self.telefone,
            'cnpj': self.cnpj,
            'endereco': self.endereco,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Doador {self.estabelecimento}>'