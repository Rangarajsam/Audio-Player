angular.module('playerController', [])
    .controller('playerCtrl', ['$scope', 'playerControls', '$interval', function ($scope, playerControls, $interval) {

        $scope.playerName = "Lissome";
        //$scope.song= new Audio("./songs/Malare_Ninne.mp3");
        $scope.song = {};
        $scope.song.type = "audio/mpeg";
        $scope.song.autoplay = "";
        $scope.playing = false;
        $scope.song.selected = "";
        $scope.song.duration = 0;
        $scope.currentTime = 0;
        $scope.songList = [];
        $scope.currentSongIndex;
        HTMLAudioElement.prototype.stop=function(){
            this.pause=true;
            this.currentTime=0.0;
        };
        $scope.fileNameChanged = function (el) {
            $scope.localUrl = window.URL.createObjectURL(el.files[0]);
            console.log($scope.localUrl);
            $scope.selected = el.files[0].name;
            $scope.song = new Audio($scope.localUrl);
            console.log($scope.song);
            $scope.songList.push({
                song: $scope.song,
                songName: $scope.selected
            });
            $scope.$apply();
            console.log($scope.songList);
        };
        $scope.playAudio = function () {
             var totalSongs = $scope.songList.length;
            var index =($scope.currentSongIndex) ? $scope.currentSongIndex : 0;
            if ($scope.playing) {
                $scope.songList[index].song.pause();
                $scope.currentSongIndex = index;
                $scope.playing = false;
            } else {
                $scope.songList[index].song.play();
                $scope.currentSongIndex = index;
                $interval(function () {
                    $scope.currentTime = $scope.songList[index].song.currentTime;
                }, 1000);
                $scope.playing = true;
            }
        };
        $scope.playFromPlaylist = function (index) {
            var totalSongs = $scope.songList.length;
            //var index =($scope.currentSongIndex) ? $scope.currentSongIndex : 0;
            if ($scope.playing) {
                $scope.songList[$scope.currentSongIndex].song.stop();
                $scope.songList[index].song.play();
                $scope.currentSongIndex = index;
                $scope.playing = true;
            } else {
                $scope.songList[index].song.play();
                $scope.currentSongIndex = index;
                $interval(function () {
                    $scope.currentTime = $scope.songList[index].song.currentTime;
                }, 1000);
                $scope.playing = true;
            }

        };

}])
    .filter('secToMins', function () {
        return function (secs) {
            var mins = parseInt(secs / 60, 10);
            var osSecs = parseInt(secs % 60);
            return mins + " : " + osSecs;
        }
    });