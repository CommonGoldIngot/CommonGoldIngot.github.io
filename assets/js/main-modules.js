//头部预提取文件
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
`);
$('script[src="/assets/js/APlayer.min.js"]').length && (prefetchLinkContent += `
<link rel="prefetch" href="/assets/css/APlayer.min.css">
<link rel="prefetch" href="/assets/css/APlayer-dark.min.css">
`);
$('link[href="/assets/css/main.css"]').before(prefetchLinkContent);
//导航栏
$(document).ready(function () {
    $("aside.navbar").load("/assets/modules/navbar.html", asideLoadedCallback);
});