var express = require('express'),
    router = express.Router(),
    tables =require('../data');


var siteInfo = {
    "users": tables.User.length,
    "carsdsum": tables.cardData.length,
    "sovled": tables.quesData.length
};

//render数据
var renderData = {
    cardData: tables.cardData,
    courseData: tables.courseData,
    quesData: tables.quesData,
    siteInfo: siteInfo,
};

/* GET home page. */
router.get('/', function(req, res, next) {
  //验证是否登录
  var user = req.session.user ? req.session.user : {};
  renderData['user'] = user;

//  console.log(require('util').inspect(req.session));
  res.render('home', renderData);
  
});



module.exports = router;
