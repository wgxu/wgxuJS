var mainFilter = angular.module('mainFilter',[]);

//转化数据
mainFilter.filter('vetted',function(){
    return function(array){
        var statusObj = {"0":"未审核","1":"通过","2":"不通过"},
            arr = array.slice(0);  //数组深copy

        for(var i=0,len=array.length;i<len;i++) {
            for(var key in statusObj) {
                if(key == array[i].status) {
                    arr[i].statusTxt = statusObj[key];
                }
            }
        }
        
        return arr;
    }
});