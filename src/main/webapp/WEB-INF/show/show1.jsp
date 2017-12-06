<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<!-- saved from url=(0027)https://kao.acmcoder.com/b/ -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta charset="UTF-8">
	<title>首页-考试中心-【赛码网】</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jsapi.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/corechart.js"></script>		
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.gvChart-1.0.1.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.ba-resize.min.js"></script>
	<link rel="Shortcut Icon" href="https://kao.acmcoder.com/images/acm.ico">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js-css-show/all-exam.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js-css-show/jquery.cxdialog.css">
	<link href="${pageContext.request.contextPath}/js-css-show/font-awesome.min.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js-css-show/examHome.css">

	<style type="text/css">
		.cxDialogContent {
    padding: 20px;
    text-align: center;
    font-size: 14px;
}
.cxDialogContent table {
    margin: 0px auto;
}
.cxDialogContent .fa {
    opacity: 0.8;
    font-size:120px;
    color: #29bdb9;
}
.fbig {
    font-size:30px;
}
.fb {
    font-weight: bold;
}
#moerDeteal{display: block;
    width: 725px;
    height: 40px;
    line-height:36px;
    bottom: 0px;
    background: #f5f5f5;
    text-align: center;
    border:1px solid white;
    cursor: pointer;
    color: #2abcb8;
    margin-top: 10px;}
    #moerDeteal:hover{
    	background: #f8f9fb;
    	border:1px solid #2abcb8;
    }
    .i-lock,.i-lock2{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 300;
    background:rgba(51,51,51,0.7);
    }
   .i-layer-close {
    width: 40px;
    height: 40px;
    position:absolute;
    top: 11px;
    right: 0px;
    }
    .i-layer-close2{
     width: 40px;
    height: 40px;
    position:absolute;
    top: -7px;
    right: 74px;
    }
    .i-layer-btn{
    position: absolute;
    width: 240px;
    height: 46px;
    bottom: 13px;
    left: 192px;
    transform: rotateZ(-9deg);
    }
    .i-layer-btn2{
    position: absolute;
    width: 264px;
    height: 60px;
    bottom: -61px;
    left: 108px;
    }
  .numberPeople {
    position: relative;
    top: -171px;
    font-size: 15px;
    left:-22px;
    font-size: 18px;
    display: inline-block;
    color: rgba(115,25,27,0.87)
}
    .head .logo {
     padding-top: 0px; 
    float: left;
    display: -webkit-box;
    line-height: 59px;
}
  .head .logo  a{
    max-width: 120px;
    height: 55px;
    line-height: 55px;
    text-align: center;
    display: block;
	}
	.head .logo img{
		float: none;
		max-height: 100%;
        max-width: 100%;
	}
	.head .logo p {
    float: none;
    line-height: 59px;
    padding-left: 12px;
}
@media screen and (max-width: 450px){
	.numberPeople {position: relative;top: 65px;left: -124px;font-size: 14px;display: inline-block;color: rgba(115,25,27,0.87)}
	.i-layer2{width: inherit;height: inherit;}
	.i-layer2 img{width: 50%;position: relative;left: 50%;transform: translate(-56%);}
	.i-layer-close2 {width: 40px;height: 40px;position: absolute;top: -10px;right: 99px;}
	.i-layer-btn2 {position: absolute;width: 185px;height: 44px;bottom: 59px;left: 175px;}
	</style>

</head>
<body>
   


	<!--head-->

		<div class="head">
			<div class="head-bar public">
				<div class="logo">
					<a target="_blank" href="http://www.acmcoder.com/">
						
						
							<img src="${pageContext.request.contextPath}/js-css-show/logo.png">
						

					</a>
					<p><font size="2" color="#ECECEC">|</font>&nbsp;&nbsp;&nbsp;<font size="2">考试中心</font></p>
				</div>
				<ul class="nav"><li class="active"><a href="${pageContext.request.contextPath}/js-css-show/首页-考试中心-【赛码网】.html">首页</a></li><li><a href="https://kaosys.acmcoder.com/position#/list/1">试卷</a></li><li><a href="https://kaosys.acmcoder.com/paper#/list">场次</a></li><li><a href="https://kaosys.acmcoder.com/cands#/home">考生</a></li><li><a href="https://kaosys.acmcoder.com/monitor#/list">监考</a></li><li><a href="https://kaosysy.acmcoder.com/prj/reviewPaperList.do">报告</a></li><li><a href="https://kaosys.acmcoder.com/ques#/list">题库</a></li></ul>
				<div class="mguser">
					<div class="mguser-box">
						<input type="hidden" id="entAccountId" name="entAccountId" value="2670">
						<input type="hidden" id="roleTypeHeader" name="roleTypeHeader" value="3">
						<input type="hidden" id="examVersionHeader" name="examVersionHeader" value="1">
						<a href="javascript:void(0)">
							<p id="username1">马晨钧</p>&nbsp;&nbsp;
							<i class="fa fa-angle-down"></i>
							
								<table class="headlogotable">
									<tbody><tr>
										<td>
											<img src="./file/1.jpg" data-src="./file/1.jpg" class="hgimg">
										</td>
									</tr>
								</tbody></table>
							
							
						</a>
					</div>
					<ul class="mguser-cnt"><li><a href="https://kao.acmcoder.com/b/accountInfo"><img src="${pageContext.request.contextPath}/js-css-show/person.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;个人信息</a></li><li><a href="https://kao.acmcoder.com/b/entInfo"><img src="${pageContext.request.contextPath}/js-css-show/compnew.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;公司信息</a></li><li><a href="https://kao.acmcoder.com/b/compSet"><img src="${pageContext.request.contextPath}/js-css-show/testnew2.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;考试信息</a></li><li><a href="https://kao.acmcoder.com/enterprise/login"><img src="${pageContext.request.contextPath}/js-css-show/exit.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;退出登陆</a></li></ul>
				</div>
			</div>
		</div>
	<!--head  end-->
	<!--Cnav-->
		<script type="text/javascript">	
			function LoginOut(){
				var path = '';
	            if(path.indexOf('http:')>-1){
	path.replace("http://","https://");
	    		 }
				$.post(path+'/enterprise/dropOut',function(json){
					if(json.success){
						window.location.href='/enterprise/login';
					}else{
						alert(json.msg);
					}
				},'json');
				
			}

			
		</script>
	

	

	<!-- content -->
	<input type="hidden" id="entDid" name="entDid" value="59bf8f6d8d9ede54181dbdf7">
	<div class="PCshow hide" style="display: block;">
	<div class="examContent public">
		<!-- wellcome -->
		<h2>
			<!-- <i class="fa fa-smile-o"></i> --><img src="${pageContext.request.contextPath}/js-css-show/face-xiao.png" style=" position: relative;top: -2px;"> &nbsp;<span> <b id="userName" style="font-weight: normal;color: #2abcb8">${ loginUser.name }</b>，您好！欢迎来到赛码在线考试系统管理后台</span>
		</h2>
		<!-- wellcome end-->
		<!-- 左侧基本信息项 -->
		<div class="newsLeft">
			<div class="baseNews">
				<h3><i></i> 基本信息</h3>
				<div id="borderBox">
				<table style="float: left;">
					<tbody><tr>
						<td>
						<span class="logoV">
						<img src="${pageContext.request.contextPath}/js-css-show/cv-01-01.png">
						</span>
						</td>
					</tr>
				</tbody></table>
					<b title="${ loginUser.name }" style="font-size: 16px;	margin-left: 14px;float: left;display: inline-block;font-weight: normal;max-width: 100px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">${ loginUser.name }</b>
					<a style="font-size: 12px;" href="http://kao.acmcoder.com/b/entInfo"><i class="fa fa-pencil"></i> 编辑</a>
				</div>
				<p style="clear: both;height: 0px;"></p>
				<ul>
				 <a href="http://kao.acmcoder.com/b/accountInfo">
					<li>
					  
						<div>
							<!-- <i class="fa fa-user icon-f"></i> -->
							<img src="${pageContext.request.contextPath}/js-css-show/person(1).png">
						</div>
						<span>个人信息</span>
						
					</li>
					</a>
					 <a href="http://kao.acmcoder.com/b/entInfo">
					<li>
					
						<div>
							<!-- <i class="fa fa-briefcase icon-f"></i> -->
							<img src="${pageContext.request.contextPath}/js-css-show/compnew(1).png">
						</div>
						<span>公司信息</span>
						
					</li>
					</a>
					<a href="http://kao.acmcoder.com/b/compSet">
					<li>
					    
						<div>
							<!-- <i class="fa fa-file-text-o icon-f" ></i> -->
							<img src="${pageContext.request.contextPath}/js-css-show/testnew2(1).png">
						</div>
						<span>考试信息</span>
						
					</li>
					</a>

					<a href="http://16817.acmcoder.com/cand/login">
					</a><a href="http://58692.acmcoder.com/cand/login" target="_blank">
					<li>
							<div class="li-p">
								<!-- <i class="fa fa-external-link icon-f"></i> -->
								<img src="${pageContext.request.contextPath}/js-css-show/inputko.png">
							</div>
							<span>考试入口</span>
						</li>
					</a>
				</ul>
			</div>
			<div class="well"></div>
			<div class="userNews">
				<h3><i></i> 账户信息</h3>
				<ul>
					<li style="padding-left: 23px;">当 &nbsp;前 &nbsp;版 &nbsp;本：
						<b style="margin-left: 14px;">
							
								免费版
							</b>
					</li>
					<li style="padding-left: 21px;">有 &nbsp;&nbsp;&nbsp;&nbsp;效 &nbsp;&nbsp;&nbsp;&nbsp;期：
						<b style="margin-left: 13px;" }="">不限</b>
						</li>
					<li style="padding-left: 21px;">考试人数余额：
						<b style="margin-left:14px;" id="examCandsNum">100 人</b>
					</li>
					<li style="padding-left: 24px;">短 &nbsp;信 &nbsp;余 &nbsp;额：<b style="margin-left: 19px;">50 条</b></li>
					<li style="padding-left: 20px">人脸识别余额：
						<b style="margin-left: 15px;">
							5 人
							</b>
					</li>
				</ul>
				<a href="javascript:void(0)" id="addMoney">现在充值</a>
			</div>
			<span><a href="http://kao.acmcoder.com/examHomeNew/service.html" target="_blank" style="color: inherit;"><img src="${pageContext.request.contextPath}/js-css-show/VIp-logo.png"> 升级高级版，享受VIP功能&gt;&gt;</a></span>
		</div>
		<!-- 右侧信息显示 -->
		<div class="newsR">
			<div class="topNews" id="numList1">
				<ul>
					<li>
						<!-- <i class="fa fa-pencil-square-o icon-n"></i> -->
						<img src="${pageContext.request.contextPath}/js-css-show/peneil.png" style="margin-top: 26px;position: relative;top: -4px;"><br>
						<span><b id="datab1">0</b> 场</span><br>
						<span>场次总数</span>
					</li>
					<li>
						<!-- <i class="fa fa-files-o icon-n"></i> -->
						<img src="${pageContext.request.contextPath}/js-css-show/paperm.png" style="margin-top: 26px;position: relative;top: -4px;"><br>
						<span><b id="datab2">1</b> 套</span><br>
						<span>试卷总数</span>
					</li>
					<li>
						<!-- <i class="fa fa-users icon-n"></i> -->
						<img src="${pageContext.request.contextPath}/js-css-show/peoplem.png" style="margin-top: 26px;position: relative;top: -4px;"><br>
						<span><b id="datab3">0</b> 人</span><br>
						<span>考生总数</span>
					</li>
					<li>
						<!-- <i class="fa fa-file-text icon-n"></i> -->
						<img src="${pageContext.request.contextPath}/js-css-show/testnew.png" style="margin-top: 26px;position: relative;top: -6px;"><br>
						<span><b id="datab4">${ questionNum }</b> 道</span><br>
						<span>试题总数</span>
					</li>
				</ul>
				<div class="newExam">
					<div class="add-p">
						<a href="toUserExam.do?rank=${ rank }"><i class="fa fa-plus"></i></a>
					</div>
					<a href="toUserExam.do?${ rank }">开始新建试卷</a>
				</div>
			</div>
			<div class="examTable" id="numList" style="width:600px;margin:0 auto;">

			   <table id='myTable5'>
					<caption>我的错题库</caption>
					<thead >
						<tr id="thead">
							<th></th>
							<c:forEach var="all" items="${ errorQuestion }">
							  <c:if test="${ all.id lt 10}">
							  	 <th>${ all.type }0${ all.id }道</th>
							  </c:if>
							  <c:if test="${ all.id gt 9}">
							     <th>${ all.type }${ all.id }道</th>
							  </c:if>
							</c:forEach>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>100</th>
							<c:forEach var="all" items="${ errorQuestion }" varStatus="status">
							  <td>${ all.id }</td>
							</c:forEach>
						</tr>
					</tbody>
				  </table>   
        
   			</div>
		</div>
	</div>
	</div>
	<!-- content end-->
	
