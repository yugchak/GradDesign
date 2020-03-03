$(function(){
    var asideLi =$("#aside li");
    asideLi.hover(function(){
        $(this).find(".char").show();
    },function(){
        $(this).find(".char").hide();
    });
    var backTop = $("#aside li.backTop");
    $(window).scroll(function(){
        var winHeight = $(window).scrollTop();
        winHeight>150?backTop.css("opacity","1"):backTop.css("opacity","0");
    });
    backTop.click(function(){
        $("html,body").stop(true).animate({
            scrollTop:0
        },500);
    });
})