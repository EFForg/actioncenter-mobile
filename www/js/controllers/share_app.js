/**
 * Controller to manage the share application screen.
 */

var ShareAppCtrl = function($scope, $ionicViewService, $cordovaAppAvailability, acmSharing) {

  // Clear the history stack when the user first gets here from the welcome carousel, so that they
  // can't use the back button on Android to return to the carousel.
  if ($scope.$viewHistory.backView && $scope.$viewHistory.backView.stateName === 'welcome') {
    $ionicViewService.clearHistory();
  }

  // NOTE: we use the default iOS share icon on both platforms, sorry!
  $scope.shareServices = [
    {name: 'EMAIL', displayName: 'Email', cssClass: 'ion-ios7-email-outline'},
    {name: 'SMS', displayName: 'SMS', cssClass: 'ion-ios7-chatbubble-outline'},
    {name: 'TWITTER', displayName: 'Twitter', cssClass: 'ion-social-twitter-outline'},
    {name: 'FACEBOOK', displayName: 'Facebook', cssClass: 'ion-social-facebook-outline'},
    {name: 'OTHER', displayName: 'Other', cssClass: 'ion-ios7-upload-outline'}
  ];

  // This makes a couple of assumptions:
  //   * email support is always available
  //   * sms is always available - it's a pain to check this on Android, although is possible on iOS
  //     (check tel://), so for now, assume available.
  $scope.appAvailabilityChecks = {
    'IOS': {
      'TWITTER': 'twitter://',
      'FACEBOOK': 'fb://'
    },
    'ANDROID': {
      'TWITTER': 'com.twitter.android',
      'FACEBOOK': 'com.facebook.katana'
    }
  };

  $scope.serviceAvailability = {
    'SMS': true,
    'EMAIL': true,
    'TWITTER': false,
    'FACEBOOK': false,
    'OTHER': true
  };

  $scope.deviceSupportsShareService = function(service) {
    var platform = ionic.Platform.platform().toUpperCase();

    var appAvailabilityByPlatform = $scope.appAvailabilityChecks[platform];
    // Make the function no-op for services we can't check
    if (appAvailabilityByPlatform !== undefined && appAvailabilityByPlatform[service] !== undefined) {
      $cordovaAppAvailability
        .check($scope.appAvailabilityChecks[platform][service])
        .then(function(success) {
          $scope.serviceAvailability[service] = true;
        },
        function(error) {
          $scope.serviceAvailability[service] = false;
        });
    } else {
      $scope.serviceAvailability[service] = false;
    }
  };

  // The service checks appear instantaneous (tested on a Nexus 4), so just do them inline each time
  $scope.deviceSupportsShareService('TWITTER');
  $scope.deviceSupportsShareService('FACEBOOK');

  $scope.shareApp = function(service) {
    acmSharing.shareApp(service);
  };

};

module.exports = ShareAppCtrl;
