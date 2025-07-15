//头部预提取文件
$('link[href="/assets/css/main.css"]').before(`
<link rel="prefetch" href="/assets/images/bg-light-landscape.png">
<link rel="prefetch" href="/assets/images/bg-light-portrait.png">
<link rel="prefetch" href="/assets/images/bg-dark-landscape.png">
<link rel="prefetch" href="/assets/images/bg-dark-portrait.png">
<link rel="prefetch" href="/assets/css/main-dark.css">
`);
//导航栏
$(document).ready(function () {
    $("aside.navbar").load("/assets/modules/navbar.html", asideLoadedCallback);
});