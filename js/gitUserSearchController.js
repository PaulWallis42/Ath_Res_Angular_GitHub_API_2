// This is the controller that controls the view file which the client is seeing on the browser. We are pulling in
// (dependency injection) '$resource', this helps with making RESTful API's a lot easier.
githubUserSearch.controller('GitUserSearchController', ['$resource', function($resource) {

// Here we are using '$resource' on the GitHub API (the long number token is just an add on as GitHub limits API hits).
// $resource does its thing and the result is stored in the searchResource variable.  The API get happens later (see doSearch) below.
var searchResource = $resource('https://api.github.com/search/users?access_token=c61a1a33552b46dba393272ca9fbda05387a6d7c');

// We assingn 'this' to the self variable as the 'this' function can change so we need to keep it seperate?
var self = this;

// doSearch is the function that takes the users input from the text field in the view.  (Github user name in this case.)
self.doSearch = function() {
// searchResource is given the get method which pairs up the key: vaule pair below to the end of the api address above (the
// value in this case is searchTerm which is the input entered by the user in the search field in the view)
// to get a specific users details from github.
self.searchResult = searchResource.get(
  // searchTerm is the data that the user enters into the search field (in this instance a github user name)
  // the q is for query so both these get ammended to the end of the api request to get the github user specifieds data.
  { q: self.searchTerm }
);

};

}]);
