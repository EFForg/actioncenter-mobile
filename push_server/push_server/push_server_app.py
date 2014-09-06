"""Flask app subclass for the push server app.

This defines the following API:

  /push/<string:push_id>
    GET: fetches an existing push notification, push_id is the hash of the push body
    POST: creates a new push notification and sends it via GCM / APNS


A POST to the push endpoint takes the following params:
  Required:
  * payload: a dictionary, either JSON encoded or not, containing the payload to send via push

  Optional:
  * mode: sandbox|prod to specify whether to push to the test or production push servers, defaults
          to following the mode of the server, debug == sandbox etc.
  * channels: [<string>, ...] 1+ of 'gcm', 'apns' to specify the channel to push to.
  * device_ids: [<string>, ...] array of device ids to send the notification to.

It returns an object like:
  {
    push_id: <string>,
    ...
    error: ...
  }

  /device/...
"""

import argparse
import flask
import os

from flask.ext import restful
from flask.ext import cache

from push_server import api_exceptions
from push_server import constants
from push_server import models
from push_server import push_handler
# from push_server import push_queue
from push_server.resources import notifications
from push_server.resources import subscriptions

API_VERSION = '1'
BASE_API_URL = '/api/%s' % API_VERSION


class PushServerAPI(restful.Api):
  """Subclass of the standard restful API, to provide custom error handling support."""

  def __init__(self, *args, **kwargs):
    super(PushServerAPI, self).__init__(*args, **kwargs)
    self.register_resources()

  def register_resources(self):
    # self.add_resource(notifications.NotificationHandler, '/<string:channel>/notification')
    self.add_resource(
      notifications.NotificationHandler, '/notifications', '/notifications/<string:notification_id>')
    self.add_resource(
      subscriptions.SubscriptionHandler,
      '/subscriptions', '/subscriptions/<string:subscription_identifier>')

  def handle_error(self, e):
    if issubclass(e.__class__, api_exceptions.PushServerAPIException):
      # TODO(leah): Hook this up so that it returns a usable custom JSON object
      response = {
        'status': e.code,
        'data': ''
      }
      return self.make_response(response, e.code)

    return super(PushServerAPI, self).handle_error(e)


class PushServer(flask.Flask):
  """Simple Flask app for sending and managing push notifications."""

  def setup_services(self, channels):

    self.app_cache = cache.Cache(app, config={'CACHE_TYPE': 'simple'})
    self.push_handler = push_handler.PushRequestHandler(
      channels, self.app_cache, constants.MAX_CONCURRENT_CONNECTIONS)
    self._setup_db()
    self.api = PushServerAPI(self, prefix=BASE_API_URL)

  def _setup_db(self):
    with self.app_context():
      models.db.init_app(self)
      models.db.create_all()


def get_cmdline_args():
  parser = argparse.ArgumentParser(description='Push Server')
  parser.add_argument(
    '-m', '--mode',
    default='DEBUG', choices=('DEBUG', 'TEST', 'PROD',), help='the mode to run the push server in')
  parser.add_argument(
    '-c', '--channels',
    type=lambda x: [unicode(channel) for channel in x.split(',')],
    default=constants.SUPPORTED_CHANNELS,
    required=False,
    help='the channels the server should broadcast notifications to')

  args = parser.parse_args()

  unsupported_channels = set(args.channels) - set(constants.SUPPORTED_CHANNELS)
  if unsupported_channels:
    raise ValueError(
      'one or more supplied channels (%s) are unsupported. Only %s channels are supported'
      % (', '.join(unsupported_channels), ', '.join(constants.SUPPORTED_CHANNELS)))

  return args


if __name__ == '__main__':
  args = get_cmdline_args()
  os.environ['PUSH_SERVER_MODE'] = args.mode

  app = PushServer('push_server')
  app.config.from_object('push_server.constants')
  app.setup_services(args.channels)

  app.run()
