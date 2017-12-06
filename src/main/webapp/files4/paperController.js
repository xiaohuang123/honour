/**
 * Created by lifubang on 2015/6/1.
 */

var paperControllers = angular.module("paperControllers", ['ngAnimate']);
paperControllers.factory('papers', function() {
    return {
        prjId: ''
    };
});
paperControllers.controller("ListController", ['$scope', '$http', '$timeout', 'papers',
        function($scope, $http, $timeout, papers)
        {
            var seleKaosheng =function () {
                /*版本判断*/
                $http.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") +  "&r=" + Math.random(),{}).success(function (data) {
                    $scope.userInfo = data.data;
                    $scope.version = data.data.exam_version;
                    $scope.userInfo.exam_cands_num  = window.acm.exam_cands_num = parseInt($scope.userInfo.exam_cands_num) + parseInt($scope.userInfo.exam_day_input_left_num);
                    $.cookie('version',data.data.exam_version)
                    $.cookie('role_type', data.data.role_type);if($.cookie('role_type')==1 && $.cookie('version')!=1){ $('.yonghuGuanli').removeClass('hide'); }
                    version= data.data.exam_version;
                    if(version!=1) {
                        $timeout(function () {
                            if (data.data.role_right.indexOf('3') == -1) {//查询到3
                                $('.backToPaperList').hide();
                                $('.pro-listab-td .fb3 ').addClass('disabled').removeAttr('href');
                            }
                        })

                    }
                    /*222*/
                }).error(function (data) {
                    console.log(data);
                });
            }


            /*权限判断*/
            $http.post('/api/userRight',{}).success(function (data) {
                $scope.rightStr = data.result.join(',');
            }).error(function (data) {
                console.log("服务器错误：" + data);
            });

            $http.post('/api/compInfo').success(function (data) {
                $scope.compInfo = data.result;
            }).error(function (data) {
                console.log(data);
            });
            if($.cookie("jurisdiction")){
                $scope.jurisdiction = eval($.cookie("jurisdiction"));
            }
            $scope.inputKey = "";
            window.acm.pageNum=1;

            $scope.publicPrj={};
            $scope.showPublicExam = function(p){
                $scope.publicPrj = p;
                var str =p._id + "&&" + p.positionList[0].positionId + "&&" + $.parseJSON($.cookie("comp")).compCode;
                if(str!=""){
                    $(".qrcode").html('');
                    $http.post("/api/prjToken",{inputStr:str}).success(function (data) {
                        $.cxDialog({
                            title: '进入考试的方式',
                            info: $(".publicExamBox"),
                            lockScroll: true,background: '#000',width:800,closeBtn:false,okText:'我知道了',
                            ok:function(){

                            }
                        });
                        window.qrcode = new QRCode('qrcode', {
                            text:  'https://'+$scope.compInfo.compCode+'.acmcoder.com/cand/public?q='+data.result,
                            width: 800,
                            height: 800,
                            colorDark : '#000000',
                            colorLight : '#ffffff',
                            correctLevel : QRCode.CorrectLevel.H
                        });
                        $scope.publicPrj.codeLink = data.result;
                    }).error(function (data) {
                        console.log(data);
                    });
                    var clipboard = new Clipboard('.clipBtn');
                    clipboard.on('success', function(e) {
                        $(".publicExamBox .list1 a.link").html('<i class="fa fa-clipboard"></i>已复制');
                    });
                }
            }
            $scope.downloadCanvas = function(){
                window.acm.downloadCanvas();
            }

            var refreshFunc = function(pageNum) {
                var key =$(".searchBox .select-n").val();
                $(" .pro-listab tbody").html("");
                 $scope.inputKey =key;
                var condition = $(".review-type.pro-type button.active").val();
                $http.post('/api/projectListWithState',{keyword:key,pageSize:10,pageNum:pageNum,condition:parseInt(condition)}).success(function (data) {
                    $scope.prjList = data.result.list;
                    $scope.prjCount = data.result.count;
                    $scope.Prjs = [];

                    if($scope.prjList!=undefined){
                    //状态过滤数据
                    $scope.prjList.forEach(function (item) {
                        //时间 - 随来随考
                        if(item.examMode==2){
                            if(Date.now() < Date.parse(item.mayStartDate) ){
                                item.stateStr = 0;
                            }
                            else if( Date.parse(item.mayEndDate) > Date.now() && (Date.parse(item.mayStartDate)< Date.now())){
                                item.stateStr = 1;
                            }
                            else{
                                item.stateStr = 2;
                            }
                        }else{
                            //时间 - 集中考试
                            if((Date.parse(item.mayStartDate)+ parseInt(item.maxPositionTime) * 60 * 1000) < Date.now()){
                                item.stateStr = 2;
                            }
                            else if((Date.parse(item.mayStartDate)+ parseInt(item.maxPositionTime) * 60 * 1000) >Date.now() && (Date.parse(item.mayStartDate)< Date.now())){
                                item.stateStr = 1;
                            }
                            else{
                                item.stateStr = 0;
                            }
                        }

                        if(key==""){
                            $scope.Prjs.push(item);
                        }else{
                            if(item.title.indexOf(key)>-1){
                                $scope.Prjs.push(item);
                            }
                        }
                    });

                    }
                    $timeout(function(){
                        if(window.acm.pageNum == pageNum){
                            initLoadPager();
                        }
                        window.acm.pageNum = pageNum;
                        seleKaosheng();
                    });
                    $(".result_loading").remove();
                    if($scope.Prjs.length!=0){
                        $(".review-chCnt .notip").hide();
                    }else{
                        $(".review-chCnt .notip").show();
                    }
                }).error(function (data) {
                    alert("管理员累晕了，没有反馈结果，请重试一下～～");
                });
            }

            var initLoadPager = function(){
                $(".pagination").html('');
                var totalLi = $scope.prjCount;

                if(totalLi>10){
                    var  num_entries = totalLi % 10;
                    if(num_entries==0){ num_entries = parseInt(totalLi / 10); }else{
                        num_entries = parseInt(totalLi / 10)+1;
                    }

                    var PageCallback  = function (page_index,jq) {
                        page_index +=1;
                        if(window.acm.pageNum != page_index){
                            refreshFunc(page_index);
                        }
                    }
                    $(".pagination").pagination(num_entries, {
                        current_page: window.acm.pageNum-1,
                        num_edge_entries: 3, //边缘页数
                        num_display_entries: 5, //主体页数
                        callback: PageCallback,
                        prev_text:'上一页',
                        next_text:'下一页',
                        items_per_page:1 //每页显示1项
                    });
                }else{
                }
            }

            $(".searchBox .select-t").click(function () {
                if(!$($(".prj_status button")[0]).hasClass("active")){
                    $($(".prj_status button")[0]).addClass("active").siblings().removeClass("active");
                }
                refreshFunc(1);
            });

            $(".prj_status button").click(function () {
                $(this).addClass("active").siblings().removeClass("active");
                /*var select_status = parseInt($(".review-type.pro-type button.active").val());
                if(select_status!=3){
                    $(".prjDetailList .monitorList .prjState").each(function () {
                        if(parseInt($(this).attr("datastate"))==select_status){
                            $(this).parents(".prjDetailList ").removeClass("hide");
                        }else{
                            $(this).parents(".prjDetailList ").addClass("hide");
                        }
                    });
                }else{
                    $(".prjDetailList").removeClass("hide");
                }*/
                refreshFunc(1);
            });


            $scope.delPrj = function (prj) {
                if(prj.stateStr==2){
                    alert("该场次已结束，无法删除！");
                }else if(prj.totalCand!=0){
                    alert('该场次的试卷中有考生，不能删除场次！<br>请先在“考生”栏目的“管理考生”页面中，删除所有考生<br>此时，才能删除场次！');
                }else{
                    confirm("您真的要删除吗？",function () {
                        if($.cookie('prj')){
                            if($.parseJSON($.cookie('prj'))._id==prj._id){
                                $.cookie('prj', null, { expires: -1});
                            }
                        }
                        $http.post("/api/removeProject",{prjId:prj._id}).success(function (data) {
                            if(data.errmsg==""){ alert("删除成功！",function(){ location.reload(); });
                            }else{ alert(data.errmsg); }
                        }).error(function (data) {
                            console.log(data);
                        });
                    });
                }
            }
            refreshFunc(1);
        }]
);

