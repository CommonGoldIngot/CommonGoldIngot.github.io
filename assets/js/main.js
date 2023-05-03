//加载界面淡出
function loaded() {
    $("p.loading-text").text("加载完成！");
    $("div.loading").fadeOut(500, function () {
        $("div.loading").remove();
    });
}
$(document).ready(function () {
    //侧边栏
    $("button.aside-unfold-sidebar").click(function () {
        $("div.aside-mask").show();
        $("div.aside-sidebar").show().animate({left: "0"}, "fast");
    });
    $("div.aside-mask").click(function () {
        $("div.aside-mask").hide();
        $("div.aside-sidebar").animate({left: "-300"}, "fast", function () {
            $("div.aside-sidebar").hide();
        });
    });
    //侧边栏子页面
    function wikiR1() {
        $("i.--wiki").rotate({animateTo: 90});
    }
    function wikiR2() {
        $("i.--wiki").rotate({animateTo: 0});
    }
    $("li.--wiki").click(function () {
        $("ul.--wiki").slideToggle("fast");
    });
    $("li.--wiki").bind({
        mouseover: wikiR1(),
        mouseout: wikiR2()
    });
});