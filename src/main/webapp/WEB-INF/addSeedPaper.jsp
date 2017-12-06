<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
	<title>添加子卷页面</title>
  	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/css1.css">
 </head>
<body>
	
	<div class=top>AddTestPaper········</div>	
	<div class="radius"></div>	
	<div class="body">
		<div class="border">
			<div class="act">
			<div class="text"><span style="font-size:25px;font-weight:bold">亲爱的朋友:</span></p></br>
				<span style="font-size:20px;">请添加子试卷.</span></div>
			<div>
			
				<form method="post" action="${pageContext.request.contextPath }/addSeedPaperDo.do" name="form1">
					<input type="hidden" name="pid" value="${id}">
					
					<div class="two">
							子卷类型：<select class="input-1" name="spname">
								<option value="">---请选择子卷类型---</option>
								<option value="单选题">单选题</option>
								<option value="多选题">多选题</option>
								<option value="填空题">填空题</option>
							</select>
					</div>
					<div class="two">
						<div class="space-1">
							题数：<input type="text" class="input-1" name="sqnum">
						</div>
					</div>
					<div class="two">
						<div class="space-1">
							分值：<input type="text" class="input-1" name="sminute">
						</div>
					</div>
					<div class="two">
						<div class="space-1">
							时长：<input type="text" class="input-1" name="stime">
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
