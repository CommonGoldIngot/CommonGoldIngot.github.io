//加载动画
var angleB = 0;
var angleL = 0;
setInterval(function () {
    angleB += 1;
    angleL -= 1;
    $("div.loading-round-border").rotate(angleB);
    $("img.loading-logo").rotate(angleL);
}, 5);
//加载界面淡出
function loaded() {
    setTimeout(function () { 
        $("p.loading-text").text("加载完成！");
        $("div.loading").fadeOut(500, function () {
            $("div.loading").remove();
        });
    }, 900)
}
$(document).ready(function () {
    //侧边栏
    $("button.aside-unfold-sidebar").on("click", function () {
        $("div.aside-mask").show();
        $("div.aside-sidebar").show().animate({left: "0"}, 200);
    });
    $("div.aside-mask").click(function () {
        $("div.aside-mask").hide();
        $("div.aside-sidebar").animate({left: "-302"}, 200, function () {
            $("div.aside-sidebar").hide();
        });
    });
    //侧边栏子页面
    var wiki = 0;
    $("li.--wiki").on("click", function () {
        $("ul.--wiki").slideToggle(200, function () {
            if (wiki == 0) {
                $("i.--wiki").rotate({
                    duration: 300,
                    animateTo: 90
                });
                wiki = 1;
            } else {
                $("i.--wiki").rotate({
                    duration: 300,
                    animateTo: 0
                });
                wiki = 0;
            }
        });
    });
    //卡片css操作
    (function () {
        $("div.main-card:nth-child(3)").css("width", $("div.main-card:nth-child(2)").css("width"));
        $("div.main-card:nth-child(3)").css("height", $("div.main-card:nth-child(2)").css("height"));
    })()
});