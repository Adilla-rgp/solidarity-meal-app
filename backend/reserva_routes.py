from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from extensions import db
from models import Reserva, Doacao, User
from datetime import datetime

reserva_bp = Blueprint('reservas', __name__)

@reserva_bp.route('/reservas', methods=['POST', 'OPTIONS'])
@jwt_required()
def criar_reserva():
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        claims = get_jwt()
        if claims.get('tipo') != 'beneficiario':
            return jsonify({'error': 'Apenas beneficiarios podem reservar doacoes'}), 403
        
        data = request.get_json()
        
        if 'doacao_id' not in data:
            return jsonify({'error': 'doacao_id e obrigatorio'}), 400
        
        doacao = Doacao.query.get(data['doacao_id'])
        if not doacao:
            return jsonify({'error': 'Doacao nao encontrada'}), 404
        
        if doacao.status != 'ativa':
            return jsonify({'error': 'Doacao nao esta disponivel'}), 400
        
        # Verificar se ja existe reserva ativa para esta doacao
        reserva_existente = Reserva.query.filter_by(
            doacao_id=data['doacao_id'],
            status='ativa'
        ).first()
        
        if reserva_existente:
            return jsonify({'error': 'Doacao ja reservada'}), 409
        
        # Criar reserva
        reserva = Reserva(
            beneficiario_id=get_jwt_identity(),
            doacao_id=data['doacao_id'],
            status='ativa'
        )
        
        # Atualizar status da doacao
        doacao.status = 'reservada'
        
        db.session.add(reserva)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Doacao reservada com sucesso',
            'reserva': reserva.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro ao reservar doacao: {str(e)}'}), 500


@reserva_bp.route('/minhas-reservas', methods=['GET', 'OPTIONS'])
@jwt_required()
def minhas_reservas():
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        claims = get_jwt()
        if claims.get('tipo') != 'beneficiario':
            return jsonify({'error': 'Acesso negado'}), 403
        
        reservas = Reserva.query.filter_by(
            beneficiario_id=get_jwt_identity()
        ).order_by(Reserva.created_at.desc()).all()
        
        return jsonify({
            'success': True,
            'reservas': [r.to_dict() for r in reservas],
            'total': len(reservas)
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar reservas: {str(e)}'}), 500


@reserva_bp.route('/reservas/<int:reserva_id>/cancelar', methods=['POST', 'OPTIONS'])
@jwt_required()
def cancelar_reserva(reserva_id):
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        reserva = Reserva.query.get_or_404(reserva_id)
        claims = get_jwt()
        
        # Verificar se o usuario e o dono da reserva
        if reserva.beneficiario_id != get_jwt_identity():
            return jsonify({'error': 'Acesso negado'}), 403
        
        if reserva.status != 'ativa':
            return jsonify({'error': 'Reserva nao pode ser cancelada'}), 400
        
        # Cancelar reserva
        reserva.status = 'cancelada'
        reserva.data_conclusao = datetime.utcnow()
        
        # Liberar doacao
        reserva.doacao.status = 'ativa'
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Reserva cancelada com sucesso'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro ao cancelar reserva: {str(e)}'}), 500


@reserva_bp.route('/reservas/<int:reserva_id>/concluir', methods=['POST', 'OPTIONS'])
@jwt_required()
def concluir_reserva(reserva_id):
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        reserva = Reserva.query.get_or_404(reserva_id)
        claims = get_jwt()
        
        # Verificar se o usuario e o dono da reserva
        if reserva.beneficiario_id != get_jwt_identity():
            return jsonify({'error': 'Acesso negado'}), 403
        
        if reserva.status != 'ativa':
            return jsonify({'error': 'Reserva nao pode ser concluida'}), 400
        
        # Concluir reserva
        reserva.status = 'concluida'
        reserva.data_conclusao = datetime.utcnow()
        
        # Atualizar status da doacao
        reserva.doacao.status = 'entregue'
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Reserva concluida com sucesso'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro ao concluir reserva: {str(e)}'}), 500


@reserva_bp.route('/reservas-doacao/<int:doacao_id>', methods=['GET', 'OPTIONS'])
@jwt_required()
def reservas_por_doacao(doacao_id):
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        doacao = Doacao.query.get_or_404(doacao_id)
        claims = get_jwt()
        
        # Verificar se o usuario e o dono da doacao
        if doacao.doador_id != get_jwt_identity():
            return jsonify({'error': 'Acesso negado'}), 403
        
        reservas = Reserva.query.filter_by(doacao_id=doacao_id).all()
        
        return jsonify({
            'success': True,
            'reservas': [r.to_dict() for r in reservas]
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar reservas: {str(e)}'}), 500