<script type="text/javascript">
gvChartInit();
$(document).ready(function(){
	$('#myTable5').gvChart({
		chartType: 'PieChart',
		gvSettings: {
			vAxis: {title: 'No of players'},
			hAxis: {title: 'Month'},
			width: 750,
			height: 400
		}
	});
});
</script>
<!-- 引导页弹窗 -->
<div class="i-layerBox introBox hide" style="display: none;">
	 <div class="i-lock" style="height: 1222px;">
	 	 <div class="i-layer" style="width: 524px; height: 362px; position: fixed; left: 412.5px; top: 143.5px;">
	       <img src="${pageContext.request.contextPath}/js-css-show/inputNews.png">
			<a href="javacript:void(0)" class="i-layer-close"></a>
            <a href="javascript:void(0)" class="i-layer-btn"></a>
	</div>
	 </div>
	
</div>
<!-- 红包弹窗 -->
<div class="i-hongBaoBox hongBaoBox hide">
	 <div class="i-lock2">
	 	 <div class="i-layer2" style="width: 524px;height:362px;position: fixed;text-align: center;top: -460px;">
	       <img src="${pageContext.request.contextPath}/js-css-show/hongbao.png">
	       <span class="numberPeople">可进行 100 人考试，当日有效</span>
			<a href="javacript:void(0)" class="i-layer-close2"></a>
            <a href="javascript:void(0)" class="i-layer-btn2"></a>
	</div>
	 </div>