var parparePaper = function ($scope) {
    var Prj = {
        title:'',
        mayAttendNum:0,
        subtitle:'',
        mayStartDate:'',
        mayEndDate:'',
        unifiedExam:false,
        isUnion:null,
        examDuration:0,
        textmode:0,
        cantLoginAfterStart:'',
        randQues:null,
        examMode:'',
        prjtype:'',
        prjComment:'',
        prjPrompt:'',
        confirmComment:'',
        beforeEnterPaper:null,
        whenSubmitPapers:null,
        did:'',
        jumpCount:0,
        calculatormode:0,
        secretary:0,
        socialRecruitment:null,
        state:1,
        creator:'',
        updateor:'',
        faceRecognition:false,
        supervisor:0,
        personalMust:null,
        personalChooise:null,
        endExamNotes:'',
        positionList:[],
        stuMode:1
    };
    Prj.title = $(".prj_title").val(); if(Prj.title==""){ alert('请输入场次名称'); return; }
    Prj.subtitle = $(".prj_subtitle").val();
    Prj.prjtype="0";
    if($(".prj_prjtype .review-type .active").val()!=undefined){
        Prj.prjtype=$(".prj_prjtype .review-type .active").val();
    }
    if(Prj.prjtype==99){ Prj.prjtype = $(".prj_prjtype_input").val(); }
    if(Prj.prjtype===""){ alert('请输入应用场景'); return ; }
    if($(".xuanzeshijuanbox li").length==0){ alert('请选择试卷'); return ; }else{
        Prj.positionList= [];
        $(".xuanzeshijuanbox li").each(function(){
            Prj.positionList.push($(this).attr("positionid"));
        });
    }
    Prj.positionList = JSON.stringify(Prj.positionList);
    $(".addproclist").each(function () {
        if($(this).css("display")=="block"){
            Prj.mayStartDate = $(this).find(".prj_mayStartDate").val();
        }
    });
    if($(".prj_examMode button.active").val()==undefined){  alert('请选择考试模式'); return ; }
    Prj.examMode=1; Prj.examMode = parseInt($(".prj_examMode button.active").val());
    if(Prj.examMode==2){ Prj.unifiedExam = true; }

    if(Prj.examMode==1){
        Prj.mayStartDate = $(".addproclist.type1 .prj_mayStartDate").val();
        Prj.cantLoginAfterStart = $(".prj_cantLoginAfterStart").val();
        if(Prj.mayStartDate==""){ alert('请输入开考时间！'); return ;   }
        if(Prj.cantLoginAfterStart==""){ alert('请输入开考后多少分钟，不能再登陆考试系统！'); return ;   }
        if(!/^[0-9]+$/.test(Prj.cantLoginAfterStart)){ alert('请输入正整数！'); return ;  }

        if(Date.parse(Prj.mayStartDate)<=Date.now() && location.hash.indexOf('edit')==-1){ alert("开考时间不能早于当前时间！");return; }
        var totalTimeN = 0;
        $(".xuanzeshijuanbox li").each(function(){
            totalTimeN += parseInt($(this).attr('time'));
        });
        Prj.mayEndDate= new Date(Date.parse(Prj.mayStartDate) + totalTimeN * 60 * 1000).Format('yyyy-MM-dd hh:mmm');
    }else{
        Prj.mayStartDate = $(".addproclist.type2 .prj_mayStartDate").val();
        Prj.mayEndDate = $(".addproclist.type2 .prj_mayEndDate").val();
        if(Prj.mayStartDate==""){ alert('请输入开始时间！'); return ;   }
        if(Prj.mayEndDate==""){ alert('请输入系统关闭时间！'); return ;   }
        if(Date.parse(Prj.mayStartDate)<=Date.now() && location.hash.indexOf('edit')==-1){ alert("开考时间不能早于当前时间！");return; }
        if(Date.parse(Prj.mayEndDate)<=Date.parse(Prj.mayStartDate)){ alert("系统关闭时间务必晚于开始时间！");return; }
        if((Date.parse(Prj.mayEndDate) + 10 * 60 * 1000 )<=Date.parse(Prj.mayStartDate)){ alert("开始时间与关闭时间相距不能低于10分钟！");return; }
        Prj.cantLoginAfterStart="";
    }
    if($(".prj_stuMode .span.active").length==1){
        if($(".prj_stuMode .span.active").index()==1){
            Prj.stuMode = 2;
            Prj.positionTime = $($(".xuanzeshijuanbox li")[0]).attr("time");
            Prj.positionName = $($(".xuanzeshijuanbox li")[0]).attr("name");
        }
        Prj.mayAttendNum = 0;
    }
    if(Prj.stuMode == 2){
        if($(".xuanzeshijuanbox li").length>1){ alert('公开作答，目前仅能支持单个试卷！'); return ; }
        if(window.acm.exam_cands_num>=2000){
            if(!/^[0-9]+$/.test($scope.prj.mayAttendNum)){ alert('请输入预计考生人数！'); return ;  }
            if(parseInt($scope.prj.mayAttendNum)>0){ }else{ alert('请输入预计考生人数！'); return ; }
            Prj.mayAttendNum = parseInt($scope.prj.mayAttendNum);
        }else{
            Prj.mayAttendNum = 0;
        }
    }
    if($(".prj_jumpCount button.active").index()==0){
        Prj.jumpCount = 0;
    }else{
        if(!/^[1-9]*[1-9][0-9]*$/.test($(".prj_jumpCount .addpro-ci").val())){
            alert("请输入正整数！");return;
        }
        if(parseInt($(".prj_jumpCount .addpro-ci").val())==""){ alert("请输入警示次数！");return; }
        Prj.jumpCount = parseInt($(".prj_jumpCount .addpro-ci").val());
    }
    Prj.calculatormode =0;if($(".prj_calculator button.active").index()==0){ Prj.calculatormode=1; }
    Prj.secretary =0;if($(".prj_secretary button.active").index()==0){ Prj.secretary=1; }
    Prj.faceRecognition = false; if($(".prj_faceRecognition button.active").val()==1){ Prj.faceRecognition = true; }
    Prj.supervisor = 0;Prj.supervisor = $(".prj_supervisor button.active").index();
    Prj.did = $("#did").val();
    Prj.personalMust = getPersonalMust();
    Prj.personalMust = JSON.stringify(Prj.personalMust);
    Prj.personalChooise = getPersonalChooise();
    Prj.personalChooise = JSON.stringify(Prj.personalChooise);
    Prj.prjComment = $(".prj_prjComment").attr('data-selected'); if(Prj.prjComment==""){ Prj.prjComment = $(".prj_prjComment").attr('data-default'); }
    Prj.prjPrompt = $(".prj_prjPrompt").attr('data-selected'); if(Prj.prjPrompt==""){ Prj.prjPrompt = $(".prj_prjPrompt").attr('data-default'); }
    Prj.confirmComment = $(".prj_confirmComment").attr('data-selected'); if(Prj.confirmComment==""){ Prj.confirmComment = $(".prj_confirmComment").attr('data-default'); }
    Prj.whenSubmitPapers = $(".prj_whenSubmitPapers").attr('data-selected'); if(Prj.whenSubmitPapers==""){ Prj.whenSubmitPapers = $(".prj_whenSubmitPapers").attr('data-default'); }
    Prj.endExamNotes = $(".prj_endExamNotes").attr('data-selected'); if(Prj.endExamNotes==""){ Prj.endExamNotes = $(".prj_endExamNotes").attr('data-default'); }
    if(Prj.mayEndDate=="" || Prj.mayEndDate==null){ Prj.mayEndDate = new Date(Date.parse(Prj.mayStartDate)+ parseInt($("#positionList").attr("time")) * 60 * 1000).Format("yyyy-MM-dd hh:mm")  }
    if(Prj.faceRecognition ==true && $(".personalInfo .p_idcard input[value=1]").is(":checked")==false){
        alert("人脸识别情景，身份证号需要必填！");return;
    }
    return Prj;
}

