
app.controller('mainCtrl', function($scope, NgMap,myService) {
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

   vm.placeChanged = function() {
     vm.place = this.getPlace();
     
     $scope.$apply(function(){
      myLatLng = new google.maps.LatLng(vm.place.geometry.location.lat(), vm.place.geometry.location.lng());
      //vm.map.setCenter(myLatLng);
      vm.map.panTo(myLatLng);
      vm.map.setZoom(10);
     })
}
});





