/**
 * Created by wangguoxiang on 2017/4/5 0005.
 * on 2017/4/5 0005.
 * contact me by QQ:794153926
 */

//window.exports = window.module = undefined;
if(typeof(acm)=="undefined"){window.acm = {};}
window.alert = function(mess,callback){
    $.cxDialog({
        title: '提示',
        info: '<div style="padding:20px; text-align:center;">'+mess+'</div>',
        lockScroll: true,
        background: '#000',
        width: 400,
        okText:'我知道了',
        ok:function(){
            if(callback!=undefined){
                callback();
            }
        }
    });
}
window.alertNoBack = function(mess,callback){
    $.cxDialog({
        title: '提示',
        info: '<div style="padding:20px; text-align:center;">'+mess+'</div>',
        lockScroll: true,
        background: '#000',
        width: 400,
        okText:'我知道了',
        ok:function(){
            if(callback!=undefined){
                callback();
                return false;
            }
        }
    });
}
window.alertWithClose = function(mess,callback,closeBtnFun){
    $.cxDialog({
        title: '提示',
        info: '<div style="padding:20px; text-align:center;">'+mess+'</div>',
        lockScroll: true,
        background: '#000',
        width: 400,
        okText:'我知道了',
        ok:function(){
            if(callback!=undefined){
                callback();
                return false;
            }
        },
        closeBtnFun:function(){
            closeBtnFun();
        }
    });
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

window.alertBackClickT = function(mess,clickDom){
    $.cxDialog({
        title: '提示',
        info: '<div style="padding:20px; text-align:center;">'+mess+'</div>',
        lockScroll: true,
        background: '#000',
        width:300,
        closeBtn:false,
        okText:'我知道了',
        ok:function(){
            clickDom.click();
            return false;
        }
    });
}



window.confirm = function(mess,callback){
    $.cxDialog({
        title: '提示',
        info: '<div style="padding:20px; text-align:center;">'+mess+'</div>',
        lockScroll: true,background: '#000',width: 400,okText:'确定',
        ok:function(){
            callback();
        },noText:'取消',
        no:function(){
            $("#submit-qus").removeClass('limited');
        },
        closeBtnFun:function(){
            $("#submit-qus").removeClass('limited');
        }
    });
}

    if(window.acm.hrHeader!=undefined && location.host!="kaosys1.acmcoder.com:14822"){
        $(".navbar-nav.guiderLinks").html('');
        window.acm.hrHeader.forEach(function(item){
            $(".navbar-nav.guiderLinks").append('<li><a href="'+item.url+'"><i class="icon-plus-sign"></i> '+item.title+'</a></li>');
        });
        $("#uemail").html('');
        window.acm.userLink.forEach(function(List){
            if(List.title.indexOf("退出")>-1){
                 $("#uemail").append('<li style="text-align: center;width: 110px;height: 32px;"><a style="width:108px;padding: 8px 0px;font-size: 12px;" href="javascript:void(0)" class="logOut" data-href="'+List.url+'"><img src="'+List.imgurl+'" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;'+List.title+'</a></li>');
            }
            else if(List.title.indexOf("用户管理")>-1){
                $("#uemail").append('<li class="yonghuGuanli hide" style="text-align: center;width: 110px;height: 32px;"><a  style="width: 108px;padding: 8px 0px;font-size: 12px;" href="' + List.url + '"><img src="'+List.imgurl+'" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;'+ List.title + '</a></li>');

            }else {
                $("#uemail").append('<li style="text-align: center;width: 110px;height: 32px;"><a  style="width: 108px;padding: 8px 0px;font-size: 12px;" href="' + List.url + '"><img src="'+List.imgurl+'" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;'+ List.title + '</a></li>');
            }
        });
        $(".logOut").click(function () {
            var OutLink = $(this).attr("data-href");
            $.cookie('did', null, { expires: -1, path: '/',domain:'.acmcoder.com' });
            $.cookie('accountid', null, { expires: -1, path: '/',domain:'.acmcoder.com' });
            $.cookie('prj', null, { expires: -1});
            $.cookie('comp', null, { expires: -1});
            $.cookie('upload', null, { expires: -1});
            $.get("/api/logout",function(){

            });
            $.post("http://kao.acmcoder.com/enterprise/dropOut",function(){

            });
            window.setTimeout(function () {
                document.location.href='http://kao.acmcoder.com/enterprise/login';
            },200)
        });
    }
    //页面焦点
    if(lft!=undefined && lft!=""){
        if(lft=="mypaper"){ $($("#navbar-collapse ul li")[1]).addClass("hov");$($(".banner_list ul li")[1]).addClass("active"); }
        if(lft=="tkgl" ){ $($("#navbar-collapse ul li")[6]).addClass("hov");/*$($(".banner_list ul li")[1]).addClass("active");*/ }
        if(lft=="wdksxm"){ $($("#navbar-collapse ul li")[4]).addClass("hov");/*$($(".banner_list ul li")[4]).addClass("active");*/ }
        if(lft=="paper"){ $($("#navbar-collapse ul li")[2]).addClass("hov");$($(".banner_list ul li")[2]).addClass("active"); }
        if(lft=="zsgl"){ $($("#navbar-collapse ul li")[3]).addClass("hov");$($(".banner_list ul li")[3]).addClass("active"); }
        if(lft=="yuejuan"){ $($("#navbar-collapse ul li")[5]).addClass("hov");$($(".banner_list ul li")[5]).addClass("active"); }

        if(lft=="mypaper"){
             $('.cnav').remove();
            $('.banner_list').append('<div class="cnav">'+
                 '<div class="public cnav_b center-top">'+
                '<div class="cnav_left">'+
                '试卷流程'+
                '</div>'+
                '<div class="cnav_right" style="width: 530px;">'+
                '<ul>'+
                '<li class="active"><span>1</span>新建试卷</li>'+
                '<li><span>2</span>添加子卷</li>'+
                '<li><span>3</span>添加试题</li>'+
                '<li><span>4</span>发起一场考试</li>'+
            '</ul>'+
            '</div>'+
            '<div class="cnavX"></div>'+
                '</div>'+
                '</div>')
        }

    }

    if(!$.cookie("jurisdiction")){
        $.post('/api/getJurisdiction',function (data) {
            $.cookie("jurisdiction",JSON.stringify(data))
        });
    }
    if(!$.cookie("comp")){
        $.post('/api/compInfo',function (data) {
            $.cookie("comp",JSON.stringify(data.result))
        });
    }

    //上传图片路径
    if(!$.cookie("upload")){
        $.post('https://capture.acmcoder.com/oss/getclient.php',function (data) {
            $.cookie("upload",data)
        });
    }

    $(document).keyup(function(event){

        switch(event.keyCode) {
            case 27:
                $.cxDialog.close();
                $(".prof_T").css("display","none");
        }
    });

    var userLogo = $(".userLogo").attr("data-src");
    if(userLogo!=undefined){
        userLogo = userLogo.replace('http://','https://');
        if((userLogo.indexOf("https:")==-1 || userLogo.indexOf("http:")==-1)&& userLogo!=""){ userLogo = "https://kao.acmcoder.com" + userLogo;$(".userLogo").attr("src",userLogo); }
        else if(userLogo!=""){
            $(".userLogo").attr("src",userLogo);
        }
    }



window.acm.renderMail = function (mailContent) {
    mailContent = mailContent.replace(/<--姓名-->/g, '&lt;--姓名--&gt;');
    mailContent = mailContent.replace(/<--帐号-->/g, '&lt;--帐号--&gt;');
    mailContent = mailContent.replace(/<--密码-->/g, '&lt;--密码--&gt;');
    mailContent = mailContent.replace(/<--申请职位-->/g, '&lt;--申请职位--&gt;');
    mailContent = mailContent.replace(/<--考试名称-->/g, '&lt;--考试名称--&gt;');
    mailContent = mailContent.replace(/<--开始时间-->/g, '&lt;--开始时间--&gt;');
    mailContent = mailContent.replace(/<--时长-->/g, '&lt;--时长--&gt;');
    mailContent = mailContent.replace(/<--结束时间-->/g, '&lt;--结束时间--&gt;');
    mailContent = mailContent.replace(/<--登录地址原文-->/g, '&lt;--登录地址原文--&gt;');
    mailContent = mailContent.replace(/<--已查阅，稍后确认-->/g, '&lt;--已查阅，稍后确认--&gt;');
    mailContent = mailContent.replace(/<--确认参加-->/g, '&lt;--确认参加--&gt;');
    mailContent = mailContent.replace(/<--申请调整-->/g, '&lt;--申请调整--&gt;');
    mailContent = mailContent.replace(/<--放弃参加-->/g, '&lt;--放弃参加--&gt;');
    return mailContent;
}
window.acm.renderPostData = function (postData) {
    var newPostData ={};
    for (x in postData)
    {
        if(postData[x]!="" || postData[x]===0){
            newPostData[x] = postData[x];
        }
    }
    return newPostData;
}



Date.prototype.Format = function(fmt)
{
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
$(".dropdownLoginOut").hover(function() {
    $("#uemail").addClass("mguser-hover2");
    /*$('.mguser-box').find('i').attr('class','fa fa-angle-up')*/
}, function() {
    $("#uemail").removeClass("mguser-hover2");
    /*$('.mguser-box').find('i').attr('class','fa fa-angle-down')*/
});

window.onerror = function (mess) {
    console.log(mess);
    return true;
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
    $(document).on('click','#pagination a',function () {
       /* $("body,html").animate({scrollTop:0});*/
       location.reload();
    });
   /*登录人身份*/
    /*$('ul.guiderLinks  li:not(0)').addClass('hide');*/
    if($.cookie("kao_token")){
        $.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") + "&r=" + Math.random(),function (data) {
          data = eval('(' + data + ')')
           var  version= data.data.exam_version;
          if(data.data.role_type==1){
              $(".yonghuGuanli.hide").removeClass('hide');
          }
          //console.log(version);
          // console.log(data.data.role_right);
           if(version!='1'){
               if(data.data.role_right.indexOf('1')==-1){//查询到1
                   $('ul.guiderLinks  li').eq(1).hide();
                   $('ul.guiderLinks  li').eq(6).hide();
               }
               if(data.data.role_right.indexOf('2')==-1){//查询到2
                   $('ul.guiderLinks  li').eq(2).hide();
               }
               if(data.data.role_right.indexOf('3')==-1){//查询到3
                   $('ul.guiderLinks  li').eq(3).hide();
               }
               if(data.data.role_right.indexOf('4')==-1){//查询到4
                   $('ul.guiderLinks  li').eq(4).hide();
               }
               if(data.data.role_right.indexOf('5')==-1){//查询到5
                   $('ul.guiderLinks  li').eq(5).hide();
               }
               if(data.data.role_right.indexOf('6')==-1){//查询到6
                   $('ul.guiderLinks  li').eq(1).hide();
                   $('ul.guiderLinks  li').eq(6).hide();
               }
           }
           if(version!=3){
               $(".showQQMess").removeClass('hide');
           }
       });
    }
});

