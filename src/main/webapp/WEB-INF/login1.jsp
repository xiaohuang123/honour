<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
	<title>登陆界面</title>
  	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/css1.css">
 </head>
<body>
	
	<div class=top>Login········</div>	
	<div class="radius"></div>	
	<div class="body">
		<div class="border">
			<div class="act">
			<div class="text"><span style="font-size:20px;font-weight:bold"">尊敬的用户:</span></p></br>
				<span style="font-size:14px;">您好，请先登入或注册.</span></div>
			<div class="one">
			<font style="font-family: 楷体;font-size: 25px;color: red;">${msg}</font>
				<form method="post" action="${pageContext.request.contextPath }/user/dologin.do" name="form1">
					<div class="two">
						用户名：<input type="text" class="input-1" name="name">
					</div>
					<div class="three">
						<div class="space-1">
							密码：<input type="password" class="input-1" name="pass">
						</div>
					</div>

				
					<div class="four">
						<div class="four-left">
							<input type="submit" value="登陆" class="input-2" onclick="return fun()">
						</div>
						<div class="four-left">
							<input type="button" value="注册" class="input-2" onclick="window.location.href='${pageContext.request.contextPath }/user/register.do'">
						</div>
					
					</div>
				</form>
			</div>
			</div>
		</div>
	</div>

</body>
	<script type="text/javascript">
		function fun(){
  		var userName=form1.pass.value;
  		var password=form1.name.value;
  		if(userName==""||password==""||userName==null||password==null){
  			alert("密码和用户名不能为空！");
  			return false;
  		}
  		return true;
  	}
	</script>
</html>
