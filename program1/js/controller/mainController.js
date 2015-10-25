var mainController = angular.module('mainController',[]);
//过滤状态数据
mainController.controller('newList',['New','$scope','$filter',function(New,$scope,$filter){

    $scope.datalist = $filter('vetted')(New.News);

    $scope.deleteNew = function(id){
        New.removeNews(id);
        $scope.datalist = $filter('vetted')(New.News);
    }

}]);

//增加新闻控制器
mainController.controller('add',['$scope','New','$location',function($scope,New,$location){
    $scope.save = function(){
        var aNew = {};
        aNew['title'] = $scope.newtitle;
        aNew['content'] = $scope.newcontent;
        aNew['date'] = new Date().toLocaleDateString();
        aNew['id'] = 'BL-' + strmerge((4 - Math.ceil(New.News.length/10))) + (New.News.length +1);
        aNew['status'] = '0';
        New.addNews(aNew);
        alert('发布成功，正在等待审核');
        $location.path('/');
    }
}]);


//新闻详情控制器
mainController.controller('detilController',['New','$scope','$filter','$routeParams',function(New,$scope,$filter,$routeParams){
    var NewsDate = $filter('vetted')(New.News);
    for(var i=0,len=NewsDate.length;i<len;i++) {
        if($routeParams.id == NewsDate[i].id) {
            $scope.New = NewsDate[i];
            break;
        }
    }
}]);

function strmerge(num){
    var str = '';
    for(var i =0; i<num;i++){
        str += '0';
    }
    return str;
}