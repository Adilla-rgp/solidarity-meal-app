from ..extensions import db
from datetime import datetime

class Reserva(db.Model):
    __tablename__ = 'reservas'
    
    id = db.Column(db.Integer, primary_key=True)
    doacao_id = db.Column(db.Integer, db.ForeignKey('doacoes.id'), nullable=False)
    beneficiario_id = db.Column(db.Integer, db.ForeignKey('beneficiarios.id'), nullable=False)
    status = db.Column(db.String(20), default='ativa')  
    data_reserva = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    data_retirada = db.Column(db.DateTime)
    observacoes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    doacao = db.relationship('Doacao', back_populates='reservas')
    beneficiario = db.relationship('Beneficiario', back_populates='reservas')
    __table_args__ = (
        db.Index('idx_reserva_status', 'status'),
        db.Index('idx_reserva_beneficiario', 'beneficiario_id'),
    )

   
    
    def to_dict(self):
        return {
            'id': self.id,
            'doacao_id': self.doacao_id,
            'beneficiario_id': self.beneficiario_id,
            'status': self.status,
            'data_reserva': self.data_reserva.isoformat() if self.data_reserva else None,
            'data_retirada': self.data_retirada.isoformat() if self.data_retirada else None,
            'observacoes': self.observacoes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'doacao': self.doacao.to_dict() if self.doacao else None
        }
    
    def __repr__(self):
        return f'<Reserva {self.id}>'