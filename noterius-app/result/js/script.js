angular.module('noteriousApp', ['ngRoute'])
	.config(noteriousConfig)
	.controller('MainCtrl', MainCtrl)
	.controller('BoardsCtrl', BoardsCtrl)
	.controller('BoardCtrl', BoardCtrl)
	.controller('NotesCtrl', NotesCtrl)
	.factory('BoardsService', BoardsService);


function noteriousConfig($routeProvider) {
	var boards = {
		templateUrl: 'partial/boards.html',
		controller: 'BoardsCtrl as boardsCtrl'
	},
	notes = {
		templateUrl: 'partial/notes.html',
		controller: 'NotesCtrl as notesCtrl'
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
function BoardsCtrl(BoardsService) {
	var vm = this;

	vm.boards = BoardsService.getBoards();

	vm.remove = function remove(board) {
		BoardsService.remove(board);
		vm.boards = BoardsService.getBoards();
	}
}
function BoardCtrl( BoardsService, $log, $routeParams) {
	var vm = this,
		defauts = {
			title: '',
			description: '',
			isPublic: false,
			notes: []
		};
	vm.board = angular.copy(defauts);

	vm.add = function add(board, boardForm) {
		BoardsService.add(board);
		_reset(boardForm);
	};

	function _reset(form) {
		$log.debug(form);

		if (form) {
			form.$setPristine();
			form.$setUntouched();
		}
		vm.board = angular.copy(defauts);
	}
}

function NotesCtrl(BoardsService, $routeParams, $log, $location) {
	$log.debug($routeParams);

	var vm = this,
		defauts = {
			title: '',
			content: ''
		};
	vm.board = BoardsService.getByIndex($routeParams.id);
	$log.debug(vm.board);
	if (!vm.board) {
		$location.path( "/" );
	}
	vm.add = function add(note) {
		BoardsService.addNote($routeParams.id, note);
		_reset();
	};
	vm.remove = function remove(note) {
		BoardsService.removeNote($routeParams.id, note);
	};

	vm.note = angular.copy(defauts);
	vm.add = function add(note) {
		BoardsService.addNote($routeParams.id, note);
		_reset();
	};
	function _reset() {
		vm.note = angular.copy(defauts);
	}
}
function BoardsService() {
	var boards = [],
		boardsService = {};

	boardsService.add = function add (board) {
		boards.push(board);
	};
	boardsService.remove = function remove (board) {
		boards = boards.reduce( function(result, item) {
			if(item != board) {
				result.push(item);
			}
			return result;
		}, []);
	};
	boardsService.getBoards = function getBoards () {
		return boards;
	};

	boardsService.getByIndex = function getByIndex (index) {
		return boards[index];
	};

	boardsService.addNote = function addNote (index, note) {
		return boards[index].notes.push(note);
	};
	boardsService.removeNote = function removeNote (index, note) {
		boards[index].notes = boards[index].notes.reduce( function(result, item) {
			if(item != note) {
				result.push(item);
			}
			return result;
		}, []);
	};

	return boardsService;
}