(function() {
	'use strict';

	var LAMPS_TYPES = {
		inc: {
			name: 'Incandescent',
			coefficients: .0625
		},
		hal: {
			name: 'Halogen',
			coefficients: .0450
		},
		cfl: {
			name: 'CFL',
			coefficients: .0146
		},
		led: {
			name: 'LED',
			coefficients: .0125
		}
	};

	angular
		.module('calculator')
		.constant('LampTypes', LAMPS_TYPES);

})();
