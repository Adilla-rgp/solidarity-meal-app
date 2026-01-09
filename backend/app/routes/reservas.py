from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import User, Reserva, Doacao
from ..extensions import db
from datetime import datetime
import logging

reserva_bp = Blueprint('reserva', __name__, url_prefix='/api/reservas')
logger = logging.getLogger(__name__)
@reserva_bp.route('', methods=['POST'])
@jwt_required()

def criar_reserva():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.beneficiario_profile:
            return jsonify({'error': 'Apenas beneficiários podem fazer reservas'}), 403
        
        data = request.get_json()
        
        if 'doacao_id' not in data:
            return jsonify({'error': 'Campo doacao_id é obrigatório'}), 400
        
        doacao_id = data['doacao_id']
        doacao = Doacao.query.get(doacao_id)
        
        if not doacao:
            return jsonify({'error': 'Doação não encontrada'}), 404
        
        if doacao.status != 'ativa':
            return jsonify({'error': 'Esta doação não está disponível para reserva'}), 400
        
        # Verifica se ja tem reserva ativa 
        reserva_existente = Reserva.query.filter_by(
            doacao_id=doacao_id,
            beneficiario_id=user.beneficiario_profile.id,
            status='ativa'
        ).first()
        
        if reserva_existente:
            return jsonify({'error': 'Você já tem uma reserva ativa para esta doação'}), 409
        


        reserva = Reserva(
            doacao_id=doacao_id,
            beneficiario_id=user.beneficiario_profile.id,
            status='ativa',
            observacoes=data.get('observacoes')
        )
        doacao.status = 'reservada'
        
        db.session.add(reserva)
        db.session.commit()
        logger.info(f'Reserva criada: {reserva.id} para doação {doacao_id}')
        return jsonify({
            'message': 'Reserva criada com sucesso',
            'reserva': reserva.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f'Erro ao criar reserva: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500
    



@reserva_bp.route('/minhas', methods=['GET'])
@jwt_required()

def listar_minhas_reservas():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.beneficiario_profile:
            return jsonify({'error': 'Perfil de beneficiário não encontrado'}), 404
        
        beneficiario = user.beneficiario_profile
        reservas = beneficiario.reservas
        
        # ele tbm pode filtrar por status
        status = request.args.get('status')
        if status:
            reservas = [r for r in reservas if r.status == status]
        
        return jsonify({
            'reservas': [r.to_dict() for r in reservas],
            'total': len(reservas)
        }), 200
        
    except Exception as e:
        logger.error(f'Erro ao listar minhas reservas: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@reserva_bp.route('/<int:reserva_id>', methods=['GET'])
@jwt_required()


def obter_reserva(reserva_id):

    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        reserva = Reserva.query.get(reserva_id)
        
        if not reserva:
            return jsonify({'error': 'Reserva não encontrada'}), 404
        
        # Verifica se eh o beneficiário da reserva ou o doador q fez a doção
        is_beneficiario = user.beneficiario_profile and reserva.beneficiario_id == user.beneficiario_profile.id
        is_doador = user.doador_profile and reserva.doacao.doador_id == user.doador_profile.id
        
        if not (is_beneficiario or is_doador):
            return jsonify({'error': 'Você não tem permissão para ver esta reserva'}), 403
        
        return jsonify({
            'reserva': reserva.to_dict()
        }), 200
        
    except Exception as e:
        logger.error(f'Erro ao obter reserva: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@reserva_bp.route('/<int:reserva_id>/cancelar', methods=['POST'])
@jwt_required()

def cancelar_reserva(reserva_id):
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        reserva = Reserva.query.get(reserva_id)
        
        if not reserva:
            return jsonify({'error': 'Reserva não encontrada'}), 404
        
        # Verificar permissões
        is_beneficiario = user.beneficiario_profile and reserva.beneficiario_id == user.beneficiario_profile.id
        is_doador = user.doador_profile and reserva.doacao.doador_id == user.doador_profile.id
        
        if not (is_beneficiario or is_doador):
            return jsonify({'error': 'Você não tem permissão para cancelar esta reserva'}), 403
        
        if reserva.status != 'ativa':
            return jsonify({'error': 'Apenas reservas ativas podem ser canceladas'}), 400
        
        # Cancela reserva
        reserva.status = 'cancelada'
        
        # Volta doação ativa
        reserva.doacao.status = 'ativa'
        
        db.session.commit()
        
        logger.info(f'Reserva cancelada: {reserva_id}')
        
        return jsonify({
            'message': 'Reserva cancelada com sucesso',
            'reserva': reserva.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        logger.error(f'Erro ao cancelar reserva: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@reserva_bp.route('/<int:reserva_id>/concluir', methods=['POST'])
@jwt_required()



def concluir_reserva(reserva_id):

    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        reserva = Reserva.query.get(reserva_id)
        
        if not reserva:
            return jsonify({'error': 'Reserva não encontrada'}), 404
        
        # Verifica identidade do beneficiario
        if not user.beneficiario_profile or reserva.beneficiario_id != user.beneficiario_profile.id:
            return jsonify({'error': 'Apenas o beneficiário pode concluir a reserva'}), 403
        
        if reserva.status != 'ativa':
            return jsonify({'error': 'Apenas reservas ativas podem ser concluídas'}), 400
        

        reserva.status = 'concluida'
        reserva.data_retirada = datetime.utcnow()
        reserva.doacao.status = 'entregue'
        
        db.session.commit()
        
        logger.info(f'Reserva concluída: {reserva_id}')
        
        return jsonify({
            'message': 'Reserva concluída com sucesso',
            'reserva': reserva.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        logger.error(f'Erro ao concluir reserva: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500