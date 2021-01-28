from app.services import db
from config import config
from flask import Flask
from flask_socketio import SocketIO
from flask_login import LoginManager

sio = SocketIO()
login_manager = LoginManager()


def create_app(config_name: str) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    db.init_app(app)
    sio.init_app(app)
    login_manager.init_app(app)

    from app.main import main
    app.register_blueprint(main)
    from app.auth import auth
    app.register_blueprint(auth)

    return app
