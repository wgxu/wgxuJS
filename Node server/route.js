/**
 * 服务器路由文件，通过读取注册文件内容来模拟后端回传相关数据
 * @author: xuwg
 * @datetime: 2016/3/11
 */

//加载module文件
var data = require('./data'),
    util = require('util'),
    register = require('./register');


/**
 * [route 模拟服务器的路由设置]
 * @xuwg
 * @DateTime 2016-03-11
 * @param    {[type]}   req      [description]
 * @param    {[type]}   res      [description]
 * @param    {[type]}   filename [文件名称]
 * @param    {[type]}   param    [JSON参数对象]
 * @return   {[type]}            [description]
 */
function route(req,res,filename,param) {

    //判断数据是否注册
    if(data[filename]) {
        //判断处理函数是否注册
        if (register[filename]) {
            register[filename](req, res, filename, param, data[filename]);
        } else {
            var tips = filename + ' function not register!';
            errorTips(req, res, tips);
        }
    }else {
        var tips = filename + ' data not register!';
        errorTips(req,res,tips);
    }
}

/**
 * [ajax错误提示]
 * @xuwg
 * @DateTime 2016-03-14
 * @param    {[String]}   tips [提示信息]
 * @return   {[null]}        [没有返回]
 */
function errorTips(req,res,tips){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(tips);
}

module.exports = route;