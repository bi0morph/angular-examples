(function() {
	'use strict';

	function BoardsFireService($http, $q, $firebaseArray) {
		//var ref = new Firebase('https://torrid-inferno-2999.firebaseio.com/boards');

		// download the data into a local object
		//var boards = $firebaseArray(ref);
		// putting a console.log here won't work, see below

		// this waits for the data to load and then logs the output. Therefore,
		// data from the server will now appear in the logged output. Use this with care!
		//boards.$loaded()
		//	.then(function() {
		//		console.error(boards);
		//	})
		//	.catch(function(err) {
		//		console.error(err);
		//	});

		var boardsService = {
			getBoards: function() {
				return;
			}
		};

		return boardsService;
	}
	BoardsFireService.$inject = ['$http', '$q', '$firebaseArray'];
	angular
		.module('noteriousApp')
		.factory('BoardsFireService', BoardsFireService);

})();
