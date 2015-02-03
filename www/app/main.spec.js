import angular from 'angular';
import mocks from 'angular-mocks';
import {mainModule} from './main';

describe('HomeController', function() {
  beforeEach(angular.mock.module(mainModule.name));

  var $controller;

  beforeEach(angular.mock.inject(function(_$controller_){
    $controller = _$controller_;
  }));

  it('greetMe should be world', function() {
	var scope = {};
	var controller = $controller('HomeController', { $scope: scope });
	expect(scope.greetMe).to.equal('world');
  });
});