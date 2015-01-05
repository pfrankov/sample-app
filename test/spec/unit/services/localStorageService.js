describe( "Service localStorageService", function() {
	beforeEach(angular.mock.module("app"));

	var KEY = "test-key";

	describe( "should get saved data", function() {
		it( "as numbers", angular.mock.inject( function( localStorageService ) {
			var value = 9999999;
			localStorageService.set( KEY, value );
			expect( localStorageService.get( KEY ) ).to.equal( value );
		} ) );

		it( "as objects", angular.mock.inject( function( localStorageService ) {
			var value = {
				a: 1,
				b: {
					a: 2
				}
			};
			localStorageService.set( KEY, value );
			expect( _.isEqual(localStorageService.get( KEY ), value) ).to.equal( true );
		} ) );

		it( "as arrays", angular.mock.inject( function( localStorageService ) {
			var value = [1,"2",{a:1}];
			localStorageService.set( KEY, value );
			expect( _.isEqual(localStorageService.get( KEY ), value) ).to.equal( true );
		} ) );

		it( "as strings", angular.mock.inject( function( localStorageService ) {
			var value = "sample string";
			localStorageService.set( KEY, value );
			expect( localStorageService.get( KEY ) ).to.equal( value );
		} ) );
	});
} );