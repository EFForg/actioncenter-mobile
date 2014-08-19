"""Subclass of the standard restful resource class for use with the push server project."""

import flask
import validictory

from flask.ext import restful

from push_server import api_exceptions
from werkzeug import exceptions


class PushServerBaseResource(restful.Resource):
  """Subclass of resource that supports object validation and DAO generation."""

  def get_validated_json(self, schema, format_validators=None):
    # For now, this relies on the underlying error handling for improperly formatted JSON objects.
    # This is to raise a BadRequest() error and return a 400 with a "server couldn't understand..."
    # type error message.
    json_request = flask.request.get_json()

    # NOTE: pending https://github.com/sunlightlabs/validictory/issues/55, this will only return
    #       with info on the first schema error.
    try:
      validictory.validate(
        json_request, schema, format_validators=format_validators, disallow_unknown_properties=True)
    except ValueError, error:
      # TODO(leah): Fix this.
      print error
      print error.message
      raise api_exceptions.MalformedRequest('hello')

    return json_request