</div>
<!-- QQ 交談 -->
<a class="QQHide hide" target="_blank" style="position: fixed; right: 21px; top: 50%; margin-top: -75px; z-index: 999; display: inline;" href="http://wpa.qq.com/msgrd?v=3&amp;uin=2531743633&amp;site=qq&amp;menu=yes"><img border="0" src="${pageContext.request.contextPath}/js-css-show/QQ20170905.png" alt="赛码网" title="赛码网" width="70px;"></a>

<script src="${pageContext.request.contextPath}/js-css-show/jquery.3.2.1.min.js" type="text/javascript" charset="utf-8"></script>
<script src="${pageContext.request.contextPath}/js-css-show/all.js" type="text/javascript" charset="utf-8"></script>
<script src="${pageContext.request.contextPath}/js-css-show/jquery.cxdialog.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js-css-show/jquery.cookie.js"></script>
<script src="${pageContext.request.contextPath}/js-css-show/footer-exam.js" type="text/javascript" charset="utf-8"></script>
<script src="${pageContext.request.contextPath}/js-css-show/jquery.cxdialog.js"></script>
<script type="text/javascript">
 if($.cookie("version")==3){
    $('.QQHide').remove();
 }else{
    $('.QQHide').show();
 }
/*跳转到Https*/
  if(location.protocol!="https:" && location.host.indexOf("acmcoder.com")>0){
            document.location.href ='https://' + location.host + '/b/';
        }
