angular.module('starter.controllers', [])

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('MenuCtrl',function($scope, Quotes){
    Quotes.getCategories().success(function(data){
      $scope.categories=data.categories;
    });
})

.controller('ShowCtrl',function($scope, $stateParams, Quotes, $ionicLoading){
  $ionicLoading.show({
    template:'<p class="item-icon-left">Loading stuff...<ion-spinner icon="lines"/></p',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  Quotes.getQuotes($stateParams.name).success(function(data){
    $ionicLoading.hide();
    $scope.quotes=data.quotes;
  });
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
