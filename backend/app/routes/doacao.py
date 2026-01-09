from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import User, Doacao, Doador
from ..extensions import db
from datetime import datetime
import logging

doacao_bp = Blueprint('doacao', __name__, url_prefix='/api/doacoes')
logger = logging.getLogger(__name__)
@doacao_bp.route('', methods=['POST'])
@jwt_required()


def criar_doacao():

    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.doador_profile:
            return jsonify({'error': 'Apenas doadores podem criar doações'}), 403 #so deixa se for no perfil do doador
        
        data = request.get_json()
        
        required = ['nome', 'tipo', 'quantidade', 'unidade', 'validade']
        for field in required:
            if field not in data or not data[field]:
                return jsonify({'error': f'Campo {field} é obrigatório'}), 400
        
        # convertendo paara data
        try:
            validade = datetime.strptime(data['validade'], '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'error': 'Formato de data inválido. Use YYYY-MM-DD'}), 400
        

        doacao = Doacao(
            doador_id=user.doador_profile.id,
            nome=data['nome'],
            tipo=data['tipo'],
            quantidade=data['quantidade'],
            unidade=data['unidade'],
            validade=validade,
            descricao=data.get('descricao'),
            imagem=data.get('imagem'),
            status='ativa'
        )
        
        db.session.add(doacao)
        db.session.commit()
        
        logger.info(f'Doação criada: {doacao.nome} por doador {doacao.doador_id}')
        
        return jsonify({
            'message': 'Doação criada com sucesso',
            'doacao': doacao.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f'Erro ao criar doação: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@doacao_bp.route('', methods=['GET'])

def listar_doacoes():
    try:

        status = request.args.get('status', 'ativa')
        tipo = request.args.get('tipo')
        
        query = Doacao.query
        
        if status:
            query = query.filter_by(status=status)
        
        if tipo:
            query = query.filter_by(tipo=tipo)
        
        doacoes = query.order_by(Doacao.created_at.desc()).all() #vai listando da mais recente ate a mais antiga
        
        return jsonify({
            'doacoes': [d.to_dict() for d in doacoes],
            'total': len(doacoes)
        }), 200
        
    except Exception as e:
        logger.error(f'Erro ao listar doações: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@doacao_bp.route('/<int:doacao_id>', methods=['GET'])

def obter_doacao(doacao_id):

    try:
        doacao = Doacao.query.get(doacao_id)
        
        if not doacao:
            return jsonify({'error': 'Doação não encontrada'}), 404
        
        return jsonify({
            'doacao': doacao.to_dict()
        }), 200
        
    except Exception as e:
        logger.error(f'Erro ao obter doação: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@doacao_bp.route('/minhas', methods=['GET'])
@jwt_required()

def listar_minhas_doacoes():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.doador_profile:
            return jsonify({'error': 'Perfil de doador não encontrado'}), 404
        
        doador = user.doador_profile
        doacoes = doador.doacoes
        
        # ele pode filtrar por status
        status = request.args.get('status')
        if status:
            doacoes = [d for d in doacoes if d.status == status]
        
        return jsonify({
            'doacoes': [d.to_dict() for d in doacoes],
            'total': len(doacoes)
        }), 200
        
    except Exception as e:
        logger.error(f'Erro ao listar minhas doações: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@doacao_bp.route('/<int:doacao_id>', methods=['PUT'])
@jwt_required()


def atualizar_doacao(doacao_id):
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.doador_profile: 
            return jsonify({'error': 'Perfil de doador não encontrado'}), 404 #so deixa se for no perfil do doador
        
        doacao = Doacao.query.get(doacao_id)
        
        if not doacao:
            return jsonify({'error': 'Doação não encontrada'}), 404
        
        # Verificar se é o proprietário
        if doacao.doador_id != user.doador_profile.id:
            return jsonify({'error': 'Você não tem permissão para editar esta doação'}), 403
        
        data = request.get_json()
        
        if 'nome' in data:
            doacao.nome = data['nome']

        if 'tipo' in data:
            doacao.tipo = data['tipo']

        if 'quantidade' in data:
            doacao.quantidade = data['quantidade']

        if 'unidade' in data:
            doacao.unidade = data['unidade']

        if 'validade' in data:
            try:
                doacao.validade = datetime.strptime(data['validade'], '%Y-%m-%d').date()
            except ValueError:
                return jsonify({'error': 'Formato de data inválido. Use YYYY-MM-DD'}), 400
            
        if 'descricao' in data:
            doacao.descricao = data['descricao']

        if 'imagem' in data:
            doacao.imagem = data['imagem']

        if 'status' in data:
            doacao.status = data['status']
        
        db.session.commit()
        logger.info(f'Doação atualizada: {doacao.id}')
        
        return jsonify({
            'message': 'Doação atualizada com sucesso',
            'doacao': doacao.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        logger.error(f'Erro ao atualizar doação: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@doacao_bp.route('/<int:doacao_id>', methods=['DELETE'])
@jwt_required()


def deletar_doacao(doacao_id):
   
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        #primeiro verifica se o usuario tem perfil de doador
        if not user or not user.doador_profile:
            return jsonify({'error': 'Perfil de doador não encontrado'}), 404
        
        doacao = Doacao.query.get(doacao_id)
        
        if not doacao:
            return jsonify({'error': 'Doação não encontrada'}), 404
        
        #  verificar se eh o proprietário
        if doacao.doador_id != user.doador_profile.id:
            return jsonify({'error': 'Você não tem permissão para deletar esta doação'}), 403
        
        db.session.delete(doacao)
        db.session.commit()
        logger.info(f'Doação deletada: {doacao_id}')
        return jsonify({
            'message': 'Doação deletada com sucesso'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        logger.error(f'Erro ao deletar doação: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500