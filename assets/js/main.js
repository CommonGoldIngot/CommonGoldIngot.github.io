//加载界面淡出
function loaded() {
    $("p.loading-text").text("加载完成！");
    $("div.loading").fadeOut(500, function () {
        $("div.loading").remove();
    });
}
$(document).ready(function () {
    //侧边栏
    $("button.aside-unfold-sidebar").on("click", function () {
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
    var wiki = 0;
    var wikiR1 = function () { $("i.--wiki").rotate({animateTo: 90}); };
    var wikiR2 = function () { $("i.--wiki").rotate({animateTo: 0}); };
    var wikiS = function () { $("ul.--wiki").slideToggle("fast"); };
    $("li.--wiki").on({
        click: wikiS,
        mouseover: wikiR1,
        mouseout: wikiR2
    });
    $("li.--wiki").on("click", function () {
        if (wiki == 0) {
            wikiR1;
            wiki = 1;
        } else {
            wikiR2;
            wiki = 0;
        }
    });
});