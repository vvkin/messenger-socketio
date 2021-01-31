import functools
from flask_login import current_user
from flask_socketio import disconnect


def login_required(f):
    @functools.wraps(f)
    def wrapped(*args, **kwargs):
        if not current_user.is_authenticated:
            disconnect()
        else: return f(*args, **kwargs)
    return wrapped