paperControllers.controller("AddController", ['$scope', '$http', '$timeout', 'papers',
    function($scope, $http, $timeout, papers)
    {
        if(window.ue){ window.ue.destroy(); }
        $scope.prj = {jumpCount:0 };
        $(document).on('click','.review-type-1 button',function () {
            if($(this).hasClass('active')){

            } else{
                $(this).addClass('active').siblings().removeClass('active');
            }
        })
        /*权限判断*/
        $http.post('/api/userRight',{}).success(function (data) {
            $scope.rightStr = data.result.join(',');
        }).error(function (data) {
            console.log("服务器错误：" + data);
        });
        if($.cookie("jurisdiction")){
            $scope.jurisdiction = eval($.cookie("jurisdiction"));
        }

        $scope.showPublicExamInfo = function(str){
            if(str!=""){
                $(".qrcode").html('');
                $http.post("/api/prjToken",{inputStr:str}).success(function (data) {
                    $.cxDialog({
                        title: '进入考试的方式',
                        info: $(".publicExamBox"),
                        lockScroll: true,background: '#000',width:800,closeBtn:false,okText:'我知道了',
                        ok:function(){ window.history.go(-1); }
                    });
                    window.qrcode = new QRCode('qrcode', {
                        text:  'https://'+$scope.compInfo.compCode+'.acmcoder.com/cand/public?q='+data.result,
                        width: 800,
                        height: 800,
                        colorDark : '#000000',
                        colorLight : '#ffffff',
                        correctLevel : QRCode.CorrectLevel.H
                    });
                    $scope.publicPrj.codeLink = data.result;
                }).error(function (data) {
                    console.log(data);
                });
                var clipboard = new Clipboard('.clipBtn');
                clipboard.on('success', function(e) {
                    $(".publicExamBox .list1 a.link").html('<i class="fa fa-clipboard"></i>已复制');
                });
            }
        }

        $(".laydate_box").remove();
        var refreshFunc = function() {
            $(".prj_faceRecognition .review-type button").unbind('click').bind('click',function () {
                if(parseInt($scope.userInfo.exam_face_num)>0){
                    $(".prj_faceRecognition .review-type button").removeClass('active');
                    if($(this).attr("value")=="1"){
                        $('.review-type-M button').removeClass('active');
                        $($('.review-type-M button')[0]).addClass('active');
                        $('.review-type-M .hideNode').removeClass('active').hide();
                    } else {
                        $('.review-type-M .hideNode').show();
                    }
                    $(this).addClass('active');
                }else{
                    alert('您账户中人脸识别余额为0，<br>充值后才可以使用此功能！');
                }
                if($(this).val()==1){
                    $(".personalInfo .p_idcard input[value=1]").click();
                    $(".personalInfo .p_idcard input[value=0]").attr('disabled','disabled');
                    if(!$(".personalInfo .p_idcard").hasClass('must')){
                        $(".personalInfo .p_idcard").addClass('must');
                    }
                    if(!$(".personalInfo .p_idcard em").hasClass('ml')){
                        $(".personalInfo .p_idcard em").addClass('ml');
                    }
                    $(".personalInfo .p_idcard .close").remove();
                }else{
                    $(".personalInfo .p_idcard input[value=0]").removeAttr('disabled');
                    $(".personalInfo .p_idcard").removeClass('must');
                    $(".personalInfo .p_idcard em").removeClass('ml');
                    $(".personalInfo .p_idcard").append('<i class="close">x</i>');
                    window.initBindClick();
                }
            });
            $(".prj_stuMode .review-type button").unbind('click').bind('click',function () {
                if($(this).index()==1){
                    $(".prj_exam_cands_num").removeClass('hide');
                    if(window.acm.exam_cands_num>=2000){ $(".prj_mayAttendNum").removeClass('hide'); }
                }else{
                    if(!$(".prj_exam_cands_num").hasClass('hide')){
                        $(".prj_exam_cands_num").addClass('hide')
                    }
                    if(!$(".prj_mayAttendNum").hasClass('hide')){
                        $(".prj_mayAttendNum").addClass('hide')
                    }
                }
                $(this).addClass('active').siblings().removeClass('active');
            });
            $(".prj_prjtype .review-type button").unbind('click').bind('click',function () {
                if($(this).parents(".disabled").length==0){
                    $(".prj_prjtype .review-type button").removeClass('active');
                    $(this).addClass('active');
                    if ($(this).html().indexOf("其他") > -1) {
                        $(".xmlx_input").show().val('');
                    } else {
                        $(".xmlx_input").hide();
                    }
                }else{

                }
            });
            $(".prj_examMode button").unbind('click').bind('click',function () {
                if(!$(this).parents(".k_time").hasClass("disabled")){
                    $(".prj_examMode button").removeClass('active');
                    $(this).addClass('active');
                }
                if($(".prj_examMode button.active").val()==1){
                    $(".addprocbx .addproclist.type1").show();
                    $(".addprocbx .addproclist.type2").hide();
                }else{
                    $(".addprocbx .addproclist.type1").hide();
                    $(".addprocbx .addproclist.type2").show();
                }
            });

            $(".disabled .review-type button").unbind("click").bind("click",function(){
                console.log(1);
            });

            /*新增个人信息*/
            $('.add-n').click(function(){
                $.cxDialog({
                    title:'新增个人信息项',
                    info:$(".persionInfoBox"),
                    lockScroll: true,
                    background: '#000',
                    width:$scope.version==3?450:300,
                    okText:'新增',
                    ok:function(){
                        var text = $('#addPersonalInfoBox').val()
                        var pbox = $(".addPInfo4 p input:checked").val();
                        var inputType = $(".inputType").val();
                        var dataList = $(".addPInfo2 textarea").val();
                        if(text==''){
                            alertBackClickT('请填写个人信息', $('.add-n'));return false;
                        }else{
                             if(pbox==undefined){
                                 alertBackClickT('请选择此项选填或必填', $('.add-n'));return false;
                             }else {
                                 if(dataList!=''){
                                     var dataList2 = dataList.split('\n');
                                     dataList = [];
                                     for(var i=0;i<dataList2.length;i++){
                                         if(dataList2[i]!=""){
                                             var isExit = false;
                                             for(var j=0;j<dataList.length;j++){
                                                 if(dataList[j]==dataList2[i]){
                                                     isExit = true;
                                                 }
                                             }
                                             if(!isExit){
                                                 dataList.push(dataList2[i]);
                                             }
                                         }
                                     }
                                     dataList = dataList.join('@@');
                                 }

                                 if(pbox==1){
                                     $(".personalInfo .add-n").before('<span data-type="'+inputType+'" data-list="'+dataList+'"  class="new active"><div class="ptitle">'+text+'</div><div><input type="radio"  value="0"><sz>选</sz><input type="radio" value="1" checked="checked"><sz>必</sz></div><em></em><i class="close">x</i></span>');
                                     initBindClick();
                                 } else if(pbox==0) {
                                     $(".personalInfo .add-n").before('<span data-type="'+inputType+'" data-list="'+dataList+'"  class="new active"><div class="ptitle">'+text+'</div><div><input type="radio" checked="checked" value="0"><sz>选</sz><input type="radio" value="1"><sz>必</sz></div><em></em><i class="close">x</i></span>');
                                     initBindClick();
                                 }
                             }
                        }

                    }
                });

            });
            window.inputTypeSelect = function () {
                if($(".inputType").val()==1){
                    if(!$(".persionInfoBox .addPInfo2").hasClass('hide')){$(".persionInfoBox .addPInfo2").addClass('hide'); }
                }else{
                    $(".persionInfoBox .addPInfo2").removeClass('hide');
                }
            }

            initBindClick();

            $("#zaixian .szxz-type.review-type .reset").unbind('click').bind('click',function(){
                var defaultHtml = $(".prj_prjComment").attr('data-default');
                window.ue.setContent(defaultHtml)
            });
            $("#tishiBox .szxz-type.review-type .reset").unbind('click').bind('click',function(){
                var defaultHtml = $(".prj_prjPrompt").attr('data-default');
                window.ue.setContent(defaultHtml)
            });
            $("#sea-new .szxz-type.review-type .reset").unbind('click').bind('click',function(){
                var defaultHtml = $(".prj_confirmComment").attr('data-default');
                window.ue.setContent(defaultHtml)
            });
            $("#endBox .szxz-type.review-type .reset").unbind('click').bind('click',function(){
                var defaultHtml = $(".prj_endExamNotes").attr('data-default');
                window.ue.setContent(defaultHtml)
            });
        }
        window.initBindClick = function () {
            $(".personalInfo span i.close").unbind('click').bind('click',function(){
                $(this).parent().addClass('del').removeClass('active').find('em').remove();
                $(this).parent().find('input').prop("checked",false);
                $(this).remove();
                initBindClick();
            });

            $(".personalInfo input").unbind('click').bind("click",function(){
                if(!$(this).parent().parent().hasClass("must")){
                    if($(this).attr("value")=="1"){
                        $(this).parent().find("input[value=0]").prop("checked",false);
                    }else{
                        $(this).parent().find("input[value=1]").prop("checked",false);
                    }

                    if(!$(this).parent().parent().hasClass("active")){
                        $(this).parent().parent().addClass("active").append('<em></em><i class="close">x</i>');
                    }
                }
                initBindClick();
            });
            $(".personalInfo span").unbind('click').bind("click",function(){
                if(!$(this).hasClass("must") && !$(this).hasClass("del")){
                    if(!$(this).hasClass("active")){
                        $(this).find("input[value=0]").prop("checked",true);
                        $(this).addClass("active").append('<em></em><i class="close">x</i>');
                    }
                }
                $(this).removeClass("del")
                initBindClick();
            });
        }

        $http.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") + "&r=" + Math.random()).success(function (data) {
            $scope.userInfo = data.data;
            $scope.userInfo.exam_cands_num  = window.acm.exam_cands_num = parseInt($scope.userInfo.exam_cands_num) + parseInt($scope.userInfo.exam_day_input_left_num);
            if($scope.userInfo.exam_cands_num<100){ $scope.userInfo.exam_cands_numE =100; }else{ $scope.userInfo.exam_cands_numE=$scope.userInfo.exam_cands_num; }
            $scope.version = data.data.exam_version;
            $.cookie('version',data.data.exam_version);
            $.cookie('role_type', data.data.role_type);if($.cookie('role_type')==1 && $.cookie('version')!=1){ $('.yonghuGuanli').removeClass('hide'); }

            if($scope.version==3){
                $scope.prj.personalMustAns = { 'mobile':1,'email':1,'idcard':-1,'gender':1,'university':1,'major':0,'degree':1,'GraduateDate':0,'city':0 };
                $scope.prj.secretary=1;
            }else if($scope.version==2){
                $scope.prj.personalMustAns = { 'mobile':1,'email':1,'idcard':-1,'gender':-1,'university':-1,'major':-1,'degree':-1,'GraduateDate':-1,'city':-1 };
                $scope.prj.secretary=1;
            }else{
                $scope.prj.personalMustAns = { 'mobile':1,'email':1,'idcard':-1,'gender':-1,'university':-1,'major':-1,'degree':-1,'GraduateDate':-1,'city':-1 };
                $scope.prj.secretary=0;
            }
        }).error(function (data) {
            console.log(data);
        });
        $http.post('/api/compInfo').success(function (data) {
            $scope.compInfo = data.result;

            $scope.dateNow = new Date().getFullYear() + "年" +(new Date().getMonth()+1)+"月";
        }).error(function (data) {
            console.log(data);
        });
        $timeout(function () {
            refreshFunc();
            $($(".prj_prjtype button")[0]).click();
        });

        $scope.submitPaper = function () {
            if(!$(".addpro-btn.btn").hasClass("limited")){
                $(".addpro-btn.btn").addClass("limited")
                var Prj = parparePaper($scope);
                if(Prj==undefined){
                    $(".addpro-btn.btn").removeClass("limited");
                    return;
                }
                //过滤在线考试
                var replaceStr = Prj.prjtype;
                if(Prj.prjtype==0){ replaceStr='在线考试';  }
                else if(Prj.prjtype==1){ replaceStr='培训考核';  }
                else if(Prj.prjtype==2){ replaceStr='内部测评';  }
                else{ replaceStr = Prj.prjtype; }
                Prj.confirmComment = Prj.confirmComment.replace(/在线考试/ig,replaceStr);
                Prj.prjPrompt = Prj.prjPrompt.replace(/在线考试/ig,replaceStr);
                Prj.prjComment = Prj.prjComment.replace(/在线考试/ig,replaceStr);
                if(Prj.positionList=="" || Prj.positionList.length<20){ alert('请添加试卷');return; }

                if(Prj!=undefined){
                    $http.post("/api/newProject",Prj).success(function (data) {
                        if(data.errmsg=="" && Prj.stuMode==2){
                            Prj._id=data.result;
                            $scope.publicPrj = Prj;
                            $scope.showPublicExamInfo(Prj._id + "&&" + eval(Prj.positionList)[0] +"&&" +  $.parseJSON($.cookie("comp")).compCode);
                            $(".addpro-btn.btn").hide();
                        }else{
                            if(data.errmsg==""){ alert("添加成功！",function(){
                                $(".addpro-btn.btn").removeClass("limited");
                                $(".addpro-btn.btn").hide();
                                window.history.go(-1); });
                            }else{ alert(data.errmsg);
                                $(".addpro-btn.btn").removeClass("limited");
                            }
                        }
                    }).error(function (data) {
                        console.log(data);
                        $(".addpro-btn.btn").removeClass("limited");
                        $(".addpro-btn.btn").show();
                    });
                }else{
                    $(".addpro-btn.btn").removeClass("limited");
                }
            }
        }

        $("#xuanzeshijuanCilck").click(function(){
            if($(this).hasClass("disabled")){
                alert("该场次已经添加考生，不可编辑了！");
            }else{
                loadPositionsList(1,true);
                $.cxDialog({
                    title: '选择试卷',
                    info: $("#xuanzeshijuan"),
                    lockScroll: true,
                    background: '#000',
                    width:800,
                    height:405,
                    okText:"确认",
                    ok:function(){
                        if($("#xuanzeshijuan .bottom input:checked").length>=1){
                            $(".xuanzeshijuanbox").show();
                            $('#xuanzeshijuanCilck a').text('+ 修改试卷');
                        }else{
                            $('#xuanzeshijuanCilck a').text('+ 选择试卷');
                        }
                    }
                });
            }
        });
        var loadPositionsList = function(page,isSearch){
            var key1 = $(".montpro-ksBox .key1").val();
            var key2 = $(".montpro-ksBox .key2").val();
            $.post("/api/searchPosition",{positionTitle:key1,afterTitle:key2,page:page},function (data) {
                $scope.positionsArr = [];
                if(data.result.count>0){
                    for(var i=0;i<data.result.res.length;i++){
                        if(data.result.res[i].totalTime!=0) {
                            $scope.positionsArr.push(data.result.res[i]);
                        }
                    }
                    if(isSearch){
                        initLoadPager(data.result.count);
                    }
                }
                $scope.$apply();
                initBindFunction();
                initLoadValue();
            });
        }

        window.acm.curPage = 1;
        var initLoadPager = function(num_entries){
            if(num_entries>10){
                if((num_entries % 10)==0){ num_entries = parseInt(num_entries / 10); }else{
                    num_entries = parseInt( num_entries / 10)+1;
                }

                var PageCallback  = function (page_index,jq) {
                    if((page_index+1) != window.acm.curPage){
                        window.acm.curPage = page_index+1;
                        loadPositionsList(window.acm.curPage,false);
                    }
                }
                $(".pagination").pagination(num_entries, {
                    current_page: 0,
                    num_edge_entries: 3, //边缘页数
                    num_display_entries: 5, //主体页数
                    callback: PageCallback,
                    prev_text:'上一页',
                    next_text:'下一页',
                    items_per_page:1 //每页显示1项
                });
            }else{$(".pagination").html('');}
        }

        var initLoadValue = function () {
            var oldValue = $("#positionList").val();
            $("#xuanzeshijuan .xzsj-tab input").each(function () {
                if(oldValue.indexOf($(this).attr("value"))>-1){
                    if(!$(this).is(":checked")){
                        $(this).prop("checked",true);
                    }
                }
            });
        }
        $("#xuanzeshijuan .search").click(function(){
            loadPositionsList(1,true);
        });

        var initBindFunction = function () {
            $("#xuanzeshijuan .xzsj-tab input").click(function () {
                if($scope.version==3){
                    //总时长必须相同
                    if($(this).is(":checked")){
                        if(window.acm.paperTime==undefined){
                            window.acm.paperTime = $(this).attr('datatime');
                        }else{
                            if(window.acm.paperTime!=$(this).attr('datatime')){ alertBackClick('同一场次只能添加相同时长的试卷！',$("#xuanzeshijuanCilck"));return; }
                        }
                    }
                    var curValue = $(this).val();
                    var oldValue = $("#positionList").val();
                    if($(this).is(":checked")){
                        if(oldValue!=""){
                            oldValue +=";";
                        }
                        oldValue += curValue;
                        $(".xuanzeshijuanbox").append('<li positionid="'+ curValue +'" time="'+$(this).attr("datatime")+'" name="'+$(this).parent().parent().find(".ptitle").text()+'">'+$(this).parent().parent().find(".ptitle").text()+'<i></i></li>');
                    }
                    else{
                        if(oldValue.indexOf(curValue)>-1){
                            oldValue = oldValue.replace(curValue,"");
                            $(".xuanzeshijuanbox").find('li[positionid='+ curValue +']').remove();
                        }
                    }
                    oldValue = oldValue.replace(/;;/g,";");
                    if(oldValue==";"){oldValue="";}
                    if(oldValue==""){ window.acm.paperTime = undefined; }
                    $("#positionList").val(oldValue);
                }
                else{
                    var curValue = $(this).val();
                    $("#positionList").val(curValue);
                    $(".xuanzeshijuanbox").html('<li positionid="'+ curValue +'"  time="'+$(this).attr("datatime")+'" name="'+$(this).parent().parent().find(".ptitle").text()+'">'+$(this).parent().parent().find(".ptitle").text()+'<i></i></li>');
                }
                initLiBindFun();
            });
        }
        var initLiBindFun = function () {
            $(".xuanzeshijuanbox li i").unbind("click").bind("click",function(){
                var oldValue = $("#positionList").val();
                var curValue = $(this).parents("li").attr("positionid");
                oldValue = oldValue.replace(curValue,"");
                oldValue = oldValue.replace(/;;/g,";");
                $("#positionList").val(oldValue);
                $(this).parent().remove();
                if($("#positionList").val()==";"||$("#positionList").val()==""){ $("#positionList").val('');window.acm.paperTime=undefined; }
            });
        }

        $scope.downloadCanvas = function(){
            window.acm.downloadCanvas();
        }
    }]
);

