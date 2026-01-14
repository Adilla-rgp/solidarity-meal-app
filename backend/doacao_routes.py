# -*- coding: utf-8 -*-
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from extensions import db
from models import Doacao, Reserva, User
from datetime import datetime

doacao_bp = Blueprint('doacoes', __name__)

@doacao_bp.route('/doacoes', methods=['GET', 'OPTIONS'])
def listar_doacoes():
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        # Filtrar apenas doaecoes ativas
        doacoes = Doacao.query.filter_by(status='ativa').all()
        
        return jsonify({
            'success': True,
            'doacoes': [d.to_dict() for d in doacoes],
            'total': len(doacoes)
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro ao listar doaecoes: {str(e)}'}), 500


@doacao_bp.route('/doacoes/<int:doacao_id>', methods=['GET', 'OPTIONS'])
def get_doacao(doacao_id):
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        doacao = Doacao.query.get_or_404(doacao_id)
        return jsonify({'success': True, 'doacao': doacao.to_dict()}), 200
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar doacao: {str(e)}'}), 500


@doacao_bp.route('/doacoes', methods=['POST', 'OPTIONS'])
@jwt_required()
def criar_doacao():
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        claims = get_jwt()
        if claims.get('tipo') != 'doador':
            return jsonify({'error': 'Acesso negado. Apenas doadores podem criar doacoes'}), 403
        
        data = request.get_json()
        
        # Campos obrigatorios
        required = ['nome', 'tipo', 'quantidade', 'unidade', 'validade']
        for field in required:
            if field not in data:
                return jsonify({'error': f'{field} e obrigatorio'}), 400
        
        # Converter string de validade para datetime
        try:
            validade = datetime.fromisoformat(data['validade'].replace('Z', '+00:00'))
        except:
            return jsonify({'error': 'Formato de data invalido. Use ISO 8601'}), 400
        
        # Criar doacao
        doacao = Doacao(
            nome=data['nome'],
            tipo=data['tipo'],
            quantidade=float(data['quantidade']),
            unidade=data['unidade'],
            validade=validade,
            descricao=data.get('descricao', ''),
            imagem=data.get('imagem', ''),
            distancia=data.get('distancia', '5 km'),
            urgente=data.get('urgente', False),
            doador_id=get_jwt_identity()
        )
        
        db.session.add(doacao)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Doacao criada com sucesso',
            'doacao': doacao.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro ao criar doacao: {str(e)}'}), 500


@doacao_bp.route('/doacoes/<int:doacao_id>', methods=['PUT', 'OPTIONS'])
@jwt_required()
def atualizar_doacao(doacao_id):
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        doacao = Doacao.query.get_or_404(doacao_id)
        claims = get_jwt()
        
        # Verificar se o usuario e o dono da doacao
        if doacao.doador_id != get_jwt_identity():
            return jsonify({'error': 'Acesso negado'}), 403
        
        data = request.get_json()
        
        # Atualizar campos
        if 'nome' in data:
            doacao.nome = data['nome']
        if 'tipo' in data:
            doacao.tipo = data['tipo']
        if 'quantidade' in data:
            doacao.quantidade = float(data['quantidade'])
        if 'unidade' in data:
            doacao.unidade = data['unidade']
        if 'validade' in data:
            try:
                doacao.validade = datetime.fromisoformat(data['validade'].replace('Z', '+00:00'))
            except:
                return jsonify({'error': 'Formato de data invalido'}), 400
        if 'descricao' in data:
            doacao.descricao = data['descricao']
        if 'status' in data:
            doacao.status = data['status']
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Doacao atualizada',
            'doacao': doacao.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro ao atualizar doacao: {str(e)}'}), 500


@doacao_bp.route('/doacoes/<int:doacao_id>', methods=['DELETE', 'OPTIONS'])
@jwt_required()
def deletar_doacao(doacao_id):
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        doacao = Doacao.query.get_or_404(doacao_id)
        
        # Verificar se o usuario e o dono da doacao
        if doacao.doador_id != get_jwt_identity():
            return jsonify({'error': 'Acesso negado'}), 403
        
        db.session.delete(doacao)
        db.session.commit()
        
        return jsonify({'success': True, 'message': 'Doacao deletada'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro ao deletar doacao: {str(e)}'}), 500


@doacao_bp.route('/minhas-doacoes', methods=['GET', 'OPTIONS'])
@jwt_required()
def minhas_doacoes():
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        claims = get_jwt()
        if claims.get('tipo') != 'doador':
            return jsonify({'error': 'Acesso negado'}), 403
        
        doacoes = Doacao.query.filter_by(doador_id=get_jwt_identity()).all()
        
        return jsonify({
            'success': True,
            'doacoes': [d.to_dict() for d in doacoes],
            'total': len(doacoes)
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar doaecoes: {str(e)}'}), 500
