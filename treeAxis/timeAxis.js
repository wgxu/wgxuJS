/**
 * 基于jquery封装的时间轴
 * @author: xuwg
 */
;(function($){
	function Axis(options,el) {
		var detOpt =  {
			silde: 'both', //both： 两侧，left：左侧，right：右侧
			data: [],  //数据
			dateField : 'date',   //日期域值
			timeField: 'time',    //时间域值
			titleField: 'title',  //标题域值
			valueField: 'value'   //内容域值 
		};
		this.opt = $.extend({},detOpt,options);
		this.el = el;
		this.color = ['zcfjYellow','zcfjGreen','zcfjBlue'];
	}

	Axis.prototype = {
		constructor: Axis,
		//创建dom
		_createDom: function() {
			var s = this.opt.silde,
				html;
			if( s == 'both') {
				html = this._bothSideDOm();
			}else if(s == 'left') {
				html = this._leftSideDom();
			}else if(s == 'right') {
				html = this._rightSideDom();
			}else {
				throw new Error("参数不正确");
			}

			this._render(html);
		},
		//左侧dom
		_leftSideDom:function(){
			var html = '<ul>',
				i = 0,
				l = this.opt.data.length;　
			for(; i < l; i++) {
				var index = i%this.color.length,
					item = this.opt.data[i],
					arr = [
						'<li class=" czflRht clearfix">',
							'<div class="czfltime">',
								'<div class="czfltimeWrap">',
									'<p>08.28</p>',
									'<p>10:26:18</p>',
								'</div>',
							'</div>',
							'<div class="czflContItem '+ this.color[index] +'">',
			                    '<div class="czflContItemWrap clearfix">',
			                        '<p class="czflContItemHead '+(this.color[index] +"1")+'">',
			                            '<span>高新区分局</span>',
			                        '</p>',
			                        '<div class="czflContItemBody zcflgray">',
			                            '<p>分发警情至高新区分局</p>',
			                       ' </div>',
			                    '</div>',
			                    '<i></i>',
			               ' </div>',
			            '</li>'
					];
			
				html += arr.join("");	
			}
			html += '</ul>';
			return html;
		},
		//右侧dom
		_rightSideDom: function(){
			var html = '',
				i = 0,
				l = this.opt.data.length;　
			for(; i < l; i++) {
				var index = i%this.color.length,
					item = this.opt.data[i],
					arr = [
						'<ul><li class="czflLeft clearfix">',
							'<div class="czfltime">',
								'<div class="czfltimeWrap">',
									'<p>08.28</p>',
									'<p>10:26:18</p>',
								'</div>',
							'</div>',
							'<div class="czflContItem '+ this.color[index] +'">',
			                    '<div class="czflContItemWrap clearfix">',
			                        '<p class="czflContItemHead '+(this.color[index] +"1")+'">',
			                            '<span>高新区分局</span>',
			                        '</p>',
			                        '<div class="czflContItemBody zcflgray">',
			                            '<p>分发警情至高新区分局</p>',
			                       ' </div>',
			                    '</div>',
			                    '<i></i>',
			               ' </div>',
			            '</li>'
					];
			
				html += arr.join("");	
			}
			html += '</ul>';
			return html;
		},
		//双侧dom
		_bothSideDOm: function(){
			var html = '',
				i = 0,
				l = this.opt.data.length;　
			for(; i < l; i++) {
				var index = i%this.color.length,
					item = this.opt.data[i],

					arr = [
						'<ul><li class="'+ (i%2 == 0 ? 'czflLeft' : 'czflRht') +' clearfix">',
							'<div class="czfltime">',
								'<div class="czfltimeWrap">',
									'<p>08.28</p>',
									'<p>10:26:18</p>',
								'</div>',
							'</div>',
							'<div class="czflContItem '+ this.color[index] +'">',
			                    '<div class="czflContItemWrap clearfix">',
			                        '<p class="czflContItemHead '+(this.color[index] +"1")+'">',
			                            '<span>高新区分局</span>',
			                        '</p>',
			                        '<div class="czflContItemBody zcflgray">',
			                            '<p>分发警情至高新区分局</p>',
			                       ' </div>',
			                    '</div>',
			                    '<i></i>',
			               ' </div>',
			            '</li>'
					];
			
				html += arr.join("");	
			}
			html += '</ul>';
			return html;
		},
		//随机获取颜色索引
		_getIndex: function() {
			//因颜色太少，暂不实现
		},
		//渲染
		_render: function(html){
			this.el.append(html)
		},

		init: function(){
			this._createDom();
		}
	};

	$.fn.Axis = function(opt){
		return new Axis(opt,$(this)).init();
	}

})(jQuery);