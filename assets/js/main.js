//加载界面淡出
function loaded() {
    $("p.loading-text").text("加载完成！");
    $("div.loading").fadeOut(500, function () {
        $("div.loading").remove();
    });
}
$(document).ready(function () {
    //侧边栏
    $("button.aside-unfold-sidebar").click(function () {
        $("div.aside-mask").show();
        $("div.aside-sidebar").show().animate({left: "0"}, "fast");
    });
    $("div.aside-mask").click(function () {
        $("div.aside-mask").hide();
        $("div.aside-sidebar").animate({left: "-300"}, "fast", function () {
            $("div.aside-sidebar").hide();
        });
    });
    //侧边栏子页面
    $("li.--wiki").bind({
    
    $('#img').rotate({
    bind:{
    click: function(){
            $(this).rotate({
                angle: 0,
                animateTo:180
            });
        }
    }
        mouseover: function () {
            $("i.--wiki").rotate({
                bind: {
                    click: function () {
                        $(this).rotate({
                            duration: 500,
                            animateTo: 90
                        });
                    }
                }
            });
        },
        mouseout: function () {
            $("i.--wiki").rotate({
                bind: {
                    click: function () {
                        $(this).rotate({
                            duration: 500,
                            animateTo: 0
                        });
                    }
                }
            });
        },
        click: function () {
            $("ul.--wiki").slideToggle("fast");
            $("i.--wiki").toggle(
                function () {
                    $("i.--wiki").rotate({
                        bind: {
                            click: function () {
                                $(this).rotate({
                                    duration: 500,
                                    animateTo: 90
                                });
                            }
                        }
                    });
                },
                function () {
                    $("i.--wiki").rotate({
                        bind: {
                            click: function () {
                                $(this).rotate({
                                    duration: 500,
                                    animateTo: 0
                                });
                            }
                        }
                    });
                }
            );
        }
    });
});