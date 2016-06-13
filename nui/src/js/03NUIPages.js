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


