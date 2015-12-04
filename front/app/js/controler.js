
app.controller('mainCtrl', function(NgMap,myService) {
  var vm = this;

    NgMap.getMap().then(function(map) {
    vm.map = map;
  });

  myService.callAPI().then(function(response) {
    console.log(response.data);
    vm.events = response.data;
  }, function(error) {
    console.log(error);
  });

  vm.getRadius = function(num) {
    return Math.sqrt(num) * 100;
  }

  var cEvent ; 

  vm.showDetail = function(e, cEvent) {
    vm.cEvent = cEvent;
    console.log(cEvent.name);
    vm.map.showInfoWindow('infow');
  };

  vm.hideDetail = function() {
    vm.map.hideInfoWindow('infow');
  };

});

