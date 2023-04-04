$(document).ready(function () {
    //加载界面淡出
    setTimeout(function () {
        $("div.aside-loading").fadeOut(500, function () {
            $("div.aside-loading").remove();
        });
    }, 800)
    //侧边栏
    $("button.aside-unfold-sidebar").click(function () {
        $("div.aside-sidebar, div.aside-mask").show();
    });
    $("div.aside-mask").click(function () {
        $("div.aside-sidebar, div.aside-mask").hide();
    });
        //侧边栏子页面
        $("li.aside-sidebar-item-has-subnav").click(function () {
            $("ul.aside-subnav").slideToggle("fast");
        });
});