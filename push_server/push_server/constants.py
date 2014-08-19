"""Useful constants for the push server app."""

import os
import sys


class PushServerConfig(object):
  DEBUG = False
  SERVER_NAME = '127.0.0.1:5000'
  SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/test.db'
  SUPPORTED_CHANNELS = ('APNS', 'GCM',)
  MAX_CONCURRENT_CONNECTIONS = 10
  GCM_PROJECT_ID = 804999034827
  GCM_API_KEY = 'AIzaSyBG-hV6JlefNSgYmOqCYrfbQO9QYCzqJaU'


class PushServerDebugConfig(PushServerConfig):
  DEBUG = True
  MODE = 'DEBUG'


class PushServerTestConfig(PushServerConfig):
  MODE = 'TEST'


class PushServerProdConfig(PushServerConfig):
  MODE = 'PROD'


# Jack the appropriate constants class into the modulespace under the constants name, so that the
# mode specific class is loaded.
sys.modules['push_server.constants'] = getattr(
  sys.modules[__name__], 'PushServer%sConfig' % os.environ.get('PUSH_SERVER_MODE', 'DEBUG').title())
