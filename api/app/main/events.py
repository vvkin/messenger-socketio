from app import sio
from flask_login import current_user
from flask_socketio import join_room, ConnectionRefusedError


@sio.event
def connect():
    if current_user.is_authenticated:
        chats = current_user.get_chats()
        for chat in chats:
            join_room(chat)
    else: return ConnectionRefusedError('Unauthorized!')


@sio.event
def disconnect():
    pass
