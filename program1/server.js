var http = require('http'),
    mime = require('mime'),
    fs   = require('fs'),
    url  = require('url'),
    util = require('util'),
    cache = {}; //缓存数据


http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;
    console.log(pathname);

    //设置默认值页面
    pathname = pathname == '/' ? '/index.html' : pathname;
        
    var filepath = __dirname + pathname;//合并文件路径

    console.log(filepath);
    
    //调用静态服务器
    stateServer(filepath,res);

}).listen(3000,function(){
    console.log('the server is start and port is 3000...');
});

var index = 0;

//静态服务器
function stateServer(filepath,res){
    fs.exists(filepath,function(exists){
        if(!exists){
            notFound(res);
            return;
        }

        //判断缓存区是否存在该数据
        if(cache[filepath]) {
            stateFile(res,cache[filepath],filepath);
            return;
        }

        fs.readFile(filepath,function(err,data){
            if(err){
                var errinfo = util.inspect(err);
                serverErr(res,errinfo); //返回服务端错误
                return;
            }

            cache[filepath] = data;
            stateFile(res,data,filepath);
            console.log(index++);
        });
    })
}

//404 Not server
function notFound(res) {
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end('您所访问的文件不存在！可<a href="index.html">返回</a>首页');
}


//500错误(服务端错误)
function serverErr(res,errinfo) {
    res.writeHead(200,{"Content-Type":mime.lookup(filepath)});
    res.end("");
}

//获取静态文件
function stateFile(res,data,filepath) {
    res.writeHead(200,{"Content-Type":mime.lookup(filepath)});
    res.end(data);
}