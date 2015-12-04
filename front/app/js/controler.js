app.controller('mainCtrl', ['$scope',function($scope) {
  var vm = this;
  vm.events = [
    {name:'incendie', color : '#db712b', population:2714856, position: [41.878113, -87.629798]},
    {name:'tsunami', color : '#2a8bb3', population:8405837, position: [40.714352, -74.005973]},
    {name:'inondation', color : '#875e1d', population:3857799, position: [34.052234, -118.243684]},
    {name:'zombie', color : '#1cce20', population:603502, position: [49.25, -123.1]}
  ];
  vm.getRadius = function(num) {
    return Math.sqrt(num) * 100;
  }
}]);
