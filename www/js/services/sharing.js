/**
 * Wrapper service for common sharing actions.
 */

var angular = require('angular');
var sprintf = require('sprintf');

var shareSettings = require('../../build/app_settings')['SHARING'];


var SharingService = function () {

  var DEFAULT_SHARE_APP_MSG = 'Download EFF\'s mobile app and get instant alerts when they need your help';

  return {

    shareApp: function (service) {

      var shareURL = shareSettings['URL'];
      var shareMessage = shareSettings['MESSAGES'][service] || DEFAULT_SHARE_APP_MSG;

      if (angular.isObject(shareMessage)) {
        angular.forEach(shareMessage, function (val, key) {
          shareMessage[key] = sprintf(val, shareURL);
        });
      } else {
        shareMessage = sprintf(shareMessage, shareURL);
      }

      if (service === 'EMAIL') {
        var title = shareMessage['SUBJECT'] || 'Download EFF\'s Android app';
        var body = shareMessage['BODY'] || DEFAULT_SHARE_APP_MSG;

        // On Android this opens up as either Drive or Gmail, and doesn't work for Drive.
        // This doesn't seem like a huge deal, so for now allow it so that it pops up a share intent
        // filtered for email clients.
        window.plugins.socialsharing.shareViaEmail(body, title, null, null, null, null);
      } else if (service === 'SMS') {
        window.plugins.socialsharing.shareViaSMS(shareMessage, undefined);
      } else if (service === 'FACEBOOK') {
        // The message isn't passed through correctly via FB on Android unfortunately, link is though
        window.plugins.socialsharing.shareViaFacebook(shareMessage, undefined, shareURL);
      } else if (service === 'TWITTER') {
        window.plugins.socialsharing.shareViaTwitter(shareMessage, undefined, shareURL);
      } else if (service === 'OTHER') {
        // Open up a standard share intent:
        window.plugins.socialsharing.share(shareMessage, null, null, shareURL);
      }
    },

    shareAppAsAction: function () {
      return {
        id: 'SHARE_ACTION',
        link: {
          _href: shareSettings['URL']
        },
        summary: {
          __text: shareSettings['TEXT']
        },
        title: shareSettings['TITLE']
      };
    },

    shareAction: function (action, service) {
      var shareURL = action.url;
      var shareMessage = angular.element(action.summary.__text).text();
      var title = action.title;

      if (service === 'EMAIL') {
        var body = shareMessage + "\n\n" + shareURL;

        // On Android this opens up as either Drive or Gmail, and doesn't work for Drive.
        // This doesn't seem like a huge deal, so for now allow it so that it pops up a share intent
        // filtered for email clients.
        window.plugins.socialsharing.shareViaEmail(body, title, null, null, null, null);
      } else if (service === 'SMS') {
        window.plugins.socialsharing.shareViaSMS(title + ' ' + shareURL, undefined);
      } else if (service === 'FACEBOOK') {
        // The message isn't passed through correctly via FB on Android unfortunately, link is though
        window.plugins.socialsharing.shareViaFacebook(shareMessage, undefined, shareURL);
      } else if (service === 'TWITTER') {
        window.plugins.socialsharing.shareViaTwitter(title, undefined, shareURL);
      } else if (service === 'OTHER') {
        // Open up a standard share intent:
        window.plugins.socialsharing.share(title, null, null, shareURL);
      }
    },

  };

};

module.exports = SharingService;
