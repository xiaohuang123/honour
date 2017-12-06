/**
 * Created by lifubang on 2015/6/1.
 */

var PositionControllers = angular.module("PositionControllers", ['ngAnimate']);
PositionControllers.factory('Positions', function () {
    return {
        prjId: ''
        , data: null
    };
});
PositionControllers.controller("ListController", ['$scope', '$http', '$routeParams', '$location', '$timeout', 'Positions',
        function ($scope, $http, $routeParams, $location, $timeout, Positions) {
           var version='';
            window.acm.pageNum = 1;
            if (!Object.isNullString($routeParams.curPage)) {
                window.acm.pageNum = parseInt($routeParams.curPage);
            }else{

            }
            $scope.inputKey = "";
            /*版本判断*/
            $http.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") + "&r=" + Math.random(), {}).success(function (data) {
                $scope.version = data.data.exam_version;
                $.cookie('version',data.data.exam_version,{ path: '/'})
                $.cookie('role_type', data.data.role_type);if($.cookie('role_type')==1 && $.cookie('version')!=1){ $('.yonghuGuanli').removeClass('hide'); }
                version= data.data.exam_version;
                if(version!=1) {
                    if (data.data.role_right.indexOf('2') == -1) {//查询到2
                        $('.backToPaperList').hide();
                    }
                }
            }).error(function (data) {
                console.log(data);
            });
            /*权限判断*/
            $http.post('/api/userRight', {}).success(function (data) {
                $scope.rightStr = data.result.join(',');
            }).error(function (data) {
                console.log("服务器错误：" + data);
            });
            $scope.initLoadPositionList = function (pageNum) {
                var keyword = $(".select-n").val();
                if (keyword == undefined) { keyword = ""; }
                $(".myPositionList .plist-table").remove();

                if ($.cookie("jurisdiction")) {
                    $scope.jurisdiction = eval($.cookie("jurisdiction"));
                }
                if ($(".pageShow").hasClass("hide")) { $(".pageShow").addClass("hide"); }
                $http.post("/api/positionByKey", { keyword: keyword, pageSize: 10, pageNum: pageNum }).success(function (data) {
                    $scope.positions = data.result.positionlist;
                    $scope.inputKey = keyword;
                    $scope.positionsCount = data.result.count;
                    if ($scope.positions != undefined) {
                        $scope.positions.forEach(function (position) {
                            position.totalScore = 0;
                            position.totalQuesNum = 0;
                            position.randPaper = [];//抽选paper
                            position.routinePaper = [];//常规paper
                            position.tagPaper = [];//常规paper
                            position.papers.forEach(function (paper) {
                                paper.fenzhi = parseFloat(paper.fenzhi).toFixed(1);
                                if (paper.randPaper==undefined && paper.tag==undefined) { position.totalScore += parseFloat(paper.fenzhi); }
                                if (!isNaN(paper.quesNum)) { position.totalQuesNum += parseInt(paper.quesNum); }
                                if(paper.randPaper!=undefined){ position.randPaper.push(paper); }
                                else if(paper.tag!=undefined){ position.tagPaper.push(paper); }
                                else{ position.routinePaper.push(paper); }
                            });
                            if(position.randPaper.length>0){
                                position.totalScore = position.totalScore + parseInt(position.randPaper[0].randPaper)*parseFloat(position.randPaper[0].fenzhi);
                            }
                            if(position.tagPaper.length>0){
                                var oneTag = position.tagPaper[0].tag[0];
                                for(var i=0;i<position.tagPaper.length;i++){
                                    for(var j=0;j<position.tagPaper[i].tag.length;j++){
                                        if(position.tagPaper[i].tag[j]==oneTag){
                                            position.totalScore += parseFloat( position.tagPaper[i].fenzhi);
                                        }
                                    }
                                }
                            }
                            //处理tag
                            if(position.tagPaper.length>0){
                                var tagList = [];
                                for(var i=0;i<position.tagPaper.length;i++){
                                    for(var j=0;j<position.tagPaper[i].tag.length;j++){
                                        var isExit = false;
                                        for(var k=0;k<tagList.length;k++){
                                            if(tagList[k].tag==position.tagPaper[i].tag[j]){
                                                tagList[k].papers.push(position.tagPaper[i]);
                                                isExit = true;
                                            }
                                        }
                                        if(!isExit){
                                            var ps = [];
                                            ps.push(position.tagPaper[i]);
                                            tagList.push({"tag":position.tagPaper[i].tag[j],papers:ps});
                                        }
                                    }
                                }
                                //时间
                                for(var i=0;i<tagList.length;i++){
                                    tagList[i].time =0;
                                    for(var j=0;j<tagList[i].papers.length;j++){
                                        tagList[i].time += tagList[i].papers[j].allTime;
                                    }
                                }
                                position.tagList = tagList;
                                //排序
                                var paixu = [{charAt:65},{charAt:66},{charAt:67},{charAt:68},{charAt:69},{charAt:70},{charAt:71},{charAt:72},{charAt:73},{charAt:74},{charAt:75},{charAt:76},{charAt:77},{charAt:78},{charAt:79},{charAt:80},{charAt:81},{charAt:82},{charAt:83},{charAt:84},{charAt:85},{charAt:86},{charAt:87},{charAt:88},{charAt:89},{charAt:90}];
                                for(var i=0;i<position.tagList.length;i++){
                                    var charAt = (position.tagList[i].tag.substring(0,1)).charCodeAt();
                                    for(var j=0;j<paixu.length;j++){
                                        if(paixu[j].charAt == charAt){
                                            $.extend(paixu[j],position.tagList[i]);
                                        }
                                    }
                                }
                                position.tagList = [];
                                for(var j=0;j<paixu.length;j++){
                                    if(paixu[j].tag != undefined){
                                        position.tagList.push(paixu[j]);
                                    }
                                }
                            }
                            if(position.fromPositionId!=undefined || position.prepared){ position.preparedExt = true; }
                        })
                    } else {
                        $scope.positions = [];
                    }
                    if (window.acm.pageNum == pageNum) {
                        $scope.initLoadPager(pageNum);
                    }
                    window.acm.pageNum = pageNum;
                    $(".result_loading").remove();
                    $timeout(function () {
                        initBindPageFun();

                        $(".pageShow").removeClass("hide");

                        $(".editansweraftersubmit ul li").click(function(){
                            if(!$(this).parents('.editansweraftersubmit').hasClass("disabled")){
                                $(this).addClass('A_N_P_Ali').siblings().removeClass('A_N_P_Ali');
                            }
                        });

                        $(document).on('click','.quesPrev ul li',function(){
                            if(!$(this).hasClass('A_N_P_Ali')){
                                $(this).addClass('A_N_P_Ali').siblings().removeClass('A_N_P_Ali');

                                if($(this).index()==1){
                                    if(!$(".editansweraftersubmit").hasClass("disabled")){
                                        $(".editansweraftersubmit").addClass("disabled");
                                    }
                                    $(".editansweraftersubmit ul li").removeClass("A_N_P_Ali");
                                    $($(".editansweraftersubmit ul li")[1]).addClass("A_N_P_Ali");
                                }else{
                                    if(!$(".editansweraftersubmit").hasClass("isTOne")){
                                        $(".editansweraftersubmit").removeClass("disabled");
                                    }
                                }
                            }
                        });

                        //创建子卷弹窗
                        $(".Add_Paper_Tone.Add_Paper_Tone3").click(function () {
                            $(".paper_type").removeClass("disabled");
                            $.cxDialog({
                                title: '添加子卷',
                                info: $('.newSonPaper'),
                                lockScroll: true,
                                background: '#000',
                                width: 860,
                                okText: "提交",
                                ok: function () {
                                    $('.t-one3').hide();
                                    if (!$('.btn_ok').hasClass("limited")) {
                                        $(this).addClass("limited");
                                        var post = {
                                            prjId: '',
                                            title: '',
                                            name: '',
                                            allTime: 0,
                                            orderNo: '',
                                            randQues: false,
                                            randOpts: false,
                                            randAns: false,
                                            quesPrev: true,
                                            editAnswerAfterSubmit: false,
                                            forCode: false,
                                            forOXCode: false,
                                            forceSubmit: false,
                                            allQuesPanel: true,
                                            forPractise: false,
                                            answerType: false,
                                            positionid: '',
                                        }
                                        post.prjId = $("#prjList").val(); if (post.prjId == "") { alertBackClick("请选择场次！", $("#t-two")); $(this).removeClass("limited"); return false; }
                                        post.title = $($(".t-three .Add_Paper_T9-2 input")[0]).val(); if (post.title == "") { alertBackClick("请输入子卷名称！", $("#t-two")); $(this).removeClass("limited"); return false; }
                                        post.name = $($(".t-three .Add_Paper_T9-2 input")[1]).val();
                                        post.allTime = $(".t-three .Add_Paper_T9-3 input").val(); if (post.allTime == "") { alertBackClick("请输入子卷时长！", $("#t-two")); $(this).removeClass("limited"); return false; }
                                        var re = /^[0-9]+$/;
                                        if (!re.test(post.allTime) || parseInt(post.allTime) <= 0 || parseInt(post.allTime) > 999) { alertBackClick("子卷时长请输入整数！", $("#t-two")); $(this).removeClass("limited"); return false; }
                                        post.forPractise = false; if ($($(".t-three .paper_type ul li")[2]).hasClass("A_N_P_Ali")) { post.forPractise = true; }
                                        post.forCode = false; if ($($(".t-three .paper_type ul li")[1]).hasClass("A_N_P_Ali")) { post.forCode = true; }
                                        post.forOXCode = false; if ($($(".t-three .paper_type ul li")[3]).hasClass("A_N_P_Ali")) { post.forOXCode = true; }
                                        post.randQues = false; if ($($(".t-three .randques ul li")[0]).hasClass("A_N_P_Ali")) { post.randQues = true; }
                                        post.randOpts = false; if ($($(".t-three .randOpts ul li")[0]).hasClass("A_N_P_Ali")) { post.randOpts = true; }
                                        if ($($(".t-three .quesPrev ul li")[1]).hasClass("A_N_P_Ali")) { post.quesPrev = false;post.allQuesPanel = false; }
                                        post.editAnswerAfterSubmit = false; if ($($(".t-three .editansweraftersubmit ul li")[0]).hasClass("A_N_P_Ali")) { post.editAnswerAfterSubmit = true; }
                                        post.answerType = false; if ($($(".t-three .answerType ul li")[0]).hasClass("A_N_P_Ali")) { post.answerType = true; }
                                        post.positionid = window.acm.positionId;
                                        post.paperComment = '您仔细阅读试题，并合理安排答题时间。建议按顺序作答不要跳出考试页面，完成后请点击“提交该部分”';

                                        $.post("/api/newPaper", post, function (data) {
                                            if (data.errmsg == "") {
                                                alert("添加子卷成功！", function () { location.reload(); });
                                            } else { alert(data.errmsg); }
                                            $(".btn_ok").removeClass("limited");
                                        });
                                    }
                                }
                            });
                        });
                        //编辑子卷弹窗
                        $scope.editSonPaper = function (pp,p) {
                            $(".paper_type").addClass("disabled");
                            $scope.editPaper = pp;
                            initZijuanBox(pp);
                            $.cxDialog({
                                title: '编辑子卷',
                                info: $('.newSonPaper'),
                                lockScroll: true,
                                background: '#000',
                                width: 860,
                                okText: "提交",
                                ok: function () {
                                    if (!$('.btn_ok').hasClass("limited")) {
                                        $(this).addClass("limited");
                                        var post = {
                                            prjId: '',
                                            title: '',
                                            name: '',
                                            allTime: 0,
                                            orderNo: '',
                                            randQues: false,
                                            randOpts: false,
                                            randAns: false,
                                            quesPrev: true,
                                            editAnswerAfterSubmit: false,
                                            forOXCode: false,
                                            forceSubmit: false,
                                            allQuesPanel: true,
                                            forPractise: false,
                                            answerType: false
                                        }
                                        post.prjId = $("#prjList").val(); if (post.prjId == "") { alertBackClick("请选择场次！", $("#t-two")); $(this).removeClass("limited"); return false; }
                                        post.title = $($(".t-three .Add_Paper_T9-2 input")[0]).val(); if (post.title == "") { alertBackClick("请输入子卷名称！", $("#t-two")); $(this).removeClass("limited"); return false; }
                                        post.name = $($(".t-three .Add_Paper_T9-2 input")[1]).val();
                                        post.allTime = $(".t-three .Add_Paper_T9-3 input").val(); if (post.allTime == "") { alertBackClick("请输入子卷时长！", $("#t-two")); $(this).removeClass("limited"); return false; }
                                        var re = /^[0-9]+$/;
                                        if (!re.test(post.allTime) || parseInt(post.allTime) <= 0 || parseInt(post.allTime) > 999) { alertBackClick("子卷时长请输入整数！", $("#t-two")); $(this).removeClass("limited"); return false; }

                                        post.randQues = false; if ($($(".t-three .randques ul li")[0]).hasClass("A_N_P_Ali")) { post.randQues = true; }
                                        post.randOpts = false; if ($($(".t-three .randOpts ul li")[0]).hasClass("A_N_P_Ali")) { post.randOpts = true; }
                                        post.quesPrev = true; if ($($(".t-three .quesPrev ul li")[1]).hasClass("A_N_P_Ali")) { post.quesPrev = false;post.allQuesPanel=false; }
                                        post.editAnswerAfterSubmit = false; if ($($(".t-three .editansweraftersubmit ul li")[0]).hasClass("A_N_P_Ali")) { post.editAnswerAfterSubmit = true; }
                                        post.answerType = false; if ($($(".t-three .answerType ul li")[0]).hasClass("A_N_P_Ali")) { post.answerType = true; }
                                        post.paperComment = '您仔细阅读试题，并合理安排答题时间。建议按顺序作答不要跳出考试页面，完成后请点击“提交该部分”';
                                        post.paperId = pp._id;
                                        post.positionId = p._id

                                        $.post("/api/editPaper", post, function (data) {
                                            if (data.errmsg == "") {
                                                alert("编辑子卷成功！", function () { location.reload(); });
                                            } else { alert(data.errmsg); }
                                            $(".btn_ok").removeClass("limited");
                                        });
                                    }
                                }
                            });

                        }

                        $(".paper_type ul li").unbind('click').bind('click',function(){
                            if($(this).parents(".disabled").length==1){
                                return;
                            }
                            if(!$(this).hasClass('A_N_P_Ali')){
                                $(this).addClass('A_N_P_Ali').siblings().removeClass('A_N_P_Ali');
                                if($(this).index()==1){
                                    $(".randOpts").addClass('hide');
                                    $(".editansweraftersubmit ul li").removeClass('A_N_P_Ali');
                                    $($(".editansweraftersubmit ul li")[0]).addClass('A_N_P_Ali');
                                }else{
                                    $(".randOpts").removeClass('hide');
                                }
                            }
                        });
                    });

                }).error(function (data) {
                    console.log(data);

                });
            }

            $scope.extendExam = function(){

            }
            $scope.addExistingPaper = function(){
                var p = $scope.selectPosition;
                if(p!=undefined){
                    /*var paperArr = [];
                     for(var i=0;i<p.papers.length;i++){
                     paperArr.push(p.papers[i]._id);
                     }
                     $("#selectpaper").val(paperArr.join(';'));*/
                    $scope.loadPapers();
                }else{
                    location.reload();
                }
            }

            $scope.delPosition = function(p){
                window.acm.positionId = p._id;
                if(p.prepared == true){
                    alert('试卷已锁定，无法删除！');
                }else{
                    $.cxDialog({
                        title: '提示',
                        info: '<div class="cxDialogContent" style="padding: 20px;"><table><tr><td><i class="fa fa-exclamation-triangle"></i></td><td><span class="fbig fb">您确定要删除吗？</span><br> 删除后无法恢复！</td></tr></table> </div>',
                        lockScroll: true,
                        width:330,
                        background: '#000',
                        okText: '确定',
                        noText:'取消',
                        ok: function () {
                            $.post("/api/removePosition",{positionId:window.acm.positionId},function (data) {
                                if(data.errmsg==""){ alert("删除成功！",function(){ location.reload(); });
                                }else{ alert(data.errmsg);}
                            })
                        },
                        no:function () {

                        }
                    })
                }


            }
            $scope.paperModel = {};
            $scope.addPaper = function(p,$event){
                $scope.selectPosition = p;
                $scope.selectedPaper = [];
                $eventEl = $($event.target);
                $(".newSonPaper input").val('');
                $(".newSonPaper .Add_Paper_T9-4 li").removeClass('A_N_P_Ali');
                $($(".newSonPaper .Add_Paper_T9-4.paper_type  li")[0]).addClass('A_N_P_Ali');
                $($(".newSonPaper .Add_Paper_T9-4.randques  li")[0]).addClass('A_N_P_Ali');
                $($(".newSonPaper .Add_Paper_T9-4.randOpts  li")[0]).addClass('A_N_P_Ali');
                $($(".newSonPaper .Add_Paper_T9-4.quesPrev  li")[0]).addClass('A_N_P_Ali');
                $($(".newSonPaper .Add_Paper_T9-4.editansweraftersubmit  li")[1]).addClass('A_N_P_Ali');
                $($(".newSonPaper .Add_Paper_T9-4.answerType  li")[1]).addClass('A_N_P_Ali');

                if ($eventEl.parents(".plist-table").find(".plist-ctab2 tr").not(".tr_header").length >= 15) {
                    alert('子卷数量不能超过15个！'); return;
                }
                window.acm.positionId = $eventEl.parents(".plist-table").attr("positionid");

                 if($eventEl.attr('class')=='disabled'){

                  } else{
                     $('.t-one3').css('display', 'block');
                 }
            }
            $scope.editPaper = function (p) {
                    $(".ownPaper ul li").removeClass("A_N_P_Ali");
                    $scope.paperModel = p;
                    window.acm.positionId = p._id;
                    var timeType = parseInt(p.timeType);
                    var openType = parseInt(p.openType);
                    var openTime = parseInt(p.openTime);

                    if ($scope.version == 2 || $scope.version == 3) {
                        $(".ListTTT ul li").removeClass("A_N_P_Ali");$(".ListT ul li").removeClass("A_N_P_Ali");$(".ListTT ul li").removeClass("A_N_P_Ali");
                        if(timeType==1){ $($(".ListTTT ul li")[1]).addClass("A_N_P_Ali");  }else{ $($(".ListTTT ul li")[0]).addClass("A_N_P_Ali"); }
                        if(openType==1){ $($(".ListT ul li")[1]).addClass("A_N_P_Ali");  }else{$($(".ListT ul li")[0]).addClass("A_N_P_Ali"); }
                        if(openTime==1){ $($(".ListTT ul li")[1]).addClass("A_N_P_Ali");  }else{$($(".ListTT ul li")[0]).addClass("A_N_P_Ali");}
                        if(timeType==1 && openType==0&& openType!==""){ $(".ListTT").show(); }else{ $(".ListTT").hide(); }
                    }

                    var initWidth = 600;
                    if ($scope.rightStr.indexOf('right_id17') > -1) { initWidth = 800; }
                    $.cxDialog({
                        title: '编辑试卷',
                        info: $('.ownPaper '),
                        lockScroll: true,
                        background: '#000',
                        width: initWidth,
                        okText: '提交',
                        ok: function () {
                            var postData = {
                                positionTitle: '',
                                afterTitle: '',
                                timeType: 0,
                                openType: 0,
                                openTime: 0,
                                prjId: '',
                                did: '',
                                positionCode:null
                            };
                            postData.positionId = window.acm.positionId;
                            postData.prjId = $("#prjList").val(); if (postData.prjId == "") { alert("请选择场次！"); return false; }
                            postData.did = $("#did").val();
                            postData.positionTitle = $scope.paperModel.positionTitle;
                            postData.afterTitle = $scope.paperModel.afterTitle;
                            if (postData.positionTitle == "") { alert('请输入试卷名称！'); return false; }
                            if ($scope.version == 1 || $scope.version == 4) {  } else {
                                if($(".ListTTT ul li.A_N_P_Ali").length>0){
                                    postData.timeType = parseInt($(".ListTTT ul li.A_N_P_Ali").attr("data-id"));
                                }
                                if($(".ListT ul li.A_N_P_Ali").length>0){
                                    postData.openType = parseInt($(".ListT ul li.A_N_P_Ali").attr("data-id"));
                                }
                                if($(".ListTT ul li.A_N_P_Ali").length>0){
                                    postData.openTime = parseInt($(".ListTT ul li.A_N_P_Ali").attr("data-id"));
                                }
                            }
                            if(postData.timeType==NaN){  postData.timeType = 0; }
                            if(postData.openType==NaN){  postData.openType = 0; }
                            if(postData.openTime==NaN){  postData.openTime = 0; }
                            if($scope.version==3){ postData.positionCode = $(".ownPaper .paperCode").val(); }
                            $.post("/api/editPosition", postData, function (data) {
                                if (data.errmsg == "") {
                                    alert("试卷编辑成功！", function () { location.reload(); });
                                } else { alert(data.errmsg); }
                            })

                        }
                    });
                }
            $scope.inputKey = "";
            window.acm.paperPageNum = 1;
            $scope.initPaperList = function (pageNum) {
                var postData = {};
                postData.title = $(".montpro-ksBox .key1").val();
                postData.name = $(".montpro-ksBox .key2").val();
                postData.pageSize = 10;
                postData.pageNum = pageNum;
                postData.positionId = window.acm.positionId;
                if($scope.selectPosition.timeType==1){
                    postData.afterSubmit = false;
                }

                $http.post("/api/paperListOfAll", postData).success(function (data) {
                    $scope.paperList = data.result.list;
                    $scope.paperCount = data.result.count;
                    $scope.inputKey = $(".montpro-ksBox .key1").val() + $(".montpro-ksBox .key2").val();
                    if (window.acm.paperPageNum == pageNum) {
                        $scope.initLoadPaperPager(pageNum);
                    }

                    window.acm.paperPageNum = pageNum;
                    $timeout(function () {
                        $scope.initLoadValue();
                        //选择已有试卷，弹窗
                        $scope.initBindFunction();
                    })
                }).error(function (data) {
                    console.log(data);
                });
            }
            $scope.loadPapers = function () {
                $("#pagination2").html('');
                $scope.initPaperList(1);
                $('.t-one').css('display', 'none');
                $.cxDialog({
                    title: '请选择您的子卷',
                    info: $("#xuanzeshijuan"),
                    lockScroll: true,
                    background: '#000',
                    width: 800,
                    okText: "确认",
                    ok: function () {
                        $scope.addPaperIntoPosition();
                        /* $.cxDialog({
                             title: '选择已有子卷',
                             info: $('.existing'),
                             lockScroll: true,
                             background: '#000',
                             width:630,
                             height:360,
                             okText:"确认",
                             ok:function(){
                                 window.acm.addPaperIntoPosition();
                             },
                             noText:"取消",
                             no:function(){
 
                             }
                         });*/
                        return false;
                    }
                });
            }

            $scope.addPaperIntoPosition = function () {
                var paperIds = $scope.selectedPaper.join(',');
                $.cxDialog.close();
                paperIds = paperIds.replace(/,,/g,',');
                if(paperIds.indexOf(',')==0){ paperIds = paperIds.substring(1); }

                if(paperIds!=''){
                    if(paperIds.split(',').length + $scope.selectPosition.papers.length>15){
                        alert('子卷数量不能超过15个！'); return false;
                    }else{
                        $.post("/api/addPaperIntoPosition",{ positionId:window.acm.positionId,paperIds:paperIds },function (data) {
                            if(data.errmsg==""){ alert("添加成功！",function(){ location.reload(); });
                            }else{ alert(data.errmsg); }
                        });
                    }
                }

            }

            $scope.delRandPaper = function(p){
                    if(p.prepared){
                        alert('试卷已经锁定！不可以更改！');return;
                    }
                    $.cxDialog({
                        title: '提示',
                        info: '<div style="text-align: center;padding: 20px">您确认要取消此抽选答卷的设置吗？<br>取消设置后，所有子卷依然保留，按常规设置进行作答！</div>',
                        lockScroll: true,
                        background: '#000',
                        width: 420,
                        okText:'确认',
                        ok:function(){
                            var cancelPapers = [];
                            for(var i=0;i<p.randPaper.length;i++){
                                cancelPapers.push(p.randPaper[i]._id);
                            }
                            cancelPapers = cancelPapers.join(',');
                            $http.post('/api/cancelRandPapers', {positionId:p._id,paperIds:cancelPapers}).success(function (data) {
                                if(data.errmsg==""){
                                    alert("删除成功！",function(){ location.reload(); });
                                }else{ alert(data.errmsg); }
                            }).error(function (data) {
                                console.log("服务器错误：" + data);
                            });
                        },
                        noText:'取消',
                        no:function () {

                        }
                    });
            }
            $scope.selectPosition = {};
            $scope.targetEle = {};
            $scope.randPaper = function(p,$event){
                if(p.prepared){
                    alert('试卷已经锁定！不可以更改！');return;
                }
                $scope.targetEle =$event;
                var randNum = 0;
                for(var i=0;i<p.papers.length;i++){
                    randNum++;
                }
                if(randNum<2){ alert('试卷的数量需在2套以上<br>才能使用抽选答卷功能！');return; }

                if($scope.selectPosition._id!=undefined && $scope.selectPosition._id!=p._id){ window.acm.edit = 0; }
                $scope.selectPosition = p;
                if(p.randPaper!=undefined && p.randPaper.length>0){
                    $scope.randPaperS(p,$event);
                }else if(p.tagPaper!=undefined && p.tagPaper.length>0){
                    $scope.randPaperAB(p);
                }else{
                    $.cxDialog({
                        title: '请选择',
                        info: $('.randTypeBox'),
                        lockScroll: true,
                        background: '#000'
                    });
                }
            }
            $scope.randPaperS = function(p,$event){
                if(p.prepared){
                   alert('试卷已经锁定！不可以更改！');return;
                }
                var randNum = 0;
                $scope.randPaperData=[];
                $scope.selectRandPaperCount =0;
                for(var i=0;i<p.papers.length;i++){
                    if(p.papers[i].answerType!=true){
                        randNum++;
                        $scope.randPaperData.push(p.papers[i]);
                    }
                    if(p.papers[i].randPaper!=undefined){
                        $scope.selectRandPaperCount++;
                        $scope.selectRand = p.papers[i].randPaper;
                    }
                }
                if($(".randPaperList input:checked").length>0){
                    $scope.selectRandPaperCount = $(".randPaperList input:checked").length;
                }

                if(randNum<2){ alert('选答试卷的数量需在2套以上<br>才能使用抽选答卷功能！');return; }


                $.cxDialog({
                    title: '设置考生自选作答试卷',
                    info: $('.select_son_page'),
                    lockScroll: true,
                    background: '#000',
                    width:800,
                    okText:"确认",
                    ok:function(){
                        var number = $('.choutiInput').val();
                        var isBool  =  true;
                        if(number==""){
                            alertBackClick("请输入正整数",$event.target);isBool = false;
                        }
                        if(isNaN(number) || parseInt(number)==0 || parseInt(number)!=parseFloat(number)){
                            alertBackClick("请输入正整数",$event.target);isBool = false;
                        }
                        if(parseInt($('.chouti').text())<=parseInt($('.choutiInput').val())){
                            alertBackClick("抽选子卷数务必小于已选子卷数",$event.target) ;isBool = false;
                        }
                        $(".randPaperList tr td input:checked").each(function(){
                            if(parseInt($(this).attr('data-score'))=="0"){
                                alertNoBack('您选择了0分值的子卷',function(){
                                    $scope.randPaperS($scope.selectPosition,$scope.$eventEl);
                                });isBool =  false;
                            }
                            else if(parseInt($(this).attr('data-time'))=="0"){
                                alertNoBack('您选择了0分钟的子卷',function(){
                                    $scope.randPaperS($scope.selectPosition,$scope.$eventEl);
                                });isBool =  false;
                            }
                        })
                        if(isBool){
                            var postData = {};
                            postData.paperIds = [];
                            $(".randPaperList tr td input:checked").each(function(){
                                postData.paperIds.push($(this).val());
                                postData.allTime = parseInt($(this).attr('data-time'));
                            })
                            postData.paperIds = postData.paperIds.join(',');
                            postData.rand = parseInt(number);
                            postData.positionId=p._id
                            var cancelPapers = [];
                            for(var i=0;i<p.papers.length;i++){
                                cancelPapers.push(p.papers[i]._id);
                            }
                            cancelPapers = cancelPapers.join(',');
                            $http.post('/api/cancelRandPapers', {positionId:p._id,paperIds:cancelPapers}).success(function (data) {
                                if(data.errmsg==""){
                                    $http.post('/api/randPaper', postData).success(function (data) {
                                        if(data.errmsg==""){ alert("设置成功！",function(){ location.reload(); });
                                        }else{ alert(data.errmsg); }
                                    }).error(function (data) {
                                        console.log("服务器错误：" + data);
                                    });
                                }else{ alert(data.errmsg); }
                            }).error(function (data) {
                                console.log("服务器错误：" + data);
                            });
                        }
                        return false;
                    }
                });
            }
            $scope.randPaperAB = function(p){
                if(p.prepared){
                    alert('试卷已经锁定！不可以更改！');return;
                }
                $scope.initPaperAB(p);
                $.cxDialog({
                    title: '抽整套试卷作答',
                    info: $('.randABBox'),
                    lockScroll: true,background: '#000',
                    width: 800,
                    okText: "提交",
                    ok: function () {
                        var postData = {};
                        postData.positionId = $scope.selectPosition._id;
                        postData.paperIds = [];
                        postData.confirmTip = $(".randABBox .step3 textarea").val();
                        postData.paperAB = [];
                        var p = $scope.selectPosition;
                        for(var i=0;i<p.papers.length;i++){
                            postData.paperIds.push(p.papers[i]._id);
                        }
                        postData.paperIds = postData.paperIds.join(',');
                        for(i=0;i<p.papers.length;i++){
                            if($(".randABBox .selectList li[paperid="+p.papers[i]._id+"]").length>0){
                                var pl = {};
                                pl.title = [];
                                $(".randABBox .selectList li[paperid="+p.papers[i]._id+"]").each(function(){
                                    pl.title.push($(this).parents(".list").find(".numberPaper").html() + "：" +  $(this).parents(".list").find(".title").find("input").val());
                                    postData.time = $(this).parents(".list").find(".title").find(".labtime").html();
                                });
                                if(isNaN(postData.time)){ postData.time =0; }else{ postData.time = parseInt(postData.time); }
                                pl.paper = p.papers[i]._id;
                                postData.paperAB.push(pl);
                            }
                        }

                        //验证
                        var topBool = true;
                        $(".randABBox .step2 .list").each(function(){
                            if($(this).find(".title").find("input").val()==""){ alertNoBack('每组子卷的标题都不能为空',function(){ $scope.randPaperAB(p); }); topBool=false;  }
                        });
                        if(postData.confirmTip==''){alertNoBack('请输入备注',function(){ $scope.randPaperAB(p);  });topBool = false;}
                        var timeBool = -1;var scoreBool = -1;
                        $(".randABBox .step2 .list").each(function(){
                            if(timeBool==-1){
                                timeBool = parseInt($(this).find(".labtime").html());
                            }
                            else{
                                if(parseInt($(this).find(".labtime").html())!=timeBool){
                                    alertNoBack('每组子卷的总时间必须相同！',function(){ $scope.randPaperAB(p); });
                                    topBool=false;
                                }
                            }
                            var scoreT= 0;
                            $(this).find(".selectList li").each(function(){
                                scoreT+= parseFloat($(this).attr("score"))
                            });
                            if(scoreBool==-1){
                                scoreBool = scoreT;
                            }
                            else{
                                if(scoreBool!=scoreT){
                                    alertNoBack('每组子卷的总分值必须相同！',function(){ $scope.randPaperAB(p); });
                                    topBool=false;
                                }
                            }

                        });
                        if(postData.paperAB.length==0){alertNoBack('请选择组卷数量',function(){ $scope.randPaperAB(p); });topBool = false;}
                        var otherTotalTime = 0;
                        for(var i=0;i<p.papers.length;i++){
                            var isExit = false;
                            for(var j=0;j<postData.paperAB.length;j++){
                                if(postData.paperAB[j].paper==p.papers[i]._id){
                                    isExit = true;
                                }
                            }
                            if(!isExit){
                                otherTotalTime += p.papers[i].allTime;
                            }
                        }
                        postData.time = postData.time + otherTotalTime;
                        if(topBool){
                            //cancel
                            $http.post('/api/cancelRandPapers', postData).success(function (data) {
                                if(data.errmsg==""){
                                    $http.post('/api/setPaperAB', postData).success(function (data) {
                                        if(data.errmsg==""){
                                            alert("保存成功！",function(){ location.reload(); });
                                        }else{ alert(data.errmsg); }
                                    }).error(function (data) {
                                        console.log("服务器错误：" + data);
                                    })

                                }else{ alert(data.errmsg); }
                            }).error(function (data) {
                                console.log("服务器错误：" + data);
                            })


                        }
                        return false;
                    }
                });
            }

            $scope.delTagPaper =  function(p){
                confirm('您确定要删除抽卷作答关系吗？',function(){
                    var postData = {};
                    postData.positionId = p._id;
                    postData.paperIds = [];
                    for(var i=0;i<p.papers.length;i++){
                        postData.paperIds.push(p.papers[i]._id);
                    }
                    postData.paperIds = postData.paperIds.join(',');
                    $http.post('/api/cancelRandPapers', postData).success(function (data) {
                        if(data.errmsg==""){
                            alert("删除关系成功！",function(){ location.reload(); });
                        }else{ alert(data.errmsg); }
                    }).error(function (data) {
                        console.log("服务器错误：" + data);
                    })
                })
            }

            window.acm.edit = 0;
            $scope.initPaperAB = function(p){
                if(window.acm.edit==0){
                    if(p.tagList!=undefined){
                        $(".randABSelect").easyDropDown('select',p.tagList.length-1);
                        $scope.setTag = p.tagList;
                        $(".randABBox .step2 .list:not(.ng-scope)").remove();
                        $timeout(function(){
                            initABpaperBindFun();
                        });
                        window.acm.edit=1;
                    }else{
                        $scope.setTag = undefined;
                        $(".randABSelect").easyDropDown('select',1);
                        $(".randABBox .step2 .list:gt(1)").remove();
                        window.acm.edit=1;
                    }
                }
            }

            $scope.selectedABinput = function(){
                var c = $(".randABSelect").val();
                if(c!="" && parseInt(c)>0){
                    if(parseInt(c)>$('.randABBox .step2 .list').length){
                        var alreadyNum = $('.randABBox .step2 .list').length;
                        for(var i=alreadyNum;i<parseInt(c);i++){
                            $('.randABBox .step2').append($(".randABBox .copy").html().replace(/A卷/g,String.fromCharCode(65 + i)+'卷'));
                        }
                    }else{
                        $('.randABBox .step2 .list:gt('+(parseInt(c)-1)+')').remove();
                    }
                }
                $scope.abPaperList=[];
                for(var i=0;i<$scope.selectPosition.papers.length;i++){
                     if($scope.selectPosition.papers[i].answerType!=true){
                         $scope.abPaperList.push($scope.selectPosition.papers[i]);
                     }
                 }
                initABpaperBindFun();
            }

            var initABpaperBindFun = function(){
                $(".selectList li i").unbind("click").bind("click",function(){
                    var old = $(this).parents('.list').find('.labtime').html();
                    $(this).parents('.list').find('.labtime').html(parseInt(old)-parseInt($(this).parent().attr('time')));
                    $(this).parent().remove();
                });
                $(".randABBox .selectPaper a").unbind('click').bind('click',function(){
                    var targetUI = $(this).parent().parent().siblings();
                    $(".abPaperSelectListBox tr input:checked").each(function () {
                        $(this).prop("checked",false);
                    });
                    $(".abPaperSelectListBox tr").each(function () {
                        $(this).find("span").removeClass('color-blue');
                        $(this).find("h2").removeClass('color-blue');
                    });
                    targetUI.find("li").each(function(item){
                        var paperId = $(this).attr('paperId');
                        $(".abPaperSelectListBox input[value="+paperId+"]").click();
                    })
                    $.cxDialog({
                        title: '抽整套试卷作答-选择试卷',
                        info: $('.abPaperSelectListBox'),
                        lockScroll: true,background: '#000',
                        width: 800,
                        okText: "选好了",closeBtn:false,
                        ok: function () {
                            var paperIds = [];
                            targetUI.html('');
                            if($(".abPaperSelectListBox tr input:checked").length>0){
                                var totalTime = 0;
                                var totalScore = 0;
                                var isBool = true;
                                $(".abPaperSelectListBox tr input:checked").each(function () {
                                    if(parseInt($(this).attr('data-score'))=="0"){
                                        alertNoBack('您选择了0分值的子卷',function(){
                                            $scope.randPaperAB($scope.selectPosition);
                                        });isBool =  false;
                                    }
                                    else if(parseInt($(this).attr('data-time'))=="0"){
                                        alertNoBack('您选择了0分钟的子卷',function(){
                                            $scope.randPaperAB($scope.selectPosition);
                                        });isBool =  false;
                                    }
                                    else{
                                        paperIds.push($(this).val());
                                        targetUI.append('<li paperId="'+ $(this).val() +'" score="'+$(this).attr('data-score')+'" time="'+$(this).attr('data-time')+'">'+$(this).attr('data-title')+'<i></i></li>');
                                        totalTime += parseInt($(this).attr('data-time'));
                                        totalScore += parseFloat($(this).attr('data-score'));
                                    }
                                });
                                if(isBool){

                                    targetUI.removeClass('hide');
                                    //时间
                                    targetUI.parents(".list").find(".title .fl.fb .labtime").html(totalTime);
                                    targetUI.parents(".list").find(".title .fl.fb").removeClass('hide');
                                    targetUI.parents(".list").attr("score",totalScore);

                                    $scope.randPaperAB($scope.selectPosition);
                                    initABpaperBindFun();
                                }
                            }else{
                                targetUI.addClass('hide');
                                if(!targetUI.parents(".list").find(".title .fl.fb").hasClass('hide')){targetUI.parents(".randABBox").find(".title .fl.fb").addClass('hide');}

                                $scope.randPaperAB($scope.selectPosition);
                                initABpaperBindFun();
                            }

                            return false;
                        }
                    });
                });
            }

            $scope.selectRandPaperCount = 0;
            $scope.checkRand = function(pl,$event){
                //抽选的子卷分数和时间必须相同
                var fenshuBool = true;var fenshu=-1;
                var timeBool = true;var time=-1;
                $(".randPaperList input:checked").each(function(){
                    if(fenshu==-1){ fenshu = parseInt($(this).attr("data-score")); }
                    else{
                        if(fenshu!=parseInt($(this).attr("data-score"))){ fenshuBool = false; }
                    }
                    if(time==-1){ time = parseInt($(this).attr("data-time")); }
                    else{
                        if(time!=parseInt($(this).attr("data-time"))){ timeBool = false; }
                    }
                });

                if($($event.target).is(":checked") &&  (fenshuBool!=true || timeBool!=true )){
                    $($event.target).prop('checked',false);
                    alertNoBack('抽选的子卷分数和时间必须相同！',function(){
                        $(".paperData[paperId="+pl._id+"]").parents('.plist-table').find(".plist-ctab a.randQuesS ").click();
                        $(".randTypeBox .type2").click();
                    });
                }
                $scope.selectRandPaperCount = $(".randPaperList tr td input:checked").length;
            }
            $scope.initLoadValue = function () {
                var oldValue = $("#selectpaper").val();
                $(".xzsj-tab.table-background tr input").each(function () {
                    if (oldValue.indexOf($(this).attr("value")) > -1) {
                        if (!$(this).is(":checked")) {
                            $(this).prop("checked", true);
                        }
                    }
                });
            }
            $scope.selectedPaper = [];
            $scope.initBindFunction = function () {
                $("#xuanzeshijuan .xzsj-tab input").click(function () {
                    var curValue = $(this).val();
                    if ($(this).is(":checked")) {
                        var isExit = false;
                        for(var i=0;i<$scope.selectedPaper.length;i++){
                            if($scope.selectedPaper[i]==curValue){
                                isExit = true;
                            }
                        }
                        if(!isExit){ $scope.selectedPaper.push(curValue); }
                    }
                    else {
                        var isExit = false;
                        for(var i=0;i<$scope.selectedPaper.length;i++){
                            if($scope.selectedPaper[i]==curValue){
                                isExit = true;
                                $scope.selectedPaper[i] = null;
                            }
                        }
                    }
                    $scope.initLiBindFun();
                });
            }

            $scope.initLiBindFun = function () {
                /*$(".xuanzeshijuanbox li i").unbind("click").bind("click", function () {
                    var oldValue = $("#selectpaper").val();
                    var curValue = $(this).parents("li").attr("id");
                    oldValue = oldValue.replace(curValue, "");
                    oldValue = oldValue.replace(";;", ";");
                    $("#selectpaper").val(oldValue);
                    $(this).parents("li").remove();
                });*/
            }

            var initZijuanBox = function (post) {
                $($(".t-three .Add_Paper_T9-2 input")[0]).val(post.title);
                $($(".t-three .Add_Paper_T9-2 input")[1]).val(post.name);
                $(".t-three .Add_Paper_T9-3 input").val(post.allTime);
                $(".randOpts").removeClass('hide')
                if (post.forPractise == true) { $($(".t-three .paper_type ul li")[2]).addClass("A_N_P_Ali"); } else { $($(".t-three .paper_type ul li")[2]).removeClass("A_N_P_Ali"); }
                if (post.forCode == true) { $($(".t-three .paper_type ul li")[1]).addClass("A_N_P_Ali"); $(".randOpts").addClass('hide');} else { $($(".t-three .paper_type ul li")[1]).removeClass("A_N_P_Ali");  }
                if (post.forOXCode == true) { $($(".t-three .paper_type ul li")[3]).addClass("A_N_P_Ali"); } else { $($(".t-three .paper_type ul li")[3]).removeClass("A_N_P_Ali"); }
                if (post.forPractise != true && post.forCode != true && post.forOXCode != true) { $($(".t-three .paper_type ul li")[0]).addClass("A_N_P_Ali"); } else { $($(".t-three .paper_type ul li")[0]).removeClass("A_N_P_Ali"); }
                if (post.randQues == true) { $($(".t-three .randques ul li")[0]).addClass("A_N_P_Ali"); $($(".t-three .randques ul li")[1]).removeClass("A_N_P_Ali"); } else { $($(".t-three .randques ul li")[0]).removeClass("A_N_P_Ali"); $($(".t-three .randques ul li")[1]).addClass("A_N_P_Ali"); }
                if (post.randOpts == true) { $($(".t-three .randOpts ul li")[0]).addClass("A_N_P_Ali"); $($(".t-three .randOpts ul li")[1]).removeClass("A_N_P_Ali"); } else { $($(".t-three .randOpts ul li")[0]).removeClass("A_N_P_Ali"); $($(".t-three .randOpts ul li")[1]).addClass("A_N_P_Ali"); }
                if (post.quesPrev == true) { $($(".t-three .quesPrev ul li")[0]).addClass("A_N_P_Ali"); $($(".t-three .quesPrev ul li")[1]).removeClass("A_N_P_Ali"); } else { $($(".t-three .quesPrev ul li")[0]).removeClass("A_N_P_Ali"); $($(".t-three .quesPrev ul li")[1]).addClass("A_N_P_Ali"); }
                if (post.editAnswerAfterSubmit == true) { $($(".t-three .editansweraftersubmit ul li")[0]).addClass("A_N_P_Ali"); $($(".t-three .editansweraftersubmit ul li")[1]).removeClass("A_N_P_Ali"); } else { $($(".t-three .editansweraftersubmit ul li")[0]).removeClass("A_N_P_Ali"); $($(".t-three .editansweraftersubmit ul li")[1]).addClass("A_N_P_Ali"); }
                if (post.answerType == true) { $($(".t-three .answerType ul li")[0]).addClass("A_N_P_Ali"); $($(".t-three .answerType ul li")[1]).removeClass("A_N_P_Ali"); } else { $($(".t-three .answerType ul li")[0]).removeClass("A_N_P_Ali"); $($(".t-three .answerType ul li")[1]).addClass("A_N_P_Ali"); }
            }

            $scope.initLoadPaperPager = function (pageNum) {
                if ($scope.paperCount > 10) {
                    var page_index = pageNum;
                    var num_entries = $scope.paperCount % 10;
                    if (num_entries == 0) { num_entries = parseInt($scope.paperCount / 10); } else {
                        num_entries = parseInt($scope.paperCount / 10) + 1;
                    }

                    var PageCallback = function (page_index, jq) {
                        page_index += 1;
                        if (window.acm.paperPageNum != page_index) {
                            $scope.initPaperList(page_index);
                        }
                    }
                    $("#pagination2").pagination(num_entries, {
                        current_page: 0,
                        num_edge_entries: 3, //边缘页数
                        num_display_entries: 5, //主体页数
                        callback: PageCallback,
                        prev_text: '上一页',
                        next_text: '下一页',
                        items_per_page: 1 //每页显示1项
                    });
                } else { $("#pagination2").html(''); }
            }

            $scope.initLoadPager = function (pageNum) {
                if ($scope.positionsCount > 10) {
                    var page_index = pageNum;
                    var num_entries = $scope.positionsCount % 10;
                    if (num_entries == 0) { num_entries = parseInt($scope.positionsCount / 10); } else {
                        num_entries = parseInt($scope.positionsCount / 10) + 1;
                    }

                    var PageCallback = function (page_index, jq) {
                        /*page_index += 1;
                        if (window.acm.pageNum != page_index) {
                            $scope.initLoadPositionList(page_index);
                        }*/
                        location.href='/position#/list/'+(page_index+1);
                    }
                    $("#pagination").pagination(num_entries, {
                        current_page: window.acm.pageNum-1,
                        num_edge_entries: 3, //边缘页数
                        num_display_entries: 5, //主体页数
                        callback: PageCallback,
                        prev_text: '上一页',
                        next_text: '下一页',
                        items_per_page: 1 //每页显示1项
                    });
                } else { $("#pagination").html(''); }
            }


            $scope.paperSearchBtn = function () {
                $scope.initPaperList(1);
            }

            var refreshFunc = function () {
                $(".randABSelect").easyDropDown({ cutOff: 6 ,onChange:function(){
                    $scope.selectedABinput();
                }});
                $scope.initLoadPositionList(window.acm.pageNum);
                $(document).on('click', ".ListTTT ul li",function(){
                    if($(this).attr("data-id")=='1'){
                        if($(".ListT ul li.A_N_P_Ali").attr("data-id")=='1'){
                            $('.ListTT').hide();
                        }else{
                            $('.ListTT').show();
                        }
                    }else{
                        $('.ListTT').hide();
                    }
                });
                $(document).on('click', '.ListT ul li',function(){
                    if($(this).attr("data-id")=='1'){
                        $('.ListTT').hide();
                    }else{
                        if($(".ListTTT ul li.A_N_P_Ali").attr("data-id")=='0'){
                            $('.ListTT').hide();
                        }else{
                            $('.ListTT').show();
                        }
                    }
                });

                $('.blue').click(function () {
                    if ($scope.jurisdiction[0].p == 0) {
                        if (!$(this).hasClass("active")) {
                            $(this).addClass('active').parent().siblings('a').find('span.blue').removeClass('active');
                            if ($(this).html().indexOf("icon1.png") > 0) {
                                $(".plist-ctab2").parents(".plist-table").addClass("plisttab2");
                                $(".plist-ctab2").parents(".plist-table").css('height', '66px')
                                $(".plist-bt span").html("+");
                            } else {
                                $(".plist-ctab2").parents(".plist-table").removeClass("plisttab2");
                                $(".plist-ctab2").parents(".plist-table").css('height', 'inherit')
                                $(".plist-bt span").html("-");
                            }
                        }
                    }
                    else {
                        if (!$(this).hasClass("active")) {
                            $(this).addClass('active').parent().siblings('a').find('span.blue').removeClass('active');
                            if ($(this).html().indexOf("icon1.png") > 0) {
                                $(".plist-ctab2").parents(".plist-table").addClass("plisttab2");
                                $(".plist-bt span").html("+");
                            } else {
                                $(".plist-ctab2").parents(".plist-table").removeClass("plisttab2");
                                $(".plist-bt span").html("-");
                            }
                        }
                    }

                })


                $('.add-img').before('<span class="Id-img"><img src="/v4.0/images/exam1.png" style="border: 1px solid #dadada"></span>').mouseover(function () {
                    $('.Id-img').css('display', 'block');
                }).mouseleave(function () {
                    $('.Id-img').css('display', 'none');
                })
                $('.add-before').before('<span class="Id-after" style="width:80px;height:22px; ">展开所有子卷</span>').mouseover(function () {
                    $('.Id-after').css('display', 'block');
                }).mouseleave(function () {
                    $('.Id-after').css('display', 'none');
                })
                $('.add-after').before('<span class="Id-before" style="width:80px;height:22px; ">收起所有子卷</span>').mouseover(function () {
                    $('.Id-before').css('display', 'block');
                }).mouseleave(function () {
                    $('.Id-before').css('display', 'none');
                })
                $(".select-t").click(function () {
                    $scope.initLoadPositionList(1);
                });
            };

            $scope.lock = function () {
                alert('试卷已锁定，无法操作！');
            }
            $scope.newPaper = function () {
                var initWidth = 600;
                if ($scope.rightStr.indexOf('right_id17') > -1) { initWidth = 800; }
                $scope.paperModel = {};
                $(".ownPaper ul li").removeClass("A_N_P_Ali");
                $(".ownPaper ul li:first-child").addClass("A_N_P_Ali");
                if(version!=2 && version!=3){
                    $scope.newPaperChooise(initWidth);
                }else {
                    $('.addSaimaPaper').show();
                }


            }

            $scope.newPaperChooise = function(initWidth){
                $('.addSaimaPaper').hide();
                if(initWidth==undefined){ initWidth=600; }
                $.cxDialog({
                    title: '新建试卷',
                    info: $('.ownPaper'),
                    lockScroll: true,
                    background: '#000',
                    width: initWidth,
                    okText: '提交',
                    ok: function () {
                        var postData = {
                            positionTitle: '',
                            afterTitle: '',
                            timeType: 0,
                            openType: 0,
                            openTime: 0,
                            prjId: '',
                            did: '',
                            positionCode:null
                        };
                        var addBool = true;
                        postData.prjId = $("#prjList").val(); if (postData.prjId == "") { alertNoBack("请选择场次！", function(){ $scope.newPaperChooise(600); }); addBool = false; }
                        postData.did = $("#did").val();
                        postData.positionTitle = $scope.paperModel.positionTitle;
                        postData.afterTitle =  $scope.paperModel.afterTitle;
                        if (postData.positionTitle == "" || postData.positionTitle ==undefined) { alertNoBack('请输入试卷名称！', function(){ $scope.newPaperChooise(600); }); addBool = false; }

                        if ($scope.version == 1 || $scope.version == 4) {  } else {
                            postData.timeType = parseInt($(".ListTTT ul li.A_N_P_Ali").attr("data-id"));
                            postData.openType = parseInt($(".ListT ul li.A_N_P_Ali").attr("data-id"));
                            postData.openTime = parseInt($(".ListTT ul li.A_N_P_Ali").attr("data-id"));
                        }
                        if(postData.timeType==NaN){  postData.timeType = 0; }
                        if(postData.openType==NaN){  postData.openType = 0; }
                        if(postData.openTime==NaN){  postData.openTime = 0; }
                        if($scope.version==3){ postData.positionCode = $(".ownPaper .paperCode").val(); }
                        if(addBool){

                            $.post("/api/newPosition", postData, function (data) {
                                if (data.errmsg == "") {
                                    alert("试卷添加成功！", function () { location.reload(); });
                                } else { alert(data.errmsg); }
                            })
                        }else{
                            return false;
                        }
                    }
                });
            }

            $scope.newPaperStand = function(){
                location.href='#stand';
            }

            $timeout(function () {
                refreshFunc();
            });
        }]
);
PositionControllers.controller("standControl",  ['$scope', '$http', '$routeParams', '$location', '$timeout', 'Positions',
    function ($scope, $http, $timeout, Positions) {
        var refresh = function(){
            /*权限判断*/
            $http.post('/api/userRight', {}).success(function (data) {
                $scope.rightStr = data.result.join(',');
            }).error(function (data) {
                console.log("服务器错误：" + data);
            });
            /*版本判断*/
            $http.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") + "&r=" + Math.random(), {}).success(function (data) {
                $scope.version = data.data;
            }).error(function (data) {
                console.log(data);
            });
            $http.post('/api/standardTypeOfPosition', {}).success(function (data) {
                $scope.typeList  = data.result;
                $scope.initLoadStandPosition($scope.typeList[0]._id);
            }).error(function (data) {
                console.log("服务器错误：" + data);
            });

        }
        refresh();

        $scope.positionList = [];
        $scope.initLoadStandPosition = function(standardRemarkId){
            $http.post('/api/standardPositionOfACM', {standardRemarkId:standardRemarkId}).success(function (data) {
                $scope.positionList = data.result;
            }).error(function (data) {
                console.log("服务器错误：" + data);
            });
        }

        $scope.addPosition = function(){
            var positionId = $("li.ssp-xcc").attr("data-id");
            $http.post('/api/commitStandardPosition', {positionId:positionId}).success(function (data) {
                if(data.errmsg==""){

                    alert("试卷添加成功！",function(){
                        location.href='/position#/list';
                    });
                }else{ alert(data.errmsg); }

            }).error(function (data) {
                console.log("服务器错误：" + data);
            });
        }

        $scope.chooiseRemark = function(t){
            $scope.initLoadStandPosition(t._id);
        }
    }]
);

