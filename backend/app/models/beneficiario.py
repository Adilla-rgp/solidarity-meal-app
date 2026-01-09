from ..extensions import db
from datetime import datetime

class Beneficiario(db.Model):
    __tablename__ = 'beneficiarios'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    endereco = db.Column(db.String(300), nullable=False)
    telefone = db.Column(db.String(20), nullable=False)
    necessidade = db.Column(db.Text)
    situacao = db.Column(db.String(100))
    dependentes = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    


    # Relacionamentos
    user = db.relationship('User', backref=db.backref('beneficiario_profile', uselist=False))
    reservas = db.relationship('Reserva', back_populates='beneficiario', cascade='all, delete-orphan')
    
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'endereco': self.endereco,
            'telefone': self.telefone,
            'necessidade': self.necessidade,
            'situacao': self.situacao,
            'dependentes': self.dependentes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Beneficiario {self.id}>'