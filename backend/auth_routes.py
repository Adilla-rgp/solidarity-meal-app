
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
        print("=" * 60)
        print("BACKEND DEBUG - /register INICIADO")
        print("=" * 60)

        if not request.is_json:
            print("ERRO: Request não é JSON!")
            return jsonify({'error': 'Content-Type deve ser application/json'}), 400

        data = request.get_json(silent=True)

        if data is None:
            print("ERRO: JSON inválido")
            return jsonify({'error': 'JSON inválido'}), 400

        print(f"Dados recebidos: {data}")

        # Validar campos obrigatórios
        required_fields = ['email', 'senha', 'tipo', 'nome']
        campos_faltando = [f for f in required_fields if f not in data or not data[f]]

        if campos_faltando:
            print(f"Campos faltando: {campos_faltando}")
            return jsonify({'error': f'Campos obrigatórios faltando: {", ".join(campos_faltando)}'}), 400

        # Verificar se email já existe
        email = data['email']
        if User.query.filter_by(email=email).first():
            print(f"Email '{email}' já cadastrado")
            return jsonify({'error': 'Email já cadastrado'}), 409

        # Criar usuário
        user = User(
            email=data['email'],
            nome=data['nome'],
            tipo=data['tipo']
        )
        user.set_password(data['senha'])

        # Campos específicos por tipo
        tipo = data['tipo']
        print(f"Tipo de usuário: {tipo}")

        if tipo == 'doador':
            user.estabelecimento = data.get('estabelecimento', '')
            user.localizacao = data.get('localizacao', '')
            user.telefone = data.get('telefone', '')
        elif tipo == 'beneficiario':
            user.endereco = data.get('endereco', '')
            user.necessidade = data.get('necessidade', '')
            user.telefone = data.get('telefone', '')

        db.session.add(user)
        db.session.commit()

        print(f"Usuário criado com ID: {user.id}")

        # Gerar token com tipo incluído
        access_token = create_access_token(
            identity=user.id,
            additional_claims={
                'tipo': user.tipo,  # CRÍTICO: incluir tipo no token
                'email': user.email,
                'nome': user.nome,
                'id': user.id
            }
        )

        user_dict = user.to_dict()
        print(f"Token gerado com tipo: {user.tipo}")
        print(f"User dict: {user_dict}")

        return jsonify({
            'success': True,
            'access_token': access_token,
            'user': user_dict
        }), 201

    except Exception as e:
        print(f"EXCEÇÃO EM /register: {str(e)}")
        import traceback
        traceback.print_exc()
        db.session.rollback()
        return jsonify({'error': f'Erro ao registrar: {str(e)}'}), 500


@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 204

    try:
        print("=" * 60)
        print("BACKEND DEBUG - /login INICIADO")

        if not request.is_json:
            return jsonify({'error': 'Content-Type deve ser application/json'}), 400

        data = request.get_json()
        print(f"Dados recebidos: {data}")

        if not data or 'email' not in data or 'senha' not in data:
            return jsonify({'error': 'Email e senha são obrigatórios'}), 400

        email = data['email']
        senha = data['senha']

        user = User.query.filter_by(email=email).first()

        if not user:
            print(f"Usuário com email '{email}' não encontrado")
            return jsonify({'error': 'Credenciais inválidas'}), 401

        if not user.check_password(senha):
            print(f"Senha incorreta para usuário '{email}'")
            return jsonify({'error': 'Credenciais inválidas'}), 401

        if not user.is_active:
            print(f"Usuário '{email}' desativado")
            return jsonify({'error': 'Conta desativada'}), 403

        print(f"Login bem-sucedido para '{email}' (tipo: {user.tipo})")

        # Gerar token com tipo incluído
        access_token = create_access_token(
            identity=user.id,
            additional_claims={
                'tipo': user.tipo,  # CRÍTICO: incluir tipo no token
                'email': user.email,
                'nome': user.nome,
                'id': user.id
            }
        )

        user_dict = user.to_dict()
        
        print(f"Token gerado com tipo: {user.tipo}")
        print(f"Retornando user: {user_dict}")
        print("=" * 60)

        return jsonify({
            'success': True,
            'access_token': access_token,
            'user': user_dict
        }), 200

    except Exception as e:
        print(f"EXCEÇÃO EM /login: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': f'Erro ao fazer login: {str(e)}'}), 500


@auth_bp.route('/me', methods=['GET', 'OPTIONS'])
@jwt_required()
def get_current_user():
    if request.method == 'OPTIONS':
        return '', 204

    try:
        user_id = get_jwt_identity()
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