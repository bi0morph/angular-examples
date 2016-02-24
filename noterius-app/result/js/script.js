angular.module('noteriousApp', ['ngRoute'])
	.config(noteriousConfig)
	.controller('MainCtrl', MainCtrl)
	.controller('BoardsCtrl', BoardsCtrl)
	.controller('NotesCtrl', NotesCtrl);


function noteriousConfig($routeProvider) {
	var boards = {
		templateUrl: 'partial/boards.html',
		controller: 'BoardsCtrl'
	},
	notes = {
		templateUrl: 'partial/notes.html',
		controller: 'NotesCtrl'	
	},
	defaults = {
		redirectTo: '/'
	};

	$routeProvider
		.when('/', boards)
		.when('/board/:id', notes)
		.otherwise( defaults );
}
function MainCtrl() {}
function BoardsCtrl() {}
function NotesCtrl() {}