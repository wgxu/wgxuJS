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
			var html = this._SideDOm();
			this._render(html);
		},
		//构建dom
		_SideDOm: function(flag){
			var html = '<ul>',
				i = 0,
				l = this.opt.data.length;　
			for(; i < l; i++) {
				var index = i%this.color.length,
					item = this.opt.data[i],
					s = this.opt.silde,
					arr = [];
					if(s == 'both') {
						arr.push('<li class="'+ (i%2 == 0 ? 'czflLeft' : 'czflRht') +' clearfix">');
					}else if(s == 'left' || s == 'right') {
						arr.push('<li class="'+ (s == 'left' ? 'czflRht' : 'czflLeft') +' clearfix">');
					}else {
						throw new Error("silde传参错误");
					}

					var arrOther = [
							'<div class="czfltime">',
								'<div class="czfltimeWrap">',
									'<p>'+item.date +'</p>',
									'<p>'+ item.time +'</p>',
								'</div>',
							'</div>',
							'<div class="czflContItem '+ this.color[index] +'">',
			                    '<div class="czflContItemWrap clearfix">',
			                        '<p class="czflContItemHead '+(this.color[index] +"1")+'">',
			                            '<span>'+ item.title +'</span>',
			                        '</p>',
			                        '<div class="czflContItemBody zcflgray">',
			                            '<p>'+ item.value +'</p>',
			                       ' </div>',
			                    '</div>',
			                    '<i></i>',
			               ' </div>',
			            '</li>'
					];
					arr = arr.concat(arrOther);
			
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