/*
*version:  1.0
*author:   wgxu
*date:     2015-10-15
*dec：     使用冒泡的方式展示内容，可配置显示数目
*example:  $('').tankuan({domlist});
**/
(function($){
    var Plugin = function($ele,opt){
        this.$ele = $ele;
        this.opt = opt;
        this.defaultSetting = {
            during:    2000,   //展现市场
            showNum:   2,      //展现个数
            domList :  []     //弹幕dom列表
        };
        this.options = $.extend({},this.defaultSetting,this.opt);
    };

    Plugin.prototype = {
        //初始化函数
        init: function(){
            var _ = this;
             _.isf = true,       //判断开始加节点
                l   = this.options.domList.length,
                _.w   = 0,          
                _.h   = 0;
            window.index = 0;      //计数

            var t = setInterval(function(){
                if(index <= l-1){
                    _.BombScreenAddNode();
                }else{
                    _.BombScreenNotAdd();
                }
            },_.options.during);

        },

        //弹幕，添加节点
        BombScreenAddNode: function(){
            var _  = this;
             var html = _.options.domList[index];
                if(!_.isf){
                    if(_.$ele.children().length >= _.options.showNum + 1){
                        _.$ele.children().eq(1).addClass('item-no');
                        _.$ele.children().eq(0).remove();
                    }
                }

                if(_.isf){
                    if(_.$ele.children().length >= _.options.showNum){
                        if(_.$ele.children().length == _.options.showNum){
                            _.$ele.children().eq(0).addClass('item-no');
                        }
                        if(_.$ele.children().length == _.options.showNum + 1){
                            _.$ele.children().eq(0).remove();
                            _.$ele.children().eq(0).addClass('item-no');
                            _.isf = false;
                        }
                    }
                }

                _.$ele.append(html);
                _.$ele.children().each(function(j){
                    var top = $(this).css('top'),
                        height = $(this).height();
                    top = parseInt(top.replace('px',''));
                    $(this).css({
                        'top': (top - height - 20) + 'px'
                    });
                    $(this).addClass('item-on');
                });
                index++; 
        },

        //弹幕2，不添加节点
        BombScreenNotAdd: function(){
            var _ = this;
            if(_.$ele.children().length >=2){
                _.$ele.children().eq(1).addClass('item-no');
                _.$ele.children().eq(0).remove();
            }else{
                _.$ele.children().eq(0).remove();
            }
            _.$ele.children().each(function(j){
                var top = $(this).css('top'),
                    height = $(this).height();
                top = parseInt(top.replace('px',''));
                $(this).css({
                    'top': (top - height - 20) + 'px'
                });
                $(this).addClass('item-on');
            });
        }
    }


    $.fn.tankuang = function(opt){
        var plugin = new Plugin(this,opt);
        return plugin.init();
    }

})(Zepto);