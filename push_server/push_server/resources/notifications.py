"""Handler for sending push notifications to GCM and APNS."""

from flask import current_app

from push_server import models
from push_server.resources import resource

from push_server import schemas
from push_server import schema_validators


class NotificationHandler(resource.PushServerBaseResource):
  """Handler for sending notifications to GCM and APNS."""

  def post(self):
    push_request = self.get_validated_json(
      schemas.PUSH_REQUEST, format_validators=schema_validators.FORMAT_VALIDATORS)

    with models.SessionWrapper() as session:
      notification = models.Notifications(payload=push_request.payload)
      session.add(notification)
      session.commit()

      response = notification.to_dict()

    current_app.push_handler.send_push_notification(push_request)

    return response
