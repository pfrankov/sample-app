module.exports = {
	UserEditCtrl: function($scope, $stateParams, localStorageService, $state){
		var users = localStorageService.get("users");
		var user;
		
		if ( $stateParams.id ) {
			user = _.find(users, {
				id: $stateParams.id
			});

			$scope.user = user;
		}
		
		$scope.save = function(){
			_.merge(user, $scope.user);
			
			localStorageService.set("users", users);

			$state.go("table");
		};

		$scope.add = function(){
			$scope.user.id = ++_.max(localStorageService.get("users"), "id" ).id;
			users.push($scope.user);

			localStorageService.set("users", users);

			$state.go("table");
		};
	}
};