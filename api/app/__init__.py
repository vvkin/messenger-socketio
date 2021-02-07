from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_socketio import SocketIO
from app.services import db
from config import config

react_origin = 'http://localhost:3000'
cors = CORS(resources={'/*': {'origins': react_origin}}, supports_credentials=True)
login_manager = LoginManager()
socketio = SocketIO(cors_allowed_origins=react_origin)


def create_app(config_name: str) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    cors.init_app(app)
    db.init_app(app)
    login_manager.init_app(app)
    socketio.init_app(app)

    from app.auth import auth
    app.register_blueprint(auth)
    from app.main import main
    app.register_blueprint(main)

    return app
