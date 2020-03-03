$(function(){
    //图片循环
    var edata = myData.enjoy;
    var imgHtml = "";
    var imgUl = $("#container .c-img ul");
    var imgLen = edata.img.length;
    var $index = 0;
    for(var i=0;i<imgLen;i++){
        imgHtml += "<li><img src='img/enjoy/"+edata.img[i]+"' alt='"+edata.name[i]+"'><div class='c-i-details'>"+edata.name[i]+"</div></li>"
    }
    imgUl.append(imgHtml);
    //遮罩层
    var imgHide = $("#container .c-img-hide");
    function set(){
        imgHide.css({
            height:$(window).height(),
            width:$(window).width()
        });
    };
    set();
    $(window).resize(set);
    //大图片显示
    var imgBig = $("#container div.c-i-h-img");
    var list = $("#container .c-i-h-list ul");
    var bigHtml = "";
    var listHtml = "";
    for(var i=0;i<imgLen;i++){
        bigHtml += "<img src='img/enjoy/"+edata.img[i]+"'>"
    }
    for(var i=0;i<imgLen;i++){
        listHtml += "<li><img src='img/enjoy/"+edata.img[i]+"' alt='"+edata.name[i]+"'></li>"
    }
    imgBig.append(bigHtml);
    list.append(listHtml);
    var listLi = $("#container .c-img-hide .c-i-h-list ul li");
    var bigDom = $("#container div.c-i-h-img img");
    var imgLi = $("#container .c-img ul li");
    var multiple = 0;
    var hideBtn = $("#container .c-img-hide .c-i-h-btn div");
     var hideQuit = $("#container .c-img-hide .c-i-h-quit");
    listLi.click(function(){
        multiple = 0;
        $index = $(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        bigDom.eq($index).fadeIn().siblings().fadeOut();
        // console.log($(this).position().left);
        //将点击的图片放置在最左边
        list.animate({
            marginLeft:-(listLi.eq($index).position().left)
        });
    });
    imgLi.click(function(){
        $index = $(this).index();
        imgHide.show();
        listLi.eq($index).addClass("on").siblings().removeClass("on");
        bigDom.eq($index).fadeIn().siblings().fadeOut();
        list.animate({
            marginLeft:-(listLi.eq($index).position().left)
        });
    });
    hideQuit.click(function(){
        multiple = 0;
        imgHide.hide();
    });
    hideBtn.click(function(){
        var btnIndex = $(this).index();
        //btnIndex等于1，也就是点击右边的时候
        if(btnIndex){
            /*
                控制倍数的范围，
                点击右边，multiple可以++的次数是listLi长度-1-当前的index数值（因为长度从0开始所以-1）

             */
            if(multiple<(listLi.length-1-$index)){
                multiple++;
            }else{
                multiple=listLi.length-1-$index;
            }
            list.animate({
                marginLeft:-(listLi.eq($index).position().left+153*multiple)
            });

            //console.log(listLi.eq($index).position().left+153*multiple);
        }else{
            if(multiple>-$index){
                multiple--;
            }
            list.animate({
                marginLeft:-(listLi.eq($index).position().left+153*multiple)
            });
        }
    });
    //video
    var video = $("#container .c-video .c-v-con li");
    video.hover(function() {
        $(this).find("div").slideDown(200);
    }, function() {
        $(this).find("div").slideUp(200);
    });
    var $hide = $("#container .v_hide");
    var $h_con = $("#container .v_hide .v_h_con");
    var $close = $("#container .v_hide .v_h_con .v_h_c_title .close");
    var $iframe = $("#container .v_hide .v_h_con .v_h_c_content iframe");
    function h_Size(){
            $hide.css({
                width:$(window).width(),
                height:$(window).height()
            });
        };
        h_Size();
        $(window).resize(h_Size);
    //点击img的时候，出现弹出层
    video.click(function(){
        $hide.fadeIn(300).find(".v_h_con").show().stop(true).animate({
            top:"50%",
            opacity:1
        },500);
        //改变当前iframe视频的src播放地址
        var data = $(this).attr("data");
        $iframe.attr("src",data);
        //改变当前title
        var html = $(this).find("a").html();
        $h_con.find("h2").html(html);
    });
    //点击close按钮，盒子收上去并且弹出层消失
    $close.click(function(){
        $h_con.stop(true).animate({
            top:"-20%",
            opacity:0
        },600,function(){
            $hide.fadeOut(300);
        });
        //情况iframe的src
        $iframe.attr("src","");
    });
    //时钟
    var pDate = $("#clock .c-date");
    var pTime = $("#clock .c-time");
    var clockDom = $("#clock");
    //console.log(clockDate);
    function clock(){
        var timer = setInterval(function(){
            var clockDate = new Date();
            var year = clockDate.getFullYear();//年
            var month = clockDate.getMonth()+1;//月
            var day = clockDate.getDate();//日
            var week = clockDate.getDay();//星期
            var hours = clockDate.getHours();//时
            var minutes = clockDate.getMinutes();//分
            var seconds = clockDate.getSeconds();//秒
            pDate.html(year+"年"+month+"月"+day+"日"+"&nbsp;"+charge(week));
            pTime.html(zero(hours)+":"+zero(minutes)+":"+zero(seconds));
            function zero(num){
                return (num<10?"0"+num:num);
            };
            function charge(num){
                switch(num){
                    case 1: return "星期一";
                    break;
                    case 2: return "星期二";
                    break;
                    case 3: return "星期三";
                    break;
                    case 4: return "星期四";
                    break;
                    case 5: return "星期五";
                    break;
                    case 6: return "星期六";
                    break;
                    case 0: return "星期日";
                    break;
                    default:"";
                };
            };
        });
    };
    clock();
    //时钟拖拽效果
    clockDom.mousedown(function(e) {
        // $(this).addClass("move");
        e.cancelBubble = true;
        e = e || event;
        //获取鼠标按下时的x，y
        var downX = e.clientX;
        var downY = e.clientY;
        var startTop = $(this).position().top;
        var startLeft = $(this).position().left;
        // console.log(downX+"---"+downY+"---"+startTop+"---"+startLeft);
        $(document).mousemove(function(e) {
            e= e || event;
            var moveX = e.clientX;
            var moveY = e.clientY;
            clockDom.css({
                "left": moveX-(downX-startLeft)+"px",
                "top": moveY-(downY-startTop)+"px"
            });
        });
    });
    $(document).mouseup(function() {
        $(this).unbind('mousemove');
        // clockDom.removeClass("move");
    });
//end
})