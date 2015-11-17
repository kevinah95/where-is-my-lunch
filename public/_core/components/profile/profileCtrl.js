app.controller('profileCtrl', ['$scope','$http', '$location', function($scope,$ocLazyLoad, $http, $location) {
  $ocLazyLoad.load({
      serie: true, //If true load your files in serie otherwise parallel.
      cache: false, //reload when go back
      files: [
          'assets/profile/js/jquery.backstretch.min.js',
          'assets/profile/js/jquery-1.11.1.min.js',
          'assets/profile/js/placeholder.js',
          'assets/profile/js/scripts.js',
          'assets/profile/css/form-elements.css',
          'assets/profile/css/style.css'
      ]
  });

  $scope.init = function() {
      $http.get('/api/profile').success(function(data) { $scope.posts = data; console.log(data); });
      console.log("Ejecutado");
  };
  $scope.editProfile = function(){
  	console.log("Edit Profile");
  };
  $scope.goBack = function(){
  	console.log("Go Back");
  };
}]);