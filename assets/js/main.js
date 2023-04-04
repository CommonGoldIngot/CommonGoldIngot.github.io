$(document).ready(function () {
    //加载界面淡出
    setTimeout(function () {
        $("div.aside-loading").fadeOut(500, function () {
            $("div.aside-loading").remove();
        });
    }, 800)
    //侧边栏
    $("button.unfold-sidebar").click(function () {
        $("div.sidebar, div.mask").show();
    });
    $("div.mask").click(function () {
        $("div.sidebar, div.mask").hide();
    });
        //侧边栏子页面
        $("li.sidebar-item-has-subnav").click(function () {
            $("ul.subnav").slideToggle("fast");
        });
        $("a.sidebar-item-link").click(function () {
            
        });
});