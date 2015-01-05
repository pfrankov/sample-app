var _ = require("lodash");

describe( "Controller UsersTableCtrl", function() {

	beforeEach(angular.mock.module("app"));

	var $scope;
	beforeEach(function(done){
		angular.mock.inject(function($controller, $rootScope){
			$scope = $rootScope.$new();
			$controller("UsersTableCtrl", {$scope: $scope});

			done();
			
		});
	});
	
	
	it( "should parse initial JSON correctly", function(){
		var arr = require("../../../../app/scripts/angular/mocks/users.json");
		_.forEach(arr, function(arrElement, i){
			_.forEach(arrElement, function(objValue, objKey){
				expect($scope.users[i]).to.have.deep.property(objKey, objValue);
			})
		});
	});
	
	it( "should remove users from model", function(){
		var beforeLength = $scope.users.length;
		$scope.userRemove($scope.users[0].id);
		
		expect($scope.users.length ).to.equal(beforeLength - 1);
	});
} );