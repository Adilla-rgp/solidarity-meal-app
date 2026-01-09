import logging
from flask import Flask, jsonify
from flask_cors import CORS
from config import config_by_name

def create_app(config_name='development'):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    logging.basicConfig(
        level=app.config['LOG_LEVEL'],
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
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
    
    from .extensions import db, bcrypt, jwt, migrate
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    
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
    
    # Registra blueprints/rotas
    from .routes import auth_bp, doador_bp, beneficiario_bp, doacao_bp, reserva_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(doador_bp)
    app.register_blueprint(beneficiario_bp)
    app.register_blueprint(doacao_bp)
    app.register_blueprint(reserva_bp)
    
    #rota raiz
    @app.route('/')
    def index():
        return jsonify({
            'name': 'Prato Solidário API',
            'version': '1.0.0',
            'status': 'online',
            'endpoints': {
                'auth': '/api/*',
                'doador': '/api/doador/*',
                'beneficiario': '/api/beneficiario/*',
                'doacoes': '/api/doacoes/*',
                'reservas': '/api/reservas/*',
                'health': '/api/health'
            }
        })
    


    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Endpoint não encontrado'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        app.logger.error(f'Erro interno: {str(error)}')
        return jsonify({'error': 'Erro interno do servidor'}), 500
    
    return app