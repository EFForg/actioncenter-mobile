/**
 * Wrapper service for common sharing actions.
 */

var SharingService = function () {

  // TODO(leah): Talk to Lilia / Bill re. getting a redirect friendly URL set up
  var shareURL = 'https://www.eff.org/';
  var shareTitle = 'this is a share title';

  var shareMessages = {
    'SMS': 'sms share message',
    'EMAIL': 'email share message',
    'TWITTER': 'twitter share message',
    'FACEBOOK': 'facebook share message',
    'OTHER': 'other share message'
  };

  return {

    shareApp: function(service) {
      var shareMesage = shareMessages[service];
      if (service === 'EMAIL') {
        // On Android this opens up as either Drive or Gmail, and doesn't work for Drive.
        // This doesn't seem like a huge deal, so for now allow it so that it pops up a share intent
        // filtered for email clients.
        window.plugins.socialsharing.shareViaEmail(shareMesage, shareTitle, null, null, null, null);
      } else if (service === 'SMS') {
        window.plugins.socialsharing.shareViaSMS(shareMesage, undefined);
      } else if (service === 'FACEBOOK') {
        // The message isn't passed through correctly via FB on Android unfortunately, link is though
        window.plugins.socialsharing.shareViaFacebook(shareMesage, undefined, shareURL);
      } else if (service === 'TWITTER') {
        window.plugins.socialsharing.shareViaTwitter(shareMesage, undefined, shareURL);
      } else if (service === 'OTHER') {
        // Open up a standard share intent:
        window.plugins.socialsharing.share(shareMesage, null, null, shareURL);
      }
    }

  };

};

module.exports = SharingService;
