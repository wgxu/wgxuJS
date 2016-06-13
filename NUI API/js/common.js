/**
 * 共同的js
 */
$(function(){
    //点击源码
    $('.wrapper').on('click','.rescode',function(){
        $('.htmlcode').show();
    });

    //关闭源码弹框
    $('.wrapper').on('click','.htmlcode-close',function(){
        $('.htmlcode').hide();
    });

    $('#btn1').on('click', function(){
    	NUI.NUIArtTips({
    		width: 250,
    		height: 300,
    		content: '<div style="300px;">我是html</div>',
    		ok: function(){
    			alert('你点击了确定');
    		},
    		cancel: function(){
    			alert('你点击了取消');
    		}
    	});
    });

    $('#btn2').on('click', function(){
    	NUI.NUIArtSubmit({
    		width: 250,
    		height: 300,
    		content: '<div style="300px;">我是html</div>',
    		ok: function(){
    			alert('只有确定按钮');
    		}
    	});
    });

    $('#btn3').on('click', function(){
		NUI.NUIArtIframe({
			height: '900px',
			content: '/tips.html'
		});
	});

	$('#btn4').on('click', function(){
    	NUI.NUIArtTips({
    		width: 250,
    		height: 300,
    		content: '<div style="300px;">我是html</div>',
            okVal: '我是确定',
    		ok: function(){
    			NUI.NUIArtSubmit({
		    		width: 250,
		    		height: 300,
		    		content: '<div style="300px;">我是html</div>',
		    		ok: function(){
		    			alert('只有确定按钮');
		    		}
		    	});
    		},
    		cancel: function(){
    			alert('你点击了取消');
    		},
            cancelVal: '我是取消'
    	});
    });

    if($('#sTree').length){
            var zNodes =[
            { name:"父节点1 - 展开", open:true,
                children: [
                    { name:"父节点11 - 折叠",
                        children: [
                            { name:"叶子节点111"},
                            { name:"叶子节点112"},
                            { name:"叶子节点113"},
                            { name:"叶子节点114"}
                        ]},
                    { name:"父节点12 - 折叠",
                        children: [
                            { name:"叶子节点121"},
                            { name:"叶子节点122"},
                            { name:"叶子节点123"},
                            { name:"叶子节点124"}
                        ]},
                    { name:"父节点13 - 没有子节点", isParent:true}
                ]},
            { name:"父节点2 - 折叠",
                children: [
                    { name:"父节点21 - 展开", open:true,
                        children: [
                            { name:"叶子节点211"},
                            { name:"叶子节点212"},
                            { name:"叶子节点213"},
                            { name:"叶子节点214"}
                        ]},
                    { name:"父节点22 - 折叠",
                        children: [
                            { name:"叶子节点221"},
                            { name:"叶子节点222"},
                            { name:"叶子节点223"},
                            { name:"叶子节点224"}
                        ]},
                    { name:"父节点23 - 折叠",
                        children: [
                            { name:"叶子节点231"},
                            { name:"叶子节点232"},
                            { name:"叶子节点233"},
                            { name:"叶子节点234"}
                        ]}
                ]},
            { name:"父节点3 - 没有子节点", isParent:true}
        ];
        NUI.NUITree.init($("#sTree"), {}, zNodes);
        //$.fn.zTree.init($("#sTree"), {}, zNodes);
    }    
});