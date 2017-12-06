<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
 <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/css2.css">
</head>
<body>
	<div class="top">
Register········
	</div>
	<div class="text"><span style="font-family:黑体;font-size:20px;font-weight:bold;">欢迎来到注册页面</div>
	<div class="radius"></div>
	<div class="one">
		
		
		<form action="${pageContext.request.contextPath }/user/doregister.do" method="post"  name="form1">
		<input type="hidden" name="rank" value="1">
		<div class="two">
			<div class="space-2"></div>
			<div class="space-1">用户名:<input type="text" class="input" name="name"></div>
		</div>
		<div class="two">
			<div class="space-3"></div>
			<div class="space-1">密码:<input type="password" class="input" name="pass"></div>
		</div>
		<div class="two">
			<div class="space"></div> 
			<div class="space-1">确认密码:<input type="password" class="input" name="againPass"></div>
		</div>
		<!-- 后台进行的错误数据放置处 -->
		<div class="spacespace">
				<c:if test="${allErrors!=null}">
					<c:forEach items="${allErrors }" var="error">
						<font style="color:red; font-family: 楷体;font-size: 20px;">${error.defaultMessage}</font><br/>
					</c:forEach>
				</c:if>
		</div> 
		<div class="button">
			<div class="submit">
				<input value="注册" type="submit" class="submit-1" onclick="return fun()">
			</div>
			<div class="submit">
				<input value="重置" type="reset" class="submit-1">
			</div>
		</div>
		</form>
	</div>
	
</body>
</html>
