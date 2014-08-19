"""Simple handler for sending push requests to GCM / APNS and dealing with failures."""

import grequests

import Queue


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

  def __init__(self, max_concurrent_connections=10):
    self.work_queue = Queue.Queue()
    self.max_concurrent_connections = max_concurrent_connections
    self.handlers = [
      APNSHandler(),
      GCMHandler()
    ]

  def send_push_notification(self, push_notification):
    pass
