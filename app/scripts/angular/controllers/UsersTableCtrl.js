module.exports = {
	UsersTableCtrl: function($scope, localStorageService, $state){
		$scope.users = localStorageService.get("users");
		
		$scope.userEdit = function(userId){
			$state.go("userEdit", {
				id: userId
			});
		};
		
		$scope.userNew = function(){
			$state.go("userNew");
		};

		$scope.userRemove = function(userId){
			_.remove($scope.users, {
				id: userId
			});
			

			localStorageService.set("users", $scope.users)
		};
	}
};