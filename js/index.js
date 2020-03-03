$(document).ready(function(){
	function coverHide(bgObj,obj){
		bgObj.fadeOut(300);
		obj.css("transform","scale(0)");
	};
	function coverShow(bgObj,obj){
		bgObj.fadeIn(300);
		obj.css("transform","scale(1)");
	}
		/*---header end---*/
		/*---banner start---*/
		//点击li切换
		var $imgLi = $("#banner .b_imgLi ul li");
		var $tabLi = $("#banner .b_table_li>ul li");
		var _index = 0;
		var timer = null;//定时器
		$tabLi.click(function(){
			_index =$(this).index();
			play();
//			$imgLi.eq(_index).stop(true).fadeIn("300").siblings().fadeOut("300");
//			$tabLi.eq(_index).addClass("click").siblings().removeClass("click");
		});
		//切换
		function play(){
			$imgLi.eq(_index).stop(true).fadeIn("300").siblings().fadeOut("300");
			$tabLi.eq(_index).addClass("click").siblings().removeClass("click");
		};
		//自动轮播
		function auto(){
			timer = setInterval(function(){
				_index++;
				if(_index > $tabLi.length-1){
					_index = 0;
				};
				play();
			},2000);
		};
		auto();
		$(".b_container").hover(function(){
			clearInterval(timer);
		},function(){
			auto();
		});
	/*---banner end---*/
	/*---hot start---*/
	var $hotStr = $(".hot_main");
	console.log($hotStr);
	//console.log($hotStr[i]);
	for(var i=0;i<$hotStr.length;i++){
		if($hotStr.eq(i).html().length > 70){
			$hotStr.eq(i).html($hotStr.eq(i).html().substring(0,60)+"...");
		}
	}


	/*---hot end---*/
	/*---content start---*/
	//判断文章的长度，并截取
	var conStr = $(".c_r_main .main_article .m_a_content");
	for(var i=0;i<conStr.length;i++){
		// console.log(conStr.eq(i).html().length);
		if(conStr.eq(i).html().length > 100){
			conStr.eq(i).html(conStr.eq(i).html().substring(0,99)+"...");
		}else{
			conStr.eq(i).html(conStr.eq(i).html());
		}
	}


	var title = $("#container .c_right .c_r_title ul li");
	title.click(function(){
		$(this).addClass("click").siblings().removeClass("click");
	});
	//点赞
	var likeLi = $(".c_r_main .main_article .m_a_detail li.like");
	var likeNum = $(".c_r_main .main_article .m_a_detail li.like p");
	likeLi.click(function(){
		var num = likeNum.html();
		num++;
		likeNum.html(num);
	});
	/*---content end---*/
	/*---aside start---*/

	var setTop = $("#aside ul li.a_top");
	//当滚动条发生变化时 显示返回顶部按钮
	$(window).scroll(function(){
		var winHeight = $(window).scrollTop();
		winHeight>150?setTop.css("opacity","1"):setTop.css("opacity","0");
	});
	//返回顶部
	setTop.click(function(){
		$("html,body").stop(true).animate({
			scrollTop:0
		},500)
	});

	//音乐播放
	var mBtn = $("#aside ul li.a_music");
	var audioDom = $("#aside ul li.a_music audio")[0];
	var mFlag = true;//true 为正在播放，false为暂停
	mBtn.click(function(){
		if(mFlag==true){
			audioDom.pause();
			mBtn.css("background-image","url(img/aside/play.png)");
			mFlag = false;
		}else{
			audioDom.play();
			mBtn.css("background-image","url(img/aside/pause.png)");
			mFlag = true;
		}
	});
	//意见反馈
	var oHide = $("#aside .a_ohide");
	var oBtn = $("#aside ul li.a_opinion");
	var oCont = $("#aside .a_ohide .a_oh_wrap");
	var oQuit = $("#aside .a_ohide .a_oh_wrap .a_oh_quit");
	var textDom = $("#aside .a_ohide .a_oh_wrap textarea");
	var subBtn = $("#aside .a_ohide .a_oh_wrap input[type='button']");
	function oHide_size(){
		oHide.css({
			height:$(window).height(),
			width:$(window).width
		})
	};
	$(window).resize(oHide_size);
	oBtn.click(function(){
		coverShow(oHide,oCont);
		textDom.focus();
	});
	oQuit.click(function(){
		coverHide(oHide,oCont);
	});
	subBtn.click(function(){
		var opinionCon = textDom.val();
		!opinionCon?alert("内容不能为空"):alert("提交成功");
		coverHide(oHide,oCont);
	});
	/*---aside end---*/

/*end*/
})