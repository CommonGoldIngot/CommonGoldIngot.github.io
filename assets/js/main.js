// 获取当前页面的路径信息
$('script[src="/assets/js/main.js"]').before('<script>let currentFilePath = location.pathname;</script>');
(currentFilePath.endsWith('/')) && (currentFilePath = currentFilePath.replace(/(.*)\/$/, '$1/index'));
(currentFilePath.endsWith('.html')) && (currentFilePath = currentFilePath.replace(/(.*).html$/, '$1'));
currentFilePath = currentFilePath.split('/');
currentFilePath.shift();
let loadFilePathInfo = async () => {
    let response = await fetch('/assets/js/file-path-info.json');
    let data = await response.json();
    return data;
}
let loadIcons = async () => {
    let response = await fetch('/assets/js/icons.json');
    let data = await response.json();
    return data;
}
// 根元素font-size属性设置（用于不支持css clamp()函数的浏览器）
if (!CSS.supports('font-size', 'clamp(12.8px, 1.25vw, 20px)')) {
    var adjustFontSize = () => {
        let currentWidth = window.innerWidth;
        var newFontSize = currentWidth / 80;
        (newFontSize <= 12.8) && (newFontSize = 12.8);
        (newFontSize >= 20) && (newFontSize = 20);
        newFontSize = `${newFontSize}px`;
        $('html').css('font-size', newFontSize);
    }
    adjustFontSize();
    $(window).on('resize', adjustFontSize);
}

// 加载动画
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
// 加载界面淡出
window.onload = () => {
    setTimeout(() => {
        $('p.loading-text').text('加载完成！');
        $('div.loading').fadeOut(500, () => {
            $('div.loading').hide();
            clearInterval(borderRotate);
        });
    }, 700);
}

