//自定义方法
String.prototype.insertString = function (str, index) {
    return this.slice(0, index) + str + this.slice(index);
};
//加载动画
var borderRotateAngle = 0,
    logoRotateAngle = 0;
setInterval(() => {
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
        });
    }, 1500)
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
let autoTheme = () => {
    themeSelect('auto');
    if (20 <= currentHour || currentHour <= 5) {
        $('link[href="/assets/css/main.css"]').after('<link rel="stylesheet" href="/assets/css/main-dark.css">');
        $('link[href="/assets/css/highlight-11.11.1-stackoverflow-light.min.css"]').after('<link rel="stylesheet" href="/assets/css/highlight-11.11.1-tokyo-night-dark.min.css');
        showTip();
    } else if (window.matchMedia('(prefer-color-scheme: dark)').matches) {
        $('span.aside-theme-control-tip-text').html('检测到您的浏览器设置为<br />深色模式，已自动同步～<br />您可以在此处切换主题～');
        showTip();
    } else {
        $('link[href="/assets/css/main-dark.css"]').remove();
        $('link[href="/assets/css/highlight-11.11.1-tokyo-night-dark.min.css"]').remove();
    }
    themeUnselect('light', 'dark');  
}
let lightTheme = () => {
    themeSelect('light');
    $('link[href="/assets/css/main-dark.css"]').remove();
    $('link[href="/assets/css/highlight-11.11.1-tokyo-night-dark.min.css"]').remove();
    themeUnselect('auto', 'dark');
}
let darkTheme = () => {
    themeSelect('dark');
    $('link[href="/assets/css/main.css"]').after('<link rel="stylesheet" href="/assets/css/main-dark.css">');
    $('link[href="/assets/css/highlight-11.11.1-stackoverflow-light.min.css"]').after('<link rel="stylesheet" href="/assets/css/highlight-11.11.1-tokyo-night-dark.min.css">');
    themeUnselect('auto', 'light');
}
let initializeTheme = () => {
    if (Cookies.get('currentTheme') == undefined || Cookies.get('currentTheme') == 'auto') {
        autoTheme();
    } else if (Cookies.get('currentTheme') == 'light') {
        lightTheme();
    } else if (Cookies.get('currentTheme') == 'dark') {
        darkTheme();
    }
}
initializeTheme();
$('script[src="/assets/js/main.js"]').before('<script>let currentFilePath = location.pathname;</script>');
var isCurrentFilePathSpecial = false;
var currentPageId = '#';
var idAddition;
let specialFilePathOperation = (mainFilePath) => {
    if (currentFilePath.slice(0, mainFilePath.length) == mainFilePath) {
        isCurrentFilePathSpecial = true;
        idAddition = mainFilePath.replace(/\//g, '-');
    }
}
let sidebarItemOperation = () => {
    specialFilePathOperation('/math-challenge');
    if (isCurrentFilePathSpecial == false) {
        if (currentFilePath.endsWith('/')) {
            idAddition = currentFilePath.replace(/\//g, '-') + 'index';
        } else if (currentFilePath.lastIndexOf('.') == -1) {
            idAddition = currentFilePath.replace(/\//g, '-');
        } else {
            idAddition = currentFilePath.replace(/\//g, '-').slice(0, currentFilePath.lastIndexOf('.'));
        }
    }
    currentPageId = (currentPageId + idAddition).replace('-', '');
    if (currentFilePath != '/about.html') {
        $(currentPageId + ' li.aside-sidebar-item').addClass('aside-sidebar-current-page-item');
        document.querySelector(currentPageId).href = 'javascript:void(0);';
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
            if (sublistName == 0) {
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
        if (Cookies.get('currentTheme') != 'auto') {
            autoTheme();
        }
    });
    $('li.theme-light').on('click', () => {
        if (Cookies.get('currentTheme') != 'light') {
            lightTheme();
        }
    });
    $('li.theme-dark').on('click', () => {
        if (Cookies.get('currentTheme') != 'dark') {
            darkTheme();
        }
    });
    //侧边栏动效
    $('button.aside-unfold-sidebar').on('click', () => {
        $('div.aside-mask').show();
        $('div.aside-sidebar').show().animate({left: '0'}, 200);
    });
    $('div.aside-mask').on('click', () => {
        $('div.aside-mask').hide();
        $('div.aside-sidebar').animate({left: '-302'}, 200, () => {
            $('div.aside-sidebar').hide();
        });
    });
    //侧边栏子项目操作
    //sidebarSublistSlide('');
}