angular.module('playerController',[])
.controller('playerCtrl',['$scope','playerControls',function($scope,playerControls){
    
    $scope.playerName="Lissome";
    $scope.song= new Audio("./songs/Malare_Ninne.mp3");
    $scope.song.type="audio/mpeg";
    $scope.song.autoplay="";
    $scope.playing=false;
    
    $scope.playAudio= function(currentSong) {
        var currentSong=$scope.song;
        console.log(playerControls.duration(currentSong));
        console.log($scope.song);
        if($scope.playing){
            currentSong.pause();
        }
        else{
             currentSong.play();
        }
        $scope.playing=!$scope.playing;
    };
}]);