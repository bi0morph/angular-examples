(function() {
	'use strict';

	function NotesController(BoardsService) {
		var vm = this;

		vm.boards = BoardsService.getBoards();

		vm.remove = function remove(board) {
			BoardsService.remove(board);
			vm.boards = BoardsService.getBoards();
		}
	}
	NotesController.$inject = ['BoardsService'];

	angular
		.module('noteriousApp')
		.controller('NotesController', NotesController);


})();
