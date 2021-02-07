import os
from app import create_app, socketio

app = create_app(os.environ.get('FLASK_CONFIG') or 'default')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', debug=False)
