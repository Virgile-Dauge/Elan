app.controller('mainCtrl', ['$scope','myService',function($scope,myService) {
  var vm = this;

  myService.callAPI().then(function(response) {
    console.log(response.data);
    vm.events = response.data;
  }, function(error) {
    console.log(error);
  });

  vm.getRadius = function(num) {
    return Math.sqrt(num) * 100;
  }

}]);
