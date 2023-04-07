$(document).ready(function () {
    //加载界面淡出
    setTimeout(function () {
        $("div.loading").fadeOut(500, function () {
            $("div.loading").remove();
        });
    }, 800)
    //侧边栏
    $("button.aside-unfold-sidebar").click(function () {
        $("div.aside-sidebar, div.aside-mask").show();
    });
    $("div.aside-mask").click(function () {
        $("div.aside-sidebar, div.aside-mask").hide();
    });
        //侧边栏子页面
        $("li.aside-sidebar-item-has-subnav").click(function () {
            $("ul.aside-subnav").slideToggle("fast");
        });
        var chevron, degree = 0;
        function startRotate() {
            degree = degree + 1;
            chevron.style.transform = "rotate(degree + "deg")"
            if (degree == 180) {
                clearInterval
            }
            
        }
        function rotateChevron() {
            chevron = document.getElementsByClassName("bi-chevron-right")
            
        }
});