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
NUI.NUITree = $.fn.zTree;
NUI.NUIPages = function($ele,total, opts,url){
    opts = NUI.$.extend({
        page_size:10,
        num_display:10,
        current_page:0,
        num_edge_entries:1,
        link_to:"#",
        pageSizeField: 'pageSize',
        pageIndexField: 'pageIndex', 
        prev_text:"<<",
        next_text:">>",
        ellipse_text:"...",
        prev_show_always:true,
        next_show_always:true,
        callback:function(){},
        success:function(data){},
        error: function(data){}
    },opts||{});
    
        /**
         * 计算最大分页显示数目
         */
        function numPages() {
            return Math.ceil(total/opts.page_size);
        }   
        /**
         * 极端分页的起始和结束点，这取决于current_page 和 num_display.
         * @返回 {数组(Array)}
         */
        function getInterval()  {
            var ne_half = Math.ceil(opts.num_display/2);
            var np = numPages();
            var upper_limit = np-opts.num_display;
            var start = current_page>ne_half?Math.max(Math.min(current_page-ne_half, upper_limit), 0):0;
            var end = current_page>ne_half?Math.min(current_page+ne_half, np):Math.min(opts.num_display, np);
            return [start,end];
        }
        
        /**
         * 分页链接事件处理函数
         * @参数 {int} page_id 为新页码
         */
        function pageSelected(page_id, evt){
            current_page = page_id;
            drawLinks();
            //edit by wgxu 修复索引是0的问题
            // var continuePropagation = opts.callback(page_id, panel);
            var continuePropagation = opts.callback(page_id, panel);
            if (!continuePropagation) {
                if (evt.stopPropagation) {
                    evt.stopPropagation();
                }
                else {
                    evt.cancelBubble = true;
                }
            }
            return continuePropagation;
        }
        
        /**
         * 通过url后台获取数据
         */
        opts.callback = function(pageIndex,panel){
            var data = {};
            data[opts.pageSizeField] = opts.page_size;
            pageIndex = pageIndex + 1;
            data[opts.pageIndexField] = pageIndex;
            NUI.$.ajax({
                type: 'POST',
                url: url,
                data: data,
                dataType:'json',
                async: false,
                success: function(data){
                    opts.current_page = pageIndex < Math.ceil(data.total/opts.page_size) ? pageIndex -1 : Math.ceil(data.total/opts.page_size) -1;
                    //重新渲染分页插件
                    NUI.NUIPages($ele,data.total,opts,url);
                    opts.success(data,pageIndex);
                },
                error: function(e){
                    opts.error(e);
                }
            });
        }

        /**
         * 此函数将分页链接插入到容器元素中
         */
        function drawLinks() {
            panel.empty();      
            var interval = getInterval();
            var np = numPages();
            // 这个辅助函数返回一个处理函数调用有着正确page_id的pageSelected。
            var getClickHandler = function(page_id) {
                return function(evt){ return pageSelected(page_id,evt); }
            }
            var lnkH = NUI.$("<a>首页</a>")
                        .bind("click", getClickHandler(0))
                        .attr('href', opts.link_to.replace(/__id__/,0));
            panel.append(lnkH); 
            //辅助函数用来产生一个单链接(如果不是当前页则产生span标签)
            var appendItem = function(page_id, appendopts){
                // page_id = page_id<0?0:(page_id<np?page_id + 1:np); // 规范page id值
                page_id = page_id<0?0:(page_id<np?page_id:np - 1); // 规范page id值(原来)
                appendopts = NUI.$.extend({text:page_id+1, classes:""}, appendopts||{});
                if(page_id == current_page){
                    var lnk = NUI.$("<span class='current'>"+(appendopts.text)+"</span>");
                }else{
                    var lnk = NUI.$("<a>"+(appendopts.text)+"</a>")
                        .bind("click", getClickHandler(page_id))
                        .attr('href', opts.link_to.replace(/__id__/,page_id));      
                }
                if(appendopts.classes){lnk.addClass(appendopts.classes);}
                panel.append(lnk);
            }
            // 产生"Previous"-链接
            if(opts.prev_text && (current_page > 0 || opts.prev_show_always)){
                appendItem(current_page-1,{text:opts.prev_text, classes:"prev"});
            }
            // 产生起始点
            if (interval[0] > 0 && opts.num_edge_entries > 0)
            {
                var end = Math.min(opts.num_edge_entries, interval[0]);
                for(var i=0; i<end; i++) {
                    appendItem(i);
                }
                if(opts.num_edge_entries < interval[0] && opts.ellipse_text)
                {
                    NUI.$("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
                }
            }
            // 产生内部的些链接
            for(var i=interval[0]; i<interval[1]; i++) {
                appendItem(i);
            }
            // 产生结束点
            if (interval[1] < np && opts.num_edge_entries > 0)
            {
                if(np-opts.num_edge_entries > interval[1]&& opts.ellipse_text)
                {
                    NUI.$("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
                }
                var begin = Math.max(np-opts.num_edge_entries, interval[1]);
                for(var i=begin; i<np; i++) {
                    appendItem(i);
                }
                
            }
            // 产生 "Next"-链接
            if(opts.next_text && (current_page < np-1 || opts.next_show_always)){
                appendItem(current_page+1,{text:opts.next_text, classes:"next"});
            }
            var lnkE = NUI.$("<a>尾页</a>")
                        .bind("click", getClickHandler(np-1))
                        .attr('href', opts.link_to.replace(/__id__/,np-1));
            panel.append(lnkE);
        }
        
        //从选项中提取current_page
        var current_page = opts.current_page;
        //创建一个显示条数和每页显示条数值
        total = (!total || total < 0)?1:total;
        opts.page_size = (!opts.page_size || opts.page_size < 0)?1:opts.page_size;
        //存储DOM元素，以方便从所有的内部结构中获取
        var panel = $ele;
        // 获得附加功能的元素
        this.selectPage = function(page_id){ pageSelected(page_id);}
        this.prevPage = function(){ 
            if (current_page > 0) {
                pageSelected(current_page - 1);
                return true;
            }
            else {
                return false;
            }
        }
        this.nextPage = function(){ 
            if(current_page < numPages()-1) {
                pageSelected(current_page+1);
                return true;
            }
            else {
                return false;
            }
        }
        // 所有初始化完成，绘制链接
        drawLinks();
        
}



NUI.NUIArtTips = NUI.NUIAtrSubmit = function(options){
	var options = options||{},
		_options = {};
	_options.fixed = true;
	_options = $.extend(_options, options);
	_options.lock = true;
	art.dialog(_options);
}

NUI.NUIAtrIframe = function(options){
	var options = options||{},
		_options = {};
	_options.width = '800px',
	_options.height = '400px',
	_options.fixed = true;
	_options = $.extend(_options, options);
	_options.lock = true;
	_options.content = '<iframe width="100%" height="100%" frameborder="0" src="'+_options.content+'"></iframe>'
	art.dialog(_options);
}
var NUI = NUI||{};
NUI.NUIArtTips = NUI.NUIAtrSubmit = function(options){
	var options = options||{},
		_options = {};
	_options.fixed = true;
	_options = $.extend(_options, options);
	_options.lock = true;
	_options.drag = false;
	art.dialog(_options);
}

NUI.NUIAtrIframe = function(options){
	var options = options||{},
		_options = {};
	_options.width = '800px',
	_options.height = '400px',
	_options.fixed = true;
	_options = $.extend(_options, options);
	_options.lock = true;
	_options.content = '<iframe width="100%" height="100%" frameborder="0" src="'+_options.content+'"></iframe>'
	art.dialog(_options);
}
/**
 * [tab选项卡]
 * @xuwg
 * @DateTime 2016-05-06
 * @param    {[type]}   ){点击事件}
 * @return   {[type]}       [description]
 */
NUI.NUITab = (function(){
    $(document).on('click','.NUITabAction li',function(){
        var index = $(this).index(),
            $tabs = $(this).parent().next().children();
        $(this).addClass('active').siblings().removeClass('active');
        $tabs.eq(index).show().siblings().hide();
    });
})();
$(function(){
	var $tab = $('.NUITableAjax');
	if($tab.length){
		function Table($ele){
			this.ele = $ele;
			this.options = {
				url: this.ele.attr('data-url'),
				oTbody: this.ele.find('tbody'),
				aTh : this.ele.find('th')
			}
			this.init();
			this.check(this.ele);
		}
		Table.prototype = {
			constructor: Table,
			// 数据渲染
			createView: function(d){
				this.options.oTbody.html('');
				var curPage = d.currentPage,
					pageSize = d.pageSize,
					total = d.total,
					th = this.options.aTh;
				for(var i=0;i<pageSize;i++){				
					var $tr = $('<tr>'),
						str = '';
					for(var j=0,len=th.length;j<len;j++){
						var v = th.eq(j),
							filed = v.attr('data-filed'),
							format = v.attr('data-format'),
							$td = $('<td>');
						if(j==0&&v.find('input[type="checkbox"]').length){							
							$td.html('<input type="checkbox" name="checkView">');
						}else if(filed){
							$td.html(d.data[i][filed]);
						}else if(format){
							var callback = eval(format);
                            ;(function(c){
                                c(d.data[i], $tr, $td);
                            })(callback);
						}
						else{
							$td.html(pageSize*(curPage-1)+i+1)
						}
						$tr.append($td);							
					}
					
					this.options.oTbody.append($tr);
				}
			},
			// 获取数据
			getData: function(){
				var _self = this;
				$.ajax({
					type: 'post',
					url: _self.options.url,
					dataType: 'json',
					success: function(d){			
						_self.createView(d);

						// 创建分页
						var $page = $('.NUIPages').length? $('.NUIPages'):$('<div class="NUIPages">');
						NUI.NUIPages($page, d.total, {
							success: function(d){
								_self.createView(d);
							}
						}, this.url);
						_self.ele.after($page);
					}
				});
			},
			// 全选
			check: function($ele){
				$ele.delegate('#SysCheckAll', 'click', function(){
					$eles = $('tbody input:checkbox');
					if($(this).prop('checked')){
						$eles.prop('checked', true);
					}else{
						$eles.prop('checked', false);
					}
				});

				$ele.delegate('tbody input:checkbox', 'click', function(){
					var $checkAll = $('#SysCheckAll'),
						$eles = $('tbody input:checkbox'),
						len = $eles.length;
					if($(this).prop('checked')){
						for(var i=0,$ele;$ele=$eles.eq(i++);){
							if(!$ele.prop('checked')){
								break;
							}
							else if(i==len) $checkAll.prop('checked', true);
						}
					}else{
						$checkAll.prop('checked', false);
					}
				});
			},
			sort: function(){
				this.options.aTh.on('click', function(){
					var str = $(this).attr('data-sort');
					if(str){
						$.ajax({
							type: 'post',
							url: _self.options.url+str,
							dataType: 'json',
							success: function(d){			
								_self.createView(d);

								// 创建分页
								var $page = $('.NUIPages').length? $('.NUIPages'):$('<div class="NUIPages">');
								NUI.NUIPages($page, d.total, {
									success: function(d){
										_self.createView(d);
									}
								}, this.url);
								_self.ele.after($page);
							}
						});
					}
				});
				
			},
			init: function(){
				this.getData();
			}
		}
		var table = new Table($tab);
	}
});
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
/**
 * 扫描节点
 *   主要进行扫描节点，替换声明是标签缩影的dom
 */
//scan节点
var NUMREG = /^\d*$/;    //数字正则
var scan = NUI.$(function(){
    //校验执行校验规则
    NUI.validate(); 
    /*
     * 把原生的select标签转化成NUISelect标签 
     */
    function createNUISelect($ele,optins) {
        var $select = $ele,
            $options = $select.children(),
            arr = [];
        $options.each(function(i) {
            var obj = {};
            if ($(this).attr('selected')) {
                obj['active'] = true;
            }
            obj['ID'] = $(this).val();
            obj['text'] = $(this).text();
            arr.push(obj);
        });
        //生成虚拟dom，用来对应原生的下拉框
        var arrClass = $select.attr('class').split(' '),
            arrNClass = []; //收集原生下拉框的位置样式

        for (var i = 0, len = arrClass.length; i < len; i++) {
            if (arrClass[i] != 'NUISelect') {
            }
        }
        html = '<div class="NUISelectZoo ' + arrNClass.join(' ') + '"></div>';
        $select.before(html);
        $select.prev().append($select);
        //判读是否拥有自定义参数   
        if(optins) {
            var options = NUI.$.extend({},optins,{data: arr});
            NUI.NUISelect($select.parent(), options);
            return;
        }
        
        NUI.NUISelect($select.parent(), {
            data: arr
        });
    }

    //扫描下拉框节点NUISelect
    $('.NUISelect').each(function(i){
        var options = $(this).attr('data-options');
        //判断是否拥有自定义属性
        if(options) {
            objOption = eval("(" + options + ")");
            createNUISelect($(this),objOption);
            return;
        }
        createNUISelect($(this));
    });

    //扫描Tab节点NUITab
    $('.NUITab').each(function(i){
        //判断是否申明js效果
        if(!$(this).hasClass('NUITabAction'))return;
        var $parent = $(this),
            $li = $(this).children(),
            $tabs = $parent.next().children();
        $li.each(function(i){
            $that = $(this);
            if($that.hasClass('active')) {
                var index = $that.index();
                $tabs.eq(index).show().siblings().hide();
            }

        });
    });

    //扫描分页节点NUIPages     
    $('.NUIPages').each(function(i){
        var $that = $(this), //缓存对象
            url = $that.attr('data-url'),  // url接口
            total = NUI.trim($that.attr('data-total')), //总数目
            optionsPages = eval("(" +$that.attr('data-options')+")"); //自定义配置
        if(url) {
            url = $.trim(url);
        }
        if(!url) {
            throw Error('分页NUIPages样式增加未data-url属性(数据请求接口)');
        }
        if(!total || !NUMREG.test(total)) {
            throw Error('分页NUIPages样式未添加或设置不正确data-total属性(数据总数目)');
        }
        //调用分页按钮
        NUI.NUIPages($that,parseInt(total),optionsPages,url);
    });

    //扫描联动下拉框
    $('.NUILinkage').each(function(index) {
        var $that = $(this),
            urls = eval("(" + $that.attr('data-url') + ")"),
            //select中name
            names =  eval("(" + $that.attr('data-name')+ ")"),
            params = eval("(" + $that.attr('data-parmas')+ ")"),
            optionsLink = eval("("+ $that.attr('data-options') +")"),
            defaultVal = eval("("+$that.attr('data-defaultVal')+")");
        if(urls.length != names.length || names.length != params.length) {
            throw Error('NUILinkage的urls数量和names以及params不一致,请注意');
        }
        var len;
        for(var i=0,len=urls.length;i<len;i++){
            var html = '';
            html += '<select class="NUISelect" name="' + names[i] + '"></select>';
            $that.append(html);
            var $select = $that.children().eq(i),
                options = NUI.$.extend({},optionsLink);
            createNUISelect($select,options);
        }
        //填充数据
        //$that.append(html);

        //判断是否回显
        if(defaultVal && defaultVal.length){
            //根据默认值填充数据
            for(var lj = 0,len=defaultVal.length;lj<len;lj++) {
                var k = params[lj],
                    v = lj == 0 ? params[0] : defaultVal[lj-1];
                var data = lj == 0 ? params[0] : {k:v};

                $.ajax({
                    type: 'post',
                    url: urls[lj],
                    data: data,
                    async: false,
                    dataType: 'json',
                    success: function(data){
                        if(data.statu) {
                            var data = data.Data,
                                html = '',
                                selhmtl = '';
                            //填充数据
                            for(var i=0,len=data.length;i<len;i++){
                                if(data[i][optionsLink.ID] == defaultVal[lj]) {
                                    html  += '<option value="'+ data[i][optionsLink.ID] +'" selected="selected">'
                                          + data[i][optionsLink.value] + '</option>';

                                    selhmtl += '<li data-bind="'+ data[i][optionsLink.ID] +'" class="active">'
                                            +  data[i][optionsLink.value] + '</li>';
                                    $that.find('.NUISelectZoo').eq(lj).find('.NUISelectVal').text(data[i][optionsLink.value]);
                                }else {
                                    html  += '<option value="'+ data[i][optionsLink.ID] +'">'
                                          + data[i][optionsLink.value] + '</option>';

                                    selhmtl += '<li data-bind="'+ data[i][optionsLink.ID] +'">'
                                            +  data[i][optionsLink.value] + '</li>';
                                }

                                
                            }
                            $that.find('select').eq(lj).append(html);
                            $that.find('.NUISelectList').eq(lj).append(selhmtl);
                            
                        }else {
                           throw Error('Linkage'+urls[0]+ '返回数据:'+data.message); 
                        }
                    },
                    error: function(){
                        throw Error('Linkage'+urls[0]+'请求失败');
                    }
                });
            }
        }else {
            NUI.$.ajax({
                type: "GET",
                url: urls[0],
                data: params[0],
                dataType: 'json',
                async: false,
                success: function(data) {
                    var data = data.Data,
                        html = '',
                        selhmtl = '';
                    //填充数据
                    for(var i=0,len=data.length;i<len;i++){
                        html  += '<option value="'+ data[i][optionsLink.ID] +'">'
                              + data[i][optionsLink.value] + '</option>';

                        selhmtl += '<li data-bind="'+ data[i][optionsLink.ID] +'">'
                                +  data[i][optionsLink.value] + '</li>';
                    }
                    $that.find('select').eq(0).append(html);
                    $that.find('.NUISelectList').eq(0).append(selhmtl);

                },
                error:function() {
                    throw Error(urls[0] + ' 请求失败');
                }
            });
        }
        

        //绑定选中事件
        // $that.find('li').click(function(){
        $that.children().on('click','li',function(){
            var $ele = $(this),
                id = $ele.attr('data-id'),
                $select =  $(this).parents().eq(2),
                index = $select.index(),
                parIndex = index + 1,
                key = params[parIndex];
            
            //联动逻辑处理
            if(index < urls.length - 1) {
                for(;index < urls.length-1;index++) {
                    $that.find('select').eq(index+1).empty();
                    $that.find('.NUISelectList').eq(index+1).empty();
                    $that.find('.NUISelectZoo').eq(index+1).find('.NUISelectVal').text('请选择');
                }
                $.ajax({
                    type: 'post',
                    url: urls[parIndex],
                    data: {key: id},
                    async: false,
                    dataType: 'json',
                    success: function(data){
                        var data = data.Data,
                            html = '',
                            selhmtl = '';
                        //填充数据
                        for(var i=0,len=data.length;i<len;i++){
                            html  += '<option value="'+ data[i][optionsLink.ID] +'">'
                                  + data[i][optionsLink.value] + '</option>';

                            selhmtl += '<li data-bind="'+ data[i][optionsLink.ID] +'">'
                                    +  data[i][optionsLink.value] + '</li>';
                        }
                        $that.find('select').eq(parIndex).append(html);
                        $that.find('.NUISelectList').eq(parIndex).append(selhmtl);
                    },
                    error: function(){}
                });
            }
        })
    });

    //扫描搜索下拉框
    $('.NUISearchAction').each(function(i){
        var $that = $(this),
            html = '',
            option = eval("(" + $that.attr('data-options') + ")"),
            param = $that.attr('data-params'),
            url = $that.attr('data-url'),
            defaultVal =  $that.attr('data-defaultVal'),
            $parent,  //虚拟dom父节点
            $SearchList;  //查询列表

        //判断是否绑定相关参数
        if(!url || !param) {
            throw Error('请参照用户手册绑定url和参数');
        }
        //设置自定义参数默认值
        var options = $.extend({IDField:"ID",textField:"value"},option);
        
        //生成虚拟dom，用来对应原生的下拉框
        var arrClass = $that.attr('class').split(' '),
            arrNClass = []; //收集原生下拉框的位置样式

        for (var i = 0, len = arrClass.length; i < len; i++) {
            if (arrClass[i] != 'NUISearchInput' && arrClass[i] != 'NUISearchAction') {
                arrNClass.push(arrClass[i]);
            }
        }
        if(defaultVal && $.trim(defaultVal)) {
            $that.val($.trim(defaultVal));
        }
        html = '<div class="NUISearchtZoo ' + arrNClass.join(' ') + '"></div>';
        $that.before(html);
        $that.prev().append($that);
        $parent = $that.parent();
        $parent.append('<ul class="NUISelectList NUISearchList"></ul>');
        $SearchList = $parent.find('.NUISearchList');
        //绑定input的onchange事件
        $that.on('keyup',function(){
            var val = $that.val(),
                data = {param:val};
            if($.trim(val)) {
                //获取search数据
                NUI.ajax(url,false,data).done(function(data){
                    //清空下拉框
                    $SearchList.empty();
                    $SearchList.show();   //展现列表
                    var data = data.Data,
                        html = '';
                    if(!data.length) {
                      html += '<p class="NUISearchNoData">未匹配数据</p>' 
                    }else {
                        for(var i=0,len = data.length;i<len;i++){
                            html += '<li data-id="'+ data[i][options.IDField] + '">'
                                 + data[i][options.textField] +'</li>';
                        }
                    }
                    $SearchList.append(html);
                }).fail(function(){
                    throw Error(url + '接口异常');
                });
            }else {
                $SearchList.empty();
                $SearchList.hide();   //隐藏列表
            }
        });


        //绑定事件
        $parent.on('click','li',function(){
            var $ele = $(this),
                val = $ele.text();
            $that.val(val);
            //清空下拉框
            $SearchList.empty(); //清空下拉框
            $SearchList.hide();  //隐藏下拉框
            return false;
        });
    });
}); 

/**
 * 结尾 the end
 */
})(jQuery,document);