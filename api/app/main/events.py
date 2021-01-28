from app import sio


@sio.event
def connect(environ):
    pass


@sio.event
def disconnect():
    pass
