/**
 * Controller to manage the share application screen.
 */

var ShareAppCtrl = function($scope, $cordovaAppAvailability, $cordovaSocialSharing) {

  // TODO(leah): Speak to Lillia / Bill re. getting a redirect friendly URL set up
  $scope.shareURL = 'https://www.eff.org/';
  $scope.shareTitle = 'this is a share title';

  $scope.shareMessages = {
    'SMS': 'sms share message',
    'EMAIL': 'email share message',
    'TWITTER': 'twitter share message',
    'FACEBOOK': 'facebook share message',
    'OTHER': ''
  };

  $scope.shareServices = [
    {name: 'EMAIL', displayName: 'Email', cssClass: 'ion-ios7-email-outline'},
    {name: 'SMS', displayName: 'SMS', cssClass: 'ion-ios7-chatbubble-outline'},
    {name: 'TWITTER', displayName: 'Twitter', cssClass: 'ion-social-twitter-outline'},
    {name: 'FACEBOOK', displayName: 'Facebook', cssClass: 'ion-social-facebook-outline'},
    {name: 'OTHER', displayName: 'Other', cssClass: ''}
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

    // Make the function no-op for services we can't check
    if ($scope.appAvailabilityChecks[platform][service] !== undefined) {
      $cordovaAppAvailability
        .check($scope.appAvailabilityChecks[platform][service])
        .then(function(success) {
          $scope.serviceAvailability[service] = true;
        },
        function(error) {
          $scope.serviceAvailability[service] = false;
        });
    }
  };

  // The service checks appear instantaneous (tested on a Nexus 4), so just do them inline each time
  $scope.deviceSupportsShareService('TWITTER');
  $scope.deviceSupportsShareService('FACEBOOK');

  $scope.shareApp = function(service) {
    var shareMesage = $scope.shareMessages[service];

    if (service === 'EMAIL') {
      // For some reason, this opens up as either Drive or Gmail, and doesn't work for Drive on Android.
      // This doesn't seem like a huge deal, so for now allow it so that it pops up a share intent
      // filtered for email clients.
      window.plugins.socialsharing.shareViaEmail(
        shareMesage, $scope.shareTitle, null, null, null, null);
    } else if (service === 'SMS') {
      $cordovaSocialSharing.shareViaSMS(shareMesage, undefined);
    } else if (service === 'FACEBOOK') {
      // The message isn't passed through correctly via FB on Android unfortunately, link is though
      window.plugins.socialsharing.shareViaFacebook(shareMesage, undefined, $scope.shareURL);
    } else if (service === 'TWITTER') {
      window.plugins.socialsharing.shareViaTwitter(shareMesage, undefined, $scope.shareURL);
    } else if (service === 'OTHER') {
      // Open up a standard share intent:
      window.plugins.socialsharing.share(shareMesage, null, null, $scope.shareURL);
    }
  };

  $scope.appShareLink = function() {

  };

};

module.exports = ShareAppCtrl;
