'use strict';

angular.module('myContacts.contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope', '$firebasearray', function($scope, $firebasearray) {
  var ref = new Firebase('https://angular-my-contacts.firebaseio.com/contacts');

  $scope.contacts = $firebasearray(ref);
}]);
