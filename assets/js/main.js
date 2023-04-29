setTimeout(function () {
    $("p.loading-speed-up").css("visibility","visible");
}, 5000);
//加载界面淡出
function loaded() {
    $("div.loading").fadeOut(500, function () {
        $("div.loading").remove();
    });
}
$(document).ready(function () {
    //侧边栏
    $("button.aside-unfold-sidebar").click(function () {
        $("div.aside-sidebar, div.aside-mask").show();
    });
    $("div.aside-mask").click(function () {
        $("div.aside-sidebar, div.aside-mask").hide();
    });
    //侧边栏子页面
    $("li.aside-sidebar-item-has-subnav").rotate({
        bind:
        {
            mouseover: function() {
                $(".mdi-chevron-right").rotate({animateTo:90})
            },
            mouseout : function() {
                $(".mdi-chevron-right").rotate({animateTo:0})
            }
        }
    });
    $("li.aside-sidebar-item-has-subnav").click(function () {
        $("ul.aside-subnav").slideToggle("fast");
    });
});