var initDate="";
    /*首页引导页*/
    function changWindow(){
  	/*引导页*/
	$(".i-lock").height($(document).height());
					var ileft = ($(window).width()-$(".i-layer").width())/2;
					var itop = ($(window).height()-$(".i-layer").height())/2;
					$(".i-layer").css({
						left : ileft,
						top : itop
			         });	
    }
    function changWindow2(){
    /*红包*/
	                $(".i-lock2").height($(document).height());
					var ileft = ($(window).width()-$(".i-layer2").width())/2;
					var itop = ($(window).height()-$(".i-layer2").height())/2;
						$(".i-layer2").css({
						left : ileft
			          });
					$(".i-layer2").animate({'top':itop},1000);

    }
  /*引导页cookie*/
  var initShowIntro = function(){
  	if(!$.cookie("showIntro")){
		$(".introBox").show();
  		$.cookie("showIntro",1);
  		$(".i-layer-close").click(function(){
		$(".i-layerBox").hide();
		 postDate();
		})
	$(".i-layer-btn").click(function(){
		$(".i-layerBox").hide();
		postDate();
	});
  	}else{
		$(".introBox").hide();
		postDate();
        
  	}
  }
      /*红包页*/
     var postDate = function(){
     	 $.post('https://kao.acmcoder.com/examcomp/getEntinfo',{'uid':$("#entDid").val()},function(str){
                      //console.log(str);
                      var str =JSON.parse(str);
                      if(str.data.exam_day_input_num==0){

                      } else{
                      	    $.post('https://kao.acmcoder.com/examcomp/getEntinfoGift',{'uid':$("#entDid").val()},function(str){
     	  	               var str =$.parseJSON(str);
				     	  	initDate=str.data;
				  	     if(str.data){
				          //console.log(str);
				  	     } else{    
				//          console.log(str.data)
				            $('.i-hongBaoBox').show();
				            $(".introBox").hide();
				            changWindow2();
				  	     } 
				     }
				    )
                      }
     	 });

    return initDate;	  
     } 
