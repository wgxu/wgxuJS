var app = angular.module('appDemo',['ngRoute','mainController','mainService','mainFilter']);

//路由函数
function routeConfig($routeProvider) {
    $routeProvider.
    when('/',{
        controller: 'newList',
        templateUrl: './view/home.html'
    }).
    when('/add',{
        controller: 'add',
        templateUrl: './view/addnew.html'
    }).
    when('/list/:id',{
        controller: 'detilController',
        templateUrl: './view/detail.html'
    });
}

app.config(routeConfig);