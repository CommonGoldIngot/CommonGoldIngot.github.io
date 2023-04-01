//Javascript
function ChevronRotate() {
    document.getElementbyID("chevron").style.animationName = "chevron-rotate";
}
function ChevronRotateBack() {
    document.getElementbyID("chevron").style.animationDirection = "reverse";
}
//jQuery
$(document).ready(function () {
    //侧边栏
    $("button.unfold-sidebar").click(function () {
        $("div.sidebar, div.mask").show();
    });
    $("div.mask").click(function () {
        $("div.sidebar, div.mask").hide();
    });
    //侧边栏子页面
    $("li.sidebar-item-has-subnav").click(function () {
        $("ul.subnav").slideToggle("fast");
    });
});