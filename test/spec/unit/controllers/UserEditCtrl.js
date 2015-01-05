var _ = require("lodash");

describe( "Controller UserEditCtrl", function() {

	beforeEach(angular.mock.module("app"));

	var $scope,
		localStorage;
	beforeEach(function(done){
		angular.mock.inject(function($controller, $rootScope, localStorageService){
			$scope = $rootScope.$new();
			$controller("UserEditCtrl", {$scope: $scope});

			localStorage = localStorageService;

			done();

		});
	});

	it( "should represented any users in localStorage", function(){
		expect(localStorage.get("users") ).to.exist().and.be.not.empty();
	});
	
	it( "should add user to the model correctly", function(){
		var beforeLength = localStorage.get("users" ).length;
		$scope.user = localStorage.get("users")[0];
		$scope.user.firstName = "test" + Math.random();
		$scope.user.lastName = "test" + Math.random();
		$scope.user.nickname = "test" + Math.random();
		$scope.add();

		expect(localStorage.get("users" ).length ).to.be.equal(beforeLength+1);

		var lastUser = _.last(localStorage.get("users" ));
		expect( lastUser.firstName ).to.be.equal($scope.user.firstName);
		expect( lastUser.lastName ).to.be.equal($scope.user.lastName);
		expect( lastUser.nickname ).to.be.equal($scope.user.nickname);
	});
	
	it( "should save changes of user's fields", angular.mock.inject(function($controller, $rootScope, localStorageService) {
		$scope = $rootScope.$new();
		var lastUser = _.last( localStorage.get( "users" ) );
		$controller( "UserEditCtrl", {$scope: $scope, $stateParams: {id: lastUser.id}} );

		$scope.user.firstName = "saving-test" + Math.random();
		$scope.user.lastName = "saving-test" + Math.random();
		$scope.user.nickname = "saving-test" + Math.random();


		$scope.save();

		lastUser = _.last( localStorage.get( "users" ) );
		expect( lastUser.firstName ).to.be.equal( $scope.user.firstName );
		expect( lastUser.lastName ).to.be.equal( $scope.user.lastName );
		expect( lastUser.nickname ).to.be.equal( $scope.user.nickname );
	}));
} );