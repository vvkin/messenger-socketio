from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_socketio import SocketIO
from app.services import db
from config import config


cors = CORS(resources={'/*': {'origins': 'http://localhost:3000'}})
sio = SocketIO()
login_manager = LoginManager()


def create_app(config_name: str) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    cors.init_app(app)
    db.init_app(app)
    login_manager.init_app(app)
    sio.init_app(app)
    
    from app.auth import auth
    app.register_blueprint(auth)
    from app.main import main
    app.register_blueprint(main)
    
    return app
