var app = angular.module('jokeGenerator', []);

function runThisGenerator(gen) {
	var iter = gen() // init generator
	var ret;

	//async iterate over generator
	(function iterate(val){
		ret = iter.next(val);

		if (!ret.done) {
			// is it a promise?
			if('then' in ret.value){
				ret.value.then(iterate); // recursive
			}
			// immediate value: just send back in
			else {
				// avoid synchronous recursion
				setTimeout(function() {
					iterate(ret.value);
				}, 0)
			}
		}
	})();
}


app.controller('jokeCtrl', function($scope, $http){
	$scope.currentJoke = 'placeholder';

	$scope.jokeGetter = function*(){
		var response = yield $http.get('/joke')
		$scope.currentJoke = response.data;

		// PROMISE VERSION
		// $http.get('/joke').then(function(response){
		// 	$scope.currentJoke = response.data;
		// })
	}

	$scope.getJoke = function(){
		console.log('tick');
		runThisGenerator($scope.jokeGetter);
	}
})