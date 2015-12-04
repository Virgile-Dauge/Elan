app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/apropos', {
                templateUrl: 'apropos.html'
            }).
            when('/map', {
                templateUrl: 'map.html',
                controller:'mainCtrl'
            }).
            otherwise({
                redirectTo: '/map'
            });
    }]);