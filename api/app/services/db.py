import psycopg2
import click
from flask import current_app, g
from flask.cli import with_appcontext


def get_db():
    if 'db' not in g:
        db_config = current_app.config['DATABASE']
        g.db = psycopg2.connect(db_config)
        g.db.autocommit = True
    return g.db


def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()


def init_db():
    with current_app.open_resource('schema.sql', 'r') as fhand:
        cursor = get_db().cursor()
        cursor.execute(fhand.read())


@click.command('init-db')
@with_appcontext
def init_db_command():
    init_db()
    click.echo('Initialized the database')


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
