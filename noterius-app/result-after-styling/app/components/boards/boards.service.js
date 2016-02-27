(function() {
	'use strict';

	function BoardsService($http, $q) {
		var baseUrl = 'https://torrid-inferno-2999.firebaseio.com/',
			boards = [],
			boardsService = {};

		function _find() {
			// создаем объект из которого получим Promise
			var deferred = $q.defer(),
				url = baseUrl + '/boards.json';

			// $http.get возвращает свой Promise объект
			var promiseFromHttp = $http.get(url);

			// в случае успеха сообщаем нашему Promise объекту, что все ок
			promiseFromHttp
				.then(deferred.resolve)
				.catch(deferred.reject);

			// возвращаем наш Promise объект
			return deferred.promise;
		}

		function _create(title, description, isPublic) {
			var deferred = $q.defer();
			var url = baseUrl + '/boards.json';
			var params = {title: title, description: description, isPublic: isPublic};

			$http.post(url, params).then(deferred.resolve).catch(deferred.reject);

			return deferred.promise;
		}

		boardsService.find = _find;
		boardsService.create = _create;

		boardsService.add = function add (board) {
			_create();
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
	BoardsService.$inject = ['$http', '$q'];
	angular
		.module('noteriousApp')
		.factory('BoardsService', BoardsService);

})();
