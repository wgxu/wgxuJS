/**
 * [基于nodejs搭建的服务器，用于模拟项目后端进行json回传]
 * @author：xuwg
 * @datetime: 2016/3/11
 */

//加载node内置模块
var http         = require('http'),
    mime         = require('mime'),
    path         = require('path'),
    url          = require('url'),
    fs           = require('fs'),
    querystring  = require('querystring'),
    util         = require('util');

//加载module文件
var route        = require('./route');


var cache ={},         //静态文件缓存
    PROT  = 8899;      //端口号


var server = http.createServer(function(req,res){
    if(req.url !== '/favicon.ico') {
        //check method
        if (req.method == 'GET') {
            //check static file
            req.url.indexOf('?') == '-1' ? (function() {
                var pathname = url.parse(req.url).pathname;
                pathname = __dirname + '/app' + pathname;
                staticServer(req, res, pathname);
            })() : (function() {
                var fileName, //请求接口名称
                    params; //请求参数对象

                fileNameArr = url.parse(req.url).pathname.split('/');
                fileName = fileNameArr[fileNameArr.length - 1]
                params = querystring.parse(url.parse(req.url).query);
                route(req, res, fileName, params);
            })();

        } else {
            var fileName, //请求接口名称
                params = ''; //请求参数字符串
            req.on('data',function(chunk){
                params += chunk;
            });

            req.on('end',function(){
                params = querystring.parse(params);
                fileNameArr = url.parse(req.url).pathname.split('/');
                fileName = fileNameArr[fileNameArr.length - 1]
                route(req, res, fileName, params);
            });
        }
    }
});

server.listen(PROT,'0.0.0.0',function(){
    console.log('the server port is ' + PROT + ' and welcome visit...');
});

/**
 * [静态服务器]
 * @xuwg
 * @DateTime 2016-03-11
 * @param    {[type]}   req [request]
 * @param    {[type]}   res [response]
 * @return   {[type]}       [description]
 */
function staticServer(req,res,filePath){
    var content = '', //static 文件内容
        readStream;  // read流
    fs.exists(filePath,function(exists){
        if(!exists) {
           NotFound(req,res); 
        }else {
            if(cache[filePath]){ //判断缓存
                show(req,res,cache[filePath],filePath);
            }else {
                readStream = fs.createReadStream(filePath,"binary");
                readStream.on('data',function(data){
                    content += data;
                });
                readStream.on('end',function(){
                    cache[filePath] = content;
                    show(req,res,content,filePath);
                });
            }
        }
    });
}

/**
 * [静态文件不存在]
 * @xuwg
 * @DateTime 2016-03-11
 * @param    {[type]}   req [description]
 * @param    {[type]}   res [description]
 */
function NotFound(req,res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('404 Not Found.');
}


/**
 * [显示静态页面]
 * @xuwg
 * @DateTime 2016-03-11
 * @param    {[type]}   req      [description]
 * @param    {[type]}   res      [description]
 * @param    {[type]}   content  [静态内容]
 * @param    {[type]}   filePath [静态文件路径]
 * @return   {[type]}            [description]
 */
function show(req,res,content,filePath) {
    res.writeHead(200, {'Content-Type': mime.lookup(filePath)});
    res.end(content,"binary");
};