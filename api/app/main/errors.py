from psycopg2 import Error
from app.main import main


@main.app_errorhandler(500)
def internal_error(e):
    if e is Error:
        error = 'Database server error'
    else:
        error = 'Internal server error'
    return {'error': error}, 500
