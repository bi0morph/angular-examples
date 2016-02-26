(function() {
	'use strict';

	function CalculatorController(LumensList, LampTypes, $scope) {
		var calc = this;

		calc.lumen_options = LumensList;
		calc.lamps = LampTypes;

		calc.current_lumens = calc.lumen_options[0];
		calc.current_cost = 12;
		calc.current_hours = 1;

		calc.validate = function validate() {
			if(calc.current_hours > 24 ) {
				calc.current_hours = 24;
			} else if (calc.current_hours <= 0) {
				calc.current_hours = 1;
			}
		};

		$scope.$watch('calc.current_hours', function () {
			$scope.$broadcast('current_hours');
		});
		$scope.$watch('calc.current_cost', function () {
			$scope.$broadcast('current_cost');
		});
		$scope.$watch('calc.current_lumens', function () {
			$scope.$broadcast('current_lumens');
		});
	}

	CalculatorController.$inject = ['LumensList', 'LampTypes', '$scope'];

	angular
		.module('calculator')
		.controller('CalculatorController', CalculatorController);

})();