var getPersonalMust = function () {
    var pArray = [{"realName":1}];
    if($(".personalInfo .p_mobile").hasClass("active")){ if($(".p_mobile input[type=radio]:checked").val()=="1"){ pArray.push({"mobile":1}); }else{pArray.push({"mobile":0});} }else{ pArray.push({"mobile":-1}); }
    if($(".personalInfo .p_email").hasClass("active")){ if($(".p_email input[type=radio]:checked").val()=="1"){ pArray.push({"email":1}); }else{pArray.push({"email":0});} }else{ pArray.push({"email":-1}); }
    if($(".personalInfo .p_idcard").hasClass("active")){ if($(".p_idcard input[type=radio]:checked").val()=="1"){ pArray.push({"idcard":1}); }else{pArray.push({"idcard":0});} }else{ pArray.push({"idcard":-1}); }
    if($(".personalInfo .p_gender").hasClass("active")){ if($(".p_gender input[type=radio]:checked").val()=="1"){ pArray.push({"gender":1}); }else{pArray.push({"gender":0});} }else{ pArray.push({"gender":-1}); }
    if($(".personalInfo .p_university").hasClass("active")){ if($(".p_university input[type=radio]:checked").val()=="1"){ pArray.push({"university":1}); }else{pArray.push({"university":0});} }else{ pArray.push({"university":-1}); }
    if($(".personalInfo .p_major").hasClass("active")){ if($(".p_major input[type=radio]:checked").val()=="1"){ pArray.push({"major":1}); }else{pArray.push({"major":0});} }else{ pArray.push({"major":-1}); }
    if($(".personalInfo .p_degree").hasClass("active")){ if($(".p_degree input[type=radio]:checked").val()=="1"){ pArray.push({"degree":1}); }else{pArray.push({"degree":0});} }else{ pArray.push({"degree":-1}); }
    if($(".personalInfo .p_GraduateDate").hasClass("active")){ if($(".p_GraduateDate input[type=radio]:checked").val()=="1"){ pArray.push({"GraduateDate":1}); }else{pArray.push({"GraduateDate":0});} }else{ pArray.push({"GraduateDate":-1}); }
    if($(".personalInfo .p_city").hasClass("active")){ if($(".p_city input[type=radio]:checked").val()=="1"){ pArray.push({"city":1}); }else{pArray.push({"city":0});} }else{ pArray.push({"city":-1}); }
    return pArray;
}
window.acm.downloadCanvas = function(){
    var type = "png";
    var canvas = $(".qrcode canvas")[0];
    //设置保存图片的类型
    var imgdata = canvas.toDataURL(type);
    //将mime-type改为image/octet-stream,强制让浏览器下载
    var fixtype = function (type) {
        type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
        var r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
    }
    imgdata = imgdata.replace(fixtype(type), 'image/octet-stream')
    //将图片保存到本地
    var saveFile = function (data, filename) {
        var link = document.createElement('a');
        link.href = data;
        link.download = filename;
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent(event);
    }
    var filename = new Date().toLocaleDateString() + '.' + type;
    saveFile(imgdata, filename);
}
var getPersonalChooise = function () {
    var pArray = [];
    $(".personalInfo .new.active").each(function () {
        var title = $(this).find(".ptitle").html();
        var type = $(this).find("input[type=radio]:checked").val();
        var control = $(this).attr('data-type');
        var data = $(this).attr('data-list');
        pArray.push({title:title,type:type,control:control,data:data});
    });
    return pArray;
}

