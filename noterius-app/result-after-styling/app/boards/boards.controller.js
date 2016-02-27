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
		vm.boards = [];
		vm.remove = _remove;
		vm.add = _add;

		function _showError(error) {
				$log.error(error);
		}
		function _updateBoardModel() {
			// метод getBoards сервиса BoardsService возвращает Promise объект
			var promiseFromBoard = BoardsService.find();

			// добавляем функции обратного вызова
			promiseFromBoard.then(function(result){
				$log.debug(result);
				// http://joxi.ru/Y2LDBgESnqZd62
				// в result мы получаем:
				// result.config - то что было в запросе
				// result.data - непосредственно данные, которые отдал сервер
				// result.header - заголовок ответа сервера
				// result.status - статус ответа сервера
				// result.statusText - текст статуса

				// изменяем нашу модель приложения
				vm.boards = result.data;
			}).catch(_showError);
		}
		function _add(board, boardForm) {
			BoardsService
				.create(board.title, board.description, board.isPublic)
				.then(function() {
					_updateBoardModel();
					_reset(boardForm);
				})
				.catch(_showError);
		}
		function _remove(boardId) {
			BoardsService.destroy(boardId)
				.then(_updateBoardModel)
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

		_updateBoardModel();
	}
	BoardsController.$inject = ['BoardsService', '$log'];

	angular
		.module('noteriousApp')
		.controller('BoardsController', BoardsController);


})();
