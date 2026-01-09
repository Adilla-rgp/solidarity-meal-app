from ..extensions import db
from datetime import datetime

class Doacao(db.Model):
    __tablename__ = 'doacoes'
    
    id = db.Column(db.Integer, primary_key=True)
    doador_id = db.Column(db.Integer, db.ForeignKey('doadores.id'), nullable=False)
    nome = db.Column(db.String(200), nullable=False)
    tipo = db.Column(db.String(100), nullable=False)
    quantidade = db.Column(db.String(50), nullable=False)
    unidade = db.Column(db.String(50), nullable=False)
    validade = db.Column(db.Date, nullable=False)
    descricao = db.Column(db.Text)
    imagem = db.Column(db.Text)
    status = db.Column(db.String(20), default='ativa') 
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    

    doador = db.relationship('Doador', back_populates='doacoes')
    reservas = db.relationship('Reserva', back_populates='doacao', cascade='all, delete-orphan')
    
    __table_args__ = (
        db.Index('idx_doacao_status', 'status'),
        db.Index('idx_doacao_validade', 'validade'),
    )
    
    def to_dict(self):
        return {
            'id': self.id,
            'doador_id': self.doador_id,
            'nome': self.nome,
            'tipo': self.tipo,
            'quantidade': self.quantidade,
            'unidade': self.unidade,
            'validade': self.validade.isoformat() if self.validade else None,
            'descricao': self.descricao,
            'imagem': self.imagem,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'doador': {
                'estabelecimento': self.doador.estabelecimento,
                'localizacao': self.doador.localizacao
            } if self.doador else None
        }
    
    def __repr__(self):
        return f'<Doacao {self.nome}>'