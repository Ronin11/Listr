angular
    .module('Listr')
    .controller('LoginCtrl', function(
        $scope, $mdDialog, $mdMedia, $mdToast) {
  loginController = this;
  $scope.ctrl = loginController;

  $scope.status = '  ';
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
  $scope.src = '/src/authentication/login.html';
  $scope.currentUser = loginService.getCurrentUser();
  $scope.loggedIn = loginService.isLoggedIn();
  $scope.wait = false;


   loginService.addListener(loginController);
   loginController.update = function(){
      $scope.loggedIn = loginService.isLoggedIn();
      $scope.currentUser = loginService.getCurrentUser();
    }

  
  $scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: $scope.src,
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };

  $scope.login = function() {
    $scope.wait = true;
    loginService.login($scope.username, $scope.password, function(){
      $scope.wait = false;
      if(loginService.isLoggedIn()){
        $mdDialog.hide();
        $mdToast.hide();
      } else {
        console.log("Failed");
        $mdToast.show(
          $mdToast.simple()
        .action('OK')
        .hideDelay(0)
        .position('top right')
        .textContent('Login failed!'));
      }
    });
  }

    $scope.logout = function() {
      loginService.logout();
    }

  $scope.forgotPassword = function() {
    $scope.src = '/src/authentication/forgotPassword.html'
    $scope.showAdvanced();
  }
  
  $scope.forgotPasswordSubmit = function (){
    $scope.wait = true;
    loginService.sendPassword($scope.email, function(response){
      console.log(response);
      $scope.wait = false;
        if(response.data.status == 0){
          console.log("email sent");
          $mdDialog.hide();
          $mdToast.hide();
        }
        else{
          $mdToast.show(
              $mdToast.simple()
            .action('OK')
            .hideDelay(0)
            .position('top right')
            .textContent(response.data.msg));
        }
    });
    // $http.get("/api/users/email/" + $scope.email).then(function(response) {
    //     var info = response.data[0];
    //     alert("Your username is: " + info.username + " Your password is: " + info.password);
    // });
  }

  $scope.createAccount = function (){
    $scope.src = '/src/authentication/createAccount.html'
    $scope.showAdvanced();
  }
  $scope.createAccountSubmit = function (){
    $scope.wait = true;
    userService.addUser({
      first: $scope.first,
      last: $scope.last,
      username: $scope.username,
      email: $scope.email,
      password: $scope.password,
      isAdmin: false
    }, function(){
      $scope.wait = false;
    });
    $mdDialog.hide();
  }
});
function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}