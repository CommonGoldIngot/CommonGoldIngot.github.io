$(document).ready(function(){
  //子页面
  $("li.sidebar-item-has-subnav").click(function(){
    $("ul.subnav").slideToggle("fast");
  });
  $("button.unfold-sidebar").click(function(){
    $("div.sidebar, div.mask").show();
  });
});