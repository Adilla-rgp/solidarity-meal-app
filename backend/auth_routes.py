# -*- coding: utf-8 -*-
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

        # Verificar headers
        print("HEADERS recebidos:")
        for key, value in request.headers.items():
            if key.startswith('Content') or key.startswith('Accept'):
                print(f"  {key}: {value}")

        # Verificar se e JSON
        print(f"\nContent-Type: {request.content_type}")
        print(f"is_json: {request.is_json}")

        if not request.is_json:
            print("ERRO: Request nao e JSON!")
            print(f"Dados brutos: {request.data}")
            return jsonify({'error': 'Content-Type deve ser application/json'}), 400

        # Tentar parsear JSON
        data = request.get_json(silent=True)

        print("\nDADOS RECEBIDOS:")
        if data is None:
            print("Dados sao None (JSON invalido)")
            print(f"Raw data: {request.data}")
            try:
                raw_text = request.data.decode('utf-8') if request.data else 'vazio'
                print(f"Texto bruto: {raw_text}")
            except:
                print("Nao conseguiu decodificar dados")
            return jsonify({'error': 'JSON invalido'}), 400

        print(f"Tipo: {type(data)}")
        print(f"Conteudo: {data}")

        if data:
            print(f"Campos: {list(data.keys())}")
            print("\nVALORES DOS CAMPOS:")
            for key, value in data.items():
                print(f"  {key}: '{value}' (tipo: {type(value).__name__})")
        else:
            print("Dados vazios (dict vazio)")

        print("\n" + "=" * 60)

        # Validar campos obrigatorios
        required_fields = ['email', 'senha', 'tipo', 'nome']
        print("VALIDACAO DE CAMPOS OBRIGATORIOS:")

        campos_faltando = []
        for field in required_fields:
            if field not in data:
                campos_faltando.append(field)
                print(f" {field}: FALTANDO")
            else:
                valor = data[field]
                if not valor or (isinstance(valor, str) and valor.strip() == ''):
                    print(f"{field}: PRESENTE mas vazio ('{valor}')")
                else:
                    print(f"{field}: OK ('{valor}')")

        if campos_faltando:
            print(f"\nCAMPOS FALTANDO: {campos_faltando}")
            return jsonify({'error': f'Campos obrigatorios faltando: {", ".join(campos_faltando)}'}), 400

        print("\nTODOS OS CAMPOS OBRIGATORIOS PRESENTES")

        # Verificar se email ja existe
        email = data['email']
        if User.query.filter_by(email=email).first():
            print(f" Email '{email}' ja cadastrado")
            return jsonify({'error': 'Email ja cadastrado'}), 409
        print(f"Email '{email}' disponivel")

        # Criar usuario
        user = User(
            email=data['email'],
            nome=data['nome'],
            tipo=data['tipo']
        )
        user.set_password(data['senha'])

        # Campos especificos por tipo
        tipo = data['tipo']
        print(f"\nTIPO DE USUARIO: {tipo}")

        if tipo == 'doador':
            user.estabelecimento = data.get('estabelecimento', '')
            user.localizacao = data.get('localizacao', '')
            user.telefone = data.get('telefone', '')
            print(f"  Estabelecimento: '{user.estabelecimento}'")
            print(f"  Localizacao: '{user.localizacao}'")
            print(f"  Telefone: '{user.telefone}'")
        elif tipo == 'beneficiario':
            user.endereco = data.get('endereco', '')
            user.necessidade = data.get('necessidade', '')
            user.telefone = data.get('telefone', '')
            print(f"  Endereco: '{user.endereco}'")
            print(f"  Necessidade: '{user.necessidade}'")
            print(f"  Telefone: '{user.telefone}'")
        else:
            print(f" Tipo invalido: {tipo}")
        db.session.add(user)
        db.session.commit()

        print(f"Usuario criado com ID: {user.id}")
        # Gerar token
        access_token = create_access_token(
            identity=user.id,
            additional_claims={
                'tipo': user.tipo,
                'email': user.email,
                'nome': user.nome,
                'id': user.id
            }
        )

        user_dict = user.to_dict()
        print(f"Token gerado: {access_token[:50]}...")
        print(f"Dados do usuario: {user_dict}")

        print("\n" + "=" * 60)
        print("/register FINALIZADO COM SUCESSO")
        print("=" * 60 + "\n")

        return jsonify({
            'success': True,
            'access_token': access_token,
            'user': user_dict
        }), 201

    except Exception as e:
        print(f"\nEXCECAO EM /register: {str(e)}")
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
            print(" Request nao e JSON")
            return jsonify({'error': 'Content-Type deve ser application/json'}), 400

        data = request.get_json()

        print(f"Dados recebidos: {data}")
        if data:
            print(f"Campos: {list(data.keys())}")

        if not data or 'email' not in data or 'senha' not in data:
            print(" Campos email ou senha faltando")
            return jsonify({'error': 'Email e senha sao obrigatorios'}), 400

        email = data['email']
        senha = data['senha']

        user = User.query.filter_by(email=email).first()

        if not user:
            print(f"Usuario com email '{email}' nao encontrado")
            return jsonify({'error': 'Credenciais invalidas'}), 401

        if not user.check_password(senha):
            print(f"Senha incorreta para usuario '{email}'")
            return jsonify({'error': 'Credenciais invalidas'}), 401

        if not user.is_active:
            print(f"Usuario '{email}' desativado")
            return jsonify({'error': 'Conta desativada'}), 403

        print(f"Login bem-sucedido para '{email}'")

        # Gerar token
        access_token = create_access_token(
            identity=user.id,
            additional_claims={
                'tipo': user.tipo,
                'email': user.email,
                'nome': user.nome,
                'id': user.id
            }
        )

        print(f"Token gerado: {access_token[:50]}...")
        print("=" * 60 + "\n")

        return jsonify({
            'success': True,
            'access_token': access_token,
            'user': user.to_dict()
        }), 200

    except Exception as e:
        print(f"EXCECAO EM /login: {str(e)}")
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
            return jsonify({'error': 'Usuario nao encontrado'}), 404

        return jsonify({
            'success': True,
            'user': user.to_dict()
        }), 200

    except Exception as e:
        return jsonify({'error': f'Erro ao buscar usuario: {str(e)}'}), 500


@auth_bp.route('/logout', methods=['POST', 'OPTIONS'])
@jwt_required()
def logout():
    if request.method == 'OPTIONS':
        return '', 204

    return jsonify({'success': True, 'message': 'Logout realizado'}), 200