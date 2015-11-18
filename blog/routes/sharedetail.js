var express = require('express'),
    router  = express.Router(),
    tables  = require('../data');


router.get('/',function(req,res,next){

    var id = req.query['id'],
        renderData = {          //根据id查询的教程  
            detailData :getCourse(id)
        };
            
    //验证登录信息
    var user = req.session.user ? req.session.user : {};

    //组装数据
    renderData['user'] = user;

    renderData['type'] = "1";

    console.log(require('util').inspect(renderData));
    res.render('detail',renderData);
});

//查询教程
function getCourse(id) {

    var data = tables.cardData;

    for(var i=0,len=data.length;i<len;i++){
        if(data[i].id == id) {
            return data[i];
        }
    }
}

module.exports = router;