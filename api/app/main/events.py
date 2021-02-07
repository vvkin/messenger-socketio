from flask_login import current_user
from flask_socketio import join_room, ConnectionRefusedError
from app import socketio


@socketio.event
def connect():
    if current_user.is_authenticated:
        chats = current_user.get_chats()
        for chat in chats:
            join_room(chat)
    else: return ConnectionRefusedError('Unauthorized!')


@socketio.event
def disconnect():
    pass
