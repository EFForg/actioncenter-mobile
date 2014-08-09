/**
 * Simple service for identifying whether the app is running on an iOS or Android platform.
 * This is used as it's expected that the userbase is running a high %age of custom ROMs / cyanogenmod etc., which may
 * not be trivial to identify.
 */

var DevicePlatformService = function () {

  return {
    getDevicePlatform: function() {
      return 'IOS'; // TODO(leah): Update this to actually check what platform we're running on.
    }
  };
};

module.exports = DevicePlatformService;