(function() {
	'use strict';

	function BoardsController(BoardsService, $log) {
		$log.debug('BoardsController');

		var vm = this,
			_defauts = {
				title: '',
				description: '',
				isPublic: false,
				notes: []
			};
		vm.newBoard = angular.copy(_defauts);
		vm.boards = BoardsService.getBoards();
		vm.remove = _remove;
		vm.add = _add;

		function _add(board, boardForm) {
			BoardsService.add(board);
			_reset(boardForm);
		}

		function _remove(board) {
			BoardsService.remove(board);
			vm.boards = BoardsService.getBoards();
		}

		function _reset(form) {
			$log.debug(form);

			if (form) {
				form.$setPristine();
				form.$setUntouched();
			}
			vm.newBoard = angular.copy(_defauts);
		}
	}
	BoardsController.$inject = ['BoardsService', '$log'];

	angular
		.module('noteriousApp')
		.controller('BoardsController', BoardsController);


})();