paperControllers.controller("EditController", ['$scope', '$http', '$timeout','$routeParams','$location', 'papers',
    function($scope, $http, $timeout,$routeParams,$location, papers)
    {
        if(window.ue){ window.ue.destroy(); }
        $(document).on('click','.review-type-1 button',function () {
            if(!$(this).parents(".review-type-1").hasClass("disabled")){
                if($(this).hasClass('active')){

                } else{
                    $(this).addClass('active').siblings().removeClass('active');
                }
            }
        })
        if($.cookie("jurisdiction")){
            $scope.jurisdiction = eval($.cookie("jurisdiction"));
        }

        function keydown(e){
            if(e==null)e = window.event;
            if(e.keyCode==27 ){
                location.href='/paper#/list';
            }
        }
        document.onkeypress = keydown;
        document.onkeydown = keydown;

        $(".laydate_box").remove();
        $(".review-title span").html('<i></i>编辑考试场次');
        if (Object.isNull($routeParams.prjId)) {
            $location.path('/list');
            return;
        }
        $http.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") + "&r=" + Math.random()).success(function (data) {
            $scope.userInfo = data.data;
            $scope.userInfo.exam_cands_num = window.acm.exam_cands_num = parseInt($scope.userInfo.exam_cands_num) + parseInt($scope.userInfo.exam_day_input_left_num);
            if($scope.userInfo.exam_cands_num<100){ $scope.userInfo.exam_cands_numE =100; }else{ $scope.userInfo.exam_cands_numE=$scope.userInfo.exam_cands_num; }
            if($.cookie('version')){
                $scope.version = $.cookie('version');
            }else{
                $.cookie('version',data.data.exam_version);
                $scope.version = data.data.exam_version;
            }
            $.cookie('role_type', data.data.role_type);if($.cookie('role_type')==1 && $.cookie('version')!=1){ $('.yonghuGuanli').removeClass('hide'); }
        }).error(function (data) {
            console.log(data);
        });
        /*权限判断*/
        $http.post('/api/userRight',{}).success(function (data) {
            $scope.rightStr = data.result.join(',');
        }).error(function (data) {
            console.log("服务器错误：" + data);
        });

        $http.post('/api/compInfo',{}).success(function (data) {
            $scope.compInfo = data.result;
            refreshFunc();
        }).error(function (data) {
            console.log("服务器错误：" + data);
        });

        window.inputTypeSelect = function () {
            if($(".inputType").val()==1){
                if(!$(".persionInfoBox .addPInfo2").hasClass('hide')){$(".persionInfoBox .addPInfo2").addClass('hide'); }
            }else{
                $(".persionInfoBox .addPInfo2").removeClass('hide');
            }
        }

        $scope.showPublicExamInfo = function(str){
            if(str!=""){
                $(".qrcode").html('');
                $http.post("/api/prjToken",{inputStr:str}).success(function (data) {
                    $.cxDialog({
                        title: '进入考试的方式',
                        info: $(".publicExamBox"),
                        lockScroll: true,background: '#000',width:800,closeBtn:false,okText:'我知道了',
                        ok:function(){ window.history.go(-1); }
                    });
                    window.qrcode = new QRCode('qrcode', {
                        text: 'https://'+$scope.compInfo.compCode+'.acmcoder.com/cand/public?q='+data.result,
                        width: 800,
                        height: 800,
                        colorDark : '#000000',
                        colorLight : '#ffffff',
                        correctLevel : QRCode.CorrectLevel.H
                    });
                    $scope.publicPrj.codeLink = data.result;
                }).error(function (data) {
                    console.log(data);
                });
                var clipboard = new Clipboard('.clipBtn');
                clipboard.on('success', function(e) {
                    $(".publicExamBox .list1 a.link").html('<i class="fa fa-clipboard"></i>已复制');
                });
            }
        }

        var refreshFunc = function() {
            $(".prj_mayStartDate").attr('onclick',"laydate({istime: true, format: 'YYYY-MM-DD hh:mm'})");
            $http.post("/api/projectInfo",{prjId:$routeParams.prjId}).success(function (data) {
                $scope.prj = data.result;
                if($scope.prj.personalMust!=undefined && $scope.prj.personalMust.length>0){
                    $scope.prj.personalMustAns = {};
                    $scope.prj.personalMust.forEach(function(item){
                        $.extend($scope.prj.personalMustAns,item);
                    });
                }
                $scope.prj.jumpCount = parseInt($scope.prj.jumpCount);
                if($scope.prj.positionList.length>0){

                    window.acm.paperTime = $scope.prj.positionList[0].totalTime;
                }

                if(!isNaN($scope.prj.prjtype)){ $scope.prj.prjtype = parseInt($scope.prj.prjtype); }
                $scope.prj.prjStates = false;
                if($scope.prj.examMode==1){ $scope.prj.mayEndDate = '';  }
                $scope.prjList = '';
                for(var i=0;i<$scope.prj.positionList.length;i++){
                    if($scope.prjList!=''){ $scope.prjList +=','; }
                    $scope.prjList +=$scope.prj.positionList[i]['_id'];
                    if($scope.prj.positionList[i].acturalCandCount>0 || $scope.prj.positionList[i].emptyCandCount>0  || $scope.prj.positionList[i].testCandCount>0 ){ $scope.prj.prjStates = true;  }
                }


                if($scope.prj.positionList[0].prepared){
                    $scope.prj.prjStates = true;
                }else{
                    if($scope.version==3){
                        $scope.prj.prjStates = false;
                    }else{
                        if($scope.prj.examMode==2){
                            if(Date.now() < Date.parse($scope.prj.mayStartDate) ){
                                $scope.prj.stateStr = 0;
                            }
                            else if( Date.parse($scope.prj.mayEndDate) > Date.now() && (Date.parse($scope.prj.mayStartDate)< Date.now())){
                                $scope.prj.stateStr = 1;
                                if( $scope.prj.positionList[0].candCount!=0){
                                    $scope.prj.prjStates = true;
                                }
                            }
                            else{
                                $scope.prj.stateStr = 2;
                                $scope.prj.prjStates = true;
                            }
                        }else{
                            //时间 - 集中考试
                            if((Date.parse($scope.prj.mayStartDate)+ parseInt($scope.prj.maxPositionTime) * 60 * 1000) < Date.now()){
                                $scope.prj.stateStr = 2;
                                $scope.prj.prjStates = true;
                            }
                            else if((Date.parse($scope.prj.mayStartDate)+ parseInt($scope.prj.maxPositionTime) * 60 * 1000) >Date.now() && (Date.parse($scope.prj.mayStartDate)< Date.now())){
                                $scope.prj.stateStr = 1;
                                if( $scope.prj.positionList[0].candCount!=0){
                                    $scope.prj.prjStates = true;
                                }
                            }
                            else{
                                $scope.prj.stateStr = 0;
                            }
                        }
                    }
                }
                $timeout(function () {
                    $(".xuanzeshijuanbox li i").unbind("click").bind("click",function(){
                        var oldValue = $("#positionList").val();
                        var curValue = $(this).parents("li").attr("positionid");
                        oldValue = oldValue.replace(curValue,"");
                        oldValue = oldValue.replace(";;",";");
                        $("#positionList").val(oldValue);
                        $(this).parent().remove();
                        if($("#positionList").val()==";"||$("#positionList").val()==""){ $("#positionList").val('');window.acm.paperTime=undefined; }
                    });
                    if(($scope.prj.stateStr==1 && $scope.prj.positionList[0].candCount!=0) || $scope.prj.stateStr ==2){
                        $(".review-type button").unbind("click")
                    }
                    initBindClick();
                    if($scope.prj.stuMode==2){
                        $(".prj_exam_cands_num").removeClass('hide');
                        if($scope.prj.mayAttendNum>0){ $(".prj_mayAttendNum ").removeClass('hide'); }
                    }

                });
            }).error(function (data) {
                console.log(data);
            });
            $(".prj_faceRecognition .review-type button").unbind('click').bind('click',function () {
                if($(".prj_faceRecognition").hasClass("disabled")){

                }else{
                    if(parseInt($scope.userInfo.exam_face_num)>0){
                        $(".prj_faceRecognition .review-type button").removeClass('active');
                        if($(this).attr("value")=="1"){
                            $('.review-type-M button').removeClass('active');
                            $($('.review-type-M button')[0]).addClass('active');
                            $('.review-type-M .hideNode').removeClass('active').hide();
                        } else {
                            $('.review-type-M .hideNode').show();
                        }
                        $(this).addClass('active');
                    }else{
                        alert('您账户中人脸识别余额为0，<br>充值后才可以使用此功能！');
                    }
                }
                if($(this).val()==1){
                    $(".personalInfo .p_idcard input[value=1]").click();
                    $(".personalInfo .p_idcard input[value=0]").attr('disabled','disabled');
                    if(!$(".personalInfo .p_idcard").hasClass('must')){
                        $(".personalInfo .p_idcard").addClass('must');
                    }
                    if(!$(".personalInfo .p_idcard em").hasClass('ml')){
                        $(".personalInfo .p_idcard em").addClass('ml');
                    }
                    $(".personalInfo .p_idcard .close").remove();
                }else{
                    $(".personalInfo .p_idcard input[value=0]").removeAttr('disabled');
                    $(".personalInfo .p_idcard").removeClass('must');
                    $(".personalInfo .p_idcard em").removeClass('ml');
                    $(".personalInfo .p_idcard").append('<i class="close">x</i>');
                    window.initBindClick();
                }

            });

            $(".prj_stuMode .review-type button").unbind('click').bind('click',function () {
                if($(this).index()==1){
                    $(".prj_exam_cands_num").removeClass('hide');
                    if(window.acm.exam_cands_num>=2000){ $(".prj_mayAttendNum").removeClass('hide'); }
                }else{
                    if(!$(".prj_exam_cands_num").hasClass('hide')){
                        $(".prj_exam_cands_num").addClass('hide')
                    }
                    if(!$(".prj_mayAttendNum").hasClass('hide')){
                        $(".prj_mayAttendNum").addClass('hide')
                    }
                }
                $(this).addClass('active').siblings().removeClass('active');
            });


            $(".prj_prjtype .review-type button").unbind('click').bind('click',function () {
                if($(this).parents(".disabled").length==0){
                    $(".prj_prjtype .review-type button").removeClass('active');
                    $(this).addClass('active');
                    if ($(this).html().indexOf("其他") > -1) {
                        $(".xmlx_input").show().val('');
                    } else {
                        $(".xmlx_input").hide();
                    }
                }else{

                }
            });

            $(".prj_examMode button").unbind('click').bind('click',function () {
                if(!$(this).parents(".k_time").hasClass("disabled")){
                    $(".prj_examMode button").removeClass('active');
                    $(this).addClass('active');
                }
                if($(".prj_examMode button.active").val()==1){
                    $(".addprocbx .addproclist.type1").show();
                    $(".addprocbx .addproclist.type2").hide();
                }else{
                    $(".addprocbx .addproclist.type1").hide();
                    $(".addprocbx .addproclist.type2").show();
                }
            });

            $(".disabled .review-type button,.disabled.review-type button").unbind("click").bind("click",function(){
                console.log(1);
            });

            /*新增个人信息*/
            $('.add-n').click(function(){
                $.cxDialog({
                    title:'新增个人信息项',
                    info:$(".persionInfoBox"),
                    lockScroll: true,
                    background: '#000',
                    width:$scope.version==3?450:300,
                    okText:'新增',
                    ok:function(){
                        var text = $('#addPersonalInfoBox').val()
                        var pbox = $(".addPInfo4 p input:checked").val();
                        var inputType = $(".inputType").val();
                        var dataList = $(".addPInfo2 textarea").val();
                        if(text==''){
                            alertBackClickT('请填写个人信息', $('.add-n'));return false;
                        }else{
                            if(pbox==undefined){
                                alertBackClickT('请选择此项选填或必填', $('.add-n'));return false;
                            }else {
                                if(dataList!=''){
                                    var dataList2 = dataList.split('\n');
                                    dataList = [];
                                    for(var i=0;i<dataList2.length;i++){
                                        if(dataList2[i]!=""){
                                            var isExit = false;
                                            for(var j=0;j<dataList.length;j++){
                                                if(dataList[j]==dataList2[i]){
                                                    isExit = true;
                                                }
                                            }
                                            if(!isExit){
                                                dataList.push(dataList2[i]);
                                            }
                                        }
                                    }
                                    dataList = dataList.join('@@');
                                }

                                if(pbox==1){
                                    $(".personalInfo .add-n").before('<span data-type="'+inputType+'" data-list="'+dataList+'"  class="new active"><div class="ptitle">'+text+'</div><div><input type="radio"  value="0"><sz>选</sz><input type="radio" value="1" checked="checked"><sz>必</sz></div><em></em><i class="close">x</i></span>');
                                    initBindClick();
                                } else if(pbox==0) {
                                    $(".personalInfo .add-n").before('<span data-type="'+inputType+'" data-list="'+dataList+'"  class="new active"><div class="ptitle">'+text+'</div><div><input type="radio" checked="checked" value="0"><sz>选</sz><input type="radio" value="1"><sz>必</sz></div><em></em><i class="close">x</i></span>');
                                    initBindClick();
                                }
                            }
                        }

                    }
                })
            })

            initBindClick();


            $("#zaixian .szxz-type.review-type .reset").unbind('click').bind('click',function(){
                var defaultHtml = $(".prj_prjComment").attr('data-default');
                window.ue.setContent(defaultHtml)
            });
            $("#tishiBox .szxz-type.review-type .reset").unbind('click').bind('click',function(){
                var defaultHtml = $(".prj_prjPrompt").attr('data-default');
                window.ue.setContent(defaultHtml)
            });
            $("#sea-new .szxz-type.review-type .reset").unbind('click').bind('click',function(){
                var defaultHtml = $(".prj_confirmComment").attr('data-default');
                window.ue.setContent(defaultHtml)
            });
            $("#endBox .szxz-type.review-type .reset").unbind('click').bind('click',function(){
                var defaultHtml = $(".prj_endExamNotes").attr('data-default');
                window.ue.setContent(defaultHtml)
            });
        }

        var initBindClick = function () {
            $(".personalInfo span i.close").unbind('click').bind('click',function(){
                $(this).parent().addClass('del').removeClass('active').find('em').remove();
                $(this).parent().find('input').prop("checked",false);
                $(this).remove();
                initBindClick();
            });

            $(".personalInfo input").unbind('click').bind("click",function(){
                if(!$(this).parent().parent().hasClass("must")){
                    if($(this).attr("value")=="1"){
                        $(this).parent().find("input[value=0]").prop("checked",false);
                    }else{
                        $(this).parent().find("input[value=1]").prop("checked",false);
                    }

                    if(!$(this).parent().parent().hasClass("active")){
                        $(this).parent().parent().addClass("active").append('<em></em><i class="close">x</i>');
                    }
                }
                initBindClick();
            });
            $(".personalInfo span").unbind('click').bind("click",function(){
                if(!$(this).hasClass("must") && !$(this).hasClass("del")){
                    if(!$(this).hasClass("active")){
                        $(this).find("input[value=0]").prop("checked",true);
                        $(this).addClass("active").append('<em></em><i class="close">x</i>');
                    }
                }
                $(this).removeClass("del")
                initBindClick();
            });
        }

        $timeout(function () {
            initBindClick();
            $("#xuanzeshijuanCilck").click(function(){
                if($(this).hasClass("disabled")){
                    alert("该场次已经添加考生，不可编辑了！");
                }else{
                    loadPositionsList(1,true);
                    $.cxDialog({
                        title: '选择试卷',
                        info: $("#xuanzeshijuan"),
                        lockScroll: true,
                        background: '#000',
                        width:800,
                        height:405,
                        okText:"确认",
                        ok:function(){
                            if($("#xuanzeshijuan .bottom input[type='radio']:checked").length>1){
                                alertBackClick('只能选择一个试卷',$("#xuanzeshijuanCilck"));
                            }else if($("#xuanzeshijuan .bottom input[type='radio']:checked").length==1){
                                $(".xuanzeshijuanbox").show();
                                $('#xuanzeshijuanCilck a').text('+ 修改试卷');
                            }else{
                                $('#xuanzeshijuanCilck a').text('+ 选择试卷');
                            }
                        }
                    });
                }
            });
            $("#xuanzeshijuan .search").click(function(){
                loadPositionsList(1,true);
            });
        });

        var loadPositionsList = function(page,isSearch){
            var key1 = $(".montpro-ksBox .key1").val();
            var key2 = $(".montpro-ksBox .key2").val();
            $.post("/api/searchPosition",{positionTitle:key1,afterTitle:key2,page:page},function (data) {
                $scope.positionsArr = [];
                if(data.result.count>0){
                    for(var i=0;i<data.result.res.length;i++){
                        if(data.result.res[i].totalTime!=0) {
                            $scope.positionsArr.push(data.result.res[i]);
                        }
                    }
                    if($(".xuanzeshijuanbox li").length==0 && $scope.prj.positionList.length>0 ){
                        $scope.positionsArr.push($scope.prj.positionList[0]);
                    }
                    $scope.$apply();
                    if(isSearch){
                        initLoadPager(data.result.count);
                    }
                }else{
                   $("#xuanzeshijuan .xzsj-tab tbody").html(' <tr style="border-bottom: none!important;"><td colspan="8" style="text-align: center"><img src="/images/test-p-add.png" style="position: relative;top: 50%;transform: translateY(10%)";><br><br><br><br><span style="color: #999">没有查询到信息，请尝试下其他方式！</span></td></tr>')
                }
                initBindFunction();
                initLoadValue();
            });
        }

        window.acm.curPage = 1;
        var initLoadPager = function(num_entries){
            if(num_entries>10){
                if((num_entries % 10)==0){ num_entries = parseInt(num_entries / 10); }else{
                    num_entries = parseInt( num_entries / 10)+1;
                }

                var PageCallback  = function (page_index,jq) {
                    if((page_index+1) != window.acm.curPage){
                        window.acm.curPage = page_index+1;
                        loadPositionsList(window.acm.curPage,false);
                    }
                }
                $(".pagination").pagination(num_entries, {
                    current_page: 0,
                    num_edge_entries: 3, //边缘页数
                    num_display_entries: 5, //主体页数
                    callback: PageCallback,
                    prev_text:'上一页',
                    next_text:'下一页',
                    items_per_page:1 //每页显示1项
                });
            }else{$(".pagination").html('');}
        }

        var initLoadValue = function () {
            var oldValue = $("#positionList").val();
            $("#xuanzeshijuan .xzsj-tab input").each(function () {
                if(oldValue.indexOf($(this).attr("value"))>-1){
                    if(!$(this).is(":checked")){
                        $(this).prop("checked",true);
                    }
                }
            });
        }

        $scope.downloadCanvas = function(){
            window.acm.downloadCanvas();
        }

        var initBindFunction = function () {
            $("#xuanzeshijuan .xzsj-tab input").click(function () {
                if($scope.version==3){
                    //总时长必须相同
                    if($(this).is(":checked")){
                        if(window.acm.paperTime==undefined){
                            window.acm.paperTime = $(this).attr('datatime');
                        }else{
                            if(window.acm.paperTime!=$(this).attr('datatime')){ alertBackClick('同一场次只能添加相同时长的试卷！',$("#xuanzeshijuanCilck"));return; }
                        }
                    }
                    var curValue = $(this).val();
                    var oldValue = $("#positionList").val();
                    if($(this).is(":checked")){
                        if(oldValue!=""){
                            oldValue +=";";
                        }
                        oldValue += curValue;
                        $(".xuanzeshijuanbox").append('<li positionid="'+ curValue +'" time="'+$(this).attr("datatime")+'" name="'+$(this).parent().parent().find(".ptitle").text()+'">'+$(this).parent().parent().find(".ptitle").text()+'<i></i></li>');
                    }
                    else{
                        if(oldValue.indexOf(curValue)>-1){
                            oldValue = oldValue.replace(curValue,"");
                            $(".xuanzeshijuanbox").find('li[positionid='+ curValue +']').remove();
                        }
                    }
                    oldValue = oldValue.replace(/;;/g,";");
                    if(oldValue==";"){oldValue="";}
                    if(oldValue==""){ window.acm.paperTime = undefined; }
                    $("#positionList").val(oldValue);
                }
                else{
                    var curValue = $(this).val();
                    $("#positionList").val(curValue);
                    $(".xuanzeshijuanbox").html('<li positionid="'+ curValue +'" time="'+$(this).attr("datatime")+'" name="'+$(this).parent().parent().find(".ptitle").text()+'">'+$(this).parent().parent().find(".ptitle").text()+'<i></i></li>');
                }
                initLiBindFun();
            });
        }
        var initLiBindFun = function () {
            $(".xuanzeshijuanbox li i").unbind("click").bind("click",function(){
                var oldValue = $("#positionList").val();
                var curValue = $(this).parents("li").attr("positionid");
                oldValue = oldValue.replace(curValue,"");
                oldValue = oldValue.replace(";;",";");
                $("#positionList").val(oldValue);
                $(this).parent().remove();
            });
        }
        $scope.publicPrj = {};
        $scope.submitPaper = function () {
            if(!$(".addpro-btn.btn").hasClass("limited")){
                $(".addpro-btn.btn").addClass("limited");
                var Prj = parparePaper($scope);
                if(Prj==undefined){
                    $(".addpro-btn.btn").removeClass("limited");
                    return;
                }
                var isDelBool = true;
                if($scope.prj.positionList.length>0){
                    for(var i=0;i<$scope.prj.positionList.length;i++){
                        if(Prj.positionList.indexOf($scope.prj.positionList[i]._id)==-1 && $scope.prj.positionList[i].candCount>0){
                            isDelBool = false;
                        }
                    }
                }
                if(!isDelBool){
                    alert('请先删除被移除的大卷中的考生！');return;
                }

                var replaceStr = Prj.prjtype;
                if(Prj.prjtype==0){ replaceStr='在线考试';  }
                else if(Prj.prjtype==1){ replaceStr='培训考核';  }
                else if(Prj.prjtype==2){ replaceStr='内部测评';  }
                else{ replaceStr = Prj.prjtype; }
                Prj.confirmComment = Prj.confirmComment.replace(/在线考试/ig,replaceStr);
                Prj.prjPrompt = Prj.prjPrompt.replace(/在线考试/ig,replaceStr);
                Prj.prjComment = Prj.prjComment.replace(/在线考试/ig,replaceStr);
                if(Prj.positionList=="" || Prj.positionList.length<20){ alert('请添加试卷');return; }

                if(Prj!=undefined){
                    Prj.prjId = $routeParams.prjId;

                    if(Date.parse(Prj.mayStartDate)<=Date.now()){
                        confirm('检测到开考时间早于当前时间，您确定要提交吗？',function () {
                            $.post("/api/editProject",Prj,function(data){
                                if(Prj.stuMode==2){
                                    $scope.publicPrj = Prj;
                                    $scope.showPublicExamInfo($scope.prj._id + "&&" + $scope.prj.positionList[0]._id + "&&" + $.parseJSON($.cookie("comp")).compCode);
                                    $(".addpro-btn.btn").removeClass("limited");
                                }else{
                                    if(data.errmsg==""){ alert("编辑成功！",function(){  window.history.go(-1); });
                                    }else{ alert(data.errmsg); }
                                    $(".addpro-btn.btn").removeClass("limited");
                                }
                            });
                        });
                        $(".addpro-btn.btn").removeClass("limited");
                    }else{
                        $.post("/api/editProject",Prj,function(data){
                            if(Prj.stuMode==2){
                                $scope.publicPrj = Prj;
                                $scope.showPublicExamInfo($scope.prj._id + "&&" + $scope.prj.positionList[0]._id + "&&" + $.parseJSON($.cookie("comp")).compCode);
                                $(".addpro-btn.btn").removeClass("limited");
                            }else{
                                if(data.errmsg==""){ alert("编辑成功！",function(){  window.history.go(-1); });
                                }else{ alert(data.errmsg); }
                                $(".addpro-btn.btn").removeClass("limited");
                            }
                        });
                    }
                }else{
                    $(".addpro-btn.btn").removeClass("limited");
                }
            }

        }
        $scope.prj={};
    }]
);

