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
    $("p.loading-text").text('正在加载css...');
}, 2000)
setTimeout(function () {
    $("p.loading-text").text('正在加载背景图片...');
}, 5000)
setTimeout(function () {
    $("p.loading-text").text('正在加载js...');
}, 7000)
setTimeout(function () {
    $("p.loading-text").text('加载可能需要较长时间，请耐心等待...');
}, 11000)
setTimeout(function () {
    $("p.loading-text").text('就快好了，再等我一会...');
}, 14000)
setTimeout(function () {
    $("p.loading-speed-up").css('visibility', 'visible');
}, 18000)
//加载界面淡出 & 主题切换提示
window.onload = function () {
    setTimeout(function () {
        $("p.loading-text").text('加载完成！');
        $("div.loading").fadeOut(500, function () {
            $("div.loading").hide();
            var timeForThemeControl = new Date();
            var hourForThemeControl = timeForThemeControl.getHours();
            if (20 <= hourForThemeControl || hourForThemeControl <= 5) {
                setTimeout(function () {
                    $("div.aside-theme-control-tip").fadeIn(3500);
                }, 1400)
                setTimeout(function () {
                    $("div.aside-theme-control-tip").fadeOut(3500, function () {
                        $("div.aside-theme-control-tip").remove();
                    });
                }, 3600)
            } else if (window.matchMedia('(prefer-color-scheme: dark)').matches) {
                $("span.aside-theme-control-tip-text").html('检测到您的浏览器设置为<br />深色主题，已自动同步~<br />您可以在此处切换主题~');
                setTimeout(function () {
                    $("div.aside-theme-control-tip").fadeIn(3500);
                }, 1400)
                setTimeout(function () {
                    $("div.aside-theme-control-tip").fadeOut(3500, function () {
                        $("div.aside-theme-control-tip").remove();
                    });
                }, 3600)
            }
        });
    }, 900)
}
//移动端屏幕转动时重载网页
window.onorientationchange = function () {
    $("p.loading-text").text('为了您的浏览体验，请不要频繁转动屏幕。');
    $("p.loading-speed-up").css('visibility', 'hidden');
    $("div.loading").show(100, function () {
        setTimeout(function () {
            location.reload();
        }, 1000)
    });
}
$(document).ready(function () {
    //主题切换
    $("button.aside-theme-control").on('click', function () {
        $("div.aside-theme-control-tip").remove();
        $("div.aside-theme-select").slideToggle(400);
    });
    function showLoadScreen() {
        $("p.loading-text").text('正在切换主题...');
        $("p.loading-speed-up").hide();
        setTimeout(function () {
            $("div.loading").show();
        }, 100)
    }
    function closeLoadScreen() {
        setTimeout(function () {
            $("p.loading-text").text('加载完成！');
            $("div.loading").fadeOut(500, function () {
                $("div.loading").hide();
            });
        }, 2100)
    }
    function autoThemeSelected() {
        $("li.--theme-auto").css({'background-color': 'rgb(var(--main-white))', 'box-shadow': '9px 0px rgb(var(--main-white)),-9px 0px rgb(var(--main-white))'});
        $("i.--theme-auto, span.--theme-auto").css('color', 'rgb(var(--main-green))');
        /*if (20 <= hourForThemeControl || hourForThemeControl <= 5 || window.matchMedia('(prefer-color-scheme: dark)').matches) {
            document.getElementById("stylesheet-main").href = "/assets/css/main-dark.css";
        } else {
            document.getElementById("stylesheet-main").href = "/assets/css/main-light.css";
        }*/
    }
    function lightThemeSelected() {
        $("li.--theme-light").css({'background-color': 'rgb(var(--main-white))', 'box-shadow': '9px 0px rgb(var(--main-white)),-9px 0px rgb(var(--main-white))'});
        $("i.--theme-light, span.--theme-light").css('color', 'rgb(var(--main-green))');
        //document.getElementById("stylesheet-main").href = "/assets/css/main-light.css";
    }
    function darkThemeSelected() {
        $("li.--theme-dark").css({'background-color': 'rgb(var(--main-white))', 'box-shadow': '9px 0px rgb(var(--main-white)),-9px 0px rgb(var(--main-white))'});
        $("i.--theme-dark, span.--theme-dark").css('color', 'rgb(var(--main-green))');
        //document.getElementById("stylesheet-main").href = "/assets/css/main-dark.css";
    }
    function autoThemeUnselected() {
        $("li.--theme-auto").css({'background-color': 'transparent', 'box-shadow': 'none'});
        $("i.--theme-auto, span.--theme-auto").css('color', 'rgb(var(--main-white))');
    }
    function lightThemeUnselected() {
        $("li.--theme-light").css({'background-color': 'transparent', 'box-shadow': 'none'});
        $("i.--theme-light, span.--theme-light").css('color', 'rgb(var(--main-white))');
    }
    function darkThemeUnselected() {
        $("li.--theme-dark").css({'background-color': 'transparent', 'box-shadow': 'none'});
        $("i.--theme-dark, span.--theme-dark").css('color', 'rgb(var(--main-white))');
    }
    var currentTheme = 0;
    autoThemeSelected();
    $("li.--theme-auto").on('click', function () {
        if (currentTheme != 0) {
            showLoadScreen();
            autoThemeSelected();
            lightThemeUnselected();
            darkThemeUnselected();
            closeLoadScreen();
            currentTheme = 0;
        }
    });
    $("li.--theme-light").on('click', function () {
        if (currentTheme != 1) {
            showLoadScreen();
            autoThemeUnselected();
            lightThemeSelected();
            darkThemeUnselected();
            closeLoadScreen();
            currentTheme = 1;
        }
    });
    $("li.--theme-dark").on('click', function () {
        if (currentTheme != 2) {
            showLoadScreen();
            autoThemeUnselected();
            lightThemeUnselected();
            darkThemeSelected();
            closeLoadScreen();
            currentTheme = 2;
        }
    });
    $("li.--theme-auto").on("mouseenter", function () {
        $("li.--theme-auto").css({'background-color': 'rgb(var(--main-white))', 'box-shadow': '9px 0px rgb(var(--main-white)),-9px 0px rgb(var(--main-white))'});
        $("i.--theme-auto, span.--theme-auto").css('color', 'rgb(var(--main-green))');
    }).on("mouseleave", function () {
        if (currentTheme != 0) {
            $("li.--theme-auto").css({'background-color': 'transparent', 'box-shadow': 'none'});
            $("i.--theme-auto, span.--theme-auto").css('color', 'rgb(var(--main-white))');
        }
    });
    $("li.--theme-light").on("mouseenter", function () {
        $("li.--theme-light").css({'background-color': 'rgb(var(--main-white))', 'box-shadow': '9px 0px rgb(var(--main-white)),-9px 0px rgb(var(--main-white))'});
        $("i.--theme-light, span.--theme-light").css('color', 'rgb(var(--main-green))');
    }).on("mouseleave", function () {
        if (currentTheme != 1) {
            $("li.--theme-light").css({'background-color': 'transparent', 'box-shadow': 'none'});
            $("i.--theme-light, span.--theme-light").css('color', 'rgb(var(--main-white))');
        }
    });
    $("li.--theme-dark").on("mouseenter", function () {
        $("li.--theme-dark").css({'background-color': 'rgb(var(--main-white))', 'box-shadow': '9px 0px rgb(var(--main-white)),-9px 0px rgb(var(--main-white))'});
        $("i.--theme-dark, span.--theme-dark").css('color', 'rgb(var(--main-green))');
    }).on("mouseleave", function () {
        if (currentTheme != 2) {
            $("li.--theme-dark").css({'background-color': 'transparent', 'box-shadow': 'none'});
            $("i.--theme-dark, span.--theme-dark").css('color', 'rgb(var(--main-white))');
        }
    });
    //侧边栏
    $("button.aside-unfold-sidebar").on('click', function () {
        $("div.aside-mask").show();
        $("div.aside-sidebar").show().animate({left: "0"}, 200);
    });
    $("div.aside-mask").on('click', function () {
        $("div.aside-mask").hide();
        $("div.aside-sidebar").animate({left: "-302"}, 200, function () {
            $("div.aside-sidebar").hide();
        });
    });
    //侧边栏子页面操作
    var wiki = 0;
    $("li.--wiki").on('click', function () {
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