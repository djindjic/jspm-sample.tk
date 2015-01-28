import angular from 'angular';

export let mainModule = angular.module('jspm-sample', []);

mainModule.controller('HomeController', ['$scope', function ($scope) {
	$scope.greetMe = 'world';
}]);