from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token, create_refresh_token,
    jwt_required, get_jwt_identity, get_jwt
)
from ..models.user import User
from ..extensions import db
from sqlalchemy import text, or_
from datetime import datetime
import logging

auth_bp = Blueprint('auth', __name__)
logger = logging.getLogger(__name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'Dados não fornecidos'}), 400
        
        required_fields = ['username', 'email', 'password']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'Campo {field} é obrigatório'}), 400
        
        if not User.validate_email(data['email']):
            return jsonify({'error': 'Email inválido'}), 400
        
        is_valid, msg = User.validate_password(data['password'])
        if not is_valid:
            return jsonify({'error': msg}), 400
        
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'error': 'Nome de usuário já existe'}), 409
        
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email já cadastrado'}), 409
        
        user = User(
            username=data['username'],
            email=data['email']
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        logger.info(f'Usuário registrado: {user.username} ({user.email})')
        
        return jsonify({
            'message': 'Usuário registrado com sucesso',
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f'Erro no registro: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'Dados não fornecidos'}), 400
        
        # Aceita tanto 'username' quanto 'identifier' (para email)
        identifier = data.get('username') or data.get('identifier') or data.get('email')
        password = data.get('password')
        
        if not identifier or not password:
            return jsonify({'error': 'Email/Username e senha são obrigatórios'}), 400
        
        # Buscar usuário por username OU email
        user = User.query.filter(
            or_(
                User.username == identifier,
                User.email == identifier
            )
        ).first()
        
        if not user or not user.check_password(password):
            logger.warning(f'Tentativa de login falha para: {identifier}')
            return jsonify({'error': 'Credenciais inválidas'}), 401
        
        if not user.is_active:
            return jsonify({'error': 'Conta desativada'}), 403
        
        # Adiciona 'role' (tipo) no token
        access_token = create_access_token(
            identity=user.id,
            additional_claims={
                'username': user.username, 
                'email': user.email,
                'role': user.tipo if hasattr(user, 'tipo') else 'doador',  # Adiciona role
                'is_admin': user.is_admin
            }
        )
        refresh_token = create_refresh_token(identity=user.id)
        
        logger.info(f'Login realizado: {user.username} ({user.email})')
        
        return jsonify({
            'message': 'Login realizado com sucesso',
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        logger.error(f'Erro no login: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        if not user.is_active:
            return jsonify({'error': 'Conta desativada'}), 403
        
        new_access_token = create_access_token(
            identity=user.id,
            additional_claims={
                'username': user.username, 
                'email': user.email,
                'role': user.tipo if hasattr(user, 'tipo') else 'doador',
                'is_admin': user.is_admin
            }
        )
        
        return jsonify({
            'access_token': new_access_token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        logger.error(f'Erro no refresh token: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        if not user.is_active:
            return jsonify({'error': 'Conta desativada'}), 403
        
        return jsonify({
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        logger.error(f'Erro ao obter perfil: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    try:
        jti = get_jwt()['jti']
        logger.info(f'Logout realizado para token JTI: {jti}')
        
        return jsonify({
            'message': 'Logout realizado com sucesso'
        }), 200
        
    except Exception as e:
        logger.error(f'Erro no logout: {str(e)}')
        return jsonify({'error': 'Erro interno no servidor'}), 500

@auth_bp.route('/validate-token', methods=['GET'])
@jwt_required()
def validate_token():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or not user.is_active:
            return jsonify({'valid': False}), 401
        
        return jsonify({
            'valid': True,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'valid': False}), 401

@auth_bp.route('/health', methods=['GET'])
def health_check():
    try:
        db.session.execute(text('SELECT 1'))
        
        result = db.session.execute(text(
            "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users')"
        ))
        table_exists = result.scalar()
        
        return jsonify({
            'status': 'OK',
            'service': 'auth',
            'database': 'connected',
            'table_users_exists': table_exists,
            'timestamp': datetime.utcnow().isoformat()
        }), 200
    except Exception as e:
        logger.error(f'Health check falhou: {str(e)}')
        return jsonify({
            'status': 'ERROR',
            'service': 'auth',
            'database': 'disconnected',
            'error': str(e)
        }), 500