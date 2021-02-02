from psycopg2.extras import DictCursor
from app.services.db import get_db


class QuerySet:
    def __init__(self, query_set):
        self.query_set = query_set

    def all(self):
        if self.query_set:
            return self.query_set.fetchall()
        else: return None

    def one(self):
        if self.query_set:
            return self.query_set.fetchone()
        else: return None


class PgAPI:
    @staticmethod
    def get_cursor(cursor_factory=None):
        return get_db().cursor(cursor_factory=cursor_factory)

    @staticmethod
    def execute_query(query: str, *args) -> QuerySet:
        cursor = PgAPI.get_cursor()
        cursor.execute(query, args)
        return QuerySet(cursor)

    @staticmethod
    def execute_dict_query(query: str, *args) -> QuerySet:
        cursor = PgAPI.get_cursor(DictCursor)
        cursor.execute(query, args)
        return QuerySet(cursor)

    @staticmethod
    def execute_call(query: str, *args) -> None:
        cursor = PgAPI.get_cursor()
        cursor.execute(query, args)
