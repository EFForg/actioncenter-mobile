/**
 * Displays news items scraped from RSS feed.
 *
 */

var NewsCtrl = function($scope, $http, x2js) {

  $http.get('https://www.eff.org/rss/updates.xml', {
      cache: false,
  })
  .then(function(response) {
      $scope.data = {};
      var xmlDoc = x2js.parseXmlString(response.data);
      var json = x2js.xml2json(xmlDoc);
      $scope.data.newsItems = json.rss.channel.item;
  });

  $scope.getSubheader = function(newsItem){
    if (angular.isDefined(newsItem.category)){
      return newsItem.creator.__text + ' - ' + newsItem.category.__text;
    }
    else {
      return newsItem.creator.__text;
    }
  }

  $scope.toggleItem = function(item){
        if ($scope.isItemShown(item)){
            $scope.shownItem = null;
        } else {
            $scope.shownItem = item;
        }
  };

  $scope.isItemShown = function(item){
        return $scope.shownItem === item;
  };

}

module.exports = NewsCtrl;
