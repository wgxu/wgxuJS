/**
 * @author 鲲鹏
 * @datetime: 2016/9/23
 * @description 类似于火狐tab选项卡，通过ifarme来展示页面
 */
;(function($){
	function tabPlugin(opts,$ele) {
		this.setting = {
			data: []    //默认数据
		};
		this.ele = $ele; //绑定dom对象
		this.opt = $.extend({},this.setting,opts); //合并参数
		this.frameArr = []; //用户缓存已经打开的菜单
	}

	tabPlugin.prototype = {
		constructor: tabPlugin,
		//创建容器
		_createWrap: function(){
			var templWrap = [
				'<div class="SysRightCont">',
					'<div class="SysPageNav">',
						'<div class="SysPageNavLeft"></div>',
						'<div class="SysPageNavright"></div>',
						'<div class="SysPageNavdown">',
							'<div class="SysPageNavDownBar">',
								'<ul>',
									'<li>刷新当前页</li>',
									'<li>关闭全部</li>',
									'<li class="SysNoneLine">关闭其他</li>',
								'</ul>',
							'</div>',
						'</div>',
						'<div class="SysPageNavmore">...</div>',
						'<div class="SysPagesListWrap">',
							'<div class="SysPagesList clearfix">',
							'</div>',
						'</div>',
					'</div>',
					'<div class="SysFrameList">',
					'</div>',
				'</div>'
			];
			this.ele.append(templWrap.join(""));

			//填充默认数据
			var topNavTempl = '',
				iframeTempl = '';
			// 确定默认页面
			var defaultIndex = 0; //确认默认展示页面，默认为0,如有多个，后面会覆盖前面

			for(var i = 0;i<this.opt.data.length;i++) {
				var item = this.opt.data[i];
				if(item.default) {
					defaultIndex = i;
				}
			};
			//填充设置值
			for(var i = 0;i<this.opt.data.length;i++) {
				var itemData = this.opt.data[i];
				if(defaultIndex == i) {
					if(itemData.del) {
						topNavTempl += '<a href="javascript:;" class="SysPageActive">'
									+ '<span>'+ itemData.name +'</span>'
									+ '<i></i></a>';						
					}else {
						topNavTempl += '<a href="javascript:;" class="SysPageActive">'
									+ '<span>'+ itemData.name +'</span></a>';
					}
					iframeTempl += '<iframe src="'+ itemData.url +'" frameborder="" border="0" ></iframe>';
				}else {
					if(itemData.del) {
						topNavTempl += '<a href="javascript:;">'
									+ '<span>'+ itemData.name +'</span>'
									+ '<i></i></a>';						
					}else {
						topNavTempl += '<a href="javascript:;">'
									+ '<span>'+ itemData.name +'</span></a>';
					}
					iframeTempl += '<iframe src="'+ itemData.url +'" frameborder="" border="0" class="SysHide"></iframe>';
				}
			}

			$(".SysPagesList").append(topNavTempl);
			$(".SysFrameList").append(iframeTempl);
			this._resizeWidth();
			this.showNavItem(true,defaultIndex);
		},
		//修改菜单后，重置宽度
		_resizeWidth: function(){
			var len = $(".SysPagesList").children().length,
				left = parseInt($(".SysPagesList").css("left").split("px")),
				pWidth = $(".SysPagesListWrap").width(),
				sWidth = $(".SysPagesList").width();

			if($(".SysPagesList>a").length == 0) {
				var widthSon = 0;
			}else {
				widthSon = $(".SysPagesList>a")[0].clientWidth;
			}

			if(len > 0) {
				$(".SysPagesList").css({
					width: (widthSon + 5) * len + 'px'
				});
			}else {
				$(".SysPagesList").css({
					width:0
				});
			}

			this.isOutWrap() ? 	$(".SysPageNavmore").show() : $(".SysPageNavmore").hide();
			if((left + sWidth) <= pWidth) {
				$(".SysPageNavmore").hide(); //隐藏省略号
			}
		},

		//判断是否溢出容器
		isOutWrap: function(){
			var pWidth = $(".SysPagesListWrap").width(),
				sWidth = $(".SysPagesList").width();
			return pWidth >= sWidth ? false : true;
		},

		//显示tab新增导航栏,如果flag为true显示偏移，如果flag为false则直接偏移到最后
		showNavItem:function(flag,index) {
			var len = $(".SysPagesList").children().length,
				left = parseInt($(".SysPagesList").css("left").split("px")),
				pWidth = $(".SysPagesListWrap").width(),
				sWidth = $(".SysPagesList").width(),
				widthSon = $(".SysPagesList>a")[0].clientWidth;

			if(left < 0)$(".SysPageNavmore").show();

			if(sWidth < pWidth)return;
			var count = Math.ceil((sWidth - pWidth)/(widthSon + 5)); //偏移个数
			if(left == -(count * widthSon))$(".SysPageNavmore").hide();

			if(flag) {
				if(index == 0) {
					$(".SysPagesList").css({
						left: 0
					});
					return;
				}
				if(index <= count) {
					$(".SysPagesList").css({
						left: -(widthSon + 5) * (index - 1)
					});
				}else {
					$(".SysPagesList").css({
						left: -(widthSon + 5) * count
					});
				}
				return;
			}

			$(".SysPagesList").css({
				left: -(widthSon + 5) * count
			});
			$(".SysPageNavmore").hide(); //隐藏省略号
		},

		//新增tab菜单
		addTabNav: function(data){
			var that = this;
			//判断新增菜单是否存在
			function isExtend(data) {
				var bool = false;
				for(var i  = 0, len = that.frameArr.length; i < len; i++) {
					if(data.name == that.frameArr[i].name && data.url == that.frameArr[i].url) {
						bool = i;
					}
				}
				return bool;
			}
			var index = isExtend(data);
			if(index != false || index === 0) {
				$(".SysPagesList a").eq(index).addClass("SysPageActive").siblings().removeClass("SysPageActive");
				$(".SysFrameList iframe").eq(index + 1).removeClass("SysHide").siblings().addClass("SysHide");
				$(".SysDefPage").removeClass("SysPageActive");
				that.showNavItem(true,index);
				return;
			}
			// 
			// 菜单模板
			var templ;
			if(data.del) {
				templ = [
					'<a href="javascript:;">',
						'<span>'+ data.name +'</span>',
						'<i></i>',
					'</a>'
				];
			}else {
				templ = [
					'<a href="javascript:;">',
						'<span>'+ data.name +'</span>',
					'</a>'
				];
			}
			
			var frameTempl = '<iframe src="'+ data.url +'" frameborder="" border="0"></iframe>';

			$(".SysPagesList").append(templ.join(''));
			that._resizeWidth();
			$(".SysFrameList").append(frameTempl);
			that.showNavItem(false);
			$(".SysPagesList a").removeClass("SysPageActive");
			$(".SysPagesList a").eq($(".SysPagesList a").length - 1).addClass("SysPageActive");
			$(".SysFrameList iframe").eq($(".SysFrameList iframe").length - 1).removeClass("SysHide").siblings().addClass("SysHide");
			that.frameArr.push(data);
		},
		//tab插件事件
		_tabEvent: function(){
			var that = this;
			leftMove(); //左滑动
			rightMove(); //右滑动
			selectNav(); //点击菜单
			removeNav(); //删除菜单
			
			//左滑
			function leftMove() {
				$(".SysPageNavLeft").hover(function(){
					if(that.isOutWrap()) {
						var left = parseInt($(".SysPagesList").css("left").split("px")),
								pWidth = $(".SysPagesListWrap").width(),
								sWidth = $(".SysPagesList").width(),
								widthSon = $(".SysPagesList>a")[0].clientWidth;

						if((left + sWidth) <= pWidth) {
							$(".SysPagesList").css({
								left: 0
							});
							return;
						};

						that.t = setInterval(function(){
							var left = parseInt($(".SysPagesList").css("left").split("px"));
							//判断关闭定时器
							if((left + sWidth) <= pWidth) {
								clearInterval(that.t);
								$(".SysPageNavmore").hide(); //隐藏省略号
								return;
							}

							$(".SysPagesList").css({
								'left': left - (widthSon + 5)
							},100);

						},200);
					}

				},function(){
					clearInterval(that.t);
				});
			}

			//右滑
			function rightMove() {
				$(".SysPageNavright").hover(function(){
					if(that.isOutWrap()) {
						var left = parseInt($(".SysPagesList").css("left").split("px")),
								pWidth = $(".SysPagesListWrap").width(),
								sWidth = $(".SysPagesList").width(),
								widthSon = $(".SysPagesList>a")[0].clientWidth;

						if(left == 0)return;

						that.t = setInterval(function(){
							var left = parseInt($(".SysPagesList").css("left").split("px"));
							//判断关闭定时器
							if(left ==0) {
								clearInterval(that.t);
								return;
							}

							$(".SysPagesList").css({
								'left': left + (widthSon + 5)
							},100);
							$(".SysPageNavmore").show();

						},200);
					}

				},function(){
					clearInterval(that.t);
				});
			}

			//点击菜单栏
			function selectNav() {
				//点击首页
				/*$(".SysDefPage").click(function(){
					$(this).addClass("SysPageActive");
					$(".SysPagesList>a").removeClass("SysPageActive");
					$(".SysFrameList iframe").eq(0).removeClass("SysHide").siblings().addClass("SysHide");
				});*/

				//点击可滑动菜单菜单
				$(document).on("click",".SysPagesList>a",function(){
					var index = $(this).index();
					$(".SysDefPage").removeClass("SysPageActive");
					$(this).addClass("SysPageActive").siblings().removeClass("SysPageActive");
					$(".SysFrameList iframe").eq(index).removeClass("SysHide").siblings().addClass("SysHide");
					return false;
				});
			}

			//删除当前菜单栏
			function removeNav() {
				$(document).on("click",".SysPagesList>a>i",function(){
					var index = $(this).parent().index();
						left = parseInt($(".SysPagesList").css("left").split("px")),
						sWidth = $(".SysPagesList").width(),
						pWidth = $(".SysPagesListWrap").width(),
						widthSon = $(".SysPagesList>a")[0].clientWidth;

					$(".SysFrameList iframe").eq(index).remove();
					$(this).parent().remove();
					that._resizeWidth();
					if(sWidth <= pWidth) {
						$(".SysPagesList").css({
							left: 0
						});
					}else {
						if(left <= - widthSon) {
							$(".SysPagesList").css({
								left: left + (widthSon + 12 )
							});
						}
					}
					//删除正在显示的页面
					if($(this).parent().hasClass("SysPageActive")) {
						if(index == 0) {
							$(".SysPagesList>a").eq(0).addClass("SysPageActive");
							$(".SysFrameList iframe").eq(0).removeClass("SysHide").siblings().addClass("SysHide");
							return;
						}

						$(".SysPagesList>a").eq(index-1).addClass("SysPageActive");
                        $(".SysFrameList iframe").eq(index-1).removeClass("SysHide").siblings().addClass("SysHide");
					}
					that.frameArr.splice(index,1); //删除缓存菜单

					return  false;
				});
			}
		},

		//导航栏操作按钮 
		_navButton: function(){
			var that = this;
			$(document).on("click",".SysPageNavDownBar li",function(){
				var index = $(this).index();

				switch(index){
					case 0:
						reloadActivePage();
						break;
					case 1:
						cloeseAll();
						break;
					case 2:
						closeOther();
						break;
				};

				//index:0 刷新当前页
				function reloadActivePage() {
					$(".SysPagesList a").each(function(i){
						if($(this).hasClass("SysPageActive")) {
							var index = $(this).index();
							$(".SysFrameList iframe").eq(index).attr("src",$(".SysFrameList iframe").eq(0).attr("src"));
						}
					});
				}

				//index:1 关闭全部
				function cloeseAll() {
					$(".SysPagesList  a").remove();
					$(".SysFrameList iframe").remove();
					that.frameArr = [];
					debugger;

				}

				//index:2 关闭其他
				function closeOther() {
					$(".SysPagesList a").each(function(i){
						if(!$(this).hasClass("SysPageActive")) {
							var index = $(this).index();
							$(this).remove();
							$(".SysFrameList iframe").eq(index).remove();
							that.frameArr.splice(index,1);
						}
					});
					debugger;
				}
			});
		},	

		//初始化
		init: function(){
			this._createWrap();
			this._resizeWidth();
			this._tabEvent();
			this._navButton();
		}
	};

	$.fn.tabIframe = function(opts){
		var obj = new tabPlugin(opts,$(this));
		obj.init();
		$(this).data(obj);
	}
})(jQuery);