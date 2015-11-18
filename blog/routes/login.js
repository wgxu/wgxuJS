var express = require('express'),
    router  = express.Router(),
    util    = require('util'),
    tables  = require('../data');

router.post('/',function(req,res,next){

    //用户认证
    var i = checkUser(req.body['username'],req.body['pwd']);

    if(i !== -1){
        var data = {
            "state": "1",
            "user" : {
                "name": tables.User[i].name,
                "username":tables.User[i].username
            }
        };

        //验证重复登录
        if(req.session.user){
          res.json({"state": "2","user":{}});
          return;  
        }

        // session存用户数据
        req.session.user = {
            "name": tables.User[i].name,
            "username": tables.User[i].username
        };
        console.log(util.inspect(req.session));
        res.json(data);
        return;
    }

    //认证失败
    res.json({"state": "0","user":{}});
    
});

//用户表中验证
function checkUser(name,pwd){

    var index = -1; //标识符, 如果不存在，则返回-1。如果有，返回索引。 

    for(var i=0,len=tables.User.length;i<len;i++) {
        if(name == tables.User[i].username && pwd == tables.User[i].pwd) {
            index = i;
            break;
        }
    }

    return index;
}

module.exports = router;