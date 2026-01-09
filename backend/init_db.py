
from app import create_app
from app.extensions import db
from app.models import User, Doador, Beneficiario, Doacao, Reserva

app = create_app()

def init_db():
    with app.app_context():
        db.create_all()
        
        inspector = db.inspect(db.engine)
        tables = inspector.get_table_names()
        
        print("\nTabelas no banco de dados:")
        for table in tables:
            print(f"  - {table}")

if __name__ == "__main__":
    init_db()