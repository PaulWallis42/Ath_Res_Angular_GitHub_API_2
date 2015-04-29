githubUserSearch.controller('GitUserSearchController', ['$resource', function($resource) {

var searchResource = $resource('https://api.github.com/search/users?access_token=c61a1a33552b46dba393272ca9fbda05387a6d7c');

var self = this;


self.doSearch = function() {
self.searchResult = searchResource.get(
  { q: self.searchTerm }
);

};

}]);
