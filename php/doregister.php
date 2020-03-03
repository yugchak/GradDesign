<?php
header('Content-type:text/html;charset=utf-8');
//register.php首先要判断用户的访问有没有提交用户注册信息，如果没有就调用reg.html返回给用户

//if(isset($_POST['submit'])){

	//连接mysql数据库进行认证，如果连接失败，我们要做错误信息的通知（通知我们会抑制系统的错误信息提示，用我们自己的方式通知用户）

	$link = mysqli_connect('localhost','boy','','net');

	//连接数据库出现错误提示的处理方法
	if(!$link){
		echo 'mysql认证连接失败！<br />';
		echo '错误编号：'.mysqli_errno().'<br />';
		echo '错误具体信息：'.mysqli_error($link);
		exit;
	}


	//接收用户提交的用户注册信息，使用trim函数对用户名和密码做[去空格字符]处理
	$username = trim($_POST['username']);
	$password = trim($_POST['password']);


	//禁止提交空白【用户名】或【密码】的用户注册
	/*if(empty($username) or empty($password)){
		header("refresh:3;url = register.php");//跳转处理语句
		echo '用户名或密码都不能为空';
		exit;
	}*/
	//对接收到的密码数据进行md5加密
	$password = md5($password);




	//向mysql发送sql指令

	/*$que = mysqli_query('use cms');
	//sql指令执行错误的处理机制
		if(!$que){
			echo 'sql指令执行错误！<br />';
			echo '错误编号：'.mysqli_errno().'<br />';
			echo '错误具体信息：'.mysqli_error($link);
			exit;
		}*/


	mysqli_query($link,"SET NAMES UTF8");
	/************原************************************************************************************
	$que = mysqli_query('set names utf8');
	//统一php和mysql使用的字符集
		if(!$res){
			echo 'sql指令执行错误！<br />';
			echo '错误编号：'.mysqli_errno().'<br />';
			echo '错误具体信息：'.mysqli_error();
			exit;
		}
	*************************************************************************************************/
	//查看表内行数再加1成为新用户的id
	$count = mysqli_query($link,"SELECT count(*) from `user`");
	$row = mysqli_fetch_array($count);
	$id = $row[0]+1;

	//$sql = "select * from `user` where username = '{$username}'";//查看数据表中是否有用户提交的用户名
	//$res = mysqli_query($link,$sql);
	$que = mysqli_query($link,"SELECT `id` FROM `user` WHERE loginname = '$username'");
	//把$res这个resource数据类型的数据转换成为数组
	$res = mysqli_fetch_assoc($que);
	//把资源类型的数据转换为一个php的关联数组

	// var_dump($res);
	// exit;
	if(!$res){
		//************************************************************************************************
		//$sql = "insert into user values(null,'{$username}','{$password}')";//定义sql指令字符串
		$que = mysqli_query($link,"INSERT INTO `user`(`id`,`loginname`,`password`) VALUES('$id','$username','$password')");
			
			if(!$que){
				echo 'sql指令执行错误88！<br />';
				echo '错误编号：'.mysqli_errno().'<br />';
				echo '错误具体信息：'.mysqli_error();
				exit;
			}
			else{
				header("refresh:2;url = ../index.php");
				echo '恭喜你，用户注册成功！';
				exit;

			}

		//****************************************************************************************************
	}else{
				header("refresh:3;url = register.php");
				echo '你注册的用户名已存在，请更换其他用户名重新注册！';
				exit;

	}

	/*if(mysqli_num_rows($que) < 1){
			mysqli_query($link, "INSERT INTO `user`(`loginname`, `password`) VALUES ($username','$password')");
	}
	else{
			echo "用户名重复！";
			exit;
	}*/

/*}
else{

	include_once 'register.php';
}*/




?>