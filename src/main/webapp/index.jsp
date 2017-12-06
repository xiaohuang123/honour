<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
		<input type="button" onclick="_pp()" value="弹框">
</body>
<script type="text/javascript">
		function _pp(){
			var msg = "你还未登录，是否登录?\n\n请确认！";
			if (confirm(msg) == true) {
				location.href="${pageContext.request.contextPath}/user/login.do";
			} else {
				location.href="${pageContext.request.contextPath}/user/login.do";
			}
		}
</script>
</html>
