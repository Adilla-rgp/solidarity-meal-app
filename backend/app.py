from flask import Flask, jsonify, request
from config import config_by_name
from extensions import db, bcrypt, jwt, cors, migrate

def create_app(config_name='development'):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "expose_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True,
            "max_age": 3600
        }
    })
    
    # Inicializar extensões
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    
    # Importar e registrar blueprints
    from auth_routes import auth_bp
    from doacao_routes import doacao_bp
    from reserva_routes import reserva_bp
    from stats_routes import stats_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(doacao_bp, url_prefix='/api')
    app.register_blueprint(reserva_bp, url_prefix='/api')
    app.register_blueprint(stats_bp, url_prefix='/api')
    
    # Health check
    @app.route('/api/health', methods=['GET', 'OPTIONS'])
    def health():
        if request.method == 'OPTIONS':
            return '', 204
        return jsonify({'status': 'ok', 'message': 'Backend is running'}), 200
    
    # Rota para opções de alimentos (mocks)
    @app.route('/api/mocks', methods=['GET', 'OPTIONS'])
    def get_mocks():
        if request.method == 'OPTIONS':
            return '', 204
        return jsonify({
            'tiposAlimento': [
                {'value': 'fruta', 'label': 'Frutas'},
                {'value': 'verdura', 'label': 'Verduras'},
                {'value': 'legume', 'label': 'Legumes'},
                {'value': 'pao', 'label': 'Pães'},
                {'value': 'laticinio', 'label': 'Laticínios'},
                {'value': 'proteina', 'label': 'Proteínas'},
                {'value': 'pronto', 'label': 'Refeições Prontas'}
            ],
            'unidades': [
                {'value': 'kg', 'label': 'Quilogramas (kg)'},
                {'value': 'g', 'label': 'Gramas (g)'},
                {'value': 'unidade', 'label': 'Unidades'},
                {'value': 'litro', 'label': 'Litros (L)'},
                {'value': 'ml', 'label': 'Mililitros (mL)'},
                {'value': 'caixa', 'label': 'Caixas'},
                {'value': 'sacola', 'label': 'Sacolas'}
            ]
        }), 200
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Rota não encontrada'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Erro interno do servidor'}), 500
    
    # Criar banco de dados (sem try/except para evitar mensagens corrompidas)
    with app.app_context():
        db.create_all()
        print("Banco de dados inicializado com sucesso!")
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
