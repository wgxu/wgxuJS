var mainService = angular.module('mainService',[]);
mainService.service('New',function($rootScope){
    var service = {
        /*审核状态: 0表示未审核，1表示审核通过，2表示审核未通过*/
        News: [
                {"id":"BL-0001","title":"安徽彩民中500万","date":"2015-10-25","content":"安徽彩民中500万", "status":"1"},
                {"id":"BL-0002","title":"河南母猪上树了","date":"2015-10-22","status":"0","content":"河南母猪上树了"},
                {"id":"BL-0003","title":"UFO降临地球后的所作所为","date":"2015-10-22","status":"2","content":"UFO降临地球后的所作所为"},
            ],
        addNews: function(New){
            service.News.unshift(New);
        },
        removeNews: function(id){
            var news = [];
            for(var i=0,len=service.News.length;i<len;i++) {
                if(service.News[i].id !== id){
                    news.push(service.News[i]);
                }
            }
            service.News = news;
        }
    };
    return service;
});