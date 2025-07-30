//根元素font-size属性设置（用于不支持css clamp()函数的浏览器）
if (!CSS.supports('font-size', 'clamp(12.8px, 1.25vw, 20px)')) {
    var adjustFontSize = () => {
        let currentWidth = window.innerWidth;
        var newFontSize = currentWidth / 80;
        if (newFontSize <= 12.8) {
            newFontSize = 12.8;
        } else if (newFontSize >= 20) {
            newFontSize = 20;
        }
        newFontSize = newFontSize.toString() + 'px';
        $('html').css('font-size', newFontSize);
    }
    adjustFontSize();
    $(window).on('resize', adjustFontSize);
}
//加载动画
var borderRotateAngle = 0,
    logoRotateAngle = 0;
var borderRotate = setInterval(() => {
    borderRotateAngle += 1;
    logoRotateAngle -= 1;
    $('div.loading-round-border').rotate(borderRotateAngle);
    $('img.loading-logo').rotate(logoRotateAngle);
}, 5);
setTimeout(() => {
    $('p.loading-text').text('加载可能花费较长时间，请耐心等待...');
}, 5000);
setTimeout(() => {
    $('p.loading-text').text('就快好了，再等我一会...');
}, 10000);
setTimeout(() => {
    $('p.loading-speed-up').css('visibility', 'visible');
}, 15000);
//加载界面淡出
window.onload = () => {
    setTimeout(() => {
        $('p.loading-text').text('加载完成！');
        $('div.loading').fadeOut(500, () => {
            $('div.loading').hide();
            clearInterval(borderRotate);
        });
    }, 700)
}
//导航栏项目（主题切换控件 & 侧边栏项目处理）
let themeSelect = (theme) => {
    let themeListSelector = 'li.theme-' + theme;
    $(themeListSelector).addClass('aside-theme-select-list-item-active');
    Cookies.set('currentTheme', theme, {expires: 365, path: '/'});
}
let themeUnselect = (theme1, theme2) => {
    let themeListSelector = 'li.theme-' + theme1 + ', li.theme-' + theme2;
    $(themeListSelector).removeClass('aside-theme-select-list-item-active');
}
let showTip = () => {
    setTimeout(() => {
        $('div.aside-theme-control-tip').fadeIn(3500);
    }, 1400)
    setTimeout(() => {
        $('div.aside-theme-control-tip').fadeOut(3500, () => {
             $('div.aside-theme-control-tip').remove();
        });
    }, 3600)
}
let currentHour = new Date().getHours();
let useDarkCSS = () => {
    $('link[href="/assets/css/main.css"]').after('<link rel="stylesheet" href="/assets/css/main-dark.css">');
    $('link[href="/assets/css/highlight-11.11.1-stackoverflow-light.min.css"]').after('<link rel="stylesheet" href="/assets/css/highlight-11.11.1-tokyo-night-dark.min.css">');
    $('link[href="/assets/css/APlayer.min.css"]').after('<link rel="stylesheet" href="/assets/css/APlayer-dark.min.css">');
}
let removeDarkCSS = () => {
    $('link[href="/assets/css/main-dark.css"]').remove();
    $('link[href="/assets/css/highlight-11.11.1-tokyo-night-dark.min.css"]').remove();
    $('link[href="/assets/css/APlayer-dark.min.css"]').remove()
}
let autoTheme = () => {
    themeSelect('auto');
    if (20 <= currentHour || currentHour <= 5) {
        useDarkCSS();
        showTip();
    } else if (window.matchMedia('(prefer-color-scheme: dark)').matches) {
        $('span.aside-theme-control-tip-text').html('检测到你的浏览器设置为<br>深色模式，已自动同步～<br>你可以在此处切换主题～');
        useDarkCSS();
        showTip();
    } else {
        removeDarkCSS();
    }
    themeUnselect('light', 'dark');  
}
let lightTheme = () => {
    themeSelect('light');
    removeDarkCSS();
    themeUnselect('auto', 'dark');
}
let darkTheme = () => {
    themeSelect('dark');
    useDarkCSS();
    themeUnselect('auto', 'light');
}
let initializeTheme = () => {
    (Cookies.get('currentTheme') === undefined || Cookies.get('currentTheme') === 'auto') && autoTheme();
    (Cookies.get('currentTheme') === 'light') && lightTheme();
    (Cookies.get('currentTheme') === 'dark') && darkTheme();
}
initializeTheme();
$('script[src="/assets/js/main.js"]').before('<script>let currentFilePath = location.pathname;</script>');
var isCurrentFilePathSpecial = false;
var currentPageId = '#';
var idAddition;
let specialFilePathOperation = (mainFilePath) => {
    if (currentFilePath.slice(0, mainFilePath.length) === mainFilePath) {
        isCurrentFilePathSpecial = true;
        idAddition = mainFilePath.replace(/\//g, '-');
    }
}
let sidebarItemOperation = () => {
    specialFilePathOperation('/math-challenge');
    if (!isCurrentFilePathSpecial) {
        if (currentFilePath.endsWith('/')) {
            idAddition = currentFilePath.replace(/\//g, '-') + 'index';
        } else if (currentFilePath.lastIndexOf('.') === -1) {
            idAddition = currentFilePath.replace(/\//g, '-');
        } else {
            idAddition = currentFilePath.replace(/\//g, '-').slice(0, currentFilePath.lastIndexOf('.'));
        }
    }
    currentPageId = (currentPageId + idAddition).replace('-', '');
    if (currentFilePath !== '/about.html') {
        $(currentPageId).addClass('aside-sidebar-current-page-item');
        document.querySelector(currentPageId + ' a.aside-sidebar-item-link').href = 'javascript:void(0);';
        $(currentPageId + ' .mdi-chevron-right').hide();
    } else {
        document.querySelector('a.aside-sidebar-footer-link').href = 'javascript:void(0);';
    } 
}
/* var listItemId = '#';
let sidebarSublistSlide = (sublistName) => {
    sublistName = 0;
    listItemId += sublistName;
    $(listItemId).on('click', () => {
        $(sublistId).slideToggle(200, () => {
            if (sublistName === 0) {
                $(sublistArrowId).rotate({duration: 300, animateTo: 90});
                sublistName = 1;
            } else {
                $(sublistArrowId).rotate({duration: 300, animateTo: 0});
                sublistName = 0;
            }
        });
    });
} */
let asideLoadedCallback = () => {
    sidebarItemOperation();
    //主题切换
    $('button.aside-theme-control').on('click', () => {
        $('div.aside-theme-control-tip').remove();
        initializeTheme();
        $('div.aside-theme-select').slideToggle(400);
    });
    $('li.theme-auto').on('click', () => {
        (Cookies.get('currentTheme') !== 'auto') && autoTheme();
    });
    $('li.theme-light').on('click', () => {
        (Cookies.get('currentTheme') !== 'light') && lightTheme();
    });
    $('li.theme-dark').on('click', () => {
        (Cookies.get('currentTheme') !== 'dark') && darkTheme();
    });
    //侧边栏动效
    $('button.aside-unfold-sidebar').on('click', () => {
        $('div.aside-mask').show();
        $('div.aside-sidebar-header, div.aside-sidebar').show().animate({left: '0'}, 150);
    });
    $('div.aside-mask').on('click', () => {
        $('div.aside-mask').hide();
        $('div.aside-sidebar-header, div.aside-sidebar').animate({left: '-301'}, 150, () => {
            $('div.aside-sidebar-header, div.aside-sidebar').hide();
        });
    });
    //侧边栏子项目操作
    //sidebarSublistSlide('');
}