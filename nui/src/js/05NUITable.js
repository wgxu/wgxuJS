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