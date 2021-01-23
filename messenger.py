import os
from app import create_app

print('CONFIG', os.environ.get('FLASK_CONFIG'))
app = create_app(os.environ.get('FLASK_CONFIG') or 'default')
