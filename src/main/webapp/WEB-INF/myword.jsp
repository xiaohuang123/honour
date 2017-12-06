<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Word批量录入考试试题</title>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/css1.css">
</head>
<body>
	<div class=top>AddTestPaper········</div>	
	<div class="radius"></div>	
	<div class="body">
		<div class="border">
			<div class="act">
			<div class="text"><span style="font-size:25px;font-weight:bold">word批量录入考试试题：</span></p></br>
				<span style="font-size:20px;"></span></div>
			<div>
					<form id="import_form" class="form-horizontal"
						action="${pageContext.request.contextPath}/word.do"
						method="post" enctype="multipart/form-data">
						<div class="form-group">
							<div class="col-sm-9">
								<input type="file" name="file" id="file"
									data-popover-offset="0,8" required class="input-1"
									style="width: 500px;">
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-6 col-sm-offset-3">
								<div class="btn-toolbar">
									<br> <br> &nbsp; &nbsp; &nbsp;
									<button type="submit" class="input-1">录入</button>
									&nbsp; &nbsp; &nbsp;
									<button type="button" class="input-1">返回</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>