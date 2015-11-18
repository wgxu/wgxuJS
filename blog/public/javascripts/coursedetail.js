/**
 * 教程详情页面js
 * @Author: wgxu
 * @param   {[type]} $ [description]
 * @return  {[type]}   [description]
 */
(function($){

    var courseDetail = {

        //初始化百度编辑器
        _initEdit: function(){
            var editor = UE.getEditor("myEditor",{
                //设置工具栏
                toolbars:[['source', 'undo', 'redo','bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 
                'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor',
                 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']],
                //关闭字数统计
                
                //关闭elementPath  
                elementPathEnabled:false, 
                 //默认的编辑区域高度  
                initialFrameHeight:120,
                //超过出提示滚动条
                scaleEnabled:true,
            });
        },

        //模块初始化
        init: function(){
            var _ = this;

            _._initEdit();
        }
    };

    //执行模块
    courseDetail.init();
})(jQuery)