paperControllers.filter('trustHtml', function ($sce) {
   return function (input) {
       input = input.toString();
       input = input.replace(/<br>/g,'\n').replace(/<br\/>/g,'\n');
        return $sce.trustAsHtml(input);

    }
});

paperControllers.controller("ViewController", ['$scope', '$http', '$timeout','$routeParams','$location', 'papers',
    function($scope, $http, $timeout,$routeParams,$location, papers)
    {
        if (Object.isNull($routeParams.positionId)) {
            $location.path('/list');
            return;
        }
        if($.cookie("jurisdiction")){
            $scope.jurisdiction = eval($.cookie("jurisdiction"));
        }

        $("#navbar-collapse ul li").removeClass("hov");$(".banner_list ul li").removeClass("active");
        $($("#navbar-collapse ul li")[1]).addClass("hov");$($(".banner_list ul li")[0]).addClass("active");

        var refreshFunc = function() {
            $http.post("/api/positionDetail",{positionId:$routeParams.positionId}).success(function (data) {
                $scope.position = data.result;

                $http.post("/api/paperList",{positionId:$routeParams.positionId}).success(function (data) {
                    $scope.papers = data.result;
                    $scope.position.time=0;
                    $scope.position.quesNum=0;
                    $scope.position.score=0;
                    for(var i=0;i<$scope.papers.length;i++){
                        if(parseInt($scope.papers[i].allTime)>0){ $scope.position.time +=$scope.papers[i].allTime;  }
                        if(parseInt($scope.papers[i].quesNum)>0){ $scope.position.quesNum +=$scope.papers[i].quesNum;  }
                        if(parseInt($scope.papers[i].fenzhi)>0){ $scope.position.score += parseFloat($scope.papers[i].fenzhi);  }
                    }


                    $timeout(function () {
                        $scope.loadPaperQuestion($scope.papers[0]);
                    });

                }).error(function (data) {
                    console.log(data);
                });

            }).error(function (data) {
                console.log(data);
            });

        }
        refreshFunc();

        $scope.loadPaperQuestion = function (paper) {
            $scope.selectedPaper = paper;
            $scope.selectedPaper.index = $(".Add_Paper_left .leftGuid[paperid="+paper._id+"]").index();
            $http.post("/api/allQuestionInPaper",{positionId:$routeParams.positionId,paperId:paper._id}).success(function (data) {
                $scope.paperQues = data.result;
                var idNo = 1;
                $scope.paperQues.forEach(function(item){
                    if(item.ques.length==1){
                        item.ques[0].idNo = idNo;idNo++;
                    }else{
                        for(var i=0;i<item.ques.length;i++){
                            item.ques[i].idNo = idNo;idNo++;
                        }
                    }
                });
                $timeout(function(){
                    hljs.initHighlighting.called = false;
                    hljs.initHighlighting();
                });
            }).error(function (data) {
                console.log(data);
            });
        }
        $scope.loadPaper = function (paper) {
            $(".Add_Paper_left .leftGuid").removeClass("cur");
            $(".Add_Paper_left .leftGuid[paperid="+paper._id+"]").addClass("cur");
            $scope.loadPaperQuestion(paper);
        }
    }]
);

window.getNowFormatDate=function(date){var seperator1="-";var seperator2=":";var month=date.getMonth()+1;var strDate=date.getDate();if(month>=1&&month<=9){month="0"+month}if(strDate>=0&&strDate<=9){strDate="0"+strDate}var currentdate=date.getFullYear()+seperator1+month+seperator1+strDate ;return currentdate};
