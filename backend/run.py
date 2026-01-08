import os
from app import create_app
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

app = create_app(config_name=os.getenv('FLASK_ENV', 'development'))

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    host = os.getenv('HOST', '0.0.0.0')
    app.run(host=host, port=port, debug=app.config['DEBUG'])