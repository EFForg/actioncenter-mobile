/**
 * Displays action items scraped from Atom feed.
 *
 */

var ActionCtrl = function($scope, $http, x2js, $ionicModal, $ionicLoading, $ionicPopup, acmSharing, acmUserDefaults) {

  $scope.data = {};
  $scope.data.deletedActions = acmUserDefaults.getUserDefault(acmUserDefaults.keys.DELETED_ACTIONS) || {};
  $ionicLoading.show({template: '<ion-spinner icon="ripple" class="spinner-energized"></ion-spinner>', noBackdrop: true, hideOnStateChange: true});
  $http.get('https://act.eff.org/action.atom', {
      cache: false,
  })
  .then(function(response) {
      $ionicLoading.hide();
      var xmlDoc = x2js.parseXmlString(response.data);
      var json = x2js.xml2json(xmlDoc);
      $scope.data.actionItems = json.feed.entry;
  });

  $scope.showActionModal = function(actionItem){
    $scope.data.actionItem = actionItem;
    $ionicModal.fromTemplateUrl('templates/actionModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      modal.show();
    });
  }

  $scope.toggleShareButtons = function(){
    $scope.showShareButtons = !!!$scope.showShareButtons;
  }

  $scope.deleteAction = function(actionId){
    $scope.data.deletedActions[actionId] = true;
    acmUserDefaults.setUserDefault(acmUserDefaults.keys.DELETED_ACTIONS, $scope.data.deletedActions);
  }

  $scope.showDeletePopup = function(action){
    var myPopup = $ionicPopup.show({
      title: 'Are you sure?',
      buttons: [
        { text: 'Cancel',
          onTap: function(){return false;}
        },
        {
          text: 'Remove',
          type: 'button-assertive',
          onTap: function(){return true;}
        }
      ]
    }).then(function(res){
      if (res){
        $scope.deleteAction(action.id);
      }
    });
  }

}

module.exports = ActionCtrl;
