/**
 * 华博UI框架核心文件，申明空间名称，引用jQuery。
 * @xuwg
 * @DateTime 2016-05-03
 */
(function($,doc) {
    //无实例化NUI组件
    NUI  = function() {
        return NUI.init();
    }; 
    window.NUI  = NUI;//namespace
    NUI.doc = doc; //缓存document
    NUI.noop = {}; //惰性函数



    try {
        NUI.$ = $; //依赖jQuery
    } catch (e){
        throw new Error('jQuery not undefine');
    }

    //防jQuery无实例化
    NUI.prototype = {
        init: function(){
            return this;
        }
    };

    /**
     * [getUUID 生成唯一标识]
     * @xuwg
     * @DateTime 2016-05-06
     * @return   {[String]}   [返回唯一标识]
     */
    NUI.getUUID = function(){
       return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    /**
     * [trim 去除空格]
     * @xuwg
     * @DateTime 2016-05-09
     * @param    {[String]}   str [传入字符串]
     * @return   {[String]}       [返回]
     */
    NUI.trim = function(str){
        var str = str || '';
        return str.replace(/(^\s*)|(\s*$)/g,'');
    }

    /**
     * [ajax ajax请求]
     * @xuwg
     * @DateTime 2016-05-16
     * @param    {[type]}   url   [url路径请求]
     * @param    {[type]}   async [同异步请求]
     * @param    {[type]}   data  ||  {} [数据类型]
     * @return   {[type]}         [请求函数]
     */
    NUI.ajax = function(url,async,data){
        var data = data || {};
        //请求数据
        return $.ajax({
            type: 'POST',
            url: url,
            data: data,
            async: async,
        });
    }