// 主题切换
let themeSelect = (theme) => {
    $(`li.theme-${theme}`).addClass('aside-theme-select-list-item-active');
    Cookies.set('currentTheme', theme, {expires: 365, path: '/'});
}
let themeUnselect = (theme1, theme2) => {
    $(`li.theme-${theme1}, li.theme-${theme2}`).removeClass('aside-theme-select-list-item-active');
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
// 部分页面可以应用特定的CSS文件
let checkSpecificCSSFiles = () => {
    specificCSSDir = (filePathInfo?.[currentFilePath[0]]?.structure?.subFolder?.[currentFilePath[1]]?.hasSpecificCSS) && `/${currentFilePath[0]}/${currentFilePath[1]}/assets/`;
    if (!specificCSSDir) {
        return false;
    }
    let checkFile = (path) => {
        let xhr = new XMLHttpRequest();
        xhr.open('HEAD', path, false);
        try {
            xhr.send();
            return xhr.status >= 200 && xhr.status < 300;
        } catch (e) {
            return false;
        }
    }
    if (checkFile(`${specificCSSDir}style.css`) && checkFile(`${specificCSSDir}style-dark.css`)) {
        specificCSSPath = './assets/style.css';
        specificDarkCSSPath = './assets/style-dark.css';
        return true;
    }
    return false;
}
let useDarkCSS = () => {
    $('link[rel="stylesheet"][href="/assets/css/main.css"]').after('<link rel="stylesheet" href="/assets/css/main-dark.css">');
    $('link[rel="stylesheet"][href="/assets/css/highlight-11.11.1-stackoverflow-light.min.css"]').after('<link rel="stylesheet" href="/assets/css/highlight-11.11.1-tokyo-night-dark.min.css">');
    $('link[rel="stylesheet"][href="/assets/css/APlayer.min.css"]').after('<link rel="stylesheet" href="/assets/css/APlayer-dark.min.css">');
    checkSpecificCSSFiles() && $(`link[rel="stylesheet"][href="${specificCSSPath}"]`).after(`<link rel="stylesheet" href="${specificDarkCSSPath}">`);
}
let removeDarkCSS = () => {
    $('link[rel="stylesheet"][href="/assets/css/main-dark.css"]').remove();
    $('link[rel="stylesheet"][href="/assets/css/highlight-11.11.1-tokyo-night-dark.min.css"]').remove();
    $('link[rel="stylesheet"][href="/assets/css/APlayer-dark.min.css"]').remove();
    checkSpecificCSSFiles() && $(`link[rel="stylesheet"][href="${specificDarkCSSPath}"]`).remove();
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
    $(`li.theme-${theme}`).on('click', () => {
        (document.startViewTransition) ? document.startViewTransition(useTheme[theme]) : useTheme[theme]();
    });
}
let initializeTheme = () => {
    (Cookies.get('currentTheme') === undefined || Cookies.get('currentTheme') === 'auto') && useTheme['auto']();
    (Cookies.get('currentTheme') === 'light') && useTheme['light']();
    (Cookies.get('currentTheme') === 'dark') && useTheme['dark']();
}

// 侧边栏项目构建
let buildSidebarList = () => {
    for (let pathName in filePathInfo) {
        $('ul.aside-sidebar-list').append(`<li class="aside-sidebar-item" id="${pathName}"></li>`);
        let path = (pathName === 'index') ? '/'
            : (filePathInfo[pathName].sidebar.hasSublist) ? 'javascript:void(0);'
            : `/${pathName}`;
        $(`li#${pathName}`).append(`<a class="aside-sidebar-item-link" href="${path}"></a>`);
        let iconClass = `${filePathInfo[pathName].sidebar.icon.split('-')[0]} ${filePathInfo[pathName].sidebar.icon}`;
        $(`li#${pathName} > a.aside-sidebar-item-link`).append(`<i class="aside-sidebar-item-icon ${iconClass}"></i>`)
            .append(`<span class="aside-sidebar-item-text">${filePathInfo[pathName].sidebar.text}</span>`)
            .append('<i class="mdi mdi-chevron-right aside-sidebar-arrow"></i>');
        if (filePathInfo[pathName].sidebar.hasSublist) {
            $(`li#${pathName}`).append(`<ul class="aside-sidebar-sublist"></ul>`);
            for (let sublistName in filePathInfo[pathName].sidebar.sublist) {
                $(`li#${pathName} > ul.aside-sidebar-sublist`).append(`<li class="aside-sidebar-item" id="${sublistName}"></li>`);
                let sublistPath = `/${pathName}/${sublistName}/`;
                $(`li#${sublistName}`).append(`<a class="aside-sidebar-item-link" href="${sublistPath}"></a>`);
                let sublistIconClass = `${filePathInfo[pathName].sidebar.sublist[sublistName].icon.split('-')[0]} ${filePathInfo[pathName].sidebar.sublist[sublistName].icon}`;
                $(`li#${sublistName} > a.aside-sidebar-item-link`).append(`<i class="aside-sidebar-item-icon ${sublistIconClass}"></i>`)
                    .append(`<span class="aside-sidebar-item-text">${filePathInfo[pathName].sidebar.sublist[sublistName].text}</span>`)
                    .append('<i class="mdi mdi-chevron-right aside-sidebar-arrow"></i>');
            }
        }
    }
}
// 当前页面项目设定
let setCurrentSidebarItem = () => {
    if (currentFilePath[0] === 'about') {
        $('a.aside-sidebar-footer-link').attr('href', 'javascript:void(0);');
    } else {
        $(`li#${currentFilePath[0]}`).addClass('aside-sidebar-current-page-item');
        $(`li#${currentFilePath[0]} > a.aside-sidebar-item-link`).attr('href', 'javascript:void(0);');
        if (filePathInfo[currentFilePath[0]].sidebar.hasSublist && currentFilePath[1] !== undefined) {
            $(`li#${currentFilePath[1]}`).addClass('aside-sidebar-current-page-item');
            $(`li#${currentFilePath[1]} > a.aside-sidebar-item-link`).attr('href', 'javascript:void(0);');
            $(`li#${currentFilePath[1]} > a.aside-sidebar-item-link > i.aside-sidebar-arrow`).hide();
        } else {
            $(`li#${currentFilePath[0]} > a.aside-sidebar-item-link > i.aside-sidebar-arrow`).hide();
        }
    }
}
// 侧边栏子列表
let applySidebarSublist = () => {
    const pathNameWithSublist = Object.keys(filePathInfo).filter(key => filePathInfo[key]?.sidebar?.hasSublist === true);
    let isSublistFolded = Object.fromEntries(pathNameWithSublist.map(key => [key, true]));
    if (pathNameWithSublist.includes(currentFilePath[0])) {
        isSublistFolded[currentFilePath[0]] = false;
        $(`li#${currentFilePath[0]} > ul.aside-sidebar-sublist`).css('display', 'block');
        $(`li#${currentFilePath[0]} > a.aside-sidebar-item-link > i.aside-sidebar-arrow`).rotate(90);
    }
    for (let pathName of pathNameWithSublist) {
        let arrowSelector = `li#${pathName} > a.aside-sidebar-item-link > i.aside-sidebar-arrow`;
        $(`li#${pathName} > a.aside-sidebar-item-link`).on('click', () => {
            $(`li#${pathName} > ul.aside-sidebar-sublist`).slideToggle(200, () => {
                if (isSublistFolded[pathName]) {
                    $(arrowSelector).rotate({duration: 300, animateTo: 90});
                    isSublistFolded[pathName] = false;
                } else {
                    $(arrowSelector).rotate({duration: 300, animateTo: 0});
                    isSublistFolded[pathName] = true;
                }
            });
        });
    }
}

$(document).ready(() => {

// 头部预提取文件
var prefetchLinkContent = `
<link rel="prefetch" href="/assets/images/bg-light-landscape.png">
<link rel="prefetch" href="/assets/images/bg-light-portrait.png">
<link rel="prefetch" href="/assets/images/bg-dark-landscape.png">
<link rel="prefetch" href="/assets/images/bg-dark-portrait.png">
<link rel="prefetch" href="/assets/css/main.css">
<link rel="prefetch" href="/assets/css/main-dark.css">
`;
$('script[src="/assets/js/highlight-11.11.1.min.js"]').length && (prefetchLinkContent += `
<link rel="prefetch" href="/assets/css/highlight-11.11.1-stackoverflow-light.min.css">
<link rel="prefetch" href="/assets/css/highlight-11.11.1-tokyo-night-dark.min.css">
<link rel="prefetch" href="/assets/js/highlightjs-line-numbers-2.9.0.min.js">
`);
$('script[src="/assets/js/APlayer.min.js"]').length && (prefetchLinkContent += `
<link rel="prefetch" href="/assets/css/APlayer.min.css">
<link rel="prefetch" href="/assets/css/APlayer-dark.min.css">
`);
$('link[rel="stylesheet"][href="/assets/css/main.css"]').before(prefetchLinkContent);

// 导航栏控件应用
$('aside.navbar').load('/assets/components/navbar.html', () => {
    loadFilePathInfo().then((data) => {
        filePathInfo = data;
        initializeTheme();
        buildSidebarList();
        setCurrentSidebarItem();
        applySidebarSublist();
        loadIcons().then((data) => {
            icons = data;
            for (let iconName of Object.values(icons).flat()) {
                $(`i.${iconName}`).load(`/assets/icons/${iconName}.svg`);
            }
        });
    });
    // 主题切换
    $('button.aside-theme-control').on('click', () => {
        $('div.aside-theme-control-tip').remove();
        $('div.aside-theme-select').slideToggle(400);
    });
    applyTheme('auto');
    applyTheme('light');
    applyTheme('dark');
    // 侧边栏动效
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
});

});