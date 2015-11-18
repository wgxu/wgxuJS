/**
 * 教程页面js
 * @Author: wgxu
 * @param   {[type]} $ [description]
 * @return  {[type]}   [description]
 */
(function($){
    //教程模块
    var course = {

        //event handle
        addEvent: function(){
            var _ = this;  //缓存上下文

            $('.typelist a').click(function(){

                var index = $(this).index(); //获取当前索引

                //选择tab
                $(this).addClass('typelist-seclected').siblings().removeClass('typelist-seclected');
                
                //切换tab
                _._changeTab(index);
            });
        },

        //切换tab函数
        _changeTab: function(i){
            var parent = $('#tabs').children();
            for(var j=0,len=parent.length;j<len;j++) {
                j != i ? parent.eq(j).hide() : parent.eq(j).show();
            }
        },

        //初始化模块
        init: function(){
            var _ = this;

            _.addEvent();
        }
    };

    //执行模块
    course.init();
})(jQuery);