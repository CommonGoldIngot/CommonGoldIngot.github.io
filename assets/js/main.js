//根元素font-size属性设置（用于不支持css clamp()函数的浏览器）
if (!CSS.supports('font-size', 'clamp(12.8px, 1.25vw, 20px)')) {
    var adjustFontSize = () => {
        let currentWidth = window.innerWidth;
        var newFontSize = currentWidth / 80;
        (newFontSize <= 12.8) && (newFontSize = 12.8);
        (newFontSize >= 20) && (newFontSize = 20);
        newFontSize = newFontSize + 'px';
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
    }, 700);
}
//主题切换控件
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
        $('div.aside-theme-control-tip').fadeIn(2000);
    }, 1400);
    setTimeout(() => {
        $('div.aside-theme-control-tip').fadeOut(2000, () => {
             $('div.aside-theme-control-tip').remove();
        });
    }, 4400);
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
let useTheme = {
    'auto': () => {
        themeSelect('auto');
        if (20 <= currentHour || currentHour <= 5) {
            useDarkCSS();
            showTip();
        } else if (window.matchMedia('(prefer-color-scheme: dark)').matches) {
            $('span.aside-theme-control-tip-text').html('检测到你的浏览器设置为深色模式，已自动同步～你可以在此处切换主题～');
            useDarkCSS();
            showTip();
        } else {
            removeDarkCSS();
        }
        themeUnselect('light', 'dark');  
    },
    'light': () => {
        themeSelect('light');
        removeDarkCSS();
        themeUnselect('auto', 'dark');
    },
    'dark': () => {
        themeSelect('dark');
        useDarkCSS();
        themeUnselect('auto', 'light');
    }
};
let applyTheme = (theme) => { 
    $('li.theme-' + theme).on('click', () => {
        (document.startViewTransition) ? document.startViewTransition(useTheme[theme]) : useTheme[theme]();
    });
}
let initializeTheme = () => {
    (Cookies.get('currentTheme') === undefined || Cookies.get('currentTheme') === 'auto') && useTheme['auto']();
    (Cookies.get('currentTheme') === 'light') && useTheme['light']();
    (Cookies.get('currentTheme') === 'dark') && useTheme['dark']();
}
initializeTheme();
//侧边栏项目处理
$('script[src="/assets/js/main.js"]').before('<script>let currentFilePath = location.pathname;</script>');
var currentPageId = '#';
var idAddition = '';
let isCurrentFilePathSpecial = {
    'type': 'without_sublist',
    'value': false
};
let operateSpecialFilePath = (mainFilePath) => {
    if (currentFilePath.slice(0, mainFilePath.length - 1) === mainFilePath.slice(0, -1)) {
        isCurrentFilePathSpecial.value = true;
        idAddition = mainFilePath.slice(0, -1).replace(/\//g, '-');
        ($(`li#${idAddition.replace('-', '')}.aside-sidebar-item-with-sublist`).length) && (isCurrentFilePathSpecial.type = 'with_sublist');
    }
}
let modifyIdAddition = () => {
    if (currentFilePath.endsWith('/')) {
        idAddition = currentFilePath.replace(/\//g, '-') + 'index';
    } else if (currentFilePath.lastIndexOf('.') === -1) {
        idAddition = currentFilePath.replace(/\//g, '-');
    } else {
        idAddition = currentFilePath.replace(/\//g, '-').slice(0, currentFilePath.lastIndexOf('.'));
    }
}
let operateSidebarItem = () => {
    $(currentPageId).addClass('aside-sidebar-current-page-item');
    $(currentPageId + ' > a.aside-sidebar-item-link').attr('href', 'javascript:void(0);');
    (!$(currentPageId + ' > ul.aside-sidebar-sublist').length) && $(currentPageId + ' > a.aside-sidebar-item-link > i.aside-sidebar-arrow').hide();
}
let sidebarCurrentItemOperation = () => {
    operateSpecialFilePath('/math-challenge/');
    !isCurrentFilePathSpecial.value && modifyIdAddition();
    currentPageId = currentPageId + idAddition.replace('-', '');
    (currentFilePath !== '/about.html') ? operateSidebarItem() : $('a.aside-sidebar-footer-link').attr('href', 'javascript:void(0);');
    (isCurrentFilePathSpecial.type === 'with_sublist') && modifyIdAddition();
    currentPageId = '#' + idAddition.replace('-', '');
    operateSidebarItem();
}
//侧边栏子列表展开
let isSublistFolded = {};
let sidebarSublistUnfold = (sublistName) => {
    let listItemId = `#${sublistName}`;
    let listItemArrow = $(listItemId + ' > a.aside-sidebar-item-link > i.aside-sidebar-arrow');
    if (isCurrentFilePathSpecial.value && isCurrentFilePathSpecial.type === 'with_sublist') {
        isSublistFolded[sublistName] = false;
        $('ul.aside-sidebar-sublist').css('display', 'block');
        listItemArrow.rotate(90);
    } else {
        isSublistFolded[sublistName] = true;
    }
    $(listItemId + ' > a.aside-sidebar-item-link').on('click', () => {
        $(listItemId + ' > ul.aside-sidebar-sublist').slideToggle(200, () => {
            if (isSublistFolded[sublistName]) {
                listItemArrow.rotate({duration: 300, animateTo: 90});
                isSublistFolded[sublistName] = false;
            } else {
                listItemArrow.rotate({duration: 300, animateTo: 0});
                isSublistFolded[sublistName] = true;
            }
        });
    });
}
let asideLoadedCallback = () => {
    sidebarCurrentItemOperation();
    //主题切换
    $('button.aside-theme-control').on('click', () => {
        $('div.aside-theme-control-tip').remove();
        initializeTheme();
        $('div.aside-theme-select').slideToggle(400);
    });
    applyTheme('auto');
    applyTheme('light');
    applyTheme('dark');
    //侧边栏动效
    $('button.aside-unfold-sidebar').on('click', () => {
        $('div.aside-mask').show();
        $('div.aside-sidebar-header, div.aside-sidebar').show().animate({left: '0'}, 150);
    });
    $('div.aside-mask').on('click', function () {
        $(this).hide();
        $('div.aside-sidebar-header, div.aside-sidebar').animate({left: '-301'}, 150, function () {
            $(this).hide();
        });
    });
    //侧边栏子列表展开
    //sidebarSublistUnfold('');
}
//弹窗动画
let usePopUp = () => {
    let viewportWidth = window.innerWidth,
        viewportHeight = window.innerHeight;
    var isPopUpOpened = false;
    $('div.main-popup').prepend('<button class="main-popup-x" type="button"><i class="bi bi-x"></i></button>');
    $('.main-open-popup').on('click', function (event) {
        let popUpId = '#' + $(this).attr('id').match(/open-popup-.+/)[0].replace('open-', '');
        (!isPopUpOpened) && $(popUpId).css({
            'top': event.clientY,
            'bottom': viewportHeight - event.clientY,
            'left': event.clientX,
            'right': viewportWidth - event.clientX,
            'padding': '0.7em',
            'overflow': 'auto'
        }).show().animate({
            top: 48 + 2.5 * parseFloat($('html').css('font-size')), //calc(48px + 2.5em)
            bottom: '2.5em',
            left: '3.5em',
            right: '3.5em'
        }, 200);
       isPopUpOpened = true;
    });
    $('button.main-popup-x').on('click', function (event) {
        $(this).parent().css('overflow', 'hidden').animate({
            top: event.clientY,
            bottom: viewportHeight - event.clientY,
            left: event.clientX,
            right: viewportWidth - event.clientX,
            padding: 0
        }, 200, function () {
            $(this).hide();
        });
        isPopUpOpened = false;
    });
}