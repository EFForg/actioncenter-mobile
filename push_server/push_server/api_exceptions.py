"""API exceptions for the push server."""

from werkzeug import exceptions


class PushServerAPIException(exceptions.BadRequest):
  """Base class for any exception emitted due to push server business logic."""


class MalformedRequest(PushServerAPIException):
  """Exception raised when a badly formatted JSON request is received by the server."""

  code = 400
  description= '<p>The browser (or proxy) sent a request that this server couldnot understandasdfsadfsdafasdfadsfdsafsadfasdfadsfsdafsdafa.</p>'

  def __init__(self, message):
    super(MalformedRequest, self).__init__()

    print self.description
