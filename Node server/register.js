/**
 * @author:xuwg
 * @datetime: 2016/3/18
 * @describute: 文件都是注册函数用于处理ajax数据请求
 *   注意: 注册的函数名必须同data文件注册名一直，且跟ajax请求的文件名一致
 */


var register = {
    test: function(req,res,filename,param,data){
        //判断是否进行数据注册
        var data = JSON.stringify(data)
        json(req,res,data);
    },
    GetValueListByKey: function(req,res,filename,param,data) {
        var data = JSON.stringify(data)
        json(req,res,data);
    },
    GetAreaByPid: function(req,res,filename,param,data) {
        var data = JSON.stringify(data);
        json(req,res,data);
    },
    GetPoliceByAreaId: function(req,res,filename,param,data) {
        var data = JSON.stringify(data);
        json(req,res,data);
    }
};


/**
 * [json ajax返回]
 * @xuwg
 * @DateTime 2016-03-14
 * @param    {[String]}   data [json字符串]
 * @return   {[null]}        [没有返回]
 */
function json(req,res,data) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(data);
}

/**
 * [ajax错误提示]
 * @xuwg
 * @DateTime 2016-03-14
 * @param    {[String]}   tips [提示信息]
 * @return   {[null]}        [没有返回]
 */
function errorTips(tips){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(tips);
}



module.exports = register;

