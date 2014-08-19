"""Database models for use with the push server."""

from push_server.db import database
from push_server.db import utcnow

db = database.db


class PushServerModel(db.Model):

  __abstract__ = True

  @classmethod
  def get_or_create(cls, session, **kwargs):
    """Gets an instance if one matching the supplied kwargs exists, or creates a new entry."""
    kwargs = dict((k, v,) for k, v in kwargs.iteritems() if v is not None)
    instance = None
    if kwargs:
      instance = session.query(cls).filter_by(**kwargs).first()

    return instance or cls(**kwargs)

  def to_dict(self):
    return dict((col, getattr(self, col),) for col in self.__table__.columns.keys())


class Subscriptions(PushServerModel):
  """Tracks devices that have registered with the server."""

  __tablename__ = 'devices'

  subscription_id = db.Column(database.BigIntegerType, primary_key=True, autoincrement=True)
  protocol = db.Column(db.String(10))
  # the language identifier, ideally a BCP-47 id, but could be any string
  language = db.Column(db.String(20))
  # device token for APNS, registration_id for GCM etc.
  device_id = db.Column(db.Text, nullable=False)
  created_on = db.Column(db.BigInteger, nullable=False, server_default=utcnow.utcnow())


class Notifications(PushServerModel):
  """Tracks the notifications that have been sent through this server."""

  __tablename__ = 'notifications'

  notification_id = db.Column(database.BigIntegerType, primary_key=True, autoincrement=True)
  payload = db.Column(database.JSONEncodedObject, nullable=False)
  created_on = db.Column(db.BigInteger, nullable=False, server_default=utcnow.utcnow())
