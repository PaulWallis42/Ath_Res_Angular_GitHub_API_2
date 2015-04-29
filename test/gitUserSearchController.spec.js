describe('GitUserSearchController', function() {
  beforeEach(module('GitUserSearch'));

  var ctrl;
  // inject is a built in Angular function which allows access to our Angular app (js/app.js)
  // and our controller (gitUserSearchController.js) from inside our tests.
  beforeEach(inject(function($controller) {
    ctrl = $controller('GitUserSearchController');
  }));

  it('initialises with an empty search result and term', function() {
    expect(ctrl.searchResult).toBeUndefined();
    expect(ctrl.searchTerm).toBeUndefined();
  });

  describe('when searching for a user', function() {

    var httpBackend;
    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend
      httpBackend
        .when("GET", "https://api.github.com/search/users?access_token=c61a1a33552b46dba393272ca9fbda05387a6d7c&q=hello")
        .respond(
        { items: items }
      );
    }));

    // Here we are setting up some 'dummy results' and assinging the to the variable items.
    // This means when testing we don't have to hit the GitHub API everytime we want to run
    // a test.
    var items = [
      {
        "login": "tansaku",
        "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
        "html_url": "https://github.com/tansaku"
      },
      {
        "login": "stephenlloyd",
        "avatar_url": "https://avatars.githubusercontent.com/u/196474?v=3",
        "html_url": "https://github.com/stephenlloyd"
      }
    ];

    it('displays search results', function() {
      ctrl.searchTerm = 'hello';
      // ctrl (see above). doSearch() is a controller function (gitUserSearchController.js)
      ctrl.doSearch();
      // Backend allows stub methods to be used on the test instead of hitting the real Github API.
      httpBackend.flush();
      expect(ctrl.searchResult.items).toEqual(items);
    });
  });
});
