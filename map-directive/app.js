angular.module('mapDirective', [])
    .controller('MainCtrl', ['$scope', MainCtrl])
    .directive('googleMap', googleMap);

function MainCtrl($scope){
    $scope.center = [51.508742,-0.120850];
    $scope.zoom = 10;
}

function googleMap(){
    return {
        scope: {
            center: '=',
            zoom: '='
        },
        replace: true,
        template: '<div id="googleMap" style="width:500px;height:380px;"></div>',

        link: function(scope, element, attrs) {
            function _initialize(){
                scope.map = new google.maps.Map(element[0], {
                    center: new google.maps.LatLng(scope.center[0], scope.center[1]),
                    zoom: scope.zoom
                });
            }
            scope.$watch('zoom', function(newValue) {
                if (scope.map) {
                    scope.map.setZoom(newValue);    
                }                
            });
            google.maps.event.addDomListener(window, 'load', _initialize);
        }
    }
}