from app.services.pg_api import PgAPI
from flask_login import UserMixin
from typing import Type, TypeVar, Union
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
    def get(cls: Type[T], id: str) -> Union[T, None]:
        field = 'email' if '@' in id else 'username'
        query = 'SELECT * FROM users WHERE %s=%s'
        user = PgAPI.execute_query(query, field, id).one()
        return cls(*user[1:]) if user else None

    @classmethod
    def from_json(cls: Type[T], data: dict[str, str]) -> T:
        return cls(**data)

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

    def update(self) -> None:
        # TODO: Update user in DB
        pass

    def insert(self) -> None:
        # TODO: Insert new user to DB
        pass
