"""utcnow expression for generating a unix timestamp on the underlying sql server."""

from sqlalchemy.sql import expression
from sqlalchemy.ext import compiler
from sqlalchemy import types

# UTC function element based on http://docs.sqlalchemy.org/en/rel_0_9/core/compiler.html#utc-timestamp-function

# TODO(leah): Test that the postgres / mysql implementations of this will actually work...

class utcnow(expression.FunctionElement):
  type = types.BigInteger()


@compiler.compiles(utcnow, 'postgresql')
def pg_utcnow(element, compiler, **kw):
  return 'extract(epoch from now())::bigint'


@compiler.compiles(utcnow, 'sqlite')
def sqlite_utcnow(*args, **kwargs):
  return "(strftime('%s', 'now'))"


@compiler.compiles(utcnow, 'mysql')
def mysql_utcnow():
  return 'UNIX_TIMESTAMP()'
