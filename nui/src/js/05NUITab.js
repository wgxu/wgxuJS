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