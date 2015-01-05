var App = angular.module("app", ["ui.router"]);




App.controller(require("./controllers/UsersTableCtrl"));
App.controller(require("./controllers/UserEditCtrl"));

App.service(require("./services/localStorageService"));




App.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");


	// States should work with objects as Controllers do
	var _state = $stateProvider.state;
	$stateProvider.state = function(name, fn){
		if ( !(typeof name === "string" ) ) {
			var object = name;

			for ( var key in object ) {
				if ( object.hasOwnProperty(key) ) {
					_state.call(this, key, object[key]);
				}
			}
		}else {
			_state.call(this, name, fn);
		}
	};
	
	$stateProvider.state(require("./routes"));
});

App.run(function(localStorageService){
	if ( !localStorageService.get("users") || (localStorageService.get("users") instanceof Array && !localStorageService.get("users" ).length) ) {
		localStorageService.set("users", require("./mocks/users.json"));
	}
});