from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import User, Beneficiario
from ..extensions import db
import logging

beneficiario_bp = Blueprint('beneficiario', __name__, url_prefix='/api/beneficiario')
logger = logging.getLogger(__name__)

@beneficiario_bp.route('/perfil', methods=['POST'])
@jwt_required()
def criar_perfil_beneficiario():
    """Criar perfil de beneficiário para usuário autenticado"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        # Verificar se já tem perfil de beneficiário
        if user.beneficiario_profile:
            return jsonify({'error': 'Usuário já possui perfil de beneficiário'}), 409
        
        data = request.get_json()
        
        # Validar campos obrigatórios
        required = ['endereco', 'telefone']
        for field in required:
            if field not in data or not data[field]:
                return jsonify({'error': f'Campo {field} é obrigatório'}), 400
        
        # Criar perfil de beneficiário
        beneficiario = Beneficiario(
            user_id=user_id,
            endereco=data['endereco'],
            telefone=data['telefone'],
            necessidade=data.get('necessidade'),
            situacao=data.get('situacao'),
            dependentes=data.get('dependentes', 0)
        )
        
        db.session.add(beneficiario)
        db.session.commit()
        
        logger.info(f'Perfil de beneficiário criado: ID {beneficiario.id}')
        
        return jsonify({
            'message': 'Perfil de beneficiário criado com sucesso',
            'beneficiario': beneficiario.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f'Erro ao criar perfil de beneficiário: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@beneficiario_bp.route('/perfil', methods=['GET'])
@jwt_required()
def obter_perfil_beneficiario():
    """Obter perfil de beneficiário do usuário autenticado"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        if not user.beneficiario_profile:
            return jsonify({'error': 'Perfil de beneficiário não encontrado'}), 404
        
        beneficiario = user.beneficiario_profile
        
        return jsonify({
            'beneficiario': beneficiario.to_dict(),
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        logger.error(f'Erro ao obter perfil de beneficiário: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@beneficiario_bp.route('/perfil', methods=['PUT'])
@jwt_required()
def atualizar_perfil_beneficiario():
    """Atualizar perfil de beneficiário"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.beneficiario_profile:
            return jsonify({'error': 'Perfil de beneficiário não encontrado'}), 404
        
        data = request.get_json()
        beneficiario = user.beneficiario_profile
        
        # Atualizar campos
        if 'endereco' in data:
            beneficiario.endereco = data['endereco']
        if 'telefone' in data:
            beneficiario.telefone = data['telefone']
        if 'necessidade' in data:
            beneficiario.necessidade = data['necessidade']
        if 'situacao' in data:
            beneficiario.situacao = data['situacao']
        if 'dependentes' in data:
            beneficiario.dependentes = data['dependentes']
        
        db.session.commit()
        
        logger.info(f'Perfil de beneficiário atualizado: {beneficiario.id}')
        
        return jsonify({
            'message': 'Perfil atualizado com sucesso',
            'beneficiario': beneficiario.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        logger.error(f'Erro ao atualizar perfil de beneficiário: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@beneficiario_bp.route('/estatisticas', methods=['GET'])
@jwt_required()
def obter_estatisticas():
    """Obter estatísticas do beneficiário"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.beneficiario_profile:
            return jsonify({'error': 'Perfil de beneficiário não encontrado'}), 404
        
        beneficiario = user.beneficiario_profile
        
        # Contar reservas por status
        total_reservas = len(beneficiario.reservas)
        reservas_ativas = sum(1 for r in beneficiario.reservas if r.status == 'ativa')
        reservas_concluidas = sum(1 for r in beneficiario.reservas if r.status == 'concluida')
        reservas_canceladas = sum(1 for r in beneficiario.reservas if r.status == 'cancelada')
        
        return jsonify({
            'total_reservas': total_reservas,
            'reservas_ativas': reservas_ativas,
            'reservas_concluidas': reservas_concluidas,
            'reservas_canceladas': reservas_canceladas
        }), 200
        
    except Exception as e:
        logger.error(f'Erro ao obter estatísticas: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500