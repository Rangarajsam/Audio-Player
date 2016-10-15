angular.module('audioPlayer')
.directive('fileread',function(){
    return{
        scope:{
            fileread:"="
        },
         link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                        console.log(scope.fileread);
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
})