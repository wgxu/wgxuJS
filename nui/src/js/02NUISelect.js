/**
 * [NUISelect 下拉框UI插件]
 * @xuwg
 * @DateTime 2016-05-03
 * @param    {[type]}   $ele    [绑定的jQuery对象]
 * @param    {[type]}   options [配置参数]
 */
NUI.NUISelect = function($ele, options) {
    //默认参数
    var option = {
        initValue: '-- 请选择 --', //下拉框默认显示值
        width: 100,
        data: [], //数据
        ID: 'ID', //数据ID字段
        valueColor: '#000', //下拉框字体颜色
        value: 'text', //数据值字段
        beforeSelect: function() {}, //选中之前
        onSelect: function() {}, //选中时
        afterSelect: function() {} //选中后
    };

    var setting = NUI.$.extend({}, option, options);
    //下拉框示例模块
    var module = (function(module) {
        //创建dom结构
        module.create = function() {
            //组装dom结构
            var html = [];
            html.push('<div class="NUISelectCont" style="width:' + setting.width + 'px;background:#fff;">');
            //支持反显
            if(setting.data.length <=0) {
                html.push('<p class="NUISelectVal SysTxtEll" style="color:'+ setting.valueColor +';">请选择</p>');
            }
            for (var j = 0, lenj = setting.data.length; j < lenj; j++) {
                if (setting.data[j].active) {
                    html.push('<p class="NUISelectVal SysTxtEll" style="color:'+ setting.valueColor +';">' + setting.data[j][setting.value] + '</p>');
                    break;
                }
                if(j == lenj-1) {
                   html.push('<p class="NUISelectVal SysTxtEll">请选择</p>'); 
                }
            }
            html.push('<span class="NUISelectIco"> <i class="NUISelectDown"></i></span>');
            html.push('<ul class="NUISelectList SysHide">');
            for (var i = 0, item, len = setting.data.length; i < len; i++) {
                item = setting.data[i];
                if(item.active) {
                    html.push('<li data-id="' + item[setting.ID] + '" class="active">' + item[setting.value] + '</li>');
                }else {
                    html.push('<li data-id="' + item[setting.ID] + '">' + item[setting.value] + '</li>');
                }
            }
            html.push('</ul></div>');
            $ele.prepend(html.join(''));
        };
        //添加页面dom事件
        module.event = function() {
            //下拉框展开收缩
            $ele.click(function() {
                var $ele = $(this).find('i'),
                    $item = $(this).find('.NUISelectList');
                $ele.hasClass('NUISelectDown') ? $ele.removeClass('NUISelectDown').addClass('NUISelectUp') : $ele.removeClass('NUISelectUp').addClass('NUISelectDown');
                $item.hasClass('SysHide') ? $item.removeClass('SysHide') : $item.addClass('SysHide');
                $('.NUISelectList').not($item).addClass('SysHide');//关闭非当前窗口下拉框
                return false;
            });
            //下拉框点击事件
            $ele.on('click','li',  function(event) {
                setting.beforeSelect && setting.beforeSelect($(this));
                var value = $(this).text(),
                    index = $(this).index(),
                    $ele = $(this).parent().prev().find('i');
                if (value) {
                    $(this).parent().parent().children().eq(0).text(value);
                    //$(this).parent().parent().children().eq(0).css('color',setting.valueColor);

                }
                setting.onSelect && setting.onSelect($(this));
                $(this).addClass('active').siblings().removeClass('active');
                $ele.removeClass('NUISelectUp').addClass('NUISelectDown');
                $(this).parent().addClass('SysHide');
                module.uuid = $(this).attr('data-id');
                module.text = $(this).text();
                //同步选中效果到隐藏的dom中
                $(this).parent().parent().next().children().eq(index).attr('selected', true).siblings().attr('selected', false);

                setting.afterSelect && setting.afterSelect($(this));
                return false;
            });

            //区域外关闭下拉框
            $(document).on('click', function() {
                var $ele = $(this).find('NUISelectIco').find('i');
                $('.NUISelectList').addClass('SysHide');
                $ele.removeClass('NUISelectUp').addClass('NUISelectDown');
            });
        };
        //销毁下拉框
        module.destory = function() {
            $ele.empty();
            $ele.data('NUISelect', null);
        };
        //填充数据
        module.setData = function(data) {
            // to do code ...  
        };
        //获取数据
        module.getData = function() {
            var retData = {};
            retData[setting.ID] = module.uuid;
            retData[setting.value] = module.text;
            return retData;
        };
        //初始化插件
        module.init = (function() {
            module.create();
            module.event();
        })();
        return module;
    })(module || {});

    $ele.data('NUISelect', module);
};