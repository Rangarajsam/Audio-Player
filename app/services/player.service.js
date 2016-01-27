angular.module('playerService',[])
.service('playerControls',[function(){
    
    this.play=function(audio){
        audio.play();
    };
    this.pause=function(audio){
        audio.pause();
    };
    this.duration=function(audio){
        return audio.duration;
    };
    this.duration=function(audio){
        return audio.duration;
    };
    this.startAgain=function(audio){
        return audio.currentTime=0;
    };
    this.startAgain=function(audio){
        return audio.currentTime=0;
    };
    this.loop=function(audio){
        return audio.loop=true;
    };
    this.mute=function(audio){
        return audio.muted=true;
    };
    
}]);