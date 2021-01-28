from app.services.pg_api import PgAPI


class User:
    @staticmethod
    def get(user_id: int):
        query = 'SELECT * FROM users_auth WHERE user_id=%s'
        query_set = PgAPI.execute_query(query, user_id)
        return query_set.one()
