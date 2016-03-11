(function() {
	'use strict';

	function BoardsController($log, $firebaseArray) {
		$log.debug('BoardsController');

		var ref = new Firebase('https://torrid-inferno-2999.firebaseio.com/boards');

		var vm = this,
			_defauts = {
				title: '',
				description: '',
				isPublic: false,
				notes: []
			};
		vm.newBoard = angular.copy(_defauts);

		vm.boards = $firebaseArray(ref);

		vm.boards.$loaded().then(function() {
			console.log(vm.boards);
		});
		vm.remove = _remove;
		vm.add = _add;

		function _showError(error) {
				$log.error(error);
		}

		function _add(board, boardForm) {
			vm.boards.$add({
				title: board.title,
				isPublic: board.isPublic,
				description: board.description,
				notes: []
			}).then(function() {
					var id = ref.key();
					console.log("added record with id " + id);
					_reset(boardForm);
				})
				.catch(_showError);
		}
		function _remove(board) {
			vm.boards.$remove(board).then(function(ref) {
				console.log("removed record with id " + board.$id, ref.key() === board.$id);
			}).then()
				.catch(_showError);
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
	BoardsController.$inject = ['$log', '$firebaseArray'];

	angular
		.module('noteriousApp')
		.controller('BoardsController', BoardsController);


})();
