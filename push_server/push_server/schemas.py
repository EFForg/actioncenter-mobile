"""JSON schema definitions for API objects."""

SUBSCRIPTION_REQUEST = {
  'type' : 'object',
  'properties' : {
    'protocol': {'type': 'string'},
    'language' : {'type': 'string', 'maxLength': 20},
    'device_id' : {'type': 'string'}
  }
}

PUSH_REQUEST = {
  'type' : 'object',
  'properties' : {
    'payload': {'type': 'object'},
    'channels' : {'type': 'array', 'required': False, 'format': 'push_channel'},
    'mode' : {'type': 'string', 'required': False, 'format': 'push_mode'},
    'device_ids': {'type': 'array', 'required': False, "items": {"type": "string"}, "additionalItems": {"type": "string"}}
  }
}

# # See https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/ApplePushService.html#//apple_ref/doc/uid/TP40008194-CH100-SW1
# APNS_PUSH_REQUEST_PAYLOAD = {
#   'type': 'object',
#   'properties': {
#     'alert': {'type': ['string', 'object'], 'format': 'apns_alert'},
#     'badge': {'type': 'integer'},
#     'sound': {'type': 'string'},
#     'content-available': {'type': 'integer'}
#   }
# }
#
# APNS_ALERT_DICT = {
#   'type': 'object',
#   'properties': {
#
#   }
# }
#
# # See http://developer.android.com/google/gcm/server.html#payload for details of the payload.
# # NOTE: this server only supports sending GCM messages via HTTP, so CCS parameters are not supported
# GCM_PUSH_REQUEST_PAYLOAD = {
#   'type': 'object',
#   'properties': {
#     'registration_ids': {},
#     'notification_key': {},
#     'collapse_key': {},
#     'data': {},
#     'delay_while_idle': {},
#     'time_to_live': {},
#     'restricted_package_name': {},
#     'dry_run': {}
#   }
# }
