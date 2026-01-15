from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity,
    get_jwt
)
from extensions import db
from models import User
from datetime import datetime

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        return '', 204

    try:
        if not request.is_json:
            return jsonify({'error': 'Content-Type deve ser application/json'}), 400

        data = request.get_json(silent=True)
        if data is None:
            return jsonify({'error': 'JSON inválido'}), 400

        # Validar campos obrigatórios
        required_fields = ['email', 'senha', 'tipo', 'nome']
        campos_faltando = [f for f in required_fields if f not in data or not data[f]]
        if campos_faltando:
            return jsonify({'error': f'Campos obrigatórios faltando: {", ".join(campos_faltando)}'}), 400

        # Verificar se email já existe
        email = data['email']
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email já cadastrado'}), 409

        # Criar usuário
        user = User(
            email=data['email'],
            nome=data['nome'],
            tipo=data['tipo']
        )
        user.set_password(data['senha'])

        # Campos específicos por tipo
        if user.tipo == 'doador':
            user.estabelecimento = data.get('estabelecimento', '')
            user.localizacao = data.get('localizacao', '')
            user.telefone = data.get('telefone', '')
        elif user.tipo == 'beneficiario':
            user.endereco = data.get('endereco', '')
            user.necessidade = data.get('necessidade', '')
            user.telefone = data.get('telefone', '')

        db.session.add(user)
        db.session.commit()

        # Gerar token com tipo incluído
        access_token = create_access_token(
            identity=str(user.id),   # sempre string
            additional_claims={
                'tipo': user.tipo,
                'email': user.email,
                'nome': user.nome,
                'id': user.id
            }
        )

        return jsonify({
            'success': True,
            'access_token': access_token,
            'user': user.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro ao registrar: {str(e)}'}), 500


@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 204

    try:
        if not request.is_json:
            return jsonify({'error': 'Content-Type deve ser application/json'}), 400

        data = request.get_json()
        if not data or 'email' not in data or 'senha' not in data:
            return jsonify({'error': 'Email e senha são obrigatórios'}), 400

        email = data['email']
        senha = data['senha']

        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(senha):
            return jsonify({'error': 'Credenciais inválidas'}), 401

        if not user.is_active:
            return jsonify({'error': 'Conta desativada'}), 403

        # Gerar token com tipo incluído
        access_token = create_access_token(
            identity=str(user.id),   # sempre string
            additional_claims={
                'tipo': user.tipo,
                'email': user.email,
                'nome': user.nome,
                'id': user.id
            }
        )

        return jsonify({
            'success': True,
            'access_token': access_token,
            'user': user.to_dict()
        }), 200

    except Exception as e:
        return jsonify({'error': f'Erro ao fazer login: {str(e)}'}), 500


@auth_bp.route('/me', methods=['GET', 'OPTIONS'])
@jwt_required()
def get_current_user():
    if request.method == 'OPTIONS':
        return '', 204

    try:
        user_id = int(get_jwt_identity())  # converter para inteiro
        user = User.query.get(user_id)

        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404

        if not user.is_active:
            return jsonify({'error': 'Conta desativada'}), 403

        return jsonify({
            'success': True,
            'user': user.to_dict()
        }), 200

    except Exception as e:
        return jsonify({'error': f'Erro ao buscar usuário: {str(e)}'}), 500


@auth_bp.route('/logout', methods=['POST', 'OPTIONS'])
@jwt_required()
def logout():
    if request.method == 'OPTIONS':
        return '', 204

    return jsonify({'success': True, 'message': 'Logout realizado'}), 200