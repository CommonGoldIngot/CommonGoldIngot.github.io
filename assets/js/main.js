//自定义方法
String.prototype.insertString = function (str, index) {
    return this.slice(0, index) + str + this.slice(index);
};
//加载动画
var borderRotateAngle = 0,
    logoRotateAngle = 0;
setInterval(function () {
    borderRotateAngle += 1;
    logoRotateAngle -= 1;
    $('div.loading-round-border').rotate(borderRotateAngle);
    $('img.loading-logo').rotate(logoRotateAngle);
}, 5);
setTimeout(function () {
    $('p.loading-text').text('加载可能花费较长时间，请耐心等待...');
}, 5000)
setTimeout(function () {
    $('p.loading-text').text('就快好了，再等我一会...');
}, 10000)
setTimeout(function () {
    $('p.loading-speed-up').css('visibility', 'visible');
}, 15000)
//加载界面淡出
window.onload = function () {
    setTimeout(function () {
        $('p.loading-text').text('加载完成！');
        $('div.loading').fadeOut(500, function () {
            $('div.loading').hide();
        });
    }, 1500)
}
//导航栏项目（主题切换控件 & 侧边栏项目处理）
function themeSelect(theme) {
    let themeListSelector = 'li.theme-' + theme;
    let themeContentSelector = 'i.theme-' + theme + ', span.theme-' + theme;
    $(themeListSelector).css({'background-color': 'rgb(var(--main-white))', 'box-shadow': '9px 0 rgb(var(--main-white)), -9px 0 rgb(var(--main-white))'});
    $(themeContentSelector).css('color', 'rgb(var(--main-green))');
    Cookies.set('currentTheme', theme, {expires: 365, path: '/'});
}
function themeUnselect(theme1, theme2) {
    let themeListSelector = 'li.theme-' + theme1 + ', li.theme-' + theme2;
    let themeContentSelector = 'i.theme-' + theme1 + ', span.theme-' + theme1 + ', i.theme-' + theme2 + ', span.theme-' + theme2;
    $(themeListSelector).css({'background-color': 'transparent', 'box-shadow': 'none'});
    $(themeContentSelector).css('color', 'rgb(var(--main-white))');
}
function themeListMouseResponse(theme) {
    let themeListSelector = 'li.theme-' + theme;
    let themeContentSelector = 'i.theme-' + theme + ', span.theme-' + theme;
    $(themeListSelector).on('mouseenter', function () {
        $(themeListSelector).css({'background-color': 'rgb(var(--main-white))', 'box-shadow': '9px 0 rgb(var(--main-white)), -9px 0 rgb(var(--main-white))'});
        $(themeContentSelector).css('color', 'rgb(var(--main-green))');
    }).on('mouseleave', function () {
        if (Cookies.get('currentTheme') != theme) {
            $(themeListSelector).css({'background-color': 'transparent', 'box-shadow': 'none'});
            $(themeContentSelector).css('color', 'rgb(var(--main-white))');
        }
    });   
}
function showTip() {
    setTimeout(function () {
        $('div.aside-theme-control-tip').fadeIn(3500);
    }, 1400)
    setTimeout(function () {
        $('div.aside-theme-control-tip').fadeOut(3500, function () {
             $('div.aside-theme-control-tip').remove();
        });
    }, 3600)
}
var currentTime = new Date();
var currentHour = currentTime.getHours();
function autoTheme() {
    themeSelect('auto');
    if (20 <= currentHour || currentHour <= 5) {
        $('link[href="/assets/css/main.css"]').after('<link rel="stylesheet" href="/assets/css/main-dark.css">');
        showTip();
    } else if (window.matchMedia('(prefer-color-scheme: dark)').matches) {
        $('span.aside-theme-control-tip-text').html('检测到您的浏览器设置为<br />深色模式，已自动同步～<br />您可以在此处切换主题～');
        showTip();
    } else {
        $('link[href="/assets/css/main-dark.css"]').remove();
    }
    themeUnselect('light', 'dark');  
}
function lightTheme() {
    themeSelect('light');
    $('link[href="/assets/css/main-dark.css"]').remove();
    themeUnselect('auto', 'dark');
}
function darkTheme() {
    themeSelect('dark');
    $('link[href="/assets/css/main.css"]').after('<link rel="stylesheet" href="/assets/css/main-dark.css">');
    themeUnselect('auto', 'light');
}
function initializeTheme() {
    if (Cookies.get('currentTheme') == undefined || Cookies.get('currentTheme') == 'auto') {
        autoTheme();
    } else if (Cookies.get('currentTheme') == 'light') {
        lightTheme();
    } else if (Cookies.get('currentTheme') == 'dark') {
        darkTheme();
    }
}
initializeTheme();
function asideLoadedCallback() {
    //主题切换
    $('button.aside-theme-control').on('click', function () {
        $('div.aside-theme-control-tip').remove();
        initializeTheme();
        $('div.aside-theme-select').slideToggle(400);
    });
    $('li.theme-auto').on('click', function () {
        if (Cookies.get('currentTheme') != 'auto') {
            autoTheme();
        }
    });
    $('li.theme-light').on('click', function () {
        if (Cookies.get('currentTheme') != 'light') {
            lightTheme();
        }
    });
    $('li.theme-dark').on('click', function () {
        if (Cookies.get('currentTheme') != 'dark') {
            darkTheme();
        }
    });
    themeListMouseResponse('auto');
    themeListMouseResponse('light');
    themeListMouseResponse('dark');
    //侧边栏项目处理
    function sidebarItemOperation() {
        $('script[src="/assets/js/main.js"]').before('<script>var currentFilePath = location.pathname;</script>');
        var isCurrentFilePathSpecial = false;
        var currentListItemId = '#li',
            currentListLinkId = '#a',
            currentListArrowId = '#i';
        var idAddition;
        function specialFilePathOperation(mainFilePath) {
            if (currentFilePath.slice(0, mainFilePath.length) == mainFilePath) {
                isCurrentFilePathSpecial = true;
                idAddition = mainFilePath.replace(/\//g, '-');
            }
        }
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
        currentListItemId += idAddition;
        currentListLinkId += idAddition;
        currentListArrowId += idAddition;
        if (currentFilePath != '/about.html') {
            $(currentListItemId).css({'background-color': 'rgb(var(--main-green)', 'box-shadow': '21px 0 rgb(var(--main-green)), -30px 0 rgb(var(--main-green))'});
            document.querySelector(currentListLinkId).href = 'javascript:void(0);';
            $(currentListArrowId).hide();
        } else {
            document.querySelector('a.aside-sidebar-footer-link').href = 'javascript:void(0);';
        } 
    }
    //侧边栏动效
    $('button.aside-unfold-sidebar').on('click', function () {
        sidebarItemOperation();
        $('div.aside-mask').show();
        $('div.aside-sidebar').show().animate({left: '0'}, 200);
    });
    $('div.aside-mask').on('click', function () {
        $('div.aside-mask').hide();
        $('div.aside-sidebar').animate({left: '-302'}, 200, function () {
            $('div.aside-sidebar').hide();
        });
    });
    //侧边栏子项目操作
    var listItemId = '#li',
        sublistId = '#ul',
        sublistArrowId = '#i';
    function sidebarSublistSlide(sublistName) {
        sublistName = 0;
        listItemId += '-' + sublistName;
        sublistId += '-' + sublistName;
        sublistArrowId += '-' + sublistName;
        $(listItemId).on('click', function () {
            $(sublistId).slideToggle(200, function () {
                if (sublistName == 0) {
                    $(sublistArrowId).rotate({duration: 300, animateTo: 90});
                    sublistName = 1;
                } else {
                    $(sublistArrowId).rotate({duration: 300, animateTo: 0});
                    sublistName = 0;
                }
            });
        });
    }
    sidebarSublistSlide('wiki');
}
/*
$(document).ready(function () {
    //网格布局
    //特别神秘的布局逻辑，什么时候有用了再放出来吧（
    var areaClassName = /area-\d+x\d+/,
        columnClassName = /col-\d+\/\d+/,
        rowClassName = /row-\d+\/\d+/;
    var gridContainers = document.getElementsByClassName('grid-container'),
        gridItems = document.getElementsByClassName('grid-item');
    const gridContainerSize = [],
          gridItemSize = [];
    const gridContainerCssText = [],
          gridItemCssText = [];
    for (i = 0; i < gridContainers.length; i++) {
        gridContainerSize.push(gridContainers[i].className.match(areaClassName)[0].replace('area-', '').split('x'));
        var gridContainerWidth = window.getComputedStyle(gridContainers[i]).width;
        var gridColumnsWidth = (Number(gridContainerWidth.replace('px', '')) / Number(gridContainerSize[i][0])).toString() + 'px';
        gridContainerCssText.push(`grid-template-columns: repeat(${gridContainerSize[i][0]}, 1fr); grid-template-rows: repeat(${gridContainerSize[i][1]}, ${gridColumnsWidth});`);
        gridContainers[i].style.cssText += gridContainerCssText[i];
    }
    for (j = 0; j < gridItems.length; j++) {
        const gridItemSizeSubArray = [];
        gridItemSizeSubArray.push(gridItems[j].className.match(columnClassName)[0].replace('col-', ''), gridItems[j].className.match(rowClassName)[0].replace('row-', ''));
        gridItemSize.push(gridItemSizeSubArray);
        gridItemCssText.push(`grid-column: ${gridItemSize[j][0].replace('/', ' / ')}; grid-row: ${gridItemSize[j][1].replace('/', ' / ')};`);
        gridItems[j].style.cssText += gridItemCssText[j];
    }
});
*/