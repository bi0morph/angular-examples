(function() {
	'use strict';

	function LampController (LampTypes, $scope) {
		var lamp = this;
		lamp.wattage = _calculateWattage();
		lamp.cost = _calculateCost();

		$scope.$on('current_lumens', function () {
			lamp.wattage = _calculateWattage();
			lamp.cost = _calculateCost();
		});

		$scope.$on('current_hours', function () {
			lamp.cost = _calculateCost();
		});

		$scope.$on('current_cost', function () {
			lamp.cost = _calculateCost();
		});

		function _calculateWattage () {
			var coefficients = $scope.lamp.coefficients,
				current_lumens = $scope.calc.current_lumens;
			return (current_lumens * coefficients).toFixed(1);
		}

		function _calculateCost () {
			var current_hours = $scope.calc.current_hours,
				wattage = lamp.wattage,
				current_cost = $scope.calc.current_cost,
				total_hours = 365 * current_hours,
				cost = current_cost / 100;

			return (((wattage * total_hours) /1000) * cost).toFixed(2);
		}
	}

	LampController.$inject = ['LampTypes', '$scope'];

	angular
		.module('calculator')
		.controller('LampController', LampController);

})();
