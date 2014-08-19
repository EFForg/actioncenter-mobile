"""Utilities for working with SQLAlchemy and underlying databases."""

import json

from flask.ext import sqlalchemy
from sqlalchemy import types
from sqlalchemy.dialects import mysql
from sqlalchemy.dialects import postgresql
from sqlalchemy.dialects import sqlite

db = sqlalchemy.SQLAlchemy()

# SQLite doesn't support using autoincrement with a BigInteger field type, so set up a hybrid
# BigInteger type that works as a regular integer (dynamic in sqlite) so it all works.
BigIntegerType = db.BigInteger()
BigIntegerType = BigIntegerType.with_variant(postgresql.BIGINT(), 'postgresql')
BigIntegerType = BigIntegerType.with_variant(mysql.BIGINT(), 'mysql')
BigIntegerType = BigIntegerType.with_variant(sqlite.INTEGER(), 'sqlite')


class SessionWrapper(object):

  def __init__(self):
    self.session = db.create_scoped_session()

  def __enter__(self):
    return self.session

  def __exit__(self, exc_type, exc_val, exc_tb):
    if exc_val:
      self.session.rollback()
    else:
      self.session.commit()
    self.session.close()


class JSONEncodedObject(types.TypeDecorator):
  """Support serializing / deserializing a JSON object to text in the database."""
  impl = types.Text

  def process_bind_param(self, value, dialect):
    return json.dumps(value) if value is not None else value

  def process_result_value(self, value, dialect):
    return json.loads(value) if value is not None else value
