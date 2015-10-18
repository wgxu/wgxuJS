/* 
*version: 1.0
*author: wgxu
*date: 2015-10-12 21:00
*example:
    dom: <div id="slide"><ul><li></li></ul></div>
    js: $('#slide').tlsilde({});
*/
;(function($,window){
    var silde = function($ele,opt){
        this.opt = opt || {};
        this.$ele = $ele;
        this.defaultsetting = {
            during: 4000,    //页面持续时间
            speed:  600,     //动画速度
            hotColor: '#C9D1D1',
            hotColorHover: '#1598E2',
            beforeTurn: function(){}
        };
        this.options = $.extend({},this.defaultsetting,this.opt);
    };

    silde.prototype = {
        //初始化函数
        init: function(){
            var _self = this;
                _self.ul = _self.$ele.find('>ul'),
                _self.lis = _self.ul.find('>li'),
                _self.i = 0,
                //_self.isfirst = true,
                _self.width = 0,
                _self.height =  0,
                _self.l = _self.lis.length,
                _self.f = false,
                _self.t = null;

                _self.setCss();
                _self.createHot();
                _self.play();
                _self.addEvent();
        },

        //设置css
        setCss: function(){
            var _self = this;
            _self.lis.each(function(){
                var li = $(this);
                li.css({
                    'float': 'left'
                });
                if(li.outerWidth() > _self.width ){
                    _self.width = li.outerWidth();
                }
                if(li.outerHeight() > _self.height){
                    _self.height = li.outerHeight();
                }
            });

            this.$ele.css({
                'width': _self.width + 'px',
                'height': _self.height + 'px',
                'overflow': 'hidden',
                'position': 'relative'
            });

            _self.ul.css({
                'listStyle': 'none',
                'position': 'relative',
                'width': _self.l * _self.width + 'px',
                'height':_self.height + 'px',
                'padding': '0',
                'margin': '0'
            });
        },

        //创建浮点
        createHot:function(){
            var _self = this,
                html = '<div class="silde-hot">';
            for(var i=0;i <_self.l;i++){
                if(i ==0){
                    html += '<span id="myli'+ i +'" sid="'+ i +'" class="silde-hot-on"></span>';
                }else{
                    html += '<span id="myli'+ i +'" sid="'+ i +'"></span>';
                }
            }
            html += '</div>';

            var style = '<style type="text/css">.silde-hot .silde-hot-on{background-color:' 
                      + _self.options.hotColorHover 
                      + ';}.silde-hot >span{background-color:'
                      + _self.options.hotColor
                      +';}</style>';
            $('head').append(style);

            _self.$ele.append(html);
            $('.silde-hot').css({
                'width': '100%',
                'position': 'absolute',
                'height' : '20px',
                'bottom' : '10px',
                'textAlign': 'center'
            });

            $('.silde-hot >span').css({
                'marginLeft': '10px',
                'width': '10px',
                'height': '10px',
                'display': 'inline-block',
                'borderRadius': '5px',
            });
        },

        //自动切换
        autochange:function(){
            var _self = this;
            $('#myli'+ _self.i).addClass('silde-hot-on').siblings().removeClass('silde-hot-on');

            _self.ul.animate({
                'left': '-'+ _self.width*(_self.i)+ 'px'
            });
            _self.options.beforeTurn($("myli"+ _self.i));

            if(_self.i >= _self.l -1){
                _self.f = true;
            }
            if(_self.i <=0){
                _self.f = false;
            }
            if(_self.f){
                _self.i--;
            }else{
                _self.i++;
            }
        },

        //执行
        play: function(){
            var _self = this;
            _self.t = setInterval(function(){
                _self.autochange()
            },_self.options.during);
        },

        //停止
        stop: function(){
            var _self = this;
            clearInterval(_self.t);
        },

        //event
        addEvent: function(){
            var _self = this;

            _self.lis.hover(function(){
                _self.stop();
            },
            function(){
                _self.play();
            });

            $('.silde-hot >span').hover(function(){
                _self.stop();
                _self.i= parseInt($(this).attr('sid'));
                _self.autochange();
            },
            function(){
                _self.play();
            });
        }
    };

    $.fn.tlsilde = function(opt){
        var tlsildeObj = new silde(this,opt);
        return tlsildeObj.init();   
    }

})(jQuery,window);