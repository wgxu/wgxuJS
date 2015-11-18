/**
 * @description 模式数据库
 */

var tables = {};

//用户表
tables.User = [{
    "name":"撒旦佣兵",
    "username": "wgxu",
    "pwd": "123456"
},{
    "name":"管理员",
    "username": "admin",
    "pwd": "123456"
}];


//帖子表
tables.cardData = [
    {
        "id": "1",
        "title": "css怎样才能获取id",
        "content": "通过选择器选择,class,id,input等元素,find,eq等等",
        "datetime":new Date().toLocaleDateString(),
        "author": "撒旦佣兵"
    },{
        "id": "2",
        "title": "关于怎样消除css和input之前的差异",
        "content": "测试",
        "datetime":new Date().toLocaleDateString(),
        "author": "撒旦佣兵"
    },{
        "id": "3",
        "title": "css hack的妙用",
        "content": "测试",
        "datetime":new Date().toLocaleDateString(),
        "author": "撒旦佣兵"
    },{
        "id": "4",
        "title": "javascript的this概述",
        "content": "测试",
        "datetime":new Date().toLocaleDateString(),
        "author": "撒旦佣兵"
    },{
        "id": "5",
        "title": "nodejs的说明",
        "content": "测试",
        "datetime":new Date().toLocaleDateString(),
        "author": "撒旦佣兵"
    },{
        "id": "6",
        "title": "$socpe作用域的概念",
        "content": "测试",
        "datetime":new Date().toLocaleDateString(),
        "author": "撒旦佣兵"
    }];


//教程表
tables.courseData = [
    {
        "id": "1",
        "title": "javascript权威指南",
        "author": "撒旦佣兵",
        "type":"0",
        "content": "测试",
        "datetime":new Date().toLocaleDateString()
    },{
        "id": "2",
        "title": "css权威指南",
        "author": "撒旦佣兵",
        "type":"1",
        "content": "测试",
        "datetime":new Date().toLocaleDateString()
    },{
        "id": "3",
        "title": "angularJS权威指南",
        "author": "撒旦佣兵",
        "type":"0",
        "content": "测试",
        "datetime":new Date().toLocaleDateString()
    },{
        "id": "4",
        "title": "nodejs入门精通",
        "author": "撒旦佣兵",
        "type":"0",
        "content": "测试",
        "datetime":new Date().toLocaleDateString()
    },{
        "id": "5",
        "title": "html5入门指南",
        "author": "撒旦佣兵",
        "type":"2",
        "content": "测试",
        "datetime":new Date().toLocaleDateString()
    },{
        "id": "6",
        "title": "div+css布局大全",
        "author": "撒旦佣兵",
        "type":"2",
        "content": "测试",
        "datetime":new Date().toLocaleDateString()
    }];


//问题表
tables.quesData = [
    {
        "id": "1",
        "title": "nodeJS的为什么只能render一次",
        "content": "测试",
        "datetime":new Date().toLocaleDateString(),
        "author": "撒旦佣兵"
    },{
        "id": "2",
        "title": "setTimeout怎么模拟多线程",
        "content": "测试",
        "datetime":new Date().toLocaleDateString(),
        "author": "撒旦佣兵"
    },{
        "id": "3",
        "title": "setInterval怎么用",
        "content": "测试",
        "datetime":new Date().toLocaleDateString(),
        "author": "撒旦佣兵"
    },{
        "id": "4",
        "title": "angUlarJS的指令怎么用",
        "content": "测试",
        "datetime":new Date().toLocaleDateString(),
        "author": "撒旦佣兵"
    },{
        "id": "5",
        "title": "js的单例模式",
        "content": "测试",
        "datetime":new Date().toLocaleDateString(),
        "author": "撒旦佣兵"
    },{
        "id": "6",
        "title": "html5新增哪些新技术",
        "content": "测试",
        "datetime":new Date().toLocaleDateString(),
        "author": "撒旦佣兵"
    }];

module.exports = tables;