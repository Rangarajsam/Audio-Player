angular.module('playerController', [])
    .controller('playerCtrl', ['$scope', 'playerControls', '$interval', function ($scope, playerControls, $interval) {

        $scope.playerName = "Lissome";
        //$scope.song= new Audio("./songs/Malare_Ninne.mp3");
        $scope.song = {};
        $scope.song.type = "audio/mpeg";
        $scope.song.autoplay = "";
        $scope.playing = false;
        $scope.song.selected = "";
        $scope.duration = 0;
        $scope.currentTime = 0;
        $scope.songList = [];
        $scope.currentSongIndex;
        var intervalPromise;
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
            var index = ($scope.currentSongIndex) ? $scope.currentSongIndex : 0;
            if ($scope.playing) {
                $scope.songList[index].song.pause();
                $scope.currentSongIndex = index;
                $scope.playing = false;
                $interval.cancel(intervalPromise);
            } else {
                $scope.songList[index].song.play();
                $scope.currentSongIndex = index;
                $scope.duration = $scope.songList[index].song.duration;
                console.log($scope.songList[index].song.duration);
                console.log($scope.duration);
                $scope.selected = $scope.songList[index].songName;
                intervalPromise = $interval(function () {
                    $scope.currentTime = $scope.songList[index].song.currentTime;
                }, 1000);
                $scope.playing = true;
            }
        };
        $scope.playFromPlaylist = function (index) {
            var totalSongs = $scope.songList.length;
            //var index =($scope.currentSongIndex) ? $scope.currentSongIndex : 0;
            if ($scope.playing) {
                $interval.cancel(intervalPromise);
                $scope.songList[$scope.currentSongIndex].song.pause();
                $scope.songList[$scope.currentSongIndex].song.currentTime = 0.0;
                $scope.songList[index].song.play();
                $scope.duration = $scope.songList[index].song.duration;
                $scope.selected = $scope.songList[index].songName;
                intervalPromise = $interval(function () {
                    $scope.currentTime = $scope.songList[index].song.currentTime;
                }, 1000);
                $scope.currentSongIndex = index;
                $scope.playing = true;
            } else {
                $interval.cancel(intervalPromise);
                $scope.songList[index].song.play();
                $scope.currentSongIndex = index;
                $scope.duration = $scope.songList[index].song.duration;
                $scope.selected = $scope.songList[index].songName;
                intervalPromise = $interval(function () {
                    $scope.currentTime = $scope.songList[index].song.currentTime;
                }, 1000);
                $scope.playing = true;
            }

        };
        $scope.nextSong = function () {
            $interval.cancel(intervalPromise);
            $scope.songList[$scope.currentSongIndex].song.pause();
            $scope.songList[$scope.currentSongIndex].song.currentTime = 0.0;
            $scope.songList[$scope.currentSongIndex + 1].song.play();
            $scope.currentSongIndex += 1;
            $scope.duration = $scope.songList[$scope.currentSongIndex].song.duration;
            $scope.selected = $scope.songList[$scope.currentSongIndex].songName;
            intervalPromise = $interval(function () {
                $scope.currentTime = $scope.songList[$scope.currentSongIndex].song.currentTime;
            }, 1000);
            $scope.playing = true;
        };
        
        $scope.previousSong = function () {
            $interval.cancel(intervalPromise);
            $scope.songList[$scope.currentSongIndex].song.pause();
            $scope.songList[$scope.currentSongIndex].song.currentTime = 0.0;
            $scope.songList[$scope.currentSongIndex - 1].song.play();
            $scope.currentSongIndex -= 1;
            $scope.duration = $scope.songList[$scope.currentSongIndex].song.duration;
            $scope.selected = $scope.songList[$scope.currentSongIndex].songName;
            intervalPromise = $interval(function () {
                $scope.currentTime = $scope.songList[$scope.currentSongIndex].song.currentTime;
            }, 1000);
            $scope.playing = true;
        };

}])
    .filter('secToMins', function () {
        return function (secs) {
            var mins = parseInt(secs / 60, 10);
            mins=(mins.toString().length==1) ? "0"+mins : mins;
            var osSecs = parseInt(secs % 60);
            osSecs=(osSecs.toString().length==1) ? "0"+osSecs : osSecs;
            return mins + " : " + osSecs;
        }
    });