<?php
header('Content-type:text/html;charset=utf-8');
session_start();
//if(isset($_POST['submit'])){
	$username = trim($_POST['username']);
	$password = trim($_POST['password']);

	$password = md5($password);

	$link = mysqli_connect('localhost','boy','','net');

	//连接数据库出现错误提示的处理方法
	if(!$link){
		echo 'mysql认证连接失败！<br />';
		echo '错误编号：'.mysqli_errno().'<br />';
		echo '错误具体信息：'.mysqli_error($link);
		exit;
	}

	//$res = mysql_query('use cms');

	//sql指令执行错误的处理机制

	/*
		if(!$res){
			echo 'sql指令执行错误！<br />';
			echo '错误编号：'.mysql_errno().'<br />';
			echo '错误具体信息：'.mysql_error();
			exit;
		}*/

	$res = mysqli_query($link,"set names utf8");
	//统一php和mysql使用的字符集

		if(!$res){
			echo 'sql指令执行错误！<br />';
			echo '错误编号：'.mysqli_errno().'<br />';
			echo '错误具体信息：'.mysqli_error();
			exit;
		}
	

	//$sql = "select * from `user` where username = '{$username}' and password = '{$password}'";
	//$sql = "select * from user where username = '{$username}' and password = '{$password}'";
	//$que = mysqli_query($link,"SELECT * FROM `user` WHERE username = '{$username}' AND password = '{$password}'");
	$que = mysqli_query($link, "SELECT `password` FROM `user` WHERE loginname = '$username'");
	//print_r($que);
	$res = mysqli_fetch_assoc($que);
	
	//输出语句
	//print_r($res);
	//printf("%s",$res['password']);
	//print_r($res['password']);

	//print_r($que);
	/*
	if(!$res){

		header("refresh:5;url = signin.php");
		echo '你输入的用户名或密码有误，请返回重新登录！';
		
		exit;
	}
	else{
		//$_SESSION['user']=$username;
		header("refresh:5;url = index.php");
		echo "恭喜你，登录成功！";
		exit;

	}*/
	if ($password === $res['password']) {
		$_SESSION['user'] = $username;
		header("refresh:2;url = ../index.php");
		//header("refresh:3;location: index.php");
		echo "恭喜你，登录成功！";
		exit;
	}
	else{
		header("refresh:5;url = signin.php");
		//dddheader("refresh:3;location: signin.php");
		echo '你输入的用户名或密码有误，请返回重新登录！';	
		exit;
	}


	//}
	/*
	else{
		include_once 'html/login.html';

	}*/


?>