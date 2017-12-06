<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
	<title>添加试卷页面</title>
  	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/css1.css">
 </head>
<body>
	
	<div class=top>AddTestPaper········</div>	
	<div class="radius"></div>	
	<div class="body">
		<div class="border">
			<div class="act">
			<div class="text"><span style="font-size:25px;font-weight:bold">亲爱的朋友:</span></p></br>
				<span style="font-size:20px;">请添加试卷.</span></div>
			<div>
			
				<form method="post" action="${pageContext.request.contextPath }/addTestPaperDo.do" name="form1">
					<div class="two">
							试卷名称：<input type="text" class="input-1" name="pname">
					</div>
					<div class="two">
						<div class="space-1">
							子卷数：<input type="text" class="input-1" name="seednum">
						</div>
					</div>
					<div class="two">
						<div class="space-1">
							总题数：<input type="text" class="input-1" name="qnum">
						</div>
					</div>
					<div class="two">
						<div class="space-1">
							总分值：<input type="text" class="input-1" name="minute">
						</div>
					</div>
					<div class="two">
						<div class="space-1">
							总时长：<input type="text" class="input-1" name="time">
						</div>
					</div>
					<div class="two">
						<div class="space-1">
							试卷级别：<select name="rank" style="background-color: silver;width: 150px;height: 35px;font-size: 23px;font-family: 楷体;">
									<option value="1">SE基础题</option>
									<option value="2">WEB题</option>
									<option value="3">框架题</option>
									<option value="4">架构设计</option>
							</select>
						</div>
					</div>
					<div class="four">
						<div class="four-left">
							<input type="submit" value="保存" class="input-2" onclick="return fun()">
						</div>
					</div>
				</form>
			</div>
			</div>
		</div>
	</div>

</body>
	<script type="text/javascript">
	
	</script>
</html>
