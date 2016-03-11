(function() {
	'use strict';

	function NotesController($routeParams, $log, $firebaseArray) {
		$log.debug('NotesController');
		$log.debug('$routeParams', $routeParams);

		var ref = new Firebase('https://torrid-inferno-2999.firebaseio.com/notes/' + $routeParams.id);

		var vm = this,
			defauts = {
				title: '',
				content: ''
			};

		vm.notes = $firebaseArray(ref);
		vm.notes.$loaded()
			.then(function() {
				$log.debug(vm.notes);
			})
			.catch(function(error) {
				$log.debug(error);
			});

		vm.add = function add(note) {
			vm.notes.$add({
				title: note.title,
				content: note.content,
			}).then(function() {
				var id = ref.key();
				console.log("added note with id " + id);
				_reset();
			});
		};
		vm.remove = function remove(note) {
			vm.notes.$remove(note).then(function(ref) {
				console.log("removed note with id " + note.$id, ref.key() === note.$id);
			});
		};

		function _reset() {
			vm.note = angular.copy(defauts);
		}
		_reset();
	}
	NotesController.$inject = ['$routeParams', '$log', '$firebaseArray'];

	angular
		.module('noteriousApp')
		.controller('NotesController', NotesController);


})();
