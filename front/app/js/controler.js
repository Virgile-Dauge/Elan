
app.controller('mainCtrl', function($scope, NgMap,myService, $location) {
  var vm = this;

    NgMap.getMap().then(function(map) {
    vm.map = map;
  });

  $scope.changeView = function(){
    $location.path('/apropos');
  };

  $scope.centerMap = function(){

    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    else
      alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");

    function successCallback(position){
      myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //vm.map.setCenter(myLatLng);
      vm.map.panTo(myLatLng);
      vm.map.setZoom(10);
    };

    function errorCallback(error){
      switch(error.code){
        case error.PERMISSION_DENIED:
          alert("L'utilisateur n'a pas autorisé l'accès à sa position");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("L'emplacement de l'utilisateur n'a pas pu être déterminé");
          break;
        case error.TIMEOUT:
          alert("Le service n'a pas répondu à temps");
          break;
      }
    };
  };

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





