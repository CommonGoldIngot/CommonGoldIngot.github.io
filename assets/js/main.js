//加载动画
var borderRotateAngle = 0;
var logoRotateAngle = 0;
setInterval(function () {
    borderRotateAngle += 1;
    logoRotateAngle -= 1;
    $("div.loading-round-border").rotate(borderRotateAngle);
    $("img.loading-logo").rotate(logoRotateAngle);
}, 5);
setTimeout(function () {
    $("p.loading-text").text("正在加载背景图片...");
}, 3000)
setTimeout(function () {
    $("p.loading-text").text("加载背景图片可能需要较长时间，请耐心等待...");
}, 7000)
setTimeout(function () {
    $("p.loading-text").text("就快好了，再等我一会儿...");
}, 12000)
setTimeout(function () {
    $("p.loading-speed-up").css("visibility","visible");
}, 18000)
//加载界面淡出 & 主题切换提示
window.onload = function () {
    setTimeout(function () { 
        $("p.loading-text").text("加载完成！");
        $("div.loading").fadeOut(500, function () {
            $("div.loading").remove();
            var timeForThemeControl = new Date();
            var hourForThemeControl = timeForThemeControl.getHours();
            if (20 <= hourForThemeControl || hourForThemeControl <= 5) {
                setTimeout(function () {
                    $("div.aside-theme-control-tip").fadeIn(3500);
                }, 1600)
                setTimeout(function () {
                    $("div.aside-theme-control-tip").fadeOut(3500, function () {
                        $("div.aside-theme-control-tip").remove();
                    });
                }, 3600)
            }
        });
    }, 900)
}
$(document).ready(function () {
    //主题切换
    $("button.aside-theme-control").on("click", function () {
        $("div.aside-theme-control-tip").remove();
        $("div.aside-theme-select").slideToggle(500);
        //easeInOutElastic
    });
    //侧边栏
    $("button.aside-unfold-sidebar").on("click", function () {
        $("div.aside-mask").show();
        $("div.aside-sidebar").show().animate({left: "0"}, 200);
    });
    $("div.aside-mask").on("click", function () {
        $("div.aside-mask").hide();
        $("div.aside-sidebar").animate({left: "-302"}, 200, function () {
            $("div.aside-sidebar").hide();
        });
    });
    //侧边栏子页面操作
    var wiki = 0;
    $("li.--wiki").on("click", function () {
        $("ul.--wiki").slideToggle({
            duration: 600,
            easing: $.easing.easeInOutElastic,
            callback: function () {
                if (wiki == 0) {
                    $("i.--wiki").rotate({
                        duration: 300,
                        animateTo: 90,
                        easing: $.easing.easeInOutElastic
                    });
                    wiki = 1;
                } else {
                    $("i.--wiki").rotate({
                        duration: 300,
                        animateTo: 0,
                        easing: $.easing.easeInOutElastic
                    });
                    wiki = 0;
                }
            }
        });
    });
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