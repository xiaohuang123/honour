/// <reference path="jquery.min.js" />

$(document).ready(function () {
	 if($(window).width()>450){
	 	$("body").append('<div class="footer">'+
			'<div class="public">'+
				'<div class="footer-left">'+
					'<div class="footer-logo">'+
						'<img src="../../images/blogo.png" style="position: relative;top: -3px;" />'+
					'</div>'+
					'<div class="footer-txt">'+
						'<a target="_blank" href="http://www.acmcoder.com/aboutus/about.html">关于我们</a>' +
						'　|　'+
						'<a target="_blank" href="http://www.acmcoder.com/aboutus/contact.html">联系我们</a>' +
						'　|　'+
						/*'<a target="_blank" href="../job/comp_portal.html">加入我们</a>' +
						'　|　'+
						'<a target="_blank" href="../../aboutus/fankui.html">意见反馈</a>' +
						'　|　'+*/
						'<a target="_blank" href="http://www.acmcoder.com/aboutus/shengming.html">免责声明</a>' +
						/*'　|　'+*/
						/*'<a target="_blank" href="../comp/comp_enterprise.html">企业服务</a>' +*/
						'<br>'+
						'Copyright &copy; acmcoder.com'+
						'<br>'+
						'All Rights Reversed 京ICP备15012255-1'+
					'</div>'+
				'</div>'+
				'<div class="footer-right">'+
					'<table>'+
                      '<tbody>'+
                      '<tr>'+
                      '<td><img src="../../images/f-phone.png"></td>'+
                     '<td style="font-size: 14px;">客服热线：010-85359782<br>销售热线：010-85359766</td>'+
                     '<td style="font-size: 14px;"><a class="weixinPng" href="javascript:void(0)" style="color:white;position: relative;"><img src="../../images/f-weixin.png"> &nbsp;&nbsp;iamacmcoder<img class="hide" style="width: 80px;position: absolute;left: 130px;top: -50px;" src="../../images/saimaweixin.jpg"></a><br>'+
                     '<a href="javascript:void(0)" style="color:white"><img src="../../images/f-qq.png"> &nbsp;&nbsp;2531743633</a><br></td>'+
                       '</tr>'+
                   '</tbody>'+
                   '</table>'+
					
				'</div>'+
			'</div>'+
		'</div>');
	 } else{
	 	$('body').append('<div class="buttomL" style="text-align: center;line-height: 40px;overflow: hidden;padding-top: 8px!important;"><img src="https://cdn.acmcoder.com/assets/public/v3.0/htmls/exam/images/blogo.png" style="height: 25px;">  &nbsp;&nbsp;本考试系统由 <a target="_blank" href="https://kao.acmcoder.com" style="font-weight:bold;color:#000;">赛码网</a> 提供技术支持&nbsp;&nbsp;&nbsp;&nbsp;</div>')      
	 }
	if(location.host=="kao.acmcoder.com" || location.host=="localhost:9999"){
		if(window.acm!=undefined){
			$(".head-bar.public ul.nav").html('');
			var i=0;
			window.acm.hrHeader.forEach(function(item){
				if(i==0){
					$(".head-bar.public ul.nav").append('<li class="active"><a href="'+item.url+'">'+item.title+'</a></li>');
				}else{
					$(".head-bar.public ul.nav").append('<li><a href="'+ item.url+'">'+item.title+'</a></li>');
				}
				i++;
			});
		   $(".mguser-cnt").html('');
		  window.acm.userLink.forEach(function(List){
			$(".mguser-cnt").append('<li><a href="'+List.url+'"><img src="'+List.imgurl+'" style="width: 14px;position: relative;left: -10px;top: -2px;"/>&nbsp;'+ List.title+'</a></li>');
		});
		}
	}
    $(document).ready(function () {
    $('body').append('<div class="topW" style="display: none"><span></span></div>');
        var sollLeft =($(window).width()-1098)/2-60;
        $(".topW").css("right",sollLeft);
    $(".topW").click(function(){
        $("body,html").animate({scrollTop:0});
    });
    $(document).scroll(function(){
        if($(window).scrollTop()>400){
            $(".topW").show();
        }else{
            $(".topW").hide();
        }
    });
});
    setTimeout(function(){
    	 if($('#roleTypeHeader').val()==6 ||$('#examVersionHeader').val()==1){
                $('.mguser-cnt li').eq(3).remove();
    	 }
    
    },100)	
      /*登录人身份*/
      if($.cookie("kao_token")){
   $.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") + "&r=" + Math.random(),function (data) {
      var arryToken=[] //存放登陆者权限;
      data = eval('(' + data + ')')
      var version = data.data.exam_version;
       $.cookie('version',data.data.exam_version)
       $.cookie('role_right',data.role_right);
       //console.log(data.data.role_right);
       if(version!='1'){
           if(data.data.role_right.indexOf('1')==-1){//查询到1
           $('ul.nav  li').eq(1).hide();
           $('ul.nav  li').eq(6).hide();
           $('.newExam a').removeAttr('href');
           $(document).on('click','.newExam a',function(){
                 $.cxDialog({
                 	title:"提示",
					info:'<div style="text-algin:center;padding:20px">老板，您还没有开通此功能，请联系管理员为您开通吧~~</div>',
					lockScroll: true,
					background: '#000',
					okText:'我知道了',
					ok:function(){

					}
                 })
           })
       }
      if(data.data.role_right.indexOf('2')==-1){//查询到2
           $('ul.nav  li').eq(2).hide();
          setTimeout(function(){
           $('#moerDeteal').removeAttr('href');
           $('.hrefPositon').removeAttr('href');
           $(document).on('click','.hrefPositon',function(){
           	   $.cxDialog({
                 	title:"提示",
					info:'<div style="text-algin:center;padding:20px">老板，您还没有开通此功能，请联系管理员为您开通吧~~</div>',
					lockScroll: true,
					background: '#000',
					okText:'我知道了',
					ok:function(){

					}
                 })
           })
           $(document).on('click','#moerDeteal',function(){
           	   $.cxDialog({
                 	title:"提示",
					info:'<div style="text-algin:center;padding:20px">老板，您还没有开通此功能，请联系管理员为您开通吧~~</div>',
					lockScroll: true,
					background: '#000',
					okText:'我知道了',
					ok:function(){

					}
                 })
           })
          },200);
           
           $('.hrefPositon').removeAttr('href');
           $(document).on('click','.hrefPositon',function(){
                 $.cxDialog({
                 	title:"提示",
					info:'<div style="text-algin:center;padding:20px">老板，您还没有开通此功能，请联系管理员为您开通吧~~</div>',
					lockScroll: true,
					background: '#000',
					okText:'我知道了',
					ok:function(){

					}
                 })
           })
       } 
       if(data.data.role_right.indexOf('3')==-1){//查询到3
           $('ul.nav  li').eq(3).hide();
       }
       if(data.data.role_right.indexOf('4')==-1){//查询到4
           $('ul.nav  li').eq(4).hide();
       }
       if(data.data.role_right.indexOf('5')==-1){//查询到5
           $('ul.nav  li').eq(5).hide();
       }
       if(data.data.role_right.indexOf('6')==-1){//查询到6
           $('ul.nav  li').eq(1).hide();
           $('ul.nav  li').eq(6).hide();
       }
       }
     
   });
      }
      if(location.href.indexOf("91saima")>-1){
        $('.inputSpan').html('All Rights Reversed 京ICP备15012255-4');
    }
    else {
        $('.inputSpan').html('All Rights Reversed 京ICP备15012255-1')
    }
});