/*设备判断*/
$(function() {
  if($(window).width()<=450){//移动端
	$('.PCshow').html('');
  	$('.head').remove();
  	$('.cnav').remove();
  	$('.buttomL').remove();
  	$.post('https://kao.acmcoder.com/examcomp/getEntinfoGift',{'uid':$("#entDid").val()},function(str){
     	  	var str =$.parseJSON(str);
  	     if(str.data){
  	     	 $.cxDialog({
			     	 title:'提示',
		  	         info:'<div style="text-align:left;padding: 30px;padding-top: 30px;font-size: 14px;line-height: 34px;padding-bottom: 18px;">为了便于您有更好的体验，<br>建议您用PC电脑登录此考试系统<br>给您带来的不便，在此表示歉意！</div>',
			  	     lockScroll: true,
				     closeBtn:false,
				     background: '#000',
				    okText:'我知道了',
				    ok:function() {
				      location.href='http://kao.acmcoder.com';//返回登陆页面
				    }
			   })
  	     } else{    
            $('.i-hongBaoBox').show();
            $(".introBox").hide();
            changWindow2();
                         	/*红包关闭弹窗*/
	$(".i-layer-close2").click(function(){
		$.cxDialog({
		  	  title:'提示',
		  	  info:'<div style="text-align: center;padding: 30px;padding-top:30px;font-size: 14px;line-height: 34px;padding-bottom: 18px;"><span style="font-size:16px;color:#2abcb8;">老板</span>，<span style="color:red">小赛</span>为您奉上了千元红包，请笑纳！<br>包含<span style="font-weight:bolder">100</span>人的考试名额，不要错过啊～～</div>',
		  	  lockScroll: true,
			  closeBtn: true,
			  background: '#000',
			  okText:'我知道了',
			  ok:function(){
			  	 
			  }
			})
	});
	/*红包领取弹窗*/
	$(".i-layer-btn2").click(function(){
	   $('.i-hongBaoBox').hide();
		$.cxDialog({
		  	  title:'提示',
		  	  info:'<div style="text-align: center;padding: 30px;padding-top: 30px;font-size: 14px;line-height: 34px;padding-bottom: 18px;"><span style="font-size:16px;color:#2abcb8;">老板</span>，您已成功领取<span style="color:red">小赛</span>为您奉上的千元红包，<br>现在开始体验极速考试之旅吧！</div>',
		  	  lockScroll: true,
			  closeBtn:false,
			  background: '#000',
			  okText:'现在开始',
			  ok:function(){
			     $.cxDialog({
			     	 title:'提示',
		  	         info:'<div style="text-align:left;padding: 30px;padding-top: 30px;font-size: 14px;line-height: 34px;padding-bottom: 18px;">为了便于您有更好的体验，<br>建议您用PC电脑登录此考试系统<br>给您带来的不便，在此表示歉意！</div>',
			  	     lockScroll: true,
				     closeBtn:false,
				     background: '#000',
				    okText:'我知道了',
				    ok:function() {
				      location.href='https://kao.acmcoder.com/enterprise/login';//返回登陆页面
				    }
			     }) 
			     return false;
			  } 

	});
});
	/*红包领取*/
	$('.i-layer-btn2').click(function(){
		  $.post('https://kao.acmcoder.com/examcomp/updateEntinfoGift',{'uid':$("#entDid").val(),'did':$('#entAccountId').text()},
		  	 function(str2){
//                console.log(str2);
		  })
	})
  	     } 
     })

  } else{//pc端
	$('.PCshow').show();
  	     $(window).resize(function(){
       changWindow();
      });
      changWindow();
      initShowIntro();
	/*红包关闭弹窗*/
	$(".i-layer-close2").click(function(){
		$.cxDialog({
		  	  title:'提示',
		  	  info:'<div style="text-align: center;padding: 30px;padding-top:30px;font-size: 14px;line-height: 34px;padding-bottom: 18px;"><span style="font-size:16px;color:#2abcb8;">老板</span>，<span style="color:red">小赛</span>为您奉上了千元红包，请笑纳！<br>包含<span style="font-weight:bolder">100</span>人的考试名额，不要错过啊～～</div>',
		  	  lockScroll: true,
			  closeBtn: true,
			  background: '#000',
			  okText:'我知道了',
			  ok:function(){
			  	 
			  }
			})
	});
	/*红包领取弹窗*/
	$(".i-layer-btn2").click(function(){
	   $('.i-hongBaoBox').hide();
		$.cxDialog({
		  	  title:'提示',
		  	  info:'<div style="text-align: center;padding: 30px;padding-top: 30px;font-size: 14px;line-height: 34px;padding-bottom: 18px;"><span style="font-size:16px;color:#2abcb8;">老板</span>，您已成功领取<span style="color:red">小赛</span>为您奉上的千元红包，<br>现在开始体验极速考试之旅吧！</div>',
		  	  lockScroll: true,
			  closeBtn:false,
			  background: '#000',
			  okText:'现在开始',
			  ok:function(){
			       document.location.reload()
			  } 

	});
});
	/*红包领取*/
	$('.i-layer-btn2').click(function(){
		  $.post('https://kao.acmcoder.com/examcomp/updateEntinfoGift',{'uid':$("#entDid").val(),'did':$('#entAccountId').text()},
		  	 function(str2){
//                console.log(str2);
		  })
	})

/*-------------------------------------*/
	$('#addMoney').click(function(){
		  $.cxDialog({
		  	  title:'充值',
		  	  info:'<div style="text-align:center;"><div class="cxDialogContent"><table><tbody><tr style="text-align: left;padding-left: 30px;"><td style="padding-left: 20px;"><i class="fa fa-gift" style="position: relative;left: 20px;"></i></td><td style="    padding-left: 100px;line-height: 26px;font-size: 12px;color: #999;padding-top: 10px;"><span class="fbig fb" style="font-size: 36px;color: #555;margin-bottom: 28px;display: inline-block;">充值送大礼！</span><br> 请立刻拨打我们的服务热线，联系客服人员进行充值<br>感谢您对我们产品的支持！<br>电&nbsp;&nbsp;&nbsp;话：<span style="color:#2abcb8">010-85359766、010-85358657</span><br>E-mail：<span style="color:#2abcb8">xuyingxin@acmcoder.com</span><br>联系人：<span style="color:#2abcb8">徐女士</span></td></tr></tbody></table></div></div>',
		  	  lockScroll: true,
			  closeBtn: true,
			  background: '#000',
			  okText:'我知道了',
			  ok:function(){
			  	
			  }
		  })
	})
	$(function(){
		var n1= parseInt(0) +  parseInt(100);
		$("#examCandsNum").html(n1 +' 人');
		loadInfo();
	});

	//翻页
	function loadInfo(){
		$("#numList ul .loading").show();
		$("#numList ul").html('');
		/*$("#numList ul").html('<div class="loading"><i class="fa fa-spinner animated infinite rotate"></i> 正在加载...</div>');*/


		var entDid = $("#entDid").val(); //buqu
		$.post('/b/selectPrjList',{
//			entDid:entDid
/*		},function(json){
			if(json.success) {
				var data1 = json.fatherData;
				var data2 = json.childerData;
				if(data1 != null && data1 != undefined) {
					$("#datab1").html(data1.n1==null?0:data1.n1);
					$("#datab2").html(data1.n2==null?0:data1.n2);
					$("#datab3").html(data1.n3==null?0:data1.n3);
					$("#datab4").html(data1.n4==null?0:data1.n4);

					
				}

 				if(data2 != null && data2.length > 0) {
					$("#numList ul").html('');
					var html ='';
					$.each(data2, function (k, v) {
						html += '<div class="centwo">';
						html += '<table> <thead> <tr style="height: 60px "> ';
						html += '<th width="30%" style="text-align: left;padding-left:20px;max-width: 218px;" class="hide-text"><span title="'+(v.title)+'"style="font-size: 14px;color:black">'+(v.title)+'</span>';
						if(v.subtitle=='undefined' ||v.subtitle==null){
                              html += '<p class="color-m" title="'+(v.subtitle)+'" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width:200px;"></p></th>';	
						} else{
						html += '<p class="color-m" title="'+(v.subtitle)+'" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width:200px;">'+(v.subtitle)+'</p> </th>';	
						}
						
						html += '<th width="14%">'+(v.examnum)+'</th>';
						html += '<th width="18%" class="color-m">'+(v.mayStartDate)+'&nbsp;&nbsp;'+(v.mayTime)+'</th>';
						html += '<th width="14%" class="color-m">'+(v.examMode)+'</th>';
						html += '<th width="14%" class="color-m">'+(v.candnum==null?"0":v.candnum)+'</th>';

						var flag = (v.exam_flag==null?"未开始":v.exam_flag) ;
						if (flag == "未开始")
						{
							html += '<th width="14%" style="color: #333">'+(v.exam_flag)+'</th>';
						}
						else if (flag == "已结束")
						{
							html += '<th width="14%" style="color: #2abcb8">'+(v.exam_flag)+'</th>';
						}
						else if (flag == "考试中")
						{
							html += '<th width="14%" style="color: #ff8a00">'+(v.exam_flag)+'</th>';
						}
						html += '</tr></thead></table></div>';
					});

					html += '<a id="moerDeteal" href="http://kaosys.acmcoder.com/paper#/list">详情</a>';
					$("#numList ul .loading").hide();
					$("#numList ul").append(html);
				}
				if(data2.length==0){
					$("#numList ul").html('');
					var html ='';
					html += '<div class="textNone">';
					html += '<div style="width: 90px;height: 90px;padding-top: 17px;position: relative;left: 50%;transform: translateX(-50%);border-radius:10px;">';
					html += '<img src="/images/face-date.png"></div>';
					html += '<a"><span style="margin-top: 40px;display: block;font-size: 14px;color: #999;">您还没有设置过考试场次<br><a class="hrefPositon" href="http://kaosys.acmcoder.com/paper#/list" style="font-size: 14px;">现在发起一场新的考试吧！</a></span></a>';
					html += '</div>';
					$("#numList ul .loading").hide();
					$("#numList ul").append(html);
				}
			}
			else
			{
				window.location.href='/enterprise/login';
			}
		},'json'); 
}*/
}
})
</script>


<%@ include file="../foot.jsp" %>