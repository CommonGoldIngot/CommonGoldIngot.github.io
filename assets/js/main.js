$(document).ready(function () {
    //加载界面淡出
    setTimeout(function () {
        $("div.aside-loading").fadeOut(400);
    }, 500)
    $("div.aside-loading").remove();
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
            $(".bi-chevron-right").css({"animation-name":"chevron-rotate"});
        });
});