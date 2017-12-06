var selectype=false;
$(function() {
	Select();
	Minit();

	if($("img.hgimg").attr("data-src")!=""){
		$("img.hgimg").attr("src",$("img.hgimg").attr("data-src"));
	}
})
function Select(){
	var a = $("body"),
		c = a.find(".selectUI");
	
	$("body").on("click",".selectUI li a",function() {
		$(this).parent().parent().prev().find("span").html($(this).html());
		$(this).parents(".selectUI").removeClass("active");

		if(!$(this).parent().hasClass("selected")){
			$(this).parent().addClass("selected");
			$(this).parent().siblings().removeClass("selected");
		}

		$(this).parents(".regisit-error").removeClass("regisit-error").find(".login-error").remove();
	});
	$(document).on("click",".selectUI .selectUI-val",function() {

		/*所有的移除active*/
		                  if($(this).parent().parent().hasClass('active')){
                             $(this).parent().parent().removeClass("active");
		                  } else{
                              $(this).parent().parent().addClass("active");
                              $(this).parent().parent().parent().siblings('dd').find('.selectUI').removeClass('active')
		                  } 
		
		/*当前加上active*/ /*$(this).parent().parent().addClass("active");*/
	});
	$(document).on("mouseenter",".selectUI",function(){
		selectype = true;
	});
	$(document).on("mouseleave",".selectUI",function(){
		selectype = false;
	});
	$(document).on("click", function(a) {
		if(!selectype){
			$(".selectUI").removeClass("active");	
		}
	});
	/*$(document).on("click", function(a) {
		c.find(".selectUI-text").each(function(c, h) {
			$(a.target).closest(h).length > 0 ? $(h).parent().toggleClass("active") : $(h).parent().removeClass("active")
		})
	});*/
	
	
}

function Minit(){
	
	$(".mguser").hover(function() {
		$(this).addClass("mguser-hover");
		/*$('.mguser-box').find('i').attr('class','fa fa-angle-up')*/
	}, function() {
		$(this).removeClass("mguser-hover");
		/*$('.mguser-box').find('i').attr('class','fa fa-angle-down')*/
	});
	
	var sollLeft =($(window).width()-1098)/2-50;
	$(".sollTop").css("right",sollLeft);
	
	$(".sollTop").click(function(){
		$("body,html").animate({scrollTop:0});
	});
	
	$(document).scroll(function(){
		if($(window).scrollTop()>300){
			$(".sollTop").show();
		}else{
			$(".sollTop").hide();
		}
	});
	
	$(".ques-select").click(function(){
		if($(this).parents("li").hasClass("ques-selectAct")){
			$(this).parents("li").removeClass("ques-selectAct");
		}else{
			$(this).parents("li").addClass("ques-selectAct");
		}
	});
	
	/*$("body").on("click",".signResume-btn",function(){
		var txt = $(this).siblings(".signResume-text").val();
		if(txt!=""){
			ULAdd(txt);
			$(this).siblings(".signResume-text").val("");
		}
	});
	$("body").on("click",".signResume-ul li",function(){
		var txt = $(this).text();
		if(txt!=""){
			TagAdd(txt);
		}
	});*/
	$("body").on("click",".signResume-tag li a",function(){
		$(this).parent().remove();
	});



	function TagAdd(txt) {
		var mybool = false;
		$(".signResume-tag ul ").each(function(){
			if($(this).html()==txt){
				mybool = true;
			}
		});
		if(!mybool){
			var htm = '<li><a href="javascript:void(0)"><span>' + txt + '</span><i></i></a></li>';
		    $(".signResume-tag ul").append(htm);
		}
		 
	}
	
	/*function TagAdd(txt) {
	    var htm = '<li><a href="javascript:void(0)"><span>' + txt + '</span><i></i></a></li>';
	    $(".signResume-tag ul").append(htm);
	}*/

	function ULAdd(txt) {
	    var htm = '<li><a href="javascript:void(0)"><span>' + txt + '</span><i></i></a></li>';
	    $(".signResume-ul").append(htm);
	}



	$(".head .nav li").mouseover(function () {
	    var this_index = $(this).index();
	    if (this_index <= 1) {
	        $(".header_bottom_list").slideDown(100)
	        $(".header_center ul li a").removeClass("active")
	        $(this).find("a").addClass("active")
	        $(".header_bottom_list_left ul").css("display", "none");
	        $(".header_bottom_list_left ul").eq(this_index).css("display", "block");
	    }
	    else {
	        $(".header_bottom_list").slideUp(100);
	    }
	})
	$(".header_bottom_list").mouseleave(function () {
	    $(".header_bottom_list").slideUp(100);
	})
	$(document).on('click','.navLeft dt',function(){
				   if($(this).hasClass('down')){
                       $(this).removeClass('down');
                       $(this).next('.list').slideUp();
                       $(this).find('i').eq(0).removeAttr('class');
                       $(this).find('i').eq(0).attr('class','fa fa-plus icon-w')
				   }else{
				   	  $(this).addClass('down');
				   	   $(this).next('.list').slideDown();
				   	   $(this).find('i').eq(0).removeAttr('class');
				   	    $(this).find('i').eq(0).attr('class','fa fa-minus icon-w')
				   }
			})

}




window.alertBackClick = function(mess,clickDom){
	$.cxDialog({
		title: '提示',
		info: '<div style="padding:20px; text-align:center;">'+mess+'</div>',
		lockScroll: true,
		background: '#000',
		width: 400,
		okText:'我知道了',
		ok:function(){
			clickDom.click();
			return false;
		}
	});
}

window.alertBackFon = function(mess,clickDom,aid){
	$.cxDialog({
		title: '提示',
		info: '<div style="padding:20px; text-align:center;">'+mess+'</div>',
		lockScroll: true,
		background: '#000',
		width: 400,
		okText:'我知道了',
		ok:function(){
			clickDom(aid);
			return false;
		}
	});
}
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?6fb90b2f24d985857e64bfdea40ddf7e";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();