describe('Unit: Sharing Service', function() {

  beforeEach(module('acm'));

  var mock;
  before(function() {

    window.plugins.socialsharing = {
      shareViaEmail: function() {},
      shareViaSMS: function() {},
      shareViaFacebook: function() {},
      shareViaTwitter: function() {},
      share: function() {}
    };

    mock = sinon.mock(window.plugins.socialsharing);

    mock.expects('shareViaEmail').once().withExactArgs('test: testURL', 'test', null, null, null, null);
    mock.expects('shareViaSMS').once().withExactArgs('test: testURL', undefined);
    mock.expects('shareViaFacebook').once().withExactArgs('test: testURL', undefined, 'testURL');
    mock.expects('shareViaTwitter').once().withExactArgs('test: testURL', undefined, 'testURL');
    mock.expects('share').once().withExactArgs('test: testURL', null, null, 'testURL');
  });

  var acmSharing;
  beforeEach(inject(function(_acmSharing_) {
    acmSharing = _acmSharing_;
  }));

  it('should do something', function() {
    acmSharing.shareApp('EMAIL');
    acmSharing.shareApp('SMS');
    acmSharing.shareApp('FACEBOOK');
    acmSharing.shareApp('TWITTER');
    acmSharing.shareApp('OTHER');
    mock.verify();
  });

});
