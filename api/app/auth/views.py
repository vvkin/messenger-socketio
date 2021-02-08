from flask import request
from flask_login import login_user, logout_user, current_user
from app import login_manager
from app.auth import auth
from app.models import User


@login_manager.user_loader
def load_user(user_id: str) -> User:
    return User.get(user_id)


@auth.route('/register/', methods=['POST'])
def register():
    user_data = request.get_json()
    if User.is_valid(user_data):
        user = User.from_json(user_data)
        user.insert()
        return user.get_json(), 201
    else: return {'error': 'Invalid credentials'}, 400


@auth.route('/login/', methods=['POST'])
def login():
    data = request.get_json()
    user = User.get(data['login'])
    if user and user.check_password(data['password']):
        login_user(user, remember=False)
        return user.get_json(), 200
    else: return {'error': 'Incorrect login or password'}, 401


@auth.route('/logout/', methods=['POST'])
def logout():
    if current_user.is_authenticated:
        logout_user()
        return {'success': 'Logged out'}, 200
    else: return {'error': 'Authentication required'}, 401


@auth.route('/get-user/', methods=['GET'])
def get_user():
    if current_user.is_authenticated:
        return current_user.get_json(), 200
    else: return {'error': 'Authentication required'}, 401
