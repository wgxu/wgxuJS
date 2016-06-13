/**
 * [validate 集成validForm 第三方插件进行校验]
 * @xuwg
 * @DateTime 2016-05-24
 * @return   {[type]}   [description]
 */
NUI.validate = function() {
    $('.NUIValidate').each(function() {
        var that = $(this);
        (that.find('[datatype]')).each(function() {
            var html = '';
            html += '<div class="NUIValidInfo">' + '<span class="NUIValidCheckTip"></span>' + '<span class="NUIValidDec"><s class="dec1">&#9670;</s><s class="dec2">&#9670;</s></span></div>';
            $(this).before(html);
        });

        //执行校验方法
        $(this).Validform({
            tiptype: function(msg, o, cssctl) {
                // msg：提示信息;
                // o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
                // cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;

                // $('.registerform').prepend(html.join(''));
                if(o.obj.hasClass('NUISelect')){
                    var objtip = o.obj.parent().prev().find(".NUIValidCheckTip");
                }else {
                    var objtip = o.obj.prev().find(".NUIValidCheckTip");
                }
                cssctl(objtip, o.type);
                objtip.text(msg);
                if(o.obj.hasClass('NUISelect')) {
                    var infoObj = o.obj.parent().prev();
                }else {
                   var infoObj = o.obj.prev(); 
                }
                // var infoObj = o.obj.prev();
                if (o.type == 2) {
                    infoObj.fadeOut(200);
                } else {
                    if (infoObj.is(":visible")) {
                        return;
                    }
                    if(o.obj.hasClass('NUISelect')) {
                        var left = o.obj.parent().offset().left,
                            top = o.obj.parent().offset().top,
                            height = o.obj.parent().height();

                        infoObj.css({
                            left: left,
                            top: top - 45
                        }).show().animate({
                            top: top + height + 10
                        }, 200);
                    }else {
                        var left = o.obj.offset().left,
                            top = o.obj.offset().top,
                            height = o.obj.height();

                        infoObj.css({
                            left: left,
                            top: top - 45
                        }).show().animate({
                            top: top + height + 10
                        }, 200);
                    }
                }
            }
        });
    });
};