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

}

module.exports = NewsCtrl;
