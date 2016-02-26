(function() {
	'use strict';

	function NotesController(BoardsService, $routeParams, $log, $location) {
		$log.debug('NotesController');
		$log.debug('$routeParams', $routeParams);

		var vm = this,
			defauts = {
				title: '',
				content: ''
			};
		vm.board = BoardsService.getByIndex($routeParams.id);
		$log.debug('board: ', vm.board);
		if (!vm.board) {
			$location.path( "/" );
			$log.debug('board is undefined, so redirect to "/"');
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
	NotesController.$inject = ['BoardsService', '$routeParams', '$log', '$location'];

	angular
		.module('noteriousApp')
		.controller('NotesController', NotesController);


})();
