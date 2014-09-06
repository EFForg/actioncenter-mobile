"""Simple handler for sending push requests to GCM / APNS and dealing with failures."""

import grequests
import sys

import Queue

from flask import current_app
from push_server import models
from push_server.db import database


# class PushRequestHandler(object):
#
#   def send(self):
#     pass
#
#   def reap(self):
#     pass


class APNSHandler(object):

  def validate_push_size(self):
    # TODO(leah): validate that request size is < 256 bytes
    pass


class GCMHandler(object):

  def validate_push_size(self):
    # TODO(leah): validate that request size is < 4KB
    pass


class PushRequestHandler(object):

  def __init__(self, channels, app_cache, max_concurrent_connections=10):
    self.work_queue = Queue.Queue()
    self.max_concurrent_connections = max_concurrent_connections

    # Set up a handler for each of the specified channels
    self.handlers = []
    self.channels = channels
    for channel in channels:
      handler_class = getattr(sys.modules[__name__], '%sHandler' % channel)
      if handler_class:
        self.handlers.append(handler_class())

    @app_cache.memoize(60 * 5)
    def get_subscribers(channels=None):
      channels = channels or self.channels
      with database.SessionWrapper() as session:
        subscriptions = session.query(models.Subscriptions).filter(
          models.Subscriptions.protocol.in_(channels)).all()
        print list(subscriptions)

      return ''

    self.get_subscribers = get_subscribers

  def send_push_notification(self, push_notification):
    print self.get_subscribers()
