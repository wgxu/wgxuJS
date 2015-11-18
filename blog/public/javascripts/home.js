/**
 * @author: wgxu
 * @description 首页js
 * @datetime: 2015-11-16
 */

(function($){

    //首页模块
    var homeModule = {
        //轮播
        play: function(){
            $(".flexslider").flexslider({
                slideshowSpeed: 2000, //展示时间间隔ms
                animationSpeed: 400, //滚动时间ms
                touch: true //是否支持触屏滑动
            });
        },

        //页面事件
        addEvent: function(){
            var _ = this;

            //登录
            $('.login-but').click(function(){
                var username = $('#User').val(),
                    pwd      = $('#userPwd').val(),
                    data     = {username:username,pwd:pwd};

                //判断是否登录
                if($('.welcome .namelink').text()){
                    alert("已经登录");
                    return;
                }
                
                //ajax提交
                $.post('/login',data,function(data){

                    //登录验证
                    if(data.state =="0"){
                        alert("用户名和密码不正确");
                        return;
                    }else if(data.state =="2"){
                        alert("用户已登录");
                        return;
                    }

                    //填充数据
                    _.fillLoginData(data);
                });
            });
        },

        //填充登录信息
        fillLoginData:function(data){
            var html = '<div class="welcome">'
                     +   '<span id="userName"><a href="javascript:;" class="namelink">'
                     +      data.user.name + '</a>'
                     +   '</span>,欢迎您<a href="/out" style="padding-left:10px;">退回</a>'
                     + '</div>';
            $('.nav').append(html);
        },

        //初始化
        init: function(){
            var _ = this;
            _.play();
            _.addEvent();
        }
    };


    homeModule.init();
})(jQuery)