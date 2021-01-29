from app.services.pg_api import PgAPI
from flask_login import UserMixin
from typing import Type, TypeVar
from werkzeug.security import generate_password_hash, check_password_hash

T = TypeVar('T', bound='User')


class User(UserMixin):
    def __init__(self, name: str, username: str, email: str,
                 password: str, status: str) -> None:
        self.name = name
        self.username = username
        self.email = email
        self.status = status
        self.set_password(password)

    @property
    def id(self) -> str:
        return self.username or self.email

    @classmethod
    def get(cls: Type[T], id: str) -> T:
        field = 'email' if '@' in id else 'username'
        query = 'SELECT * FROM user WHERE %s=%s'
        query_set = PgAPI.execute_query(query, field, id)
        return cls(*query_set.one()[1:])

    def set_password(self, password: str) -> None:
        self.password = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password, password)

    def get_json(self) -> dict[str, str]:
        return {
            'name': self.name,
            'username': self.username,
            'email': self.email,
            'status': self.status
        }

    def save(self) -> None:
        # TODO: Update user in DB
        pass

    def create(self) -> None:
        # TODO: Insert new user to DB
        pass
