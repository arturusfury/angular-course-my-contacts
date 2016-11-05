'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  var ref = firebase.database().ref('contacts');

  $scope.contacts = $firebaseArray(ref);

  $scope.showAddForm = function() {
    $scope.addFormShow = true;
  };

  $scope.hide = function() {
    $scope.clearFields();
    $scope.addFormShow = false;
    $scope.contactShow = false;
  };

  $scope.clearFields = function() {
    $scope.name = '';
    $scope.email = '';
    $scope.company = '';
    $scope.home_phone = '';
    $scope.mobile_phone = '';
    $scope.work_phone = '';
    $scope.street_address = '';
    $scope.city = '';
    $scope.state = '';
    $scope.zipcode = '';
  };

  $scope.showContact = function (contact) {
    $scope.contactShow = true;

    $scope.name = contact.name;
    $scope.company = contact.company;
    $scope.email = contact.email;
    $scope.mobile_phone = contact.phones[0].mobile_phone;
    $scope.home_phone = contact.phones[0].home_phone;
    $scope.work_phone = contact.phones[0].work_phone;
    $scope.street_address = contact.address[0].street_address;
    $scope.city = contact.address[0].city;
    $scope.state = contact.address[0].state;
    $scope.zipcode = contact.address[0].zipcode;
  };

  $scope.addFormSubmit = function() {
    if($scope.name){ var name = $scope.name; } else { var name = null; }
    if($scope.email){ var email = $scope.email; } else { var email = null; }
    if($scope.company){ var company = $scope.company; } else { var company = null; }
    if($scope.mobile_phone){ var mobile_phone = $scope.mobile_phone; } else { var mobile_phone = null; }
    if($scope.home_phone){ var home_phone = $scope.home_phone; } else { var home_phone = null; }
    if($scope.work_phone){ var work_phone = $scope.work_phone; } else { var work_phone = null; }
    if($scope.street_address){ var street_address = $scope.street_address; } else { var street_address = null; }
    if($scope.city){ var city = $scope.city; } else { var city = null; }
    if($scope.state){ var state = $scope.state; } else { var state = null; }
    if($scope.zipcode){ var zipcode = $scope.zipcode; } else { var zipcode = null; }

    $scope.contacts.$add({
      name: name,
      email: email,
      company: company,
      phones: [
        {
          mobile_phone: mobile_phone,
          home_phone: home_phone,
          work_phone: work_phone
        }
      ],
      address: [
        {
          street_address: street_address,
          city: city,
          state: state,
          zipcode: zipcode
        }
      ]
    }).then(function(ref) {
      $scope.hide();

      $scope.msg = "Contact Added";
    });
  }
}]);
