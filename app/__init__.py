from flask import Flask
from flask_socketio import SocketIO
from config import config

socketio = SocketIO()


def create_app(config_name: str) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    socketio.init_app(app)
    return app
