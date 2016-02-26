(function iife() {
  'use strict';

  function lamp() {
    return {
      restrict: 'E',
      templateUrl: 'assets/lamp.html',
      controller: 'LampController',
      controllerAs: 'lampCtrl'
    };
  }
  function draggable() {
    function linker($scope, $element, $attr) {
      console.log();
      $element.draggable();
    }
    return {
      restrict: 'A',
      link: linker
    };
  }
  function resizable() {
    function linker($scope, $element, $attr) {
      $element.resizable();
    }
    return {
      restrict: 'A',
      link: linker
    };
  }

  angular.module('calculator', [])
    .directive('lamp', lamp)
    .directive('draggable', draggable)
    .directive('resizable', resizable)
    .controller('CalculatorController', CalculatorController)
    .controller('LampController', LampController)
    .constant('LumensList', [375, 600, 900, 1125, 1600])
    .constant('LampTypes', {
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
    });
  
  LampController.$inject = ['LampTypes', '$scope'];
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
  
  CalculatorController.$inject = ['LumensList', 'LampTypes', '$scope'];
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
}());