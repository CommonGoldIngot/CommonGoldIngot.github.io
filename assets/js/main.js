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
    //卡片尺寸操作
    var mainW = $("div.main").width();
    var cardH1 = $("div.card-1").outerHeight();
    var cardW1 = $("div.card-1").outerWidth();
    var cardH2 = $("div.card-2").outerHeight();
    var cardW2 = $("div.card-2").outerWidth();
    var cardH3 = $("div.card-3").outerHeight();
    var cardW3 = $("div.card-3").outerWidth();
    var cardH4 = $("div.card-4").outerHeight();
    var cardW4 = $("div.card-4").outerWidth();
    if (cardH2 > cardH1) {
        $("div.card-1").outerHeight(cardH2);
    }
    if (cardH1 - cardH2 < cardH3 && mainW - cardW1 - cardW2 < cardW3) {
        $("div.card-2").after("<samp></samp>");
        $("samp").addClass("clear");
    } else if (cardH2 - cardH3 < cardH4 && mainW - cardW1 - cardW2 - cardW3 < cardW4) {
        $("div.card-3").after("<samp></samp>");
        $("samp").addClass("clear");
    }
});

//                     ＯＯ
//                ＯＯＯＩＩＯ
//           ＯＯＯＩＡＩＩＩＩＯ
//      ＯＯＯＩＡＡＩＩＩＩＩＩＩＯ
//    ＯＯＡＡＡＩＩＩＩＩＩＯＯＯＯＯ
//    ＯＡＯＩＩＩＩＩＯＯＯＩＩＩＩＯ          by CommonGoldIngot
//    ＯＡＩＯＩＯＯＯＩＩＩＩＩＩＩＯ
//    ＯＩＩＩＯＩＩＩＩＩＩＩＩＩＥＯ
//    ＯＩＩＩＯＩＩＩＩＩＩＥＯＯＯ
//      ＯＩＩＯＩＩＩＥＯＯＯ
//        ＯＩＯＥＯＯＯ
//          ＯＯＯ