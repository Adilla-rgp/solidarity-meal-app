import logging
from flask import Flask, jsonify
from flask_cors import CORS
from config import config_by_name

def create_app(config_name='development'):
    app = Flask(__name__)
    
    # Carregar configurações
    app.config.from_object(config_by_name[config_name])
    
    # Configurar logging
    logging.basicConfig(
        level=app.config['LOG_LEVEL'],
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Configurar CORS para desenvolvimento
    CORS(app, resources={
        r"/*": {
            "origins": ["http://localhost:3000", "http://127.0.0.1:3000", 
                       "http://localhost:5500", "http://127.0.0.1:5500",
                       "http://localhost:8080", "http://127.0.0.1:8080"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
            "allow_headers": ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
            "expose_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True,
            "max_age": 3600
        }
    })
    
    # Inicializar extensões
    from .extensions import db, bcrypt, jwt, migrate
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    
    # Configurar JWT callbacks
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({
            'error': 'Token expirado',
            'message': 'O token de acesso expirou'
        }), 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({
            'error': 'Token inválido',
            'message': 'Token de autenticação inválido'
        }), 401
    
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({
            'error': 'Token necessário',
            'message': 'Token de autenticação não fornecido'
        }), 401
    
    # Registrar blueprints/rotas
    from .routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api')
    
    # Health check básico
    @app.route('/')
    def index():
        return jsonify({
            'name': 'Solidarity Meal API',
            'version': '1.0.0',
            'status': 'online',
            'endpoints': {
                'auth': '/api/*',
                'health': '/api/health',
                'register': '/api/register',
                'login': '/api/login',
                'profile': '/api/me',
                'validate': '/api/validate-token',
                'refresh': '/api/refresh',
                'logout': '/api/logout'
            }
        })
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Endpoint não encontrado'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        app.logger.error(f'Erro interno: {str(error)}')
        return jsonify({'error': 'Erro interno do servidor'}), 500
    
    return app