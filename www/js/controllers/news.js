/**
 * Displays news items scraped from RSS feed.
 *
 */

var NewsCtrl = function ($scope, $http, x2js, $ionicLoading) {

  $ionicLoading.show({template: '<ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>', noBackdrop: true, hideOnStateChange: true});
  $http.get('https://www.eff.org/rss/updates.xml', {
    cache: false,
  })
  .then(function (response) {
    $ionicLoading.hide();
    $scope.data = {};
    var xmlDoc = x2js.parseXmlString(response.data);
    var json = x2js.xml2json(xmlDoc);
    $scope.data.newsItems = json.rss.channel.item;
    angular.forEach($scope.data.newsItems, function (item) {
      item.description = item.description.replace(/ src="\//g, ' src="https://www.eff.org/')
        .concat('<img width="0" height="0" src="https://anon-stats.eff.org/piwik.php?idsite=1&amp;rec=1&amp;action_name=Mobile%20app%20news%20tab&amp;url=' + encodeURIComponent(item.link) + '" />');
    });
  }, function (response) {
    // News feed failed to load.
    $ionicLoading.hide();
  });

  $scope.getSubheader = function (newsItem) {
    if (angular.isDefined(newsItem.category)) {
      return newsItem.creator.__text + ' - ' + newsItem.category.__text;
    }
    else {
      return newsItem.creator.__text;
    }
  };

  $scope.toggleItem = function (item) {
    if ($scope.isItemShown(item)) {
          $scope.shownItem = null;
        } else {
          $scope.shownItem = item;
        }
  };

  $scope.isItemShown = function (item) {
    return $scope.shownItem === item;
  };

};

module.exports = NewsCtrl;
