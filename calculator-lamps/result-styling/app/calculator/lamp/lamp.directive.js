(function() {
	'use strict';



	function lamp() {
		var directive = {
			restrict: 'E',
			templateUrl: 'app/calculator/lamp/lamp.html',
			// TODO: isolate scope
			// without isolated scope it is for learning purpose
			controller: 'LampController',
			controllerAs: 'vm'
		};

		return directive;
	}

	angular
		.module('calculator')
		.directive('lamp', lamp);
})();
