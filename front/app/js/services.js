app.service('myService', function($http) {
    this.callAPI = function() {
        return $http({
            method: 'GET',
            url: 'http://193.54.15.145:443/rest/events'
        })
    };
    return this;
});

