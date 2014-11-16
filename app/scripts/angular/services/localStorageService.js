module.exports = {
	localStorageService: function(){
		this.set = function(key, value){
			localStorage.setItem(key, JSON.stringify(value));
		};
		
		this.get = function(key){
			var value = localStorage.getItem(key);
			
			try {
				value = JSON.parse(value);
			}catch(e) {
				throw Error("Cannot parse result from localStorage");
			}

			return value;
		}
	}
};