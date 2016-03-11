(function() {
	'use strict';

	function routerConfig($routeProvider) {
		var boards = {
				templateUrl: 'app/boards/boards.html',
				controller: 'BoardsController as boardsCtrl'
			},
			notes = {
				templateUrl: 'app/notes/notes.html',
				controller: 'NotesController as notesCtrl'
			},
			defaults = {
				redirectTo: '/'
			};

		$routeProvider
			.when('/', boards)
			.when('/board/:id', notes)
			.otherwise( defaults );
	}

	routerConfig.$inject = ['$routeProvider'];

	angular
		.module('noteriousApp')
		.config(routerConfig);
})();
