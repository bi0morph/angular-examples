(function() {
	'use strict';

	function BoardsController(BoardsService) {
		var vm = this;

		vm.boards = BoardsService.getBoards();

		vm.remove = function remove(board) {
			BoardsService.remove(board);
			vm.boards = BoardsService.getBoards();
		}
	}
	BoardsController.$inject = ['BoardsService'];

	angular
		.module('noteriousApp')
		.controller('BoardsController', BoardsController);


})();
