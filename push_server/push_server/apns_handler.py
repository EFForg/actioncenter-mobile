"""Handler for sending push notifications via APNS."""

import apns


# # Send multiple notifications in a single transmission
# frame = Frame()
# identifier = 1
# expiry = time.time()+3600
# priority = 10
# frame.add_item('b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b87', payload, identifier, expiry, priority)
# apns.gateway_server.send_notification_multiple(frame)
#
# # Get feedback messages
# for (token_hex, fail_time) in apns.feedback_server.items():
#     # do stuff with token_hex and fail_time
#
# class ApnsHandler(object):
#   """handler for APNS"""
#
#   def __init__(self, retry_attempts=3):
#     self._sandbox = apns.APNs(use_sandbox=True, cert_file=None, key_file=None)
#     self._prod = apns.APNs(use_sandbox=False, cert_file=None, key_file=None)
#     self._retry_attempts = retry_attempts
#
#   def send_push_notification(self):
#     payload = apns.Payload(alert=message, badge=num_listings)
#
#   def _send(self, service, device, payload):
#     for _ in xrange(self._retry_attempts):
#       try:
#         service.send_notification(device, payload)
#         return True
#       except Exception, e:
#         self._reset_apns_service(service)
#
#     raise e
#
#   def _reset_apns_service(self, service:
#     # TODO(leah): Update this to reset the appropriate service.
#     # self._apns = apns.APNs(use_sandbox=settings.PUSH.SANDBOX,
#     #                        cert_file=settings.PUSH.APNS_CERT_FILE,
#     #                        key_file=settings.PUSH.APNS_KEY_FILE)
#     pass
#
#   def reap_apns_tokens(self):
#     """Handler for reaping expired APNS tokens."""
#
#     # TODO(leah): Deal with reaping expired tokens.
#
#     # list of (token, time,)
#     # try:
#     #   # TODO: error handling of the connection
#     #   revocations = [(token, timeutils.datetime_to_timestamp(fail_time),)
#     #                  for token, fail_time in self._apns.feedback_server.items()]
#     #   if revocations:
#     #     logging.info('Device Revocation list: %s', revocations)
#     #     with managers.Subscriptions() as mgr:
#     #       mgr.delete_by_device_and_expiry(revocations)
#     # except Exception:
#     #   logging.exception('reap-tokens')
#     #   self._reset_apns()
