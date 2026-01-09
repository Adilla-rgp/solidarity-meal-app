from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import User, Doador
from ..extensions import db
import logging

doador_bp = Blueprint('doador', __name__, url_prefix='/api/doador')
logger = logging.getLogger(__name__)

@doador_bp.route('/perfil', methods=['POST'])
@jwt_required()


def criar_perfil_doador():

    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        # se ja tem perfil de doador
        if user.doador_profile:
            return jsonify({'error': 'Usuário já possui perfil de doador'}), 409
        
        data = request.get_json()
        
        # Validar 
        required = ['estabelecimento', 'localizacao', 'telefone']
        for field in required:
            if field not in data or not data[field]:
                return jsonify({'error': f'Campo {field} é obrigatório'}), 400
        
        # Criar perfil de doador
        doador = Doador(
            user_id=user_id,
            estabelecimento=data['estabelecimento'],
            localizacao=data['localizacao'],
            telefone=data['telefone'],
            cnpj=data.get('cnpj'),
            endereco=data.get('endereco')
        )
        
        db.session.add(doador)
        db.session.commit()
        
        logger.info(f'Perfil de doador criado: {doador.estabelecimento}')
        
        return jsonify({
            'message': 'Perfil de doador criado com sucesso',
            'doador': doador.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f'Erro ao criar perfil de doador: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@doador_bp.route('/perfil', methods=['GET'])


@jwt_required()
def obter_perfil_doador():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        if not user.doador_profile:
            return jsonify({'error': 'Perfil de doador não encontrado'}), 404
        
        doador = user.doador_profile
        
        return jsonify({
            'doador': doador.to_dict(),
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        logger.error(f'Erro ao obter perfil de doador: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@doador_bp.route('/perfil', methods=['PUT'])
@jwt_required()
def atualizar_perfil_doador():

    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.doador_profile:
            return jsonify({'error': 'Perfil de doador não encontrado'}), 404
        
        data = request.get_json()
        doador = user.doador_profile
        
        # Atualizar campos
        if 'estabelecimento' in data:
            doador.estabelecimento = data['estabelecimento']

        if 'localizacao' in data:
            doador.localizacao = data['localizacao']

        if 'telefone' in data:
            doador.telefone = data['telefone']

        if 'cnpj' in data:
            doador.cnpj = data['cnpj']

        if 'endereco' in data:
            doador.endereco = data['endereco']
        
        db.session.commit()
        
        logger.info(f'Perfil de doador atualizado: {doador.id}')
        
        return jsonify({
            'message': 'Perfil atualizado com sucesso',
            'doador': doador.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        logger.error(f'Erro ao atualizar perfil de doador: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@doador_bp.route('/estatisticas', methods=['GET'])
@jwt_required()


def obter_estatisticas():
 
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.doador_profile:
            return jsonify({'error': 'Perfil de doador não encontrado'}), 404
        
        doador = user.doador_profile
        
        total_doacoes = len(doador.doacoes)
        doacoes_ativas = sum(1 for d in doador.doacoes if d.status == 'ativa')
        doacoes_reservadas = sum(1 for d in doador.doacoes if d.status == 'reservada')
        doacoes_entregues = sum(1 for d in doador.doacoes if d.status == 'entregue')
        
        return jsonify({
            'total_doacoes': total_doacoes,
            'doacoes_ativas': doacoes_ativas,
            'doacoes_reservadas': doacoes_reservadas,
            'doacoes_entregues': doacoes_entregues
        }), 200
        
    except Exception as e:
        logger.error(f'Erro ao obter estatísticas: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500