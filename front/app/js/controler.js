
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

  /*Aside management*/

  var isAsideVisible = false;

  vm.showAside = function(myEvent){
    console.log(isAsideVisible);
    if(!isAsideVisible){
      console.log("Affichage");
      var aside = document.querySelector("#aside");

      var width = 300,
          i = 0,
          fn = function () {
              aside.style.width = i +"px";
              if (i < width) {
                  i+=5;
                  setTimeout(function () {
                      fn();
                  }, 10);
              }
          };
      fn();
    }
    isAsideVisible = true;
  };

  vm.hideAside = function(){
    if(isAsideVisible){
      var aside = document.querySelector("#aside");

        var width = 300,
            i = 0,
            fn = function () {
                aside.style.width = (width-i) +"px";
                if (i < width) {
                    i+=5;
                    setTimeout(function () {
                        fn();
                    }, 10);
                }
            };
        fn();
    }
    isAsideVisible = false;
  };

});




