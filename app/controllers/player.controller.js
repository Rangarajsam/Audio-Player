angular.module('playerController', [])
    .controller('playerCtrl', ['$scope', 'playerControls', function ($scope, playerControls) {

        $scope.playerName = "Lissome";
        //$scope.song= new Audio("./songs/Malare_Ninne.mp3");
        $scope.song = {};
        $scope.song.type = "audio/mpeg";
        $scope.song.autoplay = "";
        $scope.playing = false;
        $scope.song.selected = "";
        $scope.songList=[];
        $scope.fileNameChanged = function (el) {
            $scope.localUrl = window.URL.createObjectURL(el.files[0]);
            console.log($scope.localUrl);
            $scope.selected = el.files[0].name;
            $scope.song = new Audio($scope.localUrl);
            console.log($scope.selected);
            $scope.songList.push($scope.song);
            console.log($scope.songList);
        };
        $scope.playAudio = function () {
            console.log($scope.selected);
            //var currentSong=$scope.song;
            console.log($scope.song);
            if ($scope.playing) {
                $scope.song.pause();
                $scope.playing = false;
            } else {
                $scope.song.play();
                $scope.playing = true;
            }
            //$scope.playing=!$scope.playing;
            console.log($scope.playing);
        };
}]);