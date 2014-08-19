"""Handler for managing device subscriptions to GCM and APNS."""

from push_server import models
from push_server import schemas
from push_server import schema_validators
from push_server.db import database
from push_server.resources import resource


class SubscriptionHandler(resource.PushServerBaseResource):
  """Handler for managing device subscriptions."""

  def delete(self, subscription_identifier=''):
    """Unsubscribe a device from push notifications."""
    with database.SessionWrapper() as session:
      subscription = session.query(models.Subscriptions).filter_by(
        subscription_identifier=subscription_identifier).first()
      response = {'deleted': bool(subscription)}
      if subscription:
        session.delete(subscription)

    return response

  def post(self):
    """Subscribe a device to push notifications.

    This is no-op in the case where the device is already registered.
    """
    # TODO(leah): Add support for validating tokens:
    #   APNS: /^[0-9a-f]{64}$/i
    #   GCM: /^[a-zA-Z0-9_-]+$/

    device_json = self.get_validated_json(
      schemas.SUBSCRIPTION_REQUEST, format_validators=schema_validators.FORMAT_VALIDATORS)

    with database.SessionWrapper() as session:
      subscription = models.Subscriptions.get_or_create(session, **device_json)

      if not subscription.subscription_id:
        session.add(subscription)
        session.commit()

      response = subscription.to_dict()

    return response
