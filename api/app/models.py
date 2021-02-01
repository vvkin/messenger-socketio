from app.services.pg_api import PgAPI
from flask_login import UserMixin
from typing import Type, TypeVar, Union
from werkzeug.security import generate_password_hash, check_password_hash

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
        data['user_id'] = None
        data['password'] = generate_password_hash(data['password'])
        return cls(**data)

    @staticmethod
    def is_valid(username: str, email: str) -> bool:
        return not (
            username and User.get(username)
            or email and User.get(email)
        )

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
