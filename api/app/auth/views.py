from app import login_manager
from app.auth import auth
from app.models import User
from flask import request
from flask_login import login_user, logout_user, current_user


@login_manager.user_loader
def load_user(user_id: str) -> User:
    return User.get(user_id)


@auth.route('/register/', methods=['POST'])
def register():
    data = request.get_json()
    if User.is_valid(data['username'], data['email']):
        user = User.from_json(data)
        user.insert()
        return {'user': user.get_json()}, 201
    else: return {'error': 'Invalid credentials'}, 400


@auth.route('/login/', methods=['POST'])
def login():
    data = request.get_json()
    user = User.get(data['login'])
    if user and user.check_password(data['password']):
        login_user(user)
        return {'user': user.get_json()}, 200
    else: return {'error': 'Invalid credentials'}, 401


@auth.route('/logout/', methods=['POST'])
def logout():
    if current_user.is_authenticated:
        logout_user()
        return {'success': 'Logged out'}, 200
    else: return {'error': 'Authentication required'}, 401


@auth.route('/get-user/', methods=['POST'])
def get_user():
    if current_user.is_authenticated:
        return {'user': current_user.get_json()}, 200
    else: return {'error': 'Authentication required'}, 400
