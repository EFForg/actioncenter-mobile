"""Custom validators for push server JSON schemas."""

import validictory

from push_server import constants


def _case_insensitive_array_comparison(enum_options):

  option_set = set([x.upper() for x in enum_options])

  def compare(validator, fieldname, value, format_options):
    upper_values = set([x.upper() for x in value])
    if not set(upper_values).issubset(option_set):
      raise validictory.ValidationError(
        'invalid input (%s) for field "%s", field may only contain values in %s'
        % (value, fieldname, list(option_set)))

  return compare


def _case_insensitive_contains(enum_options):

  option_set = set([x.upper() for x in enum_options])

  def compare(validator, fieldname, value, format_options):
    value = value.upper()
    if not value in option_set:
      raise validictory.ValidationError(
        'value for field "%s" must be one of %s' % (fieldname, list(option_set)))

  return compare


# def _apns_alert(validator, fieldname, value, format_options):
#   # As the APNS alert value can be either a string or a dictionary, use a custom validation function
#   # to check it
#   if isinstance(value, dict):
#     validictory.validate(value, APNS_ALERT_DICT)
#     pass
#     # raise validictory.ValidationError()


FORMAT_VALIDATORS = {
  'push_channel': _case_insensitive_array_comparison(constants.SUPPORTED_CHANNELS),
  'push_mode': _case_insensitive_contains(['sandbox', 'prod'])
  # 'apns_alert': _apns_alert
}
