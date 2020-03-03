$(document).ready(function(){
    //banner无缝轮播
    var multiple = 1;
    var ulDom = $("#choice .c_banner>ul");
    function autoPlay(){
        var timer = setInterval(function(){
            ulDom.stop(true).animate({
                marginLeft:-365*multiple
            });
            multiple++;
            // multiple %= 5 ;
            multiple = multiple % 5;
        },1500);
    };
    autoPlay();
    //国家
    var chtml_1 = "";
    var chtml_2 = "";
    var counDom = $("#choice .c_container .country");
    var coun_cont = $("#choice .c_container .coun_cont");
    var coun_hide = $("#choice .c_container .coun_hide");
    var $rData = myData.record;
    var coun_len = $rData.country.length;
    //console.log(coun_len);
    for(var i=0;i<15;i++){
        chtml_1 += "<a href='javascript:void(0);'><span>"+$rData.country[i]+"</span></a>"
    }
    coun_cont.append(chtml_1);
    for(var i=15;i<coun_len;i++){
        chtml_2 += "<a href='javascript:void(0);'><span>"+$rData.country[i]+"</span></a>"
    }
    coun_hide.append(chtml_2);
    //city
    var aDom = $("#choice .c_container  a");
    var cityData = $rData.city;
    var cityHtml_1  = "";
    var cityHtml_2  = "";
    var city_cont = $("#choice .c_container .city .city_cont");
    var city_hide = $("#choice .c_container .city_hide");
    aDom.click(function(){
        city_cont.html("");
        city_hide.html("");
        var counName = $(this).children().html();
        //console.log(counName);
        for(var key in cityData){
            console.log(cityData[key].length);
            if(key==counName){

                if(cityData[key].length<10){
                    // $("#choice .c_container .city_more").css("display","none");
                    for(var i=0;i<cityData[key].length;i++){
                        cityHtml_1 += "<a href='javascript:void(0);'><span>"+cityData[key][i]+"</span></a>";
                    }
                }else{
                    for(var i=0;i<10;i++){
                        //console.log(cityData[key][i]);
                        cityHtml_1 += "<a href='javascript:void(0);'><span>"+cityData[key][i]+"</span></a>";
                    }
                    for(var i=10;i<cityData[key].length;i++){
                        // console.log(cityData[key][i]);
                        cityHtml_2 += "<a href='javascript:void(0);'><span>"+cityData[key][i]+"</span></a>";
                    }
                }

            }

        }
        city_cont.append(cityHtml_1);
        cityHtml_1  = "";
        city_hide.append(cityHtml_2);
        cityHtml_2  = "";
    });

    //更多选项
    var coun_more = $("#choice .c_container .coun_more");
    var city_more = $("#choice .c_container .city_more");
    function moreShow(obj){
        obj.css({
            "background":"#ffa500",
            "color":"#fff"
        })
    }
    function moreHide(obj){
        obj.css({
            "background":"#fff",
            "color":"#111"
        })
    }
    coun_more.hover(function(){
        coun_hide.show();
        moreShow($(this));
    },function(){
        coun_hide.hide();
        moreHide($(this));
    });
    coun_hide.hover(function(){
        coun_hide.show();
        moreShow(coun_more);
    },function(){
        coun_hide.hide();
        moreHide(coun_more);
    });

    city_more.hover(function(){
        city_hide.show();
        moreShow($(this));
    },function(){
        city_hide.hide();
        moreHide($(this));
    });
    city_hide.hover(function(){
        city_hide.show();
        moreShow(city_more);
    },function(){
        city_hide.hide();
        moreHide(city_more);
    });
    //main 文章字数限制
    var pDom = $("#main a p");
    for(var i=0;i<pDom.length;i++){
        if(pDom.eq(i).text().length > 200){
            pDom.eq(i).text(pDom.eq(i).text().substring(0,119)+"...");
        }else{
            pDom.eq(i).text(pDom.eq(i).text());
        }
    }
    //aside
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

    //分页
    var pageDiv = $("#page");
    var pageNum = $("#page ul li");
    var nextNum = $("#page .next");
    var preNum = $("#page .previous");
    var pIndex = 0;
    var firstPage = $("#page .first");
    var lastPage = $("#page .last");
    pageNum.click(function(){
        pIndex = $(this).index();
        $(this).find("a").addClass("on");
        $(this).siblings().find("a").removeClass("on");
    });
    nextNum.click(function(){
        pIndex++;
        pageNum.eq(pIndex).find("a").addClass("on");
        pageNum.eq(pIndex).siblings().find("a").removeClass("on");
    });
    preNum.click(function(){
        pIndex--;
        pageNum.eq(pIndex).find("a").addClass("on");
        pageNum.eq(pIndex).siblings().find("a").removeClass("on");
    });
    firstPage.click(function(){
        pIndex = 0;
        pageNum.eq(0).find("a").addClass("on");
        pageNum.eq(0).siblings().find("a").removeClass("on");
    });
    lastPage.click(function(){
        pIndex = pageNum.length-1;
        pageNum.eq(pageNum.length-1).find("a").addClass("on");
        pageNum.eq(pageNum.length-1).siblings().find("a").removeClass("on");
    });
    pageDiv.click(function(){
        switch(pIndex){
            case 0:
                preNum.css("display","none");
                nextNum.css("display","block");
                break;
            case pageNum.length-1:
                nextNum.css("display","none");
                preNum.css("display","block");
                break;
            default:
                nextNum.css("display","block");
                preNum.css("display","block");

        }
    });
    //富文本编辑器
    $('#edit').editable({inlineMode: false, alwaysBlank: true})
//end
});