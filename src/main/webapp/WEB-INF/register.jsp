<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- saved from url=(0043)http://kao.acmcoder.com/enterprise/register -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		
		<title>企业注册 -- 企业用户 --【赛码网】在线考试首选品牌</title>
		 <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<link rel="shortcut icon" href="http://kao.acmcoder.com/images/acm.ico" type="image/x-icon">
		<link rel="stylesheet" type="text/css" href="${ pageContext.request.contextPath }/js-css-image/jquery.cxdialog.css">
		<link rel="stylesheet" type="text/css" href="${ pageContext.request.contextPath }/js-css-image/all-exam.css">
		<link rel="stylesheet" type="text/css" href="${ pageContext.request.contextPath }/js-css-image/login.css">
		<!-- <link rel="stylesheet" type="text/css" href="/css/user/login2.css"> -->
	</head>
	<body>
		<form action="${pageContext.request.contextPath }/user/doregister.do" method="post" id="form">
		<!--head-->
		<div class="head">
			<div class="head-bar public">
				<div class="logo">
					<a href="${ pageContext.request.contextPath }/user/home.do"><img src="${ pageContext.request.contextPath }/js-css-image/logo.png"></a>
					<p><span>企业版</span></p>
				</div>
			</div>
		</div>
		<!--head  end-->
		<div class="acm-container" style="padding-bottom:200px;">
		<div class="userCnt">
			<div class="loginCnt">
				<h1>企业注册</h1>
				<div class="login-box">
					<ul>
						<li>
							<span class="regisit-span">+86</span>
							<input type="text" id="phone_ipt" name="name" class="login-text input regisit-phone" placeholder="请输入手机号" maxlength="11">
						</li>
						<li>
							<input type="password" id="pwd_ipt" name="pass" class="login-text input" placeholder="请输入密码，至少6位" maxlength="20">
						</li>
						<li>
							<input type="password" id="pwd2_ipt" class="login-text input" placeholder="重复输入密码">
						</li>
						<li class="login-t">
							<span>
								<input type="checkbox" id="ck_ipt"> <label for="ck_ipt">我已阅读并同意<a href="javascript:void(0)" class="showxieyi">《赛码用户协议》</a></label>
							</span>
							<div class="clear"></div>
						</li>
						<li>
							<span id="sbtn" class="login-btn btn">提交注册</span>
						</li>
					</ul>
				</div>
				<div class="login-f">
					已有账号，<a href="${ pageContext.request.contextPath }/user/login.do">马上登录 &gt;&gt;</a>
				</div>
			</div>
		</div></div>
		<!--footer-->
		
		<!--footer end-->
		<script src="${ pageContext.request.contextPath }/js-css-image/hm.js.aaa"></script><script src="${ pageContext.request.contextPath }/js-css-image/jquery.min.js.aaa" type="text/javascript" charset="utf-8"></script>
		<script src="${ pageContext.request.contextPath }/js-css-image/jquery.cxdialog.js.aaa" type="text/javascript" charset="utf-8"></script>
		<script src="${ pageContext.request.contextPath }/js-css-image/all.js.aaa" type="text/javascript" charset="utf-8"></script>
		<script src="${ pageContext.request.contextPath }/js-css-image/regisit.js.aaa" type="text/javascript" charset="utf-8"></script>
		<script src="${ pageContext.request.contextPath }/js-css-image/common.min.js.aaa" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="${ pageContext.request.contextPath }/js-css-image/jquery.cookie.js.aaa"></script>
		<script src="${ pageContext.request.contextPath }/js-css-image/footer-exam.js.aaa" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
		window.alert = function(mess){
			$.cxDialog({ 
					  title: '提示', 
					  info: '<div style="padding:20px;text-align:center;">' + mess + '</div>', 
					  lockScroll: true, 
					  background: '#000',
					  width:400,
					  okText:"我知道了",
					  ok: function(){
					  }
			});
			return false;
		}
		var clickLimitTime = 60;
		$(function(){
			var $phone_ipt = $('#phone_ipt'), $pwd_ipt = $('#pwd_ipt'), $pwd2_ipt = $('#pwd2_ipt'), $ck_ipt = $('#ck_ipt');
			$('#sbtn').click(function(){
				var tosub = true;
				//提交校验
				if($.trim($phone_ipt.val())==''){
					tosub = false;
					setErrMsg($phone_ipt, '请输入手机号码');
				}else if( !checkMobile( $.trim( $phone_ipt.val() ) ) ){
					tosub = false;
					setErrMsg($phone_ipt, '手机号码格式不正确');
				}
				if($.trim($pwd_ipt.val())==''){
					tosub = false;
					setErrMsg($pwd_ipt, '请输入密码');
				}else if(!checkPwd($.trim($pwd_ipt.val()))){
					tosub = false;
					setErrMsg($pwd_ipt, '密码输入格式错误，至少6位');
				}
				if($.trim($pwd2_ipt.val())==''){
					tosub = false;
					setErrMsg($pwd2_ipt, '请重复输入密码');
				}else if( $.trim($pwd_ipt.val()) != $.trim($pwd2_ipt.val()) ){
					tosub = false;
					setErrMsg($pwd2_ipt, '两次输入密码不一致');
				}
				if(!$ck_ipt.is(':checked')){
					tosub = false;
					setErrMsg($ck_ipt, "请勾选同意《赛码用户协议》");
				}
				if(tosub){
			  		$.ajax({
			  			url:"${ pageContext.request.contextPath }/user/registerFindUser.do",
			  			type:"POST",
			  			dataType:"text",
			  			data:{"name":$("#phone_ipt").val()},
			  			success:function(data){
			  				if(data=="field"){
			  					setErrMsg($phone_ipt, '手机号码已存在');
			  					tosub = false;
			  				}else{
			  					$('#form').submit();
			  				}
			  			}
			  		});
					/* $.post('${ pageContext.request.contextPath }/user/registerUser.do',{
						phone: $.trim($phone_ipt.val()),
						pwd: $.trim($pwd_ipt.val())
					},function(json){
						if(json.success){
							if(json.msg!=''){
								window.location.href='/'+json.msg;
							}else{
								window.location.href='${ pageContext.request.contextPath }/user/login.do';
							}

						}else if(json.type != null){
							if(json.type == 1){
								setErrMsg($phone_ipt, json.msg);
							}else if(json.type == 3){
								setErrMsg($pwd_ipt, json.msg);
							}
						}else {
							alert(json.msg);
						}
					},'json'); */
					
					//$('#form').submit();
				}
			});
/* 			$('li input').keydown(function(){
				$(this).parent('li').removeClass('regisit-error');
				$(this).siblings('p').remove();
			});
			$ck_ipt.click(function(){
				if($ck_ipt.is(':checked'))$ck_ipt.siblings('p').remove();
			})
			$(".regisit-send").click(function(){
				if(!$(this).hasClass("disclick")){
					var status = verificationCodeWin();
				}
			});
 */		});
		var setErrMsg = function(_id, msg){
			if(_id.parent().find('p').length == 0)
				_id.parent().addClass('regisit-error').append('<p class="login-error "><i></i>' + msg + '</p>');
		}
		var checkMobile = function(str) {
		    var re = /^1\d{10}$/;
		    if (re.test(str))
		        return true;
		    else 
		        return false;
		}
		var checkVcode = function(str) {
		    var re = /^\d{6}$/;
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
		function
		 checkUser(str){
		    var re = /^[a-zA-z]\w{3,15}$/;
		    if(re.test(str)){
		        alert("正确");
		    }else{
		        alert("错误");
		    }          
		}
		function
		 checkEmail(str){
		    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
		    if(re.test(str)){
		        alert("正确");
		    }else{
		        alert("错误");
		    }
		}
		var refreshvCode = function(t){
			var timestamp = new Date().getTime();
			timestamp = timestamp.toString();
			$('#vcode_img').attr('src', '/vcode?v=' + timestamp.base64Encode());
			$('#vcode_win_ipt').val('');
		}
		var verificationCodeWin = function(){
			if($.trim($('#phone_ipt').val())==''){
				setErrMsg($('#phone_ipt'), '请输入手机号码');
				return false;
			}else if( !checkMobile( $.trim( $('#phone_ipt').val() ) ) ){
				setErrMsg($('#phone_ipt'), '手机号码格式不正确');
				return false;
			}else{
				//$(document).unbind("keydown");
				/*$("#vcode_win_ipt").unbind("keydown").bind('keydown',function(event){
					if(event.keyCode == 13){ //绑定回车
						verificationCode();
						$.cxDialog.close();
						$("#pwd2_ipt,#pwd_ipt,#vcode_ipt").unbind("keydown").bind("keydown",function(event){
							if(event.keyCode == 13)
								$('#sbtn').click();
						});
					}
				});*/
				/* $.cxDialog({ 
					  title: '验证码', 
					  info: $("#verificationCode"), 
					  lockScroll: true, 
					  background: '#000',
					  width:350,
					  okText:"确认",
					  ok: function(){
						  verificationCode();
						  return false;
					  }
				}); */
				/* var status2 = verificationCode();
				return status2; */
				
			}


		}
		
		$(document).keydown(function(event){
			if(event.keyCode == 13)
				$('#sbtn').click();
		});

		</script>
	
<div class="footer"><div class="public"><div class="footer-left"><div class="footer-logo"><img src="${ pageContext.request.contextPath }/js-css-image/blogo.png" style="position: relative;top: -3px;"></div><div class="footer-txt"><a target="_blank" href="http://www.acmcoder.com/aboutus/about.html">关于我们</a>　|　<a target="_blank" href="http://www.acmcoder.com/aboutus/contact.html">联系我们</a>　|　<a target="_blank" href="http://www.acmcoder.com/aboutus/shengming.html">免责声明</a><br>Copyright © acmcoder.com<br>All Rights Reversed 京ICP备15012255-1</div></div><div class="footer-right"><table><tbody><tr><td><img src="${ pageContext.request.contextPath }/js-css-image/f-phone.png"></td><td style="font-size: 14px;">客服热线：010-85359782<br>销售热线：010-85359766</td><td style="font-size: 14px;"><a class="weixinPng" href="javascript:void(0)" style="color:white;position: relative;"><img src="${ pageContext.request.contextPath }/js-css-image/f-weixin.png"> &nbsp;&nbsp;saimawang<img class="hide" style="width: 80px;position: absolute;left: 130px;top: -50px;" src="${ pageContext.request.contextPath }/images/saimaweixin.jpg"></a><br><a href="javascript:void(0)" style="color:white"><img src="${ pageContext.request.contextPath }/js-css-image/f-qq.png"> &nbsp;&nbsp;2531743633</a><br></td></tr></tbody></table></div></div></div><div class="topW" style="display: none; right: 351px;"><span></span></div></form></body></html>