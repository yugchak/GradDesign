$(document).ready(function(){
    function coverHide(bgObj,obj){
        bgObj.fadeOut(300);
        obj.css("transform","scale(0)");
    };
    function coverShow(bgObj,obj){
        bgObj.fadeIn(300);
        obj.css("transform","scale(1)");
    }
     /*为当前页面nav添加样式*/
        var $nav_li = $("#head header .h_nav li") ;
        $nav_li.click(function(){
            $(this).addClass("h_n_click").siblings().removeClass("h_n_click");
        });
        //登陆页面
        var $login_box = $("#head .l_hide");
        var $login = $("#head header .h_right .h_r_login");//顶部登陆按钮
        var $loginCon = $("#head .l_hide .l_h_con");
        var $loginQuit = $("#head .l_hide .l_h_con .l_h_c_quit");
        var $lRegister = $("#head .l_hide .l_h_con .l_h_c_btnRegister");
        var $logBtn = $("#head .l_hide .l_h_c_btnLogin");

        function l_box(){
            $login_box.css({
                height:$(window).height(),
                width:$(window).width()
            })
        };
        l_box();
        $(window).resize(l_box);
        //登陆按钮
        $login.click(function(){
            coverShow($login_box,$loginCon);
        });
        //退出按钮
        $loginQuit.click(function(){
            coverHide($login_box,$loginCon);
        });
        $lRegister.click(function(){
            coverHide($login_box,$loginCon);
            coverShow($register_box,$registerCon);
        });
        //注册页面
        var $register_box = $("#head .r_hide");
        var $register_btn = $("#head header .h_right .h_r_register")
        var $registerCon = $("#head .r_hide .r_h_con");
        var $registerQuit = $("#head .r_h_c_quit");
        var $rLogin = $("#head .r_h_c_btnLogin");
        function r_box(){
            $register_box.css({
                height:$(window).height(),
                width:$(window).width()
            });
        };
        r_box();
        $(window).resize(r_box);
        $register_btn.click(function(){
            coverShow($register_box,$registerCon);
        });
        $registerQuit.click(function(){
            coverHide($register_box,$registerCon);
        });
        $rLogin.click(function(){
            coverHide($register_box,$registerCon);
            coverShow($login_box,$loginCon);
        });
})
