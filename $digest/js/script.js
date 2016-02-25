angular.module('learnDigest', [])
	.controller('TestController', TestController)
	.controller('SubController', SubController)
	.controller('ClickController', ClickController)
	.controller('MethodController', MethodController);

function TestController($scope) {
	var vm = this;
	vm.name = 'Halk';
	$scope.controllerName = 'TestController';
	this.getName = function functionName() {
		return vm.name;
	};
}
function SubController($scope) {
	$scope.controllerName = 'SubController';
}
function MethodController($scope) {
	$scope.controllerName = 'MethodController';
}
function ClickController($scope) {
	$scope.controllerName = 'ClickController';
}
