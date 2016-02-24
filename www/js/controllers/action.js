/**
 * Displays action items scraped from Atom feed.
 *
 */

var ActionCtrl = function ($scope, $http, x2js, $ionicModal, $ionicLoading, $ionicPopup, acmSharing, acmUserDefaults, $cordovaAppAvailability) {

  $scope.data = {};
  $scope.data.deletedActions = acmUserDefaults.getUserDefault(acmUserDefaults.keys.DELETED_ACTIONS) || {};
  $ionicLoading.show({template: '<ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>', noBackdrop: true, hideOnStateChange: true});
  $http.get('https://act.eff.org/action.atom', {
    cache: false,
  })
  .then(function (response) {
    $ionicLoading.hide();
    var xmlDoc = x2js.parseXmlString(response.data);
    var json = x2js.xml2json(xmlDoc);
    $scope.data.actionItems = json.feed.entry;
    $scope.addExtraShareAction();
  }, function (response) {
    // Action feed failed to load.
    $ionicLoading.hide();
  });

  $scope.addExtraShareAction = function () {
    // We add an extra action into those we get from RSS, that encourages the users
    // to tell their contacts about the app.
    $scope.data.actionItems.splice(0, 0, acmSharing.shareAppAsAction());
  };

  $scope.showActionModal = function (actionItem) {
    $scope.data.actionItem = actionItem;
    $ionicModal.fromTemplateUrl('templates/actionModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
      modal.show();
    });
  };

  $scope.toggleShareButtons = function () {
    $scope.showShareButtons = !!!$scope.showShareButtons;
  };

  $scope.deleteAction = function (actionId) {
    $scope.data.deletedActions[actionId] = true;
    acmUserDefaults.setUserDefault(acmUserDefaults.keys.DELETED_ACTIONS, $scope.data.deletedActions);
  };

  $scope.showDeletePopup = function (action) {
    var myPopup = $ionicPopup.show({
      title: 'Are you sure?',
      buttons: [
        {text: 'Cancel',
          onTap: function () {return false;}
        },
        {
          text: 'Remove',
          type: 'button-assertive',
          onTap: function () {return true;}
        }
      ]
    }).then(function (res) {
      if (res) {
        $scope.deleteAction(action.id);
      }
    });
  };

  // NOTE: we use the default iOS share icon on both platforms, sorry!
  $scope.shareServices = [
    {name: 'EMAIL', displayName: 'Email', cssClass: 'ion-ios-email-outline'},
    {name: 'SMS', displayName: 'SMS', cssClass: 'ion-ios-chatbubble-outline'},
    {name: 'TWITTER', displayName: 'Twitter', cssClass: 'ion-social-twitter-outline'},
    {name: 'FACEBOOK', displayName: 'Facebook', cssClass: 'ion-social-facebook-outline'},
    {name: 'OTHER', displayName: 'Other', cssClass: 'ion-ios-upload-outline'}
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

  $scope.deviceSupportsShareService = function (service) {
    var platform = ionic.Platform.platform().toUpperCase();

    var appAvailabilityByPlatform = $scope.appAvailabilityChecks[platform];
    // Make the function no-op for services we can't check
    if (appAvailabilityByPlatform !== undefined && appAvailabilityByPlatform[service] !== undefined) {
      $cordovaAppAvailability
        .check($scope.appAvailabilityChecks[platform][service])
        .then(function () {
          $scope.serviceAvailability[service] = true;
        },
        function () {
          $scope.serviceAvailability[service] = false;
        });
    } else {
      $scope.serviceAvailability[service] = false;
    }
  };

  // The service checks appear instantaneous (tested on a Nexus 4), so just do them inline each time
  $scope.deviceSupportsShareService('TWITTER');
  $scope.deviceSupportsShareService('FACEBOOK');

  $scope.shareApp = function (service) {
    acmSharing.shareApp(service);
  };

  $scope.shareAction = function (action, service) {
    acmSharing.shareAction(action, service);
  };

};

module.exports = ActionCtrl;
