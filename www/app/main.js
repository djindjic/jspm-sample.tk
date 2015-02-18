import angular from 'angular';
import 'angular-material';
import './style.css!'

export let mainModule = angular.module('jspm-sample', ['ngMaterial']);

mainModule.controller('HomeController', ['$scope', function ($scope) {
	$scope.greetMe = 'world';
}]);
