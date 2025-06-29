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
}, 3500)
setTimeout(function () {
    $("p.loading-text").text('正在加载js...');
}, 6000)
setTimeout(function () {
    $("p.loading-text").text('加载可能需要较长时间，请耐心等待...');
}, 9000)
setTimeout(function () {
    $("p.loading-text").text('就快好了，再等我一会...');
}, 12000)
setTimeout(function () {
    $("p.loading-speed-up").css('visibility', 'visible');
}, 16000)
//加载界面淡出 & 主题切换提示
var currentTime = new Date();
var currentHour = currentTime.getHours();
window.onload = function () {
    setTimeout(function () {
        $("p.loading-text").text('加载完成！');
        $("div.loading").fadeOut(500, function () {
            $("div.loading").hide();
            if (20 <= currentHour || currentHour <= 5) {
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
//主题
function themeSelect(theme) {
    let themeListSelector = "li.theme-" + theme;
    let themeContentSelector = "i.theme-" + theme + ", span.theme-" + theme;
    $(themeListSelector).css({'background-color': 'rgb(var(--main-white))', 'box-shadow': '9px 0px rgb(var(--main-white)), -9px 0px rgb(var(--main-white))'});
    $(themeContentSelector).css('color', 'rgb(var(--main-green))');
    Cookies.set('currentTheme', theme, {expires: 365, path: '/'});
}
function themeUnselect(theme1, theme2) {
    let themeListSelector = "li.theme-" + theme1 + ", li.theme-" + theme2;
    let themeContentSelector = "i.theme-" + theme1 + ", span.theme-" + theme1 + ", i.theme-" + theme2 + ", span.theme-" + theme2;
    $(themeListSelector).css({'background-color': 'transparent', 'box-shadow': 'none'});
    $(themeContentSelector).css('color', 'rgb(var(--main-white))');
}
function themeListMouseResponse(theme) {
    let themeListSelector = "li.theme-" + theme;
    let themeContentSelector = "i.theme-" + theme + ", span.theme-" + theme;
    $(themeListSelector).on("mouseenter", function () {
        $(themeListSelector).css({'background-color': 'rgb(var(--main-white))', 'box-shadow': '9px 0px rgb(var(--main-white)), -9px 0px rgb(var(--main-white))'});
        $(themeContentSelector).css('color', 'rgb(var(--main-green))');
    }).on("mouseleave", function () {
        if (Cookies.get('currentTheme') != theme) {
            $(themeListSelector).css({'background-color': 'transparent', 'box-shadow': 'none'});
            $(themeContentSelector).css('color', 'rgb(var(--main-white))');
        }
    });   
}
function autoTheme() {
    themeSelect("auto");
    if (20 <= currentHour || currentHour <= 5 || window.matchMedia('(prefer-color-scheme: dark)').matches) {
        $("#dark-theme").html('@import url("/assets/css/main-dark.css");');
    } else {
        $("#dark-theme").html('');
    }
    themeUnselect("light", "dark");  
}
function lightTheme() {
    themeSelect("light");
    $("#dark-theme").html('');
    themeUnselect("auto", "dark");
}
function darkTheme() {
    themeSelect("dark");
    $("#dark-theme").html('@import url("/assets/css/main-dark.css");');
    themeUnselect("auto", "light");
}
if (Cookies.get('currentTheme') == undefined || Cookies.get('currentTheme') == "auto") {
    autoTheme();
} else if (Cookies.get('currentTheme') == "light") {
    lightTheme();
} else if (Cookies.get('currentTheme') == "dark") {
    darkTheme();
}
function asideCallback() {
    //主题切换
    $("button.aside-theme-control").on('click', function () {
        $("div.aside-theme-control-tip").remove();
        $("div.aside-theme-select").slideToggle(400);
    });
    $("li.theme-auto").on('click', function () {
        if (Cookies.get('currentTheme') != "auto") {
            autoTheme();
        }
    });
    $("li.theme-light").on('click', function () {
        if (Cookies.get('currentTheme') != "light") {
            lightTheme();
        }
    });
    $("li.theme-dark").on('click', function () {
        if (Cookies.get('currentTheme') != "dark") {
            darkTheme();
        }
    });
    themeListMouseResponse("auto");
    themeListMouseResponse("light");
    themeListMouseResponse("dark");
    //侧边栏动效
    $("button.aside-unfold-sidebar").on('click', function () {
        $("div.aside-mask").show();
        $("div.aside-sidebar").show().animate({left: '0'}, 200);
    });
    $("div.aside-mask").on('click', function () {
        $("div.aside-mask").hide();
        $("div.aside-sidebar").animate({left: '-302'}, 200, function () {
            $("div.aside-sidebar").hide();
        });
    });
    //侧边栏项目处理
    var currentListItemId = "#li" + currentFilePath.slice(0, -5).replace(/\//g, '-');
    var currentListLinkId = "#a" + currentFilePath.slice(0, -5).replace(/\//g, '-');
    $(currentListItemId).css({'background-color': 'rgb(var(--main-green)', 'box-shadow': '21px 0px rgb(var(--main-green)), -30px 0px rgb(var(--main-green))'});
    $(currentListLinkId).href = 'javascript:void(0);';
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