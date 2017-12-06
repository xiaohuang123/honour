<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- saved from url=(0040)http://kao.acmcoder.com/enterprise/login -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		
		<title>企业登录 -- 企业用户--【赛码网】在线考试首选品牌</title>
		 <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<link rel="shortcut icon" href="http://kao.acmcoder.com/images/acm.ico" type="image/x-icon">
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js-css-image/all-exam.css">
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js-css-image/login.css">
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js-css-image/comp-enterprise.css">
	</head>
	<body>
		<form action="${pageContext.request.contextPath }/user/dologin.do" method="post" id="form">
		<!--head-->
		<div class="head">
			<div class="head-bar public">
				<div class="logo">
					<a href="${ pageContext.request.contextPath }/user/home.do"><img src="${pageContext.request.contextPath}/js-css-image/logo.png"></a>
					<p><span>企业版</span></p>
				</div>
			</div>
		</div>
		<!--head  end-->
		<div class="main-box">
		<div class="userCnt">
			<div class="loginCnt">
				<h1>登录</h1>
				<div class="login-box">
					<ul>
						<li>
							<input type="text" id="phone" name="name" class="login-text input" placeholder="请输入手机号" maxlength="11">
						</li>
						<li>
							<input type="password" id="pwd" name="pass" class="login-text input" placeholder="请输入密码" maxlength="20">
						</li>
						<li class="login-error" id="err_msg" style="display: none;"><i></i>手机号或密码输入错误</li>
						<li class="login-error"><i></i>${ msg }</li>
						<li>
							<input type="button" value="登录" id="sbtn" class="login-btn btn">
						</li>
						<li class="login-t">
							<span>
								<input type="checkbox" id="auto_login"> <label for="auto_login">下次自动登录</label>
							</span>
							<a href="#">忘记密码？</a>
							<div class="clear"></div>
						</li>
					</ul>
				</div>
				<div class="login-f">
					还没有账号，<a href="${ pageContext.request.contextPath }/user/register.do">马上注册 &gt;&gt;</a>
				</div>
			</div>
		</div>
		</div>
		<script src="${pageContext.request.contextPath}/js-css-image/hm.js.aaa"></script><script src="${pageContext.request.contextPath}/js-css-image/jquery.min.js.aaa" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js-css-image/jquery.cookie.js.aaa"></script>
		<script src="${pageContext.request.contextPath}/js-css-image/footer-exam.js.aaa"></script>
		<script src="${pageContext.request.contextPath}/js-css-image/all.js.aaa" type="text/javascript" charset="utf-8"></script>
		<script src="${pageContext.request.contextPath}/js-css-image/dataCheck.js.aaa" type="text/javascript" charset="utf-8"></script>
		<script src="${pageContext.request.contextPath}/js-css-image/md5.js.aaa" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
		var checkMobile = function(str) {
			var re = /^1\d{10}$/;
			if (re.test(str))
				return true;
			else
				return false;
		}
		var checkPwd = function(str) {
			var re = /^[a-zA-z0-9]\w{5,}$/;
			if (re.test(str))
				return true;
			else
				return false;
		}
		var setErrMsg = function(_id, msg){
			if(_id.parent().find('span').length == 0)
				_id.parent().addClass('regisit-error').append('<span class="login-error "><i></i>' + msg + '</span>');
		}
		$(function(){
			var $phone = $('#phone'), $pwd = $('#pwd'), $err_msg = $('#err_msg');
			$('#sbtn').click(function(){
				var tosub = true;
				if($.trim($phone.val())==''){
					tosub = false;
					setErrMsg($phone, '请输入手机号码');
				}else if( !checkMobile( $.trim( $phone.val() ) ) ){
					tosub = false;
					setErrMsg($phone, '手机号码格式不正确');
				}
				if($.trim($pwd.val())==''){
					tosub = false;
					setErrMsg($pwd, '请输入密码');
				}else if(!checkPwd($.trim($pwd.val()))){
					tosub = false;
					setErrMsg($pwd, '密码输入格式错误');
				}
			    if(tosub){
			        /* var domain = 'kao.acmcoder.com';
					var data = getData({'phone': $.trim($phone.val()), 'pwd': $.trim($pwd.val())},"loginc",domain);
					$.post('/enterprise/loginc',data,function(json){
						if(json.success){
							if(!!json.msg){
								if(location.search=='?choseCompang'){
                                    window.location.href='https://demo2.acmcoder.com/v4.0/union/html/choseCompany/choseCompang.html';
								}else{
									if(json.msg=='NULL'){
									window.location.href='/enterprise';
								}else{
									window.location.href=json.msg;
								}
								}
								

							}else{
								window.location.href='/enterprise';
							}

						}else{
							$err_msg.html("<i></i>"+json.msg);
							$err_msg.show();
						}
					},'json');  */
			    	$('#form').submit();
				}
			});
/* 			$('li input').keydown(function(){
				$err_msg.hide();
				$(this).parent().removeClass('regisit-error');
				$(this).parent('span').removeClass('regisit-error');
				$(this).siblings('span').remove();
			});
			$(document).keydown(function(event){
				if(event.keyCode == 13)
					$('#sbtn').click();
			});
 */		});
		</script>
	
<div class="footer"><div class="public"><div class="footer-left"><div class="footer-logo"><img src="${pageContext.request.contextPath}/js-css-image/blogo.png" style="position: relative;top: -3px;"></div><div class="footer-txt"><a target="_blank" href="http://www.acmcoder.com/aboutus/about.html">关于我们</a>　|　<a target="_blank" href="http://www.acmcoder.com/aboutus/contact.html">联系我们</a>　|　<a target="_blank" href="http://www.acmcoder.com/aboutus/shengming.html">免责声明</a><br>Copyright © acmcoder.com<br>All Rights Reversed 京ICP备15012255-1</div></div><div class="footer-right"><table><tbody><tr><td><img src="${pageContext.request.contextPath}/js-css-image/f-phone.png"></td><td style="font-size: 14px;">客服热线：010-85359782<br>销售热线：010-85359766</td><td style="font-size: 14px;"><a class="weixinPng" href="javascript:void(0)" style="color:white;position: relative;"><img src="${pageContext.request.contextPath}/js-css-image/f-weixin.png"> &nbsp;&nbsp;iamacmcoder<img class="hide" style="width: 80px;position: absolute;left: 130px;top: -50px;" src="${pageContext.request.contextPath}/js-css-image/saimaweixin.jpg"></a><br><a href="javascript:void(0)" style="color:white"><img src="${pageContext.request.contextPath}/js-css-image/f-qq.png"> &nbsp;&nbsp;2531743633</a><br></td></tr></tbody></table></div></div></div><div class="topW" style="display: none; right: 351px;"><span></span></div></form></body></html>