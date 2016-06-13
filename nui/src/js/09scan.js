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