PositionControllers.controller("standNextControl",  ['$scope', '$http', '$routeParams', '$location', '$timeout', 'Positions',
    function ($scope, $http,$routeParams, $timeout, Positions) {

        if (Object.isNull($routeParams.positionId)) {
            $location.path('/list');
            return;
        }

        var refresh = function(){
            /*权限判断*/
            $http.post('/api/userRight', {}).success(function (data) {
                $scope.rightStr = data.result.join(',');
            }).error(function (data) {
                console.log("服务器错误：" + data);
            });
            /*版本判断*/
            $http.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") + "&r=" + Math.random(), {}).success(function (data) {
                $scope.version = data.data;
            }).error(function (data) {
                console.log(data);
            });
            $http.post('/api/standardTypeOfPaper', {}).success(function (data) {
                $scope.typeList  = data.result;
                $scope.initLoadStandPosition($scope.typeList[0]._id);
            }).error(function (data) {
                console.log("服务器错误：" + data);
            });

        }
        refresh();

        $scope.positionList = [];
        $scope.initLoadStandPosition = function(standardRemarkId){
            $http.post('/api/standardPaperOfACM', {standardRemarkId:standardRemarkId}).success(function (data) {
                $scope.positionList = data.result;
                $scope.positionList.forEach(function(item){
                    if(item.title.indexOf('标准试卷')>-1){ item.title = item.title.replace('标准试卷',''); }
                })
            }).error(function (data) {
                console.log("服务器错误：" + data);
            });
        }

        $scope.addPosition = function(){
            var paperId = $("li.ssp-xcc").attr("data-id");
            $http.post('/api/commitStandardPaper', {paperId:paperId,positionId:$routeParams.positionId}).success(function (data) {
                if(data.errmsg==""){
                    alert("子卷添加成功！",function(){
                        location.href='/position#/list';
                    });
                }else{ alert(data.errmsg); }
            }).error(function (data) {
                console.log("服务器错误：" + data);
            });
        }

        $scope.chooiseRemark = function(t){
            $scope.initLoadStandPosition(t._id);
        }
    }]
);

ng_aefs.trustHtml.apply(PositionControllers);