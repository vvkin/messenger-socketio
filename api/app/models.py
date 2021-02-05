from typing import Type, TypeVar, Union
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from app.services.pg_api import PgAPI

T = TypeVar('T', bound='User')


class User(UserMixin):
    def __init__(self, user_id: Union[int, None], name: str, username: str,
                 email: str, status: str, password: str) -> None:
        self.user_id = user_id
        self.name = name
        self.username = username
        self.email = email
        self.status = status
        self.password = password

    @property
    def id(self) -> str:
        return self.username or self.email

    @classmethod
    def get(cls: Type[T], user_id: str) -> Union[T, None]:
        field = 'email' if '@' in user_id else 'username'
        query = f'SELECT * FROM users WHERE {field} = %s'
        user = PgAPI.execute_query(query, user_id).one()
        return cls(*user) if user else None

    @classmethod
    def from_json(cls: Type[T], data: dict[str, str]) -> T:
        return cls(
            user_id=data.get('user_id', None),
            name=data.get('name', ''),
            username=data.get('username', ''),
            email=data.get('email', ''),
            status=data.get('status', ''),
            password=generate_password_hash(data.get('password', ''))
        )

    @staticmethod
    def is_valid(data: dict[str, str]) -> bool:
        username, email = data['username'], data['email']
        if username or email:
            return not (
                username and User.get(username)
                or email and User.get(email)
            )
        else: return False

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password, password)

    def get_json(self) -> dict[str, str]:
        return {
            'name': self.name,
            'username': self.username,
            'email': self.email,
            'status': self.status
        }

    def get_chats(self) -> list[str]:
        query = 'SELECT * FROM get_user_chats(%s)'
        query_set = PgAPI.execute_query(query, self.user_id)
        return query_set.all()

    def update(self) -> None:
        # TODO: Update user in DB
        pass

    def insert(self) -> None:
        query = (
            'INSERT INTO users'
            '(name, username, email, status, password)'
            'VALUES (%s, %s, %s, %s, %s)'
        )
        values = [*self.__dict__.values()][1:]  # exclude id
        PgAPI.execute_call(query, *values)
