/**
 * Created by lifubang on 2015/6/1.
 */

var quesControllers = angular.module("quesControllers", ['ngAnimate']);

quesControllers.controller("ListController", ['$scope', '$http','$routeParams', '$timeout',
    function($scope, $http,$routeParams, $timeout)
    {
        if(window.acm!=undefined && window.acm.pageNum==undefined){
            window.acm.pageNum=1;
            localStorage.clear();
        }
        window.levelChange = function(){
            var level1Value = $(".zsd11_level1").val();
            if(level1Value==""){
                $(".zsd11_level2").parents('.dropdown').remove();

            }else{
                $(".zsd11_level2").parents('.dropdown').remove();
                $(".zsd11_level1").parents('.dropdown').after('<select class="zsd11_level2" name="zsd11_level2"><option value="">请选择</option></select>');

                $scope.Level1Data.forEach(function (item) {
                    if(item.id==level1Value){
                        $scope.Level2Data = item.child;
                        $scope.Level2Data.forEach(function(item){
                            $(".zsd11_level2").append('<option  value="'+item.id+'" >'+item.name+'</option>');
                        });
                        $(".zsd11_level2").easyDropDown({ cutOff: 6 });
                    }
                });
            }
        }
        /*版本判断*/
        $http.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") +  "&r=" + Math.random(),{}).success(function (data) {
            $scope.version = data.data.exam_version;
            $.cookie('version',data.data.exam_version,{ path: '/'});
            $.cookie('role_type', data.data.role_type);if($.cookie('role_type')==1 && $.cookie('version')!=1){ $('.yonghuGuanli').removeClass('hide'); }
        }).error(function (data) {
            console.log(data);
        });
        /*权限判断*/
        $http.post('/api/userRight',{}).success(function (data) {
            $scope.rightStr = data.result.join(',');
            $timeout(function () {
                $(".leixing").easyDropDown({ cutOff: 6});
            });
        }).error(function (data) {
            console.log("服务器错误：" + data);
        });
        if($.cookie("endExamNotes")){
            $.cookie('endExamNotes', null, { expires: -1, path: '/',domain:'.acmcoder.com' });
        }
        $scope.searchItem = {pageSize:'15'};
        if(localStorage.searchItem!=undefined){
            $scope.searchItem = $.parseJSON(localStorage.searchItem);
            $scope.searchItem.endTime = getNowFormatDate(new Date(Date.now()+1000*24*3600*1));
        }
        $scope.inputKeyS = '';
        $scope.pageNum = window.acm.pageNum;

        if(localStorage.quesNodes!=undefined){
            $scope.Level1Data = $.parseJSON(localStorage.quesNodes);
            $timeout(function () {
                $(".zhishidian").easyDropDown({ cutOff: 6 });
            });
        }else{
            $http.get('/api/quesNodes').success(function (data) {
                $scope.Level1Data = data.result;
                localStorage.quesNodes = JSON.stringify(data.result);
                $timeout(function () {
                    $(".zhishidian").easyDropDown({ cutOff: 6 });
                });
            }).error(function (data) {
                alert("管理员累晕了，没有反馈结果，请重试一下～～");
            });
        }
        /*请求试题总数*/
        $http.post('/api/dbQuestionCount ').success(function (data) {
            $scope.quesCount = data.result;
        }).error(function (data) {
            alert("管理员累晕了，没有反馈结果，请重试一下～～");
        });
        $scope.searchQuesesBtn = function () {
            $scope.searchQueses(1);
            $(".apa_ri-qx .Input_zbsk").prop('checked',false);
        }
        $scope.pageSize = 15;

        window.pageSizeChange = function(){
            $scope.pageSize = parseInt($(".pageCountDropdown").val());
        }
        $scope.searchQueses = function (pageNum) {
            $(".result_loading").removeClass('hide');
            var postData =  $scope.searchItem;
            //console.log($scope.searchItem)
            postData.pageNum = pageNum;
            $scope.pageSize = postData.pageSize = parseInt($(".pageCountDropdown").val());
            if($(".questionState .A_N_P_Sli").index()==0){ postData.questionState = 1; }else{ postData.questionState = 0;}

            if($(".startTime").val()==""){ postData.startTime = getNowFormatDate(new Date(Date.now()-1000*24*3600*730)); }else{ postData.startTime = $(".startTime").val(); }

            if($(".endTime").val()==""){ postData.endTime = getNowFormatDate(new Date(Date.now()+1000*24*3600*1)); }
            else{
                postData.endTime = $(".endTime").val();
            }
            if($(".zsd11_level2").val()!=""){ postData.zsd11 = $(".zsd11_level2").val(); }
            else if($(".zsd11_level1").val()!="" && $(".zsd11_level2").val()==""){
                postData.zsd11 = [];
                $scope.Level2Data.forEach(function(item){
                    postData.zsd11.push(item.id);
                });
                postData.zsd11 = postData.zsd11.join(',');
            }
            if(postData.zsd11 ==""){postData.zsd11 =undefined;}
            localStorage.searchItem = JSON.stringify(postData);
            postData.positionId = postData.paperId = postData.rateOfPro =  undefined;

            $http.post('/api/searchQuestionWithQuery',postData).success(function (data) {
                $scope.questions = data.result.list;
                var quesStartNum  = (postData.pageNum -1)* postData.pageSize +1;
                var start = 0;
                $scope.questions.forEach(function(item){
                    item.quesNum = quesStartNum + start;
                    start ++ ;
                });
                $scope.questionsCount = data.result.count;
                if(postData.id==undefined){
                    $scope.inputKeyS ="";
                }else{
                    $scope.inputKeyS = postData.id;
                }
                $(".result_loading").addClass('hide');
                if(window.acm.pageNum == pageNum){
                    $scope.initLoadPager(pageNum);
                }
                window.acm.pageNum = pageNum;
                $scope.pageNum = pageNum;

                $timeout(function () {
                    $('.apa_ri-qx input').unbind("click").bind('click', function () {
                        if (!$(this).is(":checked")) {
                            $('.apa_ri-cenbt input').prop('checked', false);
                            $('.apa_ri-cenbt input').removeClass('Input_zbsk');
                            $(this).removeClass('Input_zbsk');
                            $('.apa_ri-cenbt input').parents('.apa_ri-cen').removeClass('apa_ali');
                        } else {
                            $('.apa_ri-cenbt input').prop('checked', true);
                            $('.apa_ri-cenbt input').addClass('Input_zbsk');
                            $(this).addClass('Input_zbsk');
                            $('.apa_ri-cenbt input').parents('.apa_ri-cen').addClass('apa_ali');
                        }
                    });
                    $('.apa_ri-cenbt input').unbind("click").bind('click', function () {
                        if ($(this).is(":checked")) {
                            $(this).removeClass('Input_zbsk');
                            $(this).parents('.apa_ri-cen').addClass('apa_ali');
                        } else {
                            $(this).addClass('Input_zbsk');
                            $(this).parents('.apa_ri-cen').removeClass('apa_ali');
                        }
                        if($('.apa_ri-cenbt input:checked').length != $('.apa_ri-cenbt input').length){ $('.apa_ri-qx input').prop('checked', false); }else{
                            $('.apa_ri-qx input').prop('checked', true);
                        }
                    });
                    hljs.initHighlighting.called = false;
                    hljs.initHighlighting();
                });
            }).error(function (data) {
                alert("管理员累晕了，没有反馈结果，请重试一下～～");
            });
        }

        $scope.initLoadPager = function(pageNum){
            if($scope.questionsCount>parseInt($(".pageCountDropdown").val())){
                var page_index = pageNum;
                var  num_entries = $scope.questionsCount % parseInt($(".pageCountDropdown").val());
                if(num_entries==0){ num_entries = parseInt($scope.questionsCount / parseInt($(".pageCountDropdown").val())); }else{
                    num_entries = parseInt($scope.questionsCount / parseInt($(".pageCountDropdown").val()))+1;
                }

                var PageCallback  = function (page_index,jq) {
                    page_index +=1;
                    if(window.acm.pageNum != page_index){
                        $scope.searchQueses(page_index);
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
            }else{$(".pagination").html('');}
        }
        
        $scope.delQues = function () {

            var quesList = [];
            if( $(".quesesBox .apa_ri-cenbt input:checked").length==0){
                  $.cxDialog({
                    title:'提示',
                    info:'<div style="text-align: center;padding: 20px;padding-top: 30px;">请选择相应的试题</div>',
                    lockScroll: true,
                    width:400,
                    background: '#000',
                    okText:'我知道了',
                    ok:function(){
                    }
                })
            } else {
            if(quesList.length>0){
                confirm('<div class="cxDialogContent"><table><tr><td><i class="fa fa-exclamation-triangle"></i></td><td><span class="fbig fb">您确定要删除吗？</span><br> 删除后无法恢复！</td></tr></table> </div>',function () {
                    $http.post('/api/removeQuestionIds',{ questionIds:quesList,positionId:window.acm.positionId }).success(function (data) {
                        if(data.errmsg==""){ alert("删除成功！",function(){ location.reload(); });
                        }else{ alert(data.errmsg); }
                    }).error(function (data) {
                        alert("管理员累晕了，没有反馈结果，请重试一下～～");
                    });
                });
            }
            }
        }

        $timeout(function () {
            /*$(".leixing").easyDropDown({ cutOff: 6});*/
            $(".nandu").easyDropDown({ cutOff: 6});

            $(".pageCountDropdown").easyDropDown({ cutOff: 6});

            $(".pageCountDropdown").easyDropDown('select',$(".pageCountDropdown option[value="+$scope.searchItem.pageSize+"]").index());
            $(".pageCountDropdown").unbind("change").bind('change',function () {
                $scope.searchQueses(1);
                console.log($(".pageCountDropdown").val());
            });
            $scope.searchQueses(window.acm.pageNum);
            
            $scope.del = function (q) {
                confirm('<div class="cxDialogContent"><table><tr><td><i class="fa fa-exclamation-triangle"></i></td><td><span class="fbig fb">您确定要删除吗？</span><br> 删除后无法恢复！</td></tr></table> </div>',function () {
                    $http.post('/api/hiddenQuestion',{"questionId":q._id}).success(function (data) {
                        if(data.errmsg==""){ alert("删除成功！",function(){ location.reload(); });
                        }else{ alert(data.errmsg); }
                    }).error(function (data) {
                        alert("管理员累晕了，没有反馈结果，请重试一下～～");
                    });
                });
            }
        });
    }]
);

quesControllers.filter('trustHtml', function ($sce) {
    return function (input) {
        if(input != undefined){
            input = input.toString();
            input = input.replace(/@@/g," | ");
            input = input.replace(/color: rgb\(255, 255, 255\);/g,"");
            input = input.replace(/<br>/g,'\n').replace(/<br\/>/g,'\n');
            return $sce.trustAsHtml(input);
        }else{

        }
    }
});

quesControllers.controller("ImportController", ['$scope', '$http','$routeParams', '$timeout',
    function($scope, $http,$routeParams, $timeout)
    {
        $scope.selectPaper = { };
        $scope.selectPaper.positionId = $routeParams.positionId;
        $scope.selectPaper.paperId = $routeParams.paperId;

        if($scope.selectPaper.positionId!=undefined){
            $http.post("/api/positionDetail",{ positionId:$scope.selectPaper.positionId }).success(function (data) {
                $scope.selectPaper.position = data.result;
            }).error(function (data) {
                alert("管理员累晕了，没有反馈结果，请重试一下～～");
            });
            $http.post("/api/paperDetail",{ paperId:$scope.selectPaper.paperId }).success(function (data) {
                $scope.selectPaper.paper = data.result;
                if($scope.selectPaper.paper.forCode==true){
                    location.href='/position#/list';
                }
            }).error(function (data) {
                alert("管理员累晕了，没有反馈结果，请重试一下～～");
            });
        }

        $timeout(function () {
            window.uploadV =  $(".proXbt1").uploadFile({
                url:"/api/importQuestionWithExcel",
                fileName:"myfile",
                dragdropWidth:'auto',
                showProgress: true,
                allowedTypes:'xlsx',
                autoSubmit:false,
                showQueueDiv:'resultBox',
                errorDiv:'proXname',
                onSubmit: function (files, xhr) {
                    $.cxDialog({
                        title: '导入试题',
                        info: '<div style="text-align: center;padding: 20px"><img style="max-width: 100px" src="/images/loading.gif"><span style="font-size: 16px;margin-left: 20px;">试题正在导入中~~</span><br></div>',
                        lockScroll: true,
                        background: '#000',
                        width: 400,
                        okText:'我知道了'
                    });
                },
                onSuccess:function(files,data,xhr,pd)
                {
                    window.acm.fileUrl = data.result;
                    window.setTimeout("window.acm.getResult()",2000)
                },
                onSelect: function (files) {
                    if(parseInt(files[0].size/(1024*1024))>10){
                        alert('文件大小限制10MB，请重新选择！');
                    }else{
                        $(".importQuesBox .proXname").html('已选择文件：'+ files[0].name);
                    }
                },
                onError:function (files, status, message, pd) {
                    console.log(files);
                }
            });
            
            $scope.importFun = function () {
                if(window.uploadV.selectedFiles>0){
                window.uploadV.startUpload();
                }else{
                    alert('您还没有选择文件！');
                }
            }

            $scope.showErrorList = function(){
                $.cxDialog({
                    title: '导入失败明细',
                    info: $('.uploadErrorBox'),
                    lockScroll: true,
                    background: '#000',
                    width:450,
                    okText:"我知道了",
                    ok:function(){

                    }
                });
            }

            window.acm.getResult = function () {
                if(window.acm.fileUrl!=undefined && window.acm.fileUrl!=""){
                    $http.post("/api/importQuesionCount",{ excelName:window.acm.fileUrl }).success(function (data) {
                        $.cxDialog.close();
                        $scope.uploadResult = data.result;
                        console.log($scope.paperId);
                        if($scope.uploadResult.questionIds==0 || $scope.uploadResult.questionIds==undefined){
                            if($scope.uploadResult.errIds!=undefined && $scope.uploadResult.errIds.length>0){
                                var showMess = '';
                                for(var i=0;i<$scope.uploadResult.errIds.length;i++){
                                    showMess += $scope.uploadResult.errIds[i] + '<br>';
                                }
                                alert(showMess,function () {
                                    location.reload();
                                });
                            }else{
                                alert('没有检测到试题，请检查Excel后重试！',function () {
                                    location.reload();
                                });
                            }
                        }else{
                            if($scope.selectPaper.paperId && $scope.uploadResult.questionIds.length>0){
                                $http.post("/api/addQuestionIntoPaper",{ paperId:$scope.selectPaper.paperId,positionId:$scope.selectPaper.positionId,quesIds:$scope.uploadResult.questionIds.join(","),quesMode:0 }).success(function (data) {
                                    $('.t-one').css('display','block');
                                }).error(function (data) {
                                    alert("管理员累晕了，没有反馈结果，请重试一下～～");
                                });
                            }else{
                                $('.t-one').css('display','block');
                            }
                        }
                    }).error(function (data) {
                        alert("管理员累晕了，没有反馈结果，请重试一下～～");
                    });
                }
            }
        })


    }]
);

quesControllers.controller("ManController", ['$scope', '$http','$routeParams', '$timeout',
    function($scope, $http,$routeParams, $timeout)
    {
        if(window.acm!=undefined && window.acm.pageNum==undefined){
            window.acm.pageNum=1;
            localStorage.clear();
        }
        /*版本判断*/
        if($.cookie('version')){
            $scope.version = parseInt($.cookie('version'));
        }else{
            $http.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") +  "&r=" + Math.random(),{}).success(function (data) {
                $scope.version = data.data.exam_version;
                $.cookie('version',data.data.exam_version,{ path: '/'});
                $.cookie('role_type', data.data.role_type);if($.cookie('role_type')==1 && $.cookie('version')!=1){ $('.yonghuGuanli').removeClass('hide'); }
            }).error(function (data) {
                console.log(data);
            });
        }

        $scope.AddQues = function(){
            $.cxDialog({
                title: '请选择添加试题方式',
                info: $('.addQuesChooiseBox'),
                lockScroll: true,background: '#000',
            });
        }
        $scope.goLink = function(url){
            $.cxDialog.close();
        }
        /*权限判断*/
        $http.post('/api/userRight',{}).success(function (data) {
            $scope.rightStr = data.result.join(',');
            $timeout(function () {
                $(".leixing").easyDropDown({ cutOff: 6});
            });
        }).error(function (data) {
            console.log("服务器错误：" + data);
        });
        if (Object.isNullString($routeParams.positionId)) {
            $location.path('/position#/list');
            return;
        }
        if (Object.isNullString($routeParams.paperId)) {
            $location.path('/position#/list');
            return;
        }

        if($.cookie("jurisdiction")){
            $scope.jurisdiction = eval($.cookie("jurisdiction"));
        }

        if($.cookie('version')){
            $scope.version = parseInt($.cookie('version'));
        }else{
            $http.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") +  "&r=" + Math.random(),{}).success(function (data) {
                $.cookie('version',data.data.exam_version,{ path: '/'});
                $scope.version = data.data.exam_version;
            }).error(function (data) {
                console.log(data);
            });
        }
        window.acm.positionId = $routeParams.positionId;
        window.acm.paperId = $routeParams.paperId;
        window.levelChange = function(){
            var level1Value = $(".zsd11_level1").val();
            if(level1Value==""){
                $(".zsd11_level2").parents('.dropdown').remove();

            }else{
                $(".zsd11_level2").parents('.dropdown').remove();
                $(".zsd11_level1").parents('.dropdown').after('<select class="zsd11_level2" name="zsd11_level2"><option value="">请选择</option></select>');

                $scope.Level1Data.forEach(function (item) {
                    if(item.id==level1Value){
                        $scope.Level2Data = item.child;
                        $scope.Level2Data.forEach(function(item){
                            $(".zsd11_level2").append('<option  value="'+item.id+'" >'+item.name+'</option>');
                        });
                        $(".zsd11_level2").easyDropDown({ cutOff: 6 });
                    }
                });
            }
        }
        $scope.searchItem = {pageSize:'15'};
        if(localStorage.searchItem!=undefined){ $scope.searchItem = $.parseJSON(localStorage.searchItem); }

        var refreshFunc = function() {
            /*请求知识点*/
            if(localStorage.quesNodes!=undefined){
                $scope.Level1Data = $.parseJSON(localStorage.quesNodes);
                $timeout(function () {
                    $(".dropdown").easyDropDown({ cutOff: 6 });
                });
            }else{
                $http.get('/api/quesNodes').success(function (data) {
                    $scope.Level1Data = data.result;
                    localStorage.quesNodes = JSON.stringify(data.result);
                    $timeout(function () {
                        $(".dropdown").easyDropDown({ cutOff: 6 });
                    });
                }).error(function (data) {
                    alert("管理员累晕了，没有反馈结果，请重试一下～～");
                });
            }
            /*////////////////////////////////////////*/
            $scope.searchQuesesBtn = function () {
                $scope.searchQueses(1);
                $(".apa_ri-qx .Input_zbsk").prop('checked',false);
            }
            $scope.searchQueses = function (pageNum) {
                $(".result_loading").removeClass('hide');
                var postData =  $scope.searchItem;
                $scope.pageSize = postData.pageSize = parseInt($(".pageCountDropdown").val());
                postData.positionId = window.acm.positionId;
                postData.paperId = window.acm.paperId;
                if($(".zsd11_level2").val()!=""){ postData.zsd11 = $(".zsd11_level2").val(); }
                else if($(".zsd11_level1").val()!="" && $(".zsd11_level2").val()==""){
                    postData.zsd11 = [];
                    $scope.Level2Data.forEach(function(item){
                        postData.zsd11.push(item.id);
                    });
                    postData.zsd11 = postData.zsd11.join(',');
                }
                localStorage.searchItem = JSON.stringify(postData);

                $http.post('/api/allQuestionInPaper',postData).success(function (data) {//数据请求成功
                    $scope.questionsList = data.result;
                    var idNo = 1;
                    $scope.questionsCount=0;var numC = 0;
                    $scope.questionsList.forEach(function(item){
                        if(item.ques.length==1){
                            item.ques[0].idNo = idNo;idNo++;
                            $scope.questionsCount++;
                        }else{
                            for(var i=0;i<item.ques.length;i++){
                                item.ques[i].idNo = idNo;idNo++;$scope.questionsCount++;
                            }
                        }
                        numC += item.quesCount;
                    });
                    console.log(numC);

                    $(".result_loading").addClass('hide');
                    window.acm.pageNum = pageNum;
                    $timeout(function () {
                        if(window.acm.pageNum == pageNum){
                            $scope.initLoadPager(pageNum);
                        }
                        $('.apa_ri-qx input').unbind("click").bind('click', function () {
                            if ($(this).hasClass('Input_zbsk')) {
                                $('.apa_ri-cenbt input').prop('checked', false);
                                $('.apa_ri-cenbt input').removeClass('Input_zbsk');
                                $(this).removeClass('Input_zbsk');
                                $('.apa_ri-cenbt input').parents('.apa_ri-cen').removeClass('apa_ali');
                            } else {
                                $('.apa_ri-cenbt input').prop('checked', true);
                                $('.apa_ri-cenbt input').addClass('Input_zbsk');
                                $(this).addClass('Input_zbsk');
                                $('.apa_ri-cenbt input').parents('.apa_ri-cen').addClass('apa_ali');
                            }
                        });
                        $('.apa_ri-cenbt input').unbind("click").bind('click', function () {
                            if ($(this).hasClass('Input_zbsk')) {
                                $(this).prop('checked', false);
                                $(this).removeClass('Input_zbsk');
                                $(this).parents('.apa_ri-cen').removeClass('apa_ali');
                            } else {
                                $(this).prop('checked', true);
                                $(this).addClass('Input_zbsk');
                                $(this).parents('.apa_ri-cen').addClass('apa_ali');
                            }
                        });

                        try{
                            hljs.initHighlighting.called = false;
                            hljs.initHighlighting();
                        }
                        catch (e){}
                        if($.cookie("addInPaper")!=undefined && $.cookie("addInPaper")==1){
                            $(".pagination").children().eq($(".pagination").children().length-2).click();
                            $.cookie('addInPaper', null, { expires: -1});
                            $timeout(function(){
                                var h = $(document).height()-$(window).height();
                                $(document).scrollTop(h);
                            },1000)
                        }

                    });
                }).error(function (data) {
                    alert("管理员累晕了，没有反馈结果，请重试一下～～");
                });
            }
            $scope.initLoadPager = function(pageNum){
                if($scope.questionsList.length>parseInt($(".guidebar select").val())){
                    $(".pagination").html('');
                    var page_index = pageNum;
                    var  num_entries = $scope.questionsList.length % parseInt($(".guidebar select").val());
                    if(num_entries==0){ num_entries = parseInt($scope.questionsList.length / parseInt($(".guidebar select").val())); }else{
                        num_entries = parseInt($scope.questionsList.length / parseInt($(".guidebar select").val()))+1;
                    }

                    var PageCallback  = function (page_index,jq) {
                        page_index +=1;
                        window.acm.pageNum=page_index;
                        var liNum = 0;
                        $(".quesesBox .paperQuesList").each(function () {
                            if(liNum < page_index* parseInt($(".guidebar select").val()) && liNum >= (page_index-1)* parseInt($(".guidebar select").val())){
                                $(this).removeClass("hide");
                            }else{
                                $(this).addClass("hide")
                            }
                            liNum ++ ;
                        });
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
                    $(".pagination").html('');
                    $(".quesesBox .paperQuesList").removeClass('hide');
                }
            }

            $scope.delQues = function () {
                var quesList = [];
                if ($(".quesesBox .apa_ri-cenbt input:checked").length == 0) {
                    $.cxDialog({
                        title: '提示',
                        info: '<div style="text-align: center;padding: 20px;padding-top: 30px;">请选择相应的试题</div>',
                        lockScroll: true,
                        width: 400,
                        background: '#000',
                        okText: '我知道了',
                        ok: function () {
                        }
                    })
                } else {
                $(".quesesBox .apa_ri-cenbt input").each(function () {
                    if ($(this).prop("checked")) {
                        quesList.push($(this).val());
                    }
                });
                if (quesList.length > 0) {
                    confirm('<div class="cxDialogContent"><table><tr><td><i class="fa fa-exclamation-triangle"></i></td><td><span class="fbig fb">您确定要移除吗？</span></td></tr></table> </div>', function () {
                        $http.post('/api/removeQuestionFromPaper', {
                            paperquestionids: quesList.join(','),
                            paperId: window.acm.paperId,
                            positionId:window.acm.positionId
                        }).success(function (data) {
                            if (data.errmsg == "") {
                                alert("移除成功！", function () {
                                    location.reload();
                                });
                            } else {
                                alert(data.errmsg);
                            }
                        }).error(function (data) {
                            alert("管理员累晕了，没有反馈结果，请重试一下～～");
                        });
                    });

                }
            }
            }
            /*////////////////////////////////////////*/

            /*实例化下拉框*/
            setTimeout(function () {
                $.each($('.chouTiBox'),function(){
                    if($(this).find('.chouTiTop')){
                        $(this).find('.qtBox .qtList input').remove();
                    } else {
                    }
                });
            },300);
            $timeout(function () {
               /* $(".leixing").easyDropDown({ cutOff: 6});*/
                $(".nandu").easyDropDown({ cutOff: 6});
                $(".pageCountDropdown").easyDropDown({ cutOff: 6});
                $(".pageCountDropdown").easyDropDown('select',$(".pageCountDropdown option[value="+$scope.searchItem.pageSize+"]").index());
                $(".pageCountDropdown").unbind("change").bind('change',function () {
                    $scope.searchQueses(1);
                });
                $scope.searchQueses(window.acm.pageNum);

                $scope.del = function (q) {
                    var showMess = '<div class="cxDialogContent"><table><tr><td><i class="fa fa-exclamation-triangle"></i></td><td><span class="fbig fb">您确定要移除吗？</span></td></tr></table> </div>';
                    if(q.ques.length>1){
                        showMess = '<div class="cxDialogContent"><table><tr><td><i class="fa fa-exclamation-triangle"></i></td><td><span class="fbig">你确定要移除该抽题作答的所有试题吗？<br>移除后，可以重新设置抽题作答！</span></td></tr></table> </div>';
                    }
                    $.cxDialog({
                        title: '提示',
                        info: '<div style="padding:20px; text-align:center;">'+showMess+'</div>',
                        lockScroll: true,background: '#000',okText:'移除',
                        ok:function(){
                            $http.post('/api/removeQuestionFromPaper',{"paperquestionids":q._id,paperId:window.acm.paperId,positionId:window.acm.positionId}).success(function (data) {
                                if(data.errmsg==""){ alert("移除成功！",function(){ location.reload(); });
                                }else{ alert(data.errmsg); }
                                return false;
                            }).error(function (data) {
                                alert("管理员累晕了，没有反馈结果，请重试一下～～");
                            });
                        },noText:'取消',
                        no:function(){

                        }
                    });
                }
                
                $scope.moveup = function (q) {
                    var pqid = q._id;
                    var orderno = q.OrderNo;
                    var dom = $(".quesesBox .paperQuesList[pqid="+pqid+"]");
                    var dom1 = dom.prev();
                    if(dom1.hasClass("paperQuesList")){
                        dom.after(dom1);
                        $scope.initSortFun(function(){
                            dom1.after(dom);
                        });
                    }
                }
                
                $scope.movedown = function (q) {
                    var pqid = q._id;
                    var orderno = q.OrderNo;
                    var dom = $(".quesesBox .paperQuesList[pqid="+pqid+"]");
                    var dom1 = dom.next();
                    if(dom1.length==1){
                        dom1.after(dom);
                        $scope.initSortFun(function(){
                            dom.after(dom1);
                        });
                    }
                }

                $scope.setFenzhi = function(q){
                    $.cxDialog({
                        title: '设置分值',
                        info: $('.sort-content6'),
                        lockScroll: true,
                        background: '#000',
                        width:330,
                        okText:"确认",
                        ok:function(){
                            if($(".cxdialog .setFenzhiInput").val()==""){alert("请输入分值！");return false;}
                            if(!/^[1-9]*[1-9][0-9]*$/.test($(".cxdialog .setFenzhiInput").val())){
                                alert('分值是正整数！');return false;
                            }
                            if(parseInt($(".cxdialog .setFenzhiInput").val())>100){
                                alert('分值不能超过100！');return false;
                            }
                            if($(".cxdialog .setFenzhiInput").val()==0){$(".cxdialog .setFenzhiInput").val('');alert("分值不能为0！");return false;}
                            if(!isNaN($(".cxdialog .setFenzhiInput").val())){
                                $http.post('/api/setPaperNdFzPx',{ fenzhi:parseFloat($(".cxdialog .setFenzhiInput").val()),paperquestionid:q._id,positionId:window.acm.positionId}).success(function (data) {
                                    if(data.errmsg==""){
                                        $.cxDialog({
                                            title: '提示',
                                            info: '<div style="padding: 20px;text-align: center;padding-top: 26px;">设置成功！</div>',
                                            lockScroll: true,
                                            background: '#000',
                                            width:330,
                                            okText:"我知道了",
                                            ok:function(){
                                                location.reload();
                                            }
                                        });
                                    }else{
                                        alert(data.errmsg);
                                    }
                                }).error(function (data) {
                                    alert("管理员累晕了，没有反馈结果，请重试一下～～");
                                });
                            }else{
                                alert("请输入数字！");
                                return false;
                            }

                        }
                    });
                }

            });
            $scope.initSortFun = function (callback) {
                var postData=[];
                var orderNo=10;
                $(".quesesBox .qtList").each(function () {
                    $(this).find(".apa_ri-cenbt .quesNo").html(orderNo/10 + '、');
                    postData.push({"pqid":$(this).parents(".paperQuesList").attr("pqid"),"orderNo":orderNo});
                    orderNo+=10;
                });
                if(postData.length>0){
                    $http.post('/api/sortQuestionInPaper',{ orderArr:JSON.stringify(postData),positionId:window.acm.positionId}).success(function (data) {
                        if(data.errmsg==""){
                        }else{
                            callback();
                            alert(data.errmsg);
                        }
                    }).error(function (data) {
                        alert("管理员累晕了，没有反馈结果，请重试一下～～");
                    });
                }
            }
            
            $http.post('/api/positionDetail',{ positionId:window.acm.positionId }).success(function (data) {
                $scope.position = data.result;
            }).error(function (data) {
                alert("管理员累晕了，没有反馈结果，请重试一下～～");
            });
            $http.post('/api/paperDetail',{ paperId:window.acm.paperId }).success(function (data) {
                $scope.paper = data.result;
            }).error(function (data) {
                alert("管理员累晕了，没有反馈结果，请重试一下～～");
            });


            $scope.setScoreAll = function () {
                var pqIdList = [];
                for(var i=0;i<$scope.questionsList.length;i++){
                    pqIdList.push($scope.questionsList[i]._id);
                }
                if($('.apa_ri-cenbt input:checked').length>0){
                    $.cxDialog({
                        title: '批量设置分值',

                        info: $('.sort-content'),
                        lockScroll: true,
                        background: '#000',
                        width:330,
                        okText:"确认",
                        ok:function(){
                            if($(".cxdialog .setFenzhiInput").val()==""){alert("请输入分值！");return false;}
                            if(!isNaN($(".cxdialog .setFenzhiInput").val())){
                                $http.post('/api/setPaperNdFzPx',{ fenzhi:parseFloat($(".cxdialog .setFenzhiInput").val()),paperquestionid:pqIdList.join(','),positionId:window.acm.positionId}).success(function (data) {
                                    if(data.errmsg==""){
                                        $.cxDialog({
                                            title: '提示',
                                            info: '<div style="padding: 20px;text-align: center;padding-top: 26px;">设置成功！</div>',
                                            lockScroll: true,
                                            background: '#000',
                                            width:300,
                                            okText:"我知道了",
                                            ok:function(){
                                                location.reload();
                                            }
                                        });
                                    }else{
                                        alert(data.errmsg);
                                    }
                                }).error(function (data) {
                                    alert("管理员累晕了，没有反馈结果，请重试一下～～");
                                });
                            }else{
                                alert("请输入数字！");
                                return false;
                            }

                        }
                    });
                } else {
                    $.cxDialog({
                        title: '提示',
                        info:'<div style="padding: 20px;text-align: center;padding-bottom: 10px;">请选择相应的试题！</div>',
                        lockScroll: true,
                        background: '#000',
                        width:330,
                        okText:"我知道了",
                        ok:function () {

                        }
                    })
                }


            }
        }

        refreshFunc();
    }]
);

var initAddQuesFun = function ($scope,$http,questionId) {
    $.cxDialog.close();
    var quesModel = {
        questitle : '',
        questype : 0,
        nandu : 0,
        fenzhi : '',
        biaoji1 : '',
        biaoji2 : '',
        biaoji3 : '',
        biaoji4 : '',
        answer : '',
        answerNum : 1,
        options : [],
        beizhu : null,
        zsd11 : '',
        zsd11Title : '',
        zsd21 : '',
        zsd21Title : '',
        zsd21 : '',
        zsd21Title : '',
        zsd31 : '',
        zsd31Title : '',
        popupWindow : false,
        daanjiexi : ''
    }
    $.extend(quesModel,$scope.searchItem);
    if($(".zsd11_level2").val()==""){ alert('请选择知识点！');return;  }
    quesModel.questype = parseInt($(".questype li.A_N_P_Ali").attr("id"));
    quesModel.questitle = ue2.getContent();
    if(quesModel.questitle==''){ alert('请输入题干！');return; }else{
        if(quesModel.questitle.indexOf('请填写题干内容')>-1){ quesModel.questitle=''; alert('请输入题干！');return;  }
        if(quesModel.questitle.indexOf('表示需填空部分。如有多个填空')>-1){ quesModel.questitle=''; alert('请输入题干！');return;  }
    }
    if(quesModel.questype==4){
        if((quesModel.questitle.indexOf("（")>-1 && quesModel.questitle.indexOf("）")>-1) || (quesModel.questitle.indexOf("(")>-1 && quesModel.questitle.indexOf(")")>-1) || quesModel.questitle.indexOf("_")>-1){

        }else{
            alert('填空题要有（）或 __ 结构！');return;
        }
    }
    //验证试题类型是否相符
    if($scope.paperDetail!=undefined){
        if($scope.paperDetail.forOXCode==true){ alert("工程题用卷，不可自己添加试题！详情请联系开发：guoshaobo@ciic.com.cn");  }
        if($scope.paperDetail.forCode==true && (quesModel.questype!=6 || quesModel.questype!=22)){ alert("此子卷是编程题试卷。只可以添加编程题！");  }
        if($scope.paperDetail.forCode==false && (quesModel.questype==6 || quesModel.questype==22)){ alert("此子卷是普通试卷！不可以添加编程题！");  }
    }
    quesModel.popupWindow = parseInt($(".popupWindow li.A_N_P_Ali").attr("dataid"));

    quesModel.zsd11 = quesModel.zsd11Title ='' ;if($(".zsd11_level2").length==1){ quesModel.zsd11 =$(".zsd11_level2").val();quesModel.zsd11Title = $(".zsd11_level2").find("option:selected").text(); }

    if(quesModel.zsd11Title=="请选择"){quesModel.zsd11Title="";}
    quesModel.nandu = $(".diffcult.nanduBox").attr("value");if(quesModel.nandu==undefined || quesModel.nandu==""){ alert('请选择难度！');return; }else{ quesModel.nandu = parseInt(quesModel.nandu); }
    if(quesModel.fenzhiRule != undefined  && quesModel.fenzhiRule != ""){ quesModel.fenzhiRule = parseInt(quesModel.fenzhiRule); }
    if(!(/^[0-9]+$/.test(quesModel.fenzhi) || /^[0-9]+\.[0-9]$/.test(quesModel.fenzhi)) || parseFloat(quesModel.fenzhi)<=0 || parseFloat(quesModel.fenzhi)>100){ alert("请输入分值，支持一位小数，不要超过100！");return false;}
    if(quesModel.fenzhi != undefined && quesModel.fenzhi != ""){ quesModel.fenzhi = parseFloat(quesModel.fenzhi); }else{ alert('请输入分值！');return; }

    switch(quesModel.questype){
        case 1:
            if(!optionCheck(quesModel)){
                return;
            }
            break;
        case 2:
            if(!optionCheck(quesModel)){
                return;
            }
            break;
        case 3:
            if(!optionPanCheck(quesModel)){
                return;
            }
            break;
        case 4:
            if(!answerCheck(quesModel)){
                return;
            }
            break;
        case 5:
            answerCheck(quesModel);break;
        case 6:
            //codeQuesCheck(quesModel);break;
        case 7:
            if(!optionCheck(quesModel)){
                return;
            }
            break;
    }

    quesModel.daanjiexi = daanjiexiUE.getContent();
    if(quesModel.daanjiexi.indexOf('请填写题目考察的知识方向')>-1){ quesModel.daanjiexi='';  }
    console.log(quesModel);


    if(questionId!=""){
        quesModel.questionId = questionId;
        $http.post('/api/editQuestion',quesModel).success(function (data) {
            if(data.errmsg==""){ alert("更新成功！",function(){ history.go(-1); });
            }else{ alert(data.errmsg); }
        }).error(function (data) {
            alert("管理员累晕了，没有反馈结果，请重试一下～～");
        });
    }
    else{
        $http.post('/api/addQuestion',quesModel).success(function (data) {
            if(data.errmsg==""){
                if(quesModel.positionId!=""&& quesModel.positionId!=undefined){
                    var postData ={
                        paperId:quesModel.paperId,
                        positionId : quesModel.positionId,
                        quesIds:data.result,
                        quesMode:0
                    };
                    $http.post('/api/addQuestionIntoPaper ',postData).success(function (data) {
                        if(data.errmsg==""){
                            $.cookie("addInPaper",1);
                            alert("添加成功！",function(){
                            document.location.href='/ques#/manager/'+quesModel.positionId+'/'+quesModel.paperId; });
                        }else{ alert(data.errmsg); }
                    }).error(function (data) {
                        alert("管理员累晕了，没有反馈结果，请重试一下～～");
                    });
                }else{
                    alert("添加成功！",function(){ history.go(-1); });
                }
            }else{ alert(data.errmsg); }
        }).error(function (data) {
            alert("管理员累晕了，没有反馈结果，请重试一下～～");
        });
    }
}
var optionCheck = function (quesModel) {
    var mybool = true;
    //选择
    var option =[];var indexNo = 0;
    $(".editorBox").each(function(){
        if($(this).find(".edui-editor").length>0){
            if(window.ue.getContent()!=''){
                option.push({opttitle: window.ue.getContent(), optvalue: indexNo });
                indexNo++;
            }
        }
        else{
            if($(this).find(".addQues-optextarea-div").length>0 && $(this).find(".addQues-optextarea-div").html()!=''){
                var optiontitle ='';
                /*if($(this).find(".addQues-optextarea-div").html().indexOf('<div>')>-1){
                    optiontitle= $(this).find(".addQues-optextarea-div").html()
                }else{
                    optiontitle= $.trim($(this).find(".addQues-optextarea-div").text()).replace(/</g,'&lt;').replace(/>/g,'&gt;');
                }*/
                optiontitle= $(this).find(".addQues-optextarea-div").html();

                option.push({opttitle:optiontitle , optvalue: indexNo });
                indexNo++;
            }
        }
    });
    var compareBool = true;
    if(option.length>1){
        for(var i=0;i<option.length-1;i++){
            for(var j=i+1;j<option.length;j++){
                if(option[i].opttitle == option[j].opttitle){
                    compareBool = false;
                }
            }
        }
    }
    if(!compareBool){ alert("不能有相同的选项或答案！"); mybool =false;  }

    quesModel.options = option;
    var quesIndex = -1;
    var answer = [];
    $(".editorBox input").each(function(){
        if($(this).is(":checked")){
            answer.push(quesIndex.toString());
            if($(this).parents(".editorBox").find(".edui-default").length>0){
                if(window.ue.getContent()==''){
                    alert("正确答案的选项没有填写内容！"); mybool =false;
                }
            }
            else if($(this).parents(".editorBox").find(".addQues-optextarea-div").text()==""){
                alert("正确答案的选项没有填写内容！"); mybool =false;
            }
        }
        quesIndex ++;
    });
    quesModel.answer = answer.join(",");
    if(quesModel.answer==""){ alert("您还没有选择答案！"); mybool =false;}
    if(quesModel.questype ==2 && answer.length<2){ alert("多选题至少填写两个答案！"); mybool =false; }
    if(quesModel.questype ==1 && option.length<2){ alert("单选题至少填写两个选项！"); mybool =false; }
    if(quesModel.questype ==2 && option.length<3){ alert("多选题至少填写三个选项！"); mybool =false; }
    if(quesModel.questype ==7 && option.length<2){ alert("不定项选择题至少填写两个选项！"); mybool =false; }
    return mybool;
}
var optionPanCheck = function (quesModel) {
    var mybool = true;
    //选择
    var option =[];var indexNo = 0;
    $(".type3Box .itemCode").each(function(){
        option.push({ opttitle: $(this).val(), optvalue: indexNo });
        if($(this).val()==""){ alert('两个选项均需填写内容！');mybool = false ; }
        indexNo++;
    });
    quesModel.options = option;

    var quesIndex = 0;
    var answer = [];
    $(".type3Box table").each(function(){
        if($(this).find("input").is(":checked")){
            answer.push(quesIndex);
        }
        quesIndex ++;
    });
    quesModel.answer = answer.join(",");
    if(quesModel.answer==""){ alert("您还没有选择答案！"); mybool = false ; }
    return mybool;
}
var answerCheck = function (quesModel) {
    var mybool = true;
    //填空，问答
    if(quesModel.questype==4){
        //填空
        if(quesModel.questitle.indexOf('请在题目中用（ &nbsp; &nbsp;）表示需填空部分')>-1){ quesModel.questitle=''; }
        var answer = [];
        $(".tiankong .content-model div.tkDiv").each(function(){
            //answer.push($.trim($(this).find(".tkAns").text()));
            answer.push($.trim($(this).find("textarea").val()));
        });
        quesModel.answerNum = parseInt($(".tkNumdropdown").val());
        //if(answer.length!=$(".tkNumdropdown").val()){ alert('您有未填写的答案选项！');mybool = false ; }

        quesModel.answer = answer.join("@@");
        if($("#youxuCheck").prop("checked")){ quesModel.orderType =1;  }else{ quesModel.orderType =0; }
    }else{
        //问答
        quesModel.answer = ue5.getContent();
        if(quesModel.answer.indexOf('此内容会显示在试卷报告中，方便阅卷官评阅试卷时参考，不会显示给考生')>-1){
            quesModel.answer ='';
        }
        quesModel.assist = {};
        if($(".assistBox li[data=s1]").hasClass("A_N_P_Ali")){ quesModel.assist.s1 =1 ; }
        if($(".assistBox li[data=s2]").hasClass("A_N_P_Ali")){ quesModel.assist.s2 =1 ; }
        if($(".assistBox li[data=s3]").hasClass("A_N_P_Ali")){ quesModel.assist.s3 =1 ; }
        if($(".assistBox li[data=s4]").hasClass("A_N_P_Ali")){ quesModel.assist.s4 =1 ; }
        if($(".assistBox li[data=s5]").hasClass("A_N_P_Ali")){ quesModel.assist.s5 =1 ; }
        if($(".assistBox li[data=s6]").hasClass("A_N_P_Ali")){ quesModel.assist.s6 =1 ; }
    }
    return mybool;
}

quesControllers.controller("AddController", ['$scope', '$http','$routeParams','$location', '$timeout',
    function($scope, $http,$routeParams,$location, $timeout)
    {
        $scope.selectOption=1;
        if($routeParams.option){
            $scope.selectOption = $routeParams.option;
        }
        /*版本判断*/
        if($.cookie('version')){
            $scope.version = parseInt($.cookie('version'));
        }else{
            $http.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") +  "&r=" + Math.random(),{}).success(function (data) {
                $scope.version = data.data.exam_version;
                $.cookie('version',data.data.exam_version,{ path: '/'})
            }).error(function (data) {
                console.log(data);
            });
        }
        /*权限判断*/
        $http.post('/api/userRight',{}).success(function (data) {
            $scope.rightStr = data.result.join(',');
            if($scope.rightStr.indexOf('right_id12')>-1){
                $(".addpap_t9 li[id=6]").removeClass('hide');
            }
            if($scope.rightStr.indexOf('right_id19')>-1){
                $(".addpap_t9 li[id=8]").removeClass('hide');
            }
        }).error(function (data) {
            console.log("服务器错误：" + data);
        });
        if(window.ue2!=undefined){
            window.ue2.destroy();
        }
        if(window.ue5!=undefined){
            window.ue5.destroy();
        }
        if(window.daanjiexiUE!=undefined){
            window.daanjiexiUE.destroy();
        }

        $scope.searchItem ={fenzhiRule:"0",answerCount:"1",answerArr:[""],optionsExt:[{opttitle: "", optvalue: 0}, {opttitle: "", optvalue: 1}] };

        var refreshFunc = function() {
            if(localStorage.quesNodes!=undefined){
                $scope.Level1Data = $.parseJSON(localStorage.quesNodes);
                $timeout(function () {
                    $(".dropdown").easyDropDown({ cutOff: 6 });
                });
            }else{
                $http.get('/api/quesNodes').success(function (data) {
                    $scope.Level1Data = data.result;
                    localStorage.quesNodes = JSON.stringify(data.result);
                    $timeout(function () {
                        $(".dropdown").easyDropDown({ cutOff: 6 });
                    });
                }).error(function (data) {
                    alert("管理员累晕了，没有反馈结果，请重试一下～～");
                });
            }
            $(".tkNumdropdown").easyDropDown({ cutOff: 6 });

        }

        window.levelChange = function(){
            var level1Value = $(".zsd11_level1").val();
            if(level1Value==""){
                $(".zsd11_level2").parents('.dropdown').remove();

            }else{
                $(".zsd11_level2").parents('.dropdown').remove();
                $(".zsd11_level1").parents('.dropdown').after('<select class="zsd11_level2" name="zsd11_level2"><option value="">请选择</option></select>');

                $scope.Level1Data.forEach(function (item) {
                    if(item.id==level1Value){
                        $scope.Level2Data = item.child;
                        $scope.Level2Data.forEach(function(item){
                            $(".zsd11_level2").append('<option  value="'+item.id+'" >'+item.name+'</option>');
                        });
                        $(".zsd11_level2").easyDropDown({ cutOff: 6 });
                    }
                });
            }
        }


        $timeout(function () {
            refreshFunc();
            initBindPageFun();
        });

        $scope.warning = function () {
            if(!$.cookie("kao_token")){ document.location.href='https://kao.acmcoder.com/enterprise/login'; }
            initAddQuesFun($scope,$http,"");
        }

        window.acm.initBindFun = function () {
            $('.answer .editTip').unbind("click").bind("click",function(){
                //如果存在编辑器，返回
                if($(this).parent().find(".edui-editor.edui-default").length){
                    return;
                }
                var $target = $(this).parent();
                if(window.ue && window.ue.container!=undefined){
                    //如果不存在
                    $(".editorBox.init").removeClass("init");
                    $('.answer .content').css('border','1px solid #dadada');
                    //获取原来的dom
                    var currentParnet = ue.container.parentNode.parentNode;
                    //获取原来的内容
                    var currentContent = ue.getContent();
                    //获取目标的dom
                    //获取目标的内容
                    window.targetContent = $target.children("div.addQues-optextarea-div").html();

                    //消除编辑器
                    window.ue.destroy();
                    //填充原来内容
                    var textarea = currentContent.replace(/\<\/?p\>/gim, '');
                    $(currentParnet).html('<div class="content"><div class="addQues-optextarea-div" contenteditable="true">'+textarea+'</div><div class="editTip"><a href="javascript:void(0)"><i class="fa fa-plus"></i>使用编辑器</a></div></div>');
                    $target.html(window.targetContent);
                    //初始化
                    $target.attr("id","editor1");
                    $target.html('');
                    initRadioEditor();
                    setTimeout(function(){
                        if(window.targetContent!=undefined){
                            window.ue.setContent(window.targetContent);
                        }
                    },500)
                }
                else{
                    //初始化
                    window.targetContent = $target.children("div.addQues-optextarea-div").html();
                    $target.html('');
                    $target.attr("id","editor1");
                    initRadioEditor();
                }
                window.acm.initBindFun();
            });

            $('.answer .addQues-optextarea-div').unbind("click").bind("click",function () {
                if(window.ue){
                    var currentContent = window.ue.getContent();
                    var targetEml =  ue.container.parentNode.parentNode;
                    window.ue.destroy();
                    $(targetEml).html('<div class="content"><div class="addQues-optextarea-div" contenteditable="true">'+currentContent+'</div><div class="editTip"><a href="javascript:void(0)">使用编辑器</a></div></div>');
                    if($scope.version==3){
                        $(this).parent().find(".editTip a").click();
                    }
                }
                window.acm.initBindFun();
            });
        }

        window.tkNumChange = function () {
            var num = $(".tkNumdropdown").val();
            if(parseInt(num)>window.acm.tkNumChangeNum){
                for(var i=window.acm.tkNumChangeNum;i<parseInt(num);i++){
                    $('.copymodel span').text(i+1);
                    var text = $('.copymodel').html();
                    $('.content-model').append(text);
                }
            }else{
                $('.content-model div.tkDiv:gt('+(parseInt(num)-1)+')').remove();
            }
            window.acm.tkNumChangeNum = parseInt(num);

            if(parseInt(num)>1){ $(".sp_Tcb-ti span.youxu").removeClass('hide') }else{ if(!$(".sp_Tcb-ti span.youxu").hasClass('hide')){$(".sp_Tcb-ti span.youxu").addClass('hide');}}
        }
        /*单选选中正确答案*/
        window.acm.checkOnly = function(){
            $('.answer .an:gt(2)').show();
            $('.answer .an input').show();
            $('.addQues-close').show();
            $('.add-answer').show()
            $('.an input:checkbox').attr('type','radio').prop('checked',false);
            $(document).off('.addQues-close').on('click','.an input:radio',function () {
                $.each($('.an input:radio'),function(){
                    $(this).prop('checked',false).parent().siblings('td').find('.addQues-ok').hide()
                })
                $(this).prop('checked',true).parent().siblings('td').find('.addQues-ok').show();
            })
        }
        /*多选题*/
        window.acm.checkMore= function(){
            $(' .answer .an:gt(2)').show();
            $('.answer .an input').show();
            $('.addQues-close').show();
            $('.add-answer').show()
            $('.an input:radio').attr('type','checkbox').prop('checked',false);
            $(document).off(".addQues-close").on('click','.an input:checkbox',function () {
                if($(this).is('input:checked')){
                    $(this).parent().siblings('td').find('.addQues-ok').show()
                }else {
                    $(this).parent().siblings('td').find('.addQues-ok').hide();
                }
            })
        }
        /*填空题*/
        window.acm.emptyBlank =function() {
            $('.danxuan-s').hide();//单选场次隐藏
            $('.tiankong').show();
            $('.answer .an input').hide();
            $('.addQues-close').hide();
            $('.add-answer').hide()
            $('.tiankong .answer .an:gt(2)').hide();//只显示一项答案
            $(document).on('click','.des-bank .selectUI li a',function(){
                $('.content-model').html('');
                for(var i=0;i<parseInt($(this).text());i++){
                    $('.copymodel span').text(i+1);
                    var text = $('.copymodel').html();
                    $('.content-model').append(text);
                }
            })

        }
        /*判断题*/
        window.acm.judgeQuetion =function() {
            /* $('.answer .an:gt(3)').hide();
             $('.answer .an input').show();
             $('.addQues-close').hide();
             $('.add-answer').hide()*/
        }
        /*问答题*/
        window.acm.askQuestion =function() {
            $('.danxuan-s').hide();
            $('.que-ask').show();
            /*问答题编译器实例化*/
            /*=====================================================*/
            window.ue5 =  UE.getEditor('Editor2',{
                //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                toolbars: [
                    ['source','fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                        'bold', 'italic', 'underline', 'fontborder','|',
                        'link', 'unlink','|',
                        'simpleupload','imagefloat',
                        'insertcode',]
                ],
                //focus时自动清空初始化时的内容
                autoClearinitialContent:true,
                //关闭字数统计
                wordCount:false,
                //关闭elementPath
                elementPathEnabled:false,
                autoFloatEnabled:false
            })
        }

        /*=====================================================*/
        /*实例化*/
        var initRadioEditor = function () {
            window.ue = UE.getEditor("editor1", {
//                serverUrl: '/assessment/ueditor',
                toolbars: [
                    ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                        'bold', 'italic', 'underline', 'fontborder','superscript', 'subscript','removeformat','|',
                        'simpleupload','imagefloat',
                        'insertcode',]
                ],
                //focus时自动清空初始化时的内容
                //关闭字数统计
                wordCount:false,
                autoHeightEnabled:true,
                elementPathEnabled:false,
                autoFloatEnabled:false,
                //默认的编辑区域高度
                'enterTag' : 'br'
            });
            window.ue.addListener( 'ready', function( editor ) {
                //ue.setContent(window.targetContent);
                window.ue.options.autoHeightEnabled = true;
                $(ue.iframe.contentWindow.document.body).css("background","#e7e7e7");
                if(window.targetContent!=undefined){
                    window.ue.setContent(window.targetContent);
                }
                window.ue.focus();
            });

        }

        window.acm.tkNumChangeNum  = 1;
        
        var initBindPageFun = function () {

            window.acm.checkOnly()
            var sp_Tc2 = $('.sp_Tc2 ul');
            sp_Tc2.on('click','li',function(){
                if(!$(this).hasClass('A_N_P_Ali')){
                    $(this).siblings().removeClass('A_N_P_Ali');
                    $(this).addClass('A_N_P_Ali');
                }
                if($(this).parents('.popupWindow').length==1){
                    if($(this).attr("dataid")==0){ $(".assistBox li[data=s5]").removeClass('A_N_P_Ali');}
                }
            });


            /*添加试题*/
            $('.add-answer').click(function (){
                var copyAnswer = $('.copy').html();
                var ele = $(copyAnswer);
                ele.find(".forEditor").attr("id","t"+(parseInt(Math.random()*1000000)));
                if($('.answer .an').length>9){
                    $.cxDialog({
                        title: '提示',
                        info: '<div class="cxDialogContent">最多只能支持8个选项</div>',
                        lockScroll: true,
                        background: '#000',
                        width: 400,
                    });
                }else{
                    $('.answer').append(ele);
                }
                window.acm.initBindFun();
            })

            $(document).on('click','.chose-radio input:radio',function () {
                $.each($('.chose-radio input:radio'),function(){
                    $(this).prop('checked',false)
                })
                $(this).prop('checked',true)
            })
            $(document).on('click','.parse input:radio',function () {
                $.each($('.parse input:radio'),function(){
                    $(this).prop('checked',false).parent().siblings('td').find('.addQues-ok').hide()
                })
                $(this).prop('checked',true).parent().siblings('td').find('.addQues-ok').show();
            })

            $('.time-a').blur(function () {
                $(this).css('border','1px solid #dadada')
            })
            $('.time-a').keyup(function(){
                var str=$(this).val();
                $(this).css('border','1px solid #2abcb8')
                if(str.length>2 && parseInt(str)>100){
                    $.cxDialog({
                        title: '提示',
                        info: '<div class="cxDialogContent">最多输入100分</div>',
                        lockScroll: true,
                        background: '#000',
                        width: 400,
                    });
                    $(this).val('');
                }else {
                    if(!str||isNaN(str)){
                        $(this).val('')
                    }else{
                        if(str.indexOf(".")>-1){
                            $(this).val(returnFloat(str));
                        }
                    }
                }

            })
            function returnFloat(value){
                var xsd=value.toString().split(".");
                if(xsd.length==1){
                    return value;
                }
                if(xsd.length>1){
                    if(xsd[1].length>=2){
                        value = xsd[0]+'.'+xsd[1].substring(0,1);
                    }
                    return value;
                }
            }
            window.acm.initBindFun();
            var danxuanEditor;
            /*选中效果*/
            $('.diffcult .xing-kong').click(function(){
                var index =$(this).index();
                $(this).parents(".diffcult").attr("value",index);
                $('.xing-kong').removeClass('active');
                $('.xing-kong:lt('+index+')').addClass('active');
            });
            /*题型筛选*/
            $('.addpap_t9 ul li').click(function () {
                if($(this).attr("id")=="6"){
                    location.href='/ques#/add/onlinecode';
                }
                else if($(this).attr("id")=="8"){
                    location.href='/ques#/add/webcode';
                }
                if(!$(this).hasClass('A_N_P_Ali')){
                    $(this).siblings().removeClass('A_N_P_Ali');
                    if($(this).text()!='全选'){
                        $(this).addClass('A_N_P_Ali');
                    }
                }
                if($(this).attr("id")=="4"){
                    if(ue2.getContent()!="" && ue2.getContent().indexOf('请填写题干内容')>-1){
                        ue2.setContent('<p style="color: #ccc">请在题目中用（    ）表示需填空部分。如有多个填空，请分别用（    ）区分开</p>')
                    }
                    ue2.addListener("click",function(){
                        if(ue2.getContent().indexOf('表示需填空部分。如有多个填空，请分别用')>-1){ ue2.setContent(''); }
                    })
                }else{
                    if(ue2.getContent()!="" && ue2.getContent().indexOf('表示需填空部分。如有多个填空，请分别用')>-1){
                        ue2.setContent('<p style="color: #ccc">请填写题干内容</p>')
                    }
                    ue2.addListener("click",function(){
                        if(ue2.getContent().indexOf('请填写题干内容')>-1){ ue2.setContent(''); }
                    })
                }
                if($(this).hasClass('A_N_P_Ali')){
                    if($(this).text()=='单选题' ){
                        clearText()
                        $('.noOnline').show();
                        $('.onLine').hide();
                        $('.des-bank').hide();
                        $('.des-bank-2 ').hide();
                        $('.tiankong').hide();
                        $('.question-ask').hide()
                        $('.sp_Tc6').show();
                        $('.que-ask').hide();
                        $('.danxuan-s').show();
                        $('.parse-l').hide()
                        $('.time-online').hide();
                        $('.time-noline').show()
                        window.acm.checkOnly()

                    }
                    else if($(this).text()=='多选题' || $(this).text()=='不定项选择题'){
                        clearText()
                        $('.noOnline').show();
                        $('.onLine').hide();
                        $('.des-bank').hide();
                        $('.des-bank-2 ').show();
                        $('.tiankong').hide()
                        $('.question-ask').hide()
                        $('.sp_Tc6').show();
                        $('.que-ask').hide();
                        $('.danxuan-s').show();
                        $('.parse-l').hide()
                        $('.time-online').hide();
                        $('.time-noline').show()
                        window.acm.checkMore()
                    }
                    else if($(this).text()=='填空题'){


                        $('.noOnline').show();
                        $('.onLine').hide();
                        $('.des-bank').show();
                        $('.des-bank-2 ').hide();
                        $('.tiankong').show()
                        $('.question-ask').hide()
                        $('.sp_Tc6').show();
                        $('.que-ask').hide();
                        $('.parse-l').hide()
                        $('.time-online').hide();
                        $('.time-noline').show()
                        window.acm.emptyBlank()
                    }
                    else if($(this).text()=='判断题'){

                        clearText()
                        $('.danxuan').hide();
                        $('.noOnline').show();
                        $('.onLine').hide();
                        $('.des-bank').hide();
                        $('.des-bank-2 ').hide();
                        $('.tiankong').hide()
                        $('.question-ask').hide()
                        $('.sp_Tc6').show();
                        $('.que-ask').hide();
                        $('.parse-l').show()
                        $('.time-online').hide();
                        $('.time-noline').show()
                        window.acm.judgeQuetion();

                    }
                    else if($(this).text()=='问答题'){

                        $('.noOnline').show();
                        $('.onLine').hide();
                        $('.des-bank').hide();
                        $('.des-bank-2 ').hide();
                        $('.tiankong').hide();
                        $('.question-ask').show();
                        $('.sp_Tc6').show();
                        $('.parse-l').hide()
                        $('.time-online').hide();
                        $('.time-noline').show()
                        window.acm.askQuestion()
                    }
                } else{

                }
            })

            /*切换试题是，清空选中内容*/
            function clearText() {
                $('.danxuan-s input').prop('checked', false);
                $('.danxuan-s .addQues-ok').hide();
            }
            /*清空题目解析内容*/

            /*删除选项*/
            $(document).on('click','.addQues-close',function () {
                if($(".questype .A_N_P_Ali").attr("id")==2){
                    if($('.addQues-close').length<5){
                        alert("至少保留3个选项");
                    }  else{
                        if($(this).parents(".editorBox").find(".fromEditBox").length==1){
                            $(".copyEditBox").append($(".editor1.fromEditBox"));$(this).parents('.an').remove()
                        }
                        else{
                            $(this).parents('.an').remove()
                        }
                    }
                }else{
                    if($('.addQues-close').length<4){
                        alert("至少保留2个选项");
                    }  else{
                        if($(this).parents(".editorBox").find(".fromEditBox").length==1){
                            $(".copyEditBox").append($(".editor1.fromEditBox"));$(this).parents('.an').remove()
                        }
                        else{
                            $(this).parents('.an').remove()
                        }
                    }
                }
            });

            /*多选*/
            $('.que-ask ul li').click(function(){
                if($(this).parents('.assistBox').length==1 && $(this).attr("data")=="s5"){
                    if($(this).hasClass('A_N_P_Ali')){
                        $(this).removeClass('A_N_P_Ali')
                    }else{
                        if($(".popupWindow ul li.A_N_P_Ali").attr("dataid")==1){
                            $(this).addClass('A_N_P_Ali')
                        }else{
                            confirm('使用“本机文件上传”功能，须允许考生跳出页面作答，此时有作弊的可能 <br>你确定允许考生跳出页面作答吗？',function(){
                                $(".popupWindow ul li[dataid=1]").addClass('A_N_P_Ali');$(".popupWindow ul li[dataid=0]").removeClass('A_N_P_Ali');$(".assistBox ul li[data=s5]").addClass('A_N_P_Ali');
                            });
                        }
                    }
                }else{
                    if($(this).hasClass('A_N_P_Ali')){
                        $(this).removeClass('A_N_P_Ali')
                    } else{
                        $(this).addClass('A_N_P_Ali')
                    }
                }
            })


            window.daanjiexiUE =  UE.getEditor('daanjiexi',{
                //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                toolbars: [
                    ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',  'bold', 'italic', 'underline', 'fontborder','|', 'link', 'unlink','|', 'simpleupload','imagefloat', 'insertcode',]
                ],
                //focus时自动清空初始化时的内容
                autoClearinitialContent:true,
                //关闭字数统计
                wordCount:false,
                //关闭elementPath
                elementPathEnabled:false,
                autoFloatEnabled:false,
                //默认的编辑区域高度
//                initialFrameHeight:160,

            })
            window.daanjiexiUE.addListener( 'ready', function( editor ) {
                $(window.daanjiexiUE.iframe.contentWindow.document.body).css("color","#777");
                window.daanjiexiUE.setContent('请填写题目考察的知识方向、解题思路等信息，便于后期交流、讨论。不会显示给考生。（选填）');
                window.daanjiexiUE.addListener("click",function(){
                    if(window.daanjiexiUE.getContent().indexOf('请填写题目考察的知识方向')>-1){ window.daanjiexiUE.setContent(''); }
                });
                if($scope.version==3 && $scope.selectOption==1){
                    $($(".optionsListBox .editTip")[0]).click();
                }
            })

            window.ue2 =  UE.getEditor('myEditor',{
                //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                toolbars: [
                    [ 'source','undo', 'redo','fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                        'bold', 'italic', 'underline', 'fontborder','|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify','|', 'strikethrough', 'superscript', 'subscript', 'removeformat','|', 'insertorderedlist', 'insertunorderedlist','lineheight', '|',
                        'link', 'unlink','|',
                        'simpleupload','imagefloat', 'emotion', 'insertvideo', 'music', 'attachment','insertframe',
                        'horizontal', '|',
                        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol','|','insertcode',]
                ],
                //focus时自动清空初始化时的内容
                autoClearinitialContent:false,
                //关闭字数统计
                wordCount:false,
                //关闭elementPath
                elementPathEnabled:false,
                autoFloatEnabled:false,
                //默认的编辑区域高度
//                initialFrameHeight:160,

            });
            window.ue2.addListener( 'ready', function( editor ) {
                $(window.ue2.iframe.contentWindow.document.body).css("background","#666").css("color","#fff");
                window.ue2.setContent('<p style="color: #ccc">请填写题干内容</p>');
                window.ue2.addListener("click",function(){
                    if(window.ue2.getContent().indexOf('请填写题干内容')>-1){ window.ue2.setContent(''); }
                })
                if($scope.selectOption!=1){
                    $('.addpap_t9 ul li[id='+$scope.selectOption+']').click();
                }
            });

        }

    }]
);

quesControllers.controller("AddOnlineCodeController", ['$scope', '$http','$routeParams','$location', '$timeout',
        function($scope, $http,$routeParams,$location, $timeout)
        {
            if (Object.isNullString($routeParams.positionId)) {
                window.acm.positionId = undefined;
            }else{
                window.acm.positionId = $routeParams.positionId;
            }
            if (Object.isNullString($routeParams.paperId)) {
                window.acm.paperId = undefined;
            }else{
                window.acm.paperId = $routeParams.paperId;
            }
            if(window.ueTitle!=undefined){ window.ueTitle.destroy(); }
            if(window.codeUE3!=undefined){ window.codeUE3.destroy(); }
            if(window.codeUE4!=undefined){ window.codeUE4.destroy(); }
            if(window.codeUE5!=undefined){ window.codeUE5.destroy(); }
            if(window.codeUE6!=undefined){ window.codeUE6.destroy(); }
            if(window.onlineAnsUE!=undefined){ window.onlineAnsUE.destroy(); }
            if(window.daanjiexiUE!=undefined){ window.daanjiexiUE.destroy(); }
            if(window.ue2!=undefined){ window.ue2.destroy(); }
            /*版本判断*/
            $http.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") +  "&r=" + Math.random(),{}).success(function (data) {
                $scope.entInfo = data.data;
                $scope.version = data.data.exam_version;
                $.cookie('version',data.data.exam_version,{ path: '/'})
            }).error(function (data) {
                console.log(data);
            });
            if($.cookie("endExamNotes")){
                $.cookie('endExamNotes', null, { expires: -1, path: '/',domain:'.acmcoder.com' });
            }
            if(localStorage.quesNodes!=undefined){
                var dataV = $.parseJSON(localStorage.quesNodes);
                dataV.forEach(function(item){
                    if(item.id==126){ $scope.LevelData = item.child; }
                });
                $timeout(function () {
                    $scope.qnTimeout();
                });
            }else{
                $http.get('/api/quesNodes').success(function (data) {
                    localStorage.quesNodes = JSON.stringify(data.result);
                    data.result.forEach(function(item){
                        if(item.id==126){ $scope.LevelData = item.child; }
                    });
                    $timeout(function () {
                        $scope.qnTimeout();
                    });
                }).error(function (data) {
                    alert("管理员累晕了，没有反馈结果，请重试一下～～");
                });
            }

            $scope.qnTimeout = function(){
                $($(".online-know ul li")[0]).addClass('A_N_P_Ali');

                $('.checkChooise.zhishidian ul li').bind('click',function () {
                    if($(this).hasClass('A_N_P_Ali')){
                        if($(this).text()!='全选'){
                            $(this).removeClass("A_N_P_Ali");
                        }

                    }else{
                        if($('.checkChooise.zhishidian ul li.A_N_P_Ali').length>=3){
                            alert('此项最多只能选择3个！');return;
                        }else{
                            if($(this).text()!='全选'){
                                $(this).addClass("A_N_P_Ali");
                            }

                        }
                    }
                })
                $('.checkChooise.onLine-langue ul li').bind('click',function () {
                    if($(this).hasClass('must') && $(this).hasClass('A_N_P_Ali')){ return; }
                    if($(this).hasClass('A_N_P_Ali')){
                        if($(this).text()!='全选'){
                            $(this).removeClass("A_N_P_Ali");
                        }
                    }else{
                        if($(this).text()!='全选'){
                            $(this).addClass("A_N_P_Ali");
                        }
                    }
                    $scope.step1search.language=[];
                    $(".onLine-langue ul li.A_N_P_Ali").each(function(){
                        $scope.step1search.language.push({"id":$(this).attr("data-id"),"name":$(this).attr("data-name")});
                    });
                    if(typeof codeEditor1!='undefined'){
                        window.acm.initLoadSelect();
                        $(".langSelect1").easyDropDown('select',1);
                    }

                    if($(".onLine-langue.checkChooise .A_N_P_Ali").length!=$(".onLine-langue.checkChooise li").length-1){
                        $(".onLine-langue.checkChooise .contralKnow").removeClass('A_N_P_AliL');
                    }else if($(".onLine-langue.checkChooise .A_N_P_Ali").length == $(".onLine-langue.checkChooise li").length-1){
                        $(".onLine-langue.checkChooise .contralKnow").addClass('A_N_P_AliL');
                    }
                })
            }

            /*权限判断*/
            $http.post('/api/userRight',{}).success(function (data) {
                $scope.rightStr = data.result.join(',');
                if($scope.rightStr.indexOf('right_id12')==-1){
                    $.cxDialog({
                        title: '提示',info: '<div style="padding:20px; text-align:center;">您没有添加和编辑编程题的权限</div>',lockScroll: true,closeBtn:false,background: '#000',width: 400,okText:'我知道了',
                        ok:function(){
                            history.go(-1);
                        }
                    });
                }
            }).error(function (data) {
                console.log("服务器错误：" + data);
            });
            $scope.step1search ={ time:1,memory:64 };
            $scope.egList = [];
            $scope.egTotalScore = 0;
            $scope.step1search.language = [{"id":0,"name":"C"}];

            $timeout(function () {
                refreshFunc();
            });

            $scope.warning = function () {
                initAddQuesFun($scope,$http,"");
                console.log("f1");
            }
            $scope.step1search.ques_id = null;
            /*=====================================================*/
            var refreshFunc = function() {

                /*实例化*/
                //编程题题干
                window.ueTitle = UE.getEditor('myEditor1',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars: [
                        [ 'source','undo', 'redo','fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic', 'underline', 'fontborder','|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify','|', 'strikethrough', 'superscript', 'subscript', 'removeformat','|', 'insertorderedlist', 'insertunorderedlist','lineheight', '|',
                            'link', 'unlink','|',
                            'simpleupload','imagefloat', 'emotion', 'insertvideo', 'music', 'attachment','insertframe',
                            'horizontal', '|',
                            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol','|','insertcode',]
                    ],
                    //关闭字数统计
                    wordCount:false,
                    autoFloatEnabled:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    //默认的编辑区域高度
                    initialFrameHeight:120,

                })
                window.ueTitle.addListener( 'ready', function( editor ) {
                    //$(window.ueTitle.iframe.contentWindow.document.body).css("background","#666");
                    window.ueTitle.setContent('<p style="color: #ccc">请填写题干内容</p>')
                    window.ueTitle.addListener("click",function(){
                        if(window.ueTitle.getContent().indexOf('请填写题干内容')>-1){ window.ueTitle.setContent(''); }
                    })
                })
                initBindPageFun();

                /*选中效果*/
                $('.diffcult .xing-kong').click(function(){
                    var index =$(this).index();
                    $(this).parents(".diffcult").attr("value",index);
                    $('.xing-kong').removeClass('active');
                    $('.xing-kong:lt('+index+')').addClass('active');
                });
            }
            $scope.thisQues = {};

            $scope.saveStep1 = function(obj){
                if($(".btn.saveStep1").hasClass("limited")){ return; }
                $(".btn.saveStep1").addClass("limited");
                //$(window).bind('beforeunload',function(){return '------------------------------------------------\n提示：未保存的内容将会丢失。\n------------------------------------------------';});

                $scope.step1search.quesremark = ueTitle.getContent();
                $scope.step1search.tags = '';

                $scope.step1search.input_des = window.codeUE3.getContent();
                $scope.step1search.output_des = window.codeUE4.getContent();
                $scope.step1search.input_eg = window.codeUE5.getContent();
                $scope.step1search.output_eg = window.codeUE6.getContent();
                $scope.step1search.level  =$(".diffcult .xing-kong.active").length;

                if($scope.step1search.time==undefined){ $scope.step1search.time=1; }
                if($scope.step1search.memory==undefined){ $scope.step1search.memory=64; }

                if($scope.step1search.questitle=="" || $scope.step1search.questitle==undefined){alert('请输入题目名字'); $(".btn.saveStep1").removeClass("limited");return;}
                $scope.step1search.ques_title = $scope.step1search.questitle;
                if($scope.step1search.level==0){ alert('请选择难度值');$(".btn.saveStep1").removeClass("limited"); return ; }
                var re = /^[0-9]+$/;
                if($scope.step1search.time==""){alert("请输入时间限制");$(".btn.saveStep1").removeClass("limited");return;}
                else{
                    if(!re.test($scope.step1search.time) || parseInt($scope.step1search.time)<=0 || parseInt($scope.step1search.time)>=2147483647){ alert("时间限制的数据格式不对");$(".btn.saveStep1").removeClass("limited");return ;}
                    if(parseInt($scope.step1search.time)>3){alert('时间限制不能超过3秒'); $(".btn.saveStep1").removeClass("limited");return ; }
                }
                if($scope.step1search.memory==""){alert("请输入内存限制");$(".btn.saveStep1").removeClass("limited");return ;}
                else{
                    if(!re.test($scope.step1search.memory) || parseInt($scope.step1search.memory)<=0 || parseInt($scope.step1search.memory)>=2147483647){ alert("内存限制的数据格式不对");$(".btn.saveStep1").removeClass("limited");return ;}
                    if(parseInt($scope.step1search.memory)>128){alert('内存限制不能超过128M');$(".btn.saveStep1").removeClass("limited"); return ; }
                }

                if($scope.step1search.quesremark=="" || $scope.step1search.quesremark.indexOf("请填写题干内容")>-1){alert("题干描述必填");$(".btn.saveStep1").removeClass("limited");return ;}
                if($scope.step1search.input_des==""){alert("输入描述必填");$(".btn.saveStep1").removeClass("limited");return ;}
                if($scope.step1search.output_des==""){alert("输出描述必填");$(".btn.saveStep1").removeClass("limited");return ;}
                if($scope.step1search.input_eg==""){alert("输入样例必填");$(".btn.saveStep1").removeClass("limited");return ;}
                if($scope.step1search.output_eg==""){alert("输出样例必填");$(".btn.saveStep1").removeClass("limited");return ;}
                //if($scope.step1search.quesremark.length>10000){ alert("题干内容超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                //if($scope.step1search.input_des.length>500){ alert("输入描述超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                if($scope.step1search.output_des.length>600){ alert("输出描述超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                //if($scope.step1search.input_eg.length>500){ alert("输入样例超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                if($scope.step1search.output_eg.length>4000){ alert("输出样例超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                //if($scope.step1search.hint_des!=undefined && $scope.step1search.hint_des.length>500){ alert("Hint内容超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }

                if($(".onLine-langue ul li.A_N_P_Ali").length==0){ alert("请至少选择一种语言！");$(".btn.saveStep1").removeClass("limited");return ; }

                $.post('/factory/saveEditingQues1',$scope.step1search,function(data){
                    $(".btn.saveStep1").removeClass("limited");
                    if(data.status=='ok'){
                        if(data.ques_id!=undefined){
                            $scope.step1search.ques_id = data.ques_id;
                        }
                        $http.post('/api/proQuestionDetail',{questionId:$scope.step1search.ques_id}).success(function (data) {
                            $scope.thisQues = data.result;
                            //更新标签、知识点
                            var postData = {};
                            postData.questionId = $scope.step1search.ques_id;
                            postData.biaoji1 = $scope.step1search.biaoji1;
                            postData.biaoji2 = $scope.step1search.biaoji2;
                            postData.biaoji3 = $scope.step1search.biaoji3;
                            postData.biaoji4 = $scope.step1search.biaoji4;
                            postData.rateOfPro =1;
                            postData.javatimelimit = ((parseInt($scope.step1search.time) + 2) * 1000).toString();;
                            postData.javamemorylimit = ((parseInt($scope.step1search.memory) + 512)*1024).toString();;
                            if($(".checkChooise.zhishidian ul li.A_N_P_Ali")[0]!=undefined){ postData.zsd11 = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[0]).attr("data-id");postData.zsd11Title = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[0]).attr("data-name"); }
                            if($(".checkChooise.zhishidian ul li.A_N_P_Ali")[1]!=undefined){ postData.zsd21 = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[1]).attr("data-id");postData.zsd21Title = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[1]).attr("data-name"); }
                            if($(".checkChooise.zhishidian ul li.A_N_P_Ali")[2]!=undefined){ postData.zsd31 = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[2]).attr("data-id");postData.zsd31Title = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[2]).attr("data-name"); }
                            postData.allowlangs = [];
                            $(".onLine-langue li.A_N_P_Ali").each(function(){
                                postData.allowlangs.push($(this).attr("data-id"));
                            })
                            postData.allowlangs = postData.allowlangs.join(',') ;
                            postData.timeLimit = (parseInt($scope.step1search.time) * 1000).toString();
                            postData.memoryLimit = (parseInt($scope.step1search.memory) * 1024).toString();

                            $http.post('/api/proQuestionEdit',postData).success(function (data) {
                                if(!$(".step2Box").hasClass('hide') && obj==3){
                                    $scope.saveStep3();
                                }
                            }).error(function (data) {
                                console.log("服务器错误：" + data);
                            });
                        }).error(function (data) {
                            console.log("服务器错误：" + data);
                        });
                        $.cxDialog({
                            title: '提示',
                            info: '<div style="text-align: center;padding: 20px"><img style="max-width: 100px" src="/images/loading.gif"><span style="font-size: 16px;margin-left: 20px;">试题正在保存中~~</span><br></div>',
                            lockScroll: true,
                            background: '#000',
                            width: 400,
                            okText:'我知道了'
                        });

                        $('.step1Box').addClass('hide');
                        $('.step2Box,.submitBox').removeClass('hide');
                        $scope.step2Init();
                        $(".showStep1").removeClass('hide');
                        $(".saveStep1").hide();
                        setTimeout(function() {
                            $.cxDialog.close();
                        },1000)

                    }else{
                        alert(data.msg);
                        //alert('保存数据失败！');
                    }
                });

                $scope.step1search.language=[];
                $(".onLine-langue ul li.A_N_P_Ali").each(function(){
                    $scope.step1search.language.push({"id":$(this).attr("data-id"),"name":$(this).attr("data-name")});
                });
                window.acm.initLoadSelect();
            }

            $scope.showStep1 = function(){
                $('.step1Box').removeClass('hide');
                $('.showStep1').addClass('hide');
            }

            $scope.step2Init = function(){
                if(typeof CodeMirror != 'undefined'){
                    if($('.CodeMirror-scroll').length==0){
                        codeEditor2 = CodeMirror.fromTextArea(document.getElementById("code_content2"), {
                            lineNumbers: true,
                            styleActiveLine: true,
                            matchBrackets: true,
                            highlightSelectionMatches: {showToken: /\w/},
                            indentUnit: 4,
                        });
                        //codeEditor2.setOption("theme", "eclipse");

                    }else {
                        return false;
                    }
                }else{
                    console.log('怎么没有加载CodeMirror?');
                }
                //答案解析
                window.onlineAnsUE =  UE.getEditor('onlineAns',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars: [
                        ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',  'bold', 'italic', 'underline', 'fontborder','|', 'link', 'unlink','|', 'simpleupload','imagefloat', 'insertcode',]
                    ],
                    //focus时自动清空初始化时的内容
                    autoClearinitialContent:true,
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    //默认的编辑区域高度
//                initialFrameHeight:160,

                });
                window.onlineAnsUE.addListener( 'ready', function( editor ) {
                    $(window.onlineAnsUE.iframe.contentWindow.document.body).css("color","#777");
                    window.onlineAnsUE.setContent('请填写题目考察的知识方向、解题思路等信息，便于后期交流、讨论。不会显示给考生。（选填）');
                    window.onlineAnsUE.addListener("click",function(){
                        if(window.onlineAnsUE.getContent().indexOf('请填写题目考察的知识方向')>-1){ window.onlineAnsUE.setContent(''); }
                    })
                });

                $('.createTemp ul li').unbind('click').bind('click',function(){
                    if(!$(this).hasClass('A_N_P_Ali')){
                        $(this).addClass('A_N_P_Ali').siblings('li').removeClass('A_N_P_Ali');
                        if($(this).attr('data-id')==1){
                            $('.answerModel.codeEditBox.ans1').removeClass('hide');
                            if($("#code_content").parent().find(".CodeMirror").length==0){
                                window.codeEditor1 = CodeMirror.fromTextArea(document.getElementById("code_content"), {
                                    lineNumbers: true,
                                    styleActiveLine: true,
                                    matchBrackets: true,
                                    highlightSelectionMatches: {showToken: /\w/},
                                    indentUnit: 4,
                                });
                            }
                            window.acm.step2codeSave = false;
                            $(".item-peizhi-hide").show();
                        }else{
                            $('.answerModel.codeEditBox.ans1').addClass('hide');$(".item-peizhi-hide").hide();
                        }
                    }

                });

                $(".dropdown").easyDropDown({ cutOff: 4 });

                $(".resultListTb .tfoot-bottom .checkAll").click(function(){
                    if($(this).is(":checked")){
                        $(".resultListTb tbody .datahave input").prop("checked",true);
                    }else{
                        $(".resultListTb tbody .datahave input").prop("checked",false);
                    }
                });
                $(document).on("click",".resultListTb tbody .jcenter-list-checkbox",function(){
                    if($(".resultListTb tbody .jcenter-list-checkbox:checked").length==$(".resultListTb tbody .jcenter-list-checkbox").length){
                        $(".resultListTb .tfoot-bottom .checkAll").prop('checked',true);
                    }else{
                        $(".resultListTb .tfoot-bottom .checkAll").prop('checked',false);
                    }
                });
            }

            $scope.initLoadTemps = function(temps){
                window.acm.codeCollectionSave();
                temps = {};
                if($(".createTemp ul li.A_N_P_Ali").index()==0){
                    for(var i=0;i< window.acm.codeCollection.length;i++){
                        if(window.acm.codeCollection[i].language==0){ temps.l0 = window.acm.codeCollection[i].data_code; }
                        if(window.acm.codeCollection[i].language==1){ temps.l1 = window.acm.codeCollection[i].data_code; }
                        if(window.acm.codeCollection[i].language==3){ temps.l3 = window.acm.codeCollection[i].data_code; }
                        if(window.acm.codeCollection[i].language==6){ temps.l6 = window.acm.codeCollection[i].data_code; }
                        if(window.acm.codeCollection[i].language==7){ temps.l7 = window.acm.codeCollection[i].data_code; }
                        if(window.acm.codeCollection[i].language==9){ temps.l9 = window.acm.codeCollection[i].data_code; }
                        if(window.acm.codeCollection[i].language==10){ temps.l10 = window.acm.codeCollection[i].data_code; }
                        if(window.acm.codeCollection[i].language==18){ temps.l18 = window.acm.codeCollection[i].data_code; }
                    }
                }
               return temps;
            }
            window.acm.codeCollectionInit = function(lang,code){
                var mybool = false;
                for(var i=0;i<window.acm.codeCollection.length;i++){
                    if(window.acm.codeCollection[i].language===lang){
                        mybool = true;
                        window.acm.codeCollection[i].data_code = code;
                    }
                }
                if(!mybool){
                    window.acm.codeCollection.push({"language":lang.toString(),"data_code":code});
                }
            }
            window.acm.initLoadSelect = function(){
                if($(".onLine-langue li.A_N_P_Ali").length>0){
                    if($(".langSelect1").parents(".dropdown").length==0){
                        $(".langSelect1").remove();
                        $(".codeEditBox.ans1 .code-item").prepend('<select class="langSelect1 dropdown" onchange="initLoadCode1()"><option value="">请选择模板语言</option></select>');
                        $($(".langSelect1")[0]).parents(".dropdown").remove();
                    }else{
                        $(".langSelect1").parents(".dropdown").after('<select class="langSelect1 dropdown" onchange="initLoadCode1()"><option value="">请选择模板语言</option></select>');
                        $($(".langSelect1")[0]).parents(".dropdown").remove();
                    }

                    for(var i=0;i<$scope.step1search.language.length;i++){
                        $(".langSelect1").append($('<option value="' + $scope.step1search.language[i].id + '">' + $scope.step1search.language[i].name + '</option>'));
                    }
                    $(".langSelect1").easyDropDown({ cutOff: 6 });


                    $(".langSelect2").parents(".dropdown").after('<select class="langSelect2 dropdown" ><option value="">请选择标程答案语言</option></select>');
                    $($(".langSelect2")[0]).parents(".dropdown").remove();
                    for(var i=0;i<$scope.step1search.language.length;i++){
                        $(".langSelect2").append($('<option value="' + $scope.step1search.language[i].id + '">' + $scope.step1search.language[i].name + '</option>'));
                    }
                    if($scope.step1search.codeAns!=undefined && $scope.step1search.codeAns.language!=""){
                        $(".langSelect2").easyDropDown({ cutOff: 6 });
                        if($(".langSelect2 option[value="+$scope.step1search.codeAns.language+"]").index()>=0){
                            $(".langSelect2").easyDropDown('select', $(".langSelect2 option[value="+$scope.step1search.codeAns.language+"]").index());
                        }else{
                            $(".langSelect2").easyDropDown('select',1);
                        }
                    }else{
                        $(".langSelect2").easyDropDown({ cutOff: 6 });
                    }
                    //if(window.codeEditor1){ codeEditor1.setValue(''); }
                }else{
                    $(".langSelect1").parents(".dropdown").after('<select class="langSelect1 dropdown" ><option value="">请选择模板语言</option></select>');
                    $($(".langSelect1")[0]).parents(".dropdown").remove();
                    $(".langSelect1").easyDropDown({ cutOff: 6 });

                    $(".langSelect2").parents(".dropdown").after('<select class="langSelect2 dropdown" ><option value="">请选择标程答案语言</option></select>');
                    $($(".langSelect2")[0]).parents(".dropdown").remove();
                    $(".langSelect2").easyDropDown({ cutOff: 6 });
                    //if(window.codeEditor1){ codeEditor1.setValue(''); }
                }
            }
            $scope.initLoadSelect = function(){
                if($(".onLine-langue ul li.A_N_P_Ali").length>0){
                    var ElementId = 'langSelect' + parseInt(Math.random()*9999);
                    var select = $('<select id="'+ElementId+'"></select>');
                    $(".onLine-langue ul li.A_N_P_Ali").each(function(){
                        var value = $(this).attr("data-id");
                        var txt = $(this).attr("data-name");
                        select.append($('<option value="' + value + '">' + txt + '</option>'));
                        window.acm.codeCollectionInit(value,"");
                    });
                    $(".loadSelect").html("").append(select);
                    $(".loadSelect #"+ElementId).easyDropDown({cutOff: 10,onChange:function(){
                        codeCollectionSave();
                        initLoadCode();
                    }});
                    var selectTXT = $(".loadSelect.loadSelect1 select").val();
                    $("#selectlangid").val(selectTXT);
                    initLoadCode();
                }else{
                    var ElementId = 'langSelect' + parseInt(Math.random()*9999);
                    var select = $('<select id="'+ElementId+'"><option value="">请选择</option></select>');

                    $(".loadSelect").html("").append(select);
                    $(".loadSelect #"+ElementId).easyDropDown({cutOff: 10,onChange:function(){
                        codeCollectionSave();
                        initLoadCode();
                    }});
                }
            }

            $scope.saveStep2 = function(){
                if($("#submit-qus").hasClass("limited")){ return; }
                $("#submit-qus").addClass("limited");
                if($(".step1Box").hasClass('hide')){
                    $scope.saveStep3();
                }else{
                    $scope.saveStep1(3);
                }
            }

            window.acm.limitRelease=0;

            $scope.saveStep3 = function(){
                if($scope.egList.length==0){ alert('您还没有添加测试用例！'); return; }
                confirm('确定要结束编辑并保存吗？',function(){
                    if(window.acm.limitRelease==1){ return ; } else{ window.acm.limitRelease=1;}
                    //保存标程和题目解析
                    $scope.updateCode();
                    var postData = {};
                    postData.questionId = $scope.step1search.ques_id;
                    postData.codeAns = window.acm.codeCollectionAns;
                    postData.daanjiexi = window.onlineAnsUE.getContent();
                    postData.temps = $scope.initLoadTemps(postData.temps);
                    postData.tcComments=[];
                    postData.tcScores=[];
                    for(var i=0;i<$scope.egList.length;i++){
                        postData.tcComments.push($scope.egList[i].name);
                        postData.tcScores.push($scope.egList[i].score);
                    }
                    postData.tcComments = postData.tcComments.join('\n');
                    postData.tcScores = postData.tcScores.join('\n');
                    postData.testcases = $scope.egList.length;

                    if($(".createTemp ul li.A_N_P_Ali").index()==1){ postData.temps =[]; }
                    postData.fenzhi = $scope.egTotalScore;
                    if(postData.fenzhi==null ||postData.fenzhi==undefined){ postData.fenzhi=0; }

                    $http.post('/api/proQuestionEdit',postData).success(function (data) {
                        if(data.errmsg==""){
                            //发布设置
                            $.post('/factory/releaseQuestion',{quesId:postData.questionId,releaseType:'company',company:$scope.entInfo.ent_id},function(data){
                                if(data.status=='ok'){
                                    $http.post('/api/proQuestionEdit',{ questionId :postData.questionId,rateOfPro:0}).success(function (data) { }).error(function (data) {  });
                                    if(window.acm.positionId!=undefined && window.acm.paperId!=undefined){
                                        var postData2 ={
                                            paperId:window.acm.paperId,
                                            positionId :window.acm.positionId,
                                            quesIds:$scope.step1search.ques_id,
                                            quesMode:0
                                        };
                                        $http.post('/api/addQuestionIntoPaper ',postData2).success(function (data) {
                                            if(data.errmsg==""){
                                                $.cookie("addInPaper",1);
                                                $.cxDialog({
                                                    title: '提示',
                                                    info: '<div style="padding:20px; text-align:center;">试题添加成功！</div>',
                                                    lockScroll: true,
                                                    background: '#000',
                                                    width: 400,
                                                    okText:'我知道了',
                                                    ok:function(){
                                                        document.location.href='/ques';
                                                    },
                                                    closeBtnFun:function(){
                                                        document.location.href='/ques';
                                                    }
                                                });
                                            }else{ alert(data.errmsg); }
                                        }).error(function (data) {
                                            console.log("管理员累晕了，没有反馈结果，请重试一下～～");
                                        });
                                        $("#submit-qus").removeClass("limited");
                                    }else{
                                        $.cxDialog({
                                            title: '提示',
                                            info: '<div style="padding:20px; text-align:center;">试题添加成功！</div>',
                                            lockScroll: true,
                                            background: '#000',
                                            width: 400,
                                            okText:'我知道了',
                                            ok:function(){
                                                document.location.href='/ques';
                                            },
                                            closeBtnFun:function(){
                                                document.location.href='/ques';
                                            }
                                        });
                                        $("#submit-qus").removeClass("limited");
                                    }
                                }
                                else{
                                    $http.post('/api/proQuestionEdit',{ questionId :postData.questionId,rateOfPro:2}).success(function (data) { }).error(function (data) {  });
                                    $.cxDialog({
                                        title: '提示',
                                        info: '<div style="padding:20px; text-align:center;">数据保存成功！尚有未通过的测试用例，此题暂时无法正常使用，建议完善试题！</div>',
                                        lockScroll: true,
                                        background: '#000',
                                        width: 400,
                                        okText:'继续完善',
                                        ok:function(){

                                        },
                                        noText:'先不改了',
                                        no:function(){
                                            location.href='/ques#/list';
                                        },
                                        closeBtnFun:function(){

                                        }
                                    });
                                    $("#submit-qus").removeClass("limited");
                                }
                                window.acm.limitRelease=0;
                                $("#submit-qus").removeClass("limited");
                            });


                        }else{
                            alert(data.errmsg);$("#submit-qus").removeClass("limited");
                        }
                    }).error(function (data) {
                        console.log("服务器错误：" + data);
                    });
                });

            }
            window.acm.codeCollection = [];
            window.acm.codeCollectionAns = {language:'',data_code:''};
            window.acm.step2codeSave = false;
            window.acm.addEgBool = true;
            $scope.addCsEg = function(){
                //检查第二部
                var postData = {};
                postData.ques_id = $scope.step1search.ques_id;
                postData.language = [];
                $(".onLine-langue ul li.A_N_P_Ali").each(function(){
                    postData.language.push($(this).attr("data-id"));
                });

                postData.language = postData.language.join(',').toString();
                postData.returntype = $(".backType").val();
                postData.autoflag = '是';
                postData.functionname = $("#funtionName").val();
                postData.parameters = '[]';
                postData.codeList = JSON.stringify(window.acm.codeCollection);
                if($(".createTemp li.A_N_P_Ali").attr('data-id')==0){
                    postData.codeList=[];
                    postData.autoflag = '否';
                }
                if(window.acm.step2codeSave){
                    $scope.addCsEgFun();
                }else{
                    $.post('/factory/saveEditingQues2',postData,function(data){
                        if(data.status=='ok'){
                            //添加测试用例
                            $scope.addCsEgFun();
                        }else{
                            alert(data.msg);
                        }
                    });
                }
            }

            $scope.initCsEgList =function(){
                $.post("/api/proQuestionTestCaseList",{quesid:$scope.thisQues.myojId},function(data){
                    if(data.errmsg==""){
                        $scope.egList = data.result;
                        $scope.egTotalScore = 0;
                        $scope.egList.forEach(function(item){
                            $scope.egTotalScore += parseInt(item.score);
                        });
                        $scope.$apply();
                        $(".resultListTb .tfoot-bottom .checkAll").prop('checked',false);

                        $scope.updateFenzhi($scope.thisQues._id,$scope.egTotalScore);
                    }else{
                        alert(data.errmsg);
                    }
                });
            }

            $scope.addCsEgFun = function(){
                window.acm.step2codeSave = true;
                if(window.acm.addEgBool){
                    $("#egName").val('');$("#egInput").val('');$("#egOutput").val('');
                    $("#egDifficulty").easyDropDown('select',0);
                    $("#egScore").easyDropDown('select',2);
                    $("#datatype").easyDropDown('select',0);
                    $("#datascale").easyDropDown('select',0);
                }
                $.cxDialog({
                    title: '添加测试用例',
                    info: $('.test-exp-hide'),
                    lockScroll: true,
                    background: '#000',
                    width: 400,
                    okText: '确定',
                    ok: function () {
                        var test_id="";
                        var egName = $("#egName").val();
                        var egDifficulty = $("#egDifficulty").val();
                        var egScore = $("#egScore").val();
                        var egdatascale = $("#datascale").val();
                        var egdatatype = $("#datatype").val();
                        var egInput = $("#egInput").val();
                        var egOutput= $("#egOutput").val();
                        if(egName==""){window.acm.addEgBool = false;alertBackClick("请输入用例名字！",$(".addEgBtn"));return false;}
                        if(egInput==""){window.acm.addEgBool = false;alertBackClick("请输入用例输入！",$(".addEgBtn"));return false;}
                        if(egOutput==""){window.acm.addEgBool = false;alertBackClick("请输入用例输出！",$(".addEgBtn"));return false;}
                        var postData = {egName:egName,test_id:test_id,egScore:egScore,ques_id:$scope.step1search.ques_id,egDifficulty:egDifficulty,datascale:egdatascale,datatype:egdatatype,egInput:egInput,egOutput:egOutput};

                        if($scope.step1search.ques_id!=null){

                            $.post("/factory/saveEditingTest",postData,function(data){
                                if(data.status=="ok"){
                                    $scope.initCsEgList();
                                }else{
                                    alert(data.msg);
                                }
                            });
                        }else{
                            document.location.href='/ques#/list';
                        }
                    }
                })
            }

            $scope.editCsEg =  function(test_id){
                $.post("/factory/findTest",{test_id:test_id},function(data){
                    if(data){
                        $("#egName").val(data.egName);
                        $("#egInput").val(data.egInput);
                        $("#egOutput").val(data.egOutput);
                        if(data.egDifficulty!=""){ $("#egDifficulty").easyDropDown('select', parseInt($("#egDifficulty option[value="+data.egDifficulty+"]").attr("lv"))); }
                        if(data.egDataType!=""){$("#datatype").easyDropDown('select', parseInt($("#datatype option[value="+data.egDataType+"]").attr("lv")));}
                        if(data.egDataScale!=""){$("#datascale").easyDropDown('select', parseInt($("#datascale option[value="+data.egDataScale+"]").attr("lv")));}
                        loadSelectData($("#egDifficulty"),data.egDifficulty);
                        loadSelectData($("#egScore"),data.egScore);
                        $.cxDialog({
                            title: '编辑测试用例',
                            info:$('.test-exp-hide'),
                            lockScroll: true,
                            background: '#000',
                            width: 400,
                            okText:'确定',
                            ok:function(){
                                var egName = $("#egName").val();
                                var egDifficulty = $("#egDifficulty").val();
                                var egdatascale = $("#datascale").val();
                                var egdatatype = $("#datatype").val();
                                var egInput = $("#egInput").val();
                                var egOutput= $("#egOutput").val();
                                var egScore = $("#egScore").val();
                                if(egName==""){alert("请输入用例名字！");return false;}
                                if(egInput==""){alert("请输入用例输入！");return false;}
                                if(egOutput==""){alert("请输入用例输出！");return false;}
                                if($scope.step1search.ques_id!=null){
                                    $.post("/factory/saveEditingTest",{egName:egName,test_id:test_id,egScore:egScore,ques_id:$scope.step1search.ques_id,egDifficulty:egDifficulty,datascale:egdatascale,datatype:egdatatype,egInput:egInput,egOutput:egOutput},function(data){
                                        if(data.status=="ok"){
                                            $scope.initCsEgList();
                                        }else{
                                            alert(data.msg);
                                        }
                                    });
                                }else{
                                    document.location.href='/ques';
                                }
                            }
                        });
                    }
                });

            }

            $scope.delCsEg = function(test_id){
                $.post("/factory/deleteEditingTest",{test_id:test_id},function(data){
                    if(data.status=="ok"){
                        $.cxDialog({
                            title: '提示',
                            info: '<div style="padding:20px; text-align:center;">'+data.msg+'</div>',
                            lockScroll: true,
                            background: '#000',
                            width: 400,
                            okText:'我知道了',
                            ok:function(){
                                $(".resultListTb tr[data-id="+test_id+"]").remove();
                                $scope.initCsEgList();
                            }
                        });
                    }else{
                        alert(data.msg);
                    }
                });
            }
            $scope.updateFenzhi = function(questionId,fenzhi){
                $http.post('/api/proQuestionEdit',{questionId:questionId,fenzhi:fenzhi}).success(function (data) {

                }).error(function (data) {
                    console.log("服务器错误：" + data);
                });
            }

            window.zipSelect = function(fileObj){
                var file = fileObj.files['0'];
                if (file) {
                    $(".cxdialog_info .upFile").html(file.name);
                }
            }

            /*上传测试用例*/
            $scope.uploadEg = function(){
                $.cxDialog({
                    title: '上传测试用例',
                    info: '<form action="/factory/impTest" method="post" id="fileUp" enctype ="multipart/form-data">  <input type="hidden" id="proid" name="proid" value="'+$scope.thisQues.myojId+'" /><div style="margin: 20px 0px 10px 0px;text-align:center;"><a href="javascript:void(0)" class="upFile" onclick="file.click()">+ 上传测试用例</a><input  accept="application/x-zip-compressed" style="display: none;" type="file" id="file" class="" name="file"/></div></form>',
                    background: '#000',
                    width: 400,
                    ok:function () {
                        if($("#file").val()!=""){
                            var formData = new FormData($("#fileUp")[0]);
                            var url ="/factory/impTest";
                            $.ajax({
                                url: url,
                                type: 'POST',
                                data: formData,
                                async: true,
                                cache: false,
                                contentType: false,
                                processData: false,
                                success: function (returndata) {
                                    if(returndata.status == 'no'){
                                        alert(returndata.msg);
                                    }else{
                                        $scope.initCsEgList();
                                    }
                                },
                                error: function (returndata) {

                                }
                            });
                        }
                        else{
                            alert("请先选择上传文件！");
                            return false;
                        }
                    },
                    okText:"确定"
                });
            }
            //保存标程
            $scope.updateCode = function(){
                window.acm.codeCollectionAns = {language:$(".langSelect2").val(),data_code:codeEditor2.getValue()};
            }
            var resultSource,resultSource_t ;
            window.acm.loadResult = function(){
                if(resultSource.length>0){
                    var solution_id = resultSource[0].id;
                    var test_id = resultSource[0].test_id;
                    //var test_id = $(this).attr("value");
                    $.post("/factory/findResult",{solution_id:solution_id,test_id:test_id},function(data2){
                        if(data2==""){
                            setTimeout("window.acm.loadResult()",1000)
                        }else{
                            var resultSource_t = new Array();
                            var solution_id = data2.solution_id;
                            var test_id = "";
                            var egName = "";
                            for(var i=0;i<resultSource.length;i++){
                                if(resultSource[i].id.toString()==solution_id.toString()){
                                    egName = resultSource[i].name;
                                    test_id = resultSource[i].test_id;
                                }else{
                                    resultSource_t.push(resultSource[i]);
                                }
                            }
                            var errorHtml ='';
                            if(data2.error!=undefined){
                                errorHtml += '<div class="tipMsg"><pre>' + data2.error+ '</pre></div>' ;
                            }
                            var timeLimitedNum = 0;
                            var memoryLimitedNum = 0;
                            if(parseInt($("#langSelect").val())>=3){
                                timeLimitedNum = (parseInt($("#time_limit").val())+2)*1000;
                                memoryLimitedNum = (parseInt($("#memory_limit").val())+512)*1024;
                            }else{
                                timeLimitedNum = parseInt($("#time_limit").val())*1000;
                                memoryLimitedNum = parseInt($("#memory_limit").val())*1024;
                            }
                            var timeHtml = '';
                            if(data2.time > timeLimitedNum){
                                timeHtml = '<span class="red" title="时间超限">'+data2.time+'</span>';
                            }else{
                                timeHtml = data2.time ;
                            }
                            var memoryHtml = '';
                            if(data2.memory > memoryLimitedNum){
                                memoryHtml = '<span class="red" title="内存超限">'+data2.memory+'</span>';
                            }else{
                                memoryHtml = data2.memory ;
                            }

                            $(".resultListTb tr[data-id="+test_id+"] .view_debug").append('<table><tr><td class="bg-agreen"><b class="agreen"><a title="'+data2.statusname +'" class="showDebugLink '+ (data2.statusname=='编译通过，运行正确 ( AC )'?'green':'red') +'">'+data2.statusname.substring(0,4) +'<i class="fa fa-angle-down"></i><a></b></td><td><b>'+timeHtml+'</b> ms</td><td><b>'+memoryHtml+'</b> kb</td></tr></table>');
                            $(".resultListTb tr[data-id="+test_id+"]").after('<tr class="showDebugMSG hide"><td colspan="12">'+errorHtml+'</td></tr>');
                            resultSource = resultSource_t;
                            if(resultSource.length>0){
                                window.acm.loadResult();
                            }else{
                                $.cxDialog.close();
                            }
                            $('.showDebugLink').unbind("click").bind('click',function(){
                                $(this).parents(".datahave").next().toggleClass("hide");
                            });
                        }
                    });
                }else{
                    $.cxDialog.close();
                    $(".btn-sty1.inappropriate.runcode").removeClass('limited');
                }
            }
            var loadSelectData = function(elemt,value){
                elemt.val(value);
                elemt.parents(".dropdown").find("span.selected").html(value);
                elemt.parents(".dropdown").find("ul li").each(function(){
                    if($(this).html()==value){
                        if(!$(this).hasClass("active")){
                            $(this).addClass("active");
                        }
                    }else{
                        $(this).removeClass("active");
                    }
                })
            }

            // 运行结果弹窗
            $scope.runCode = function(){
                if(!$(".btn-sty1.inappropriate.runcode").hasClass('limited')){
                    $(".btn-sty1.inappropriate.runcode").addClass('limited');
                }
                $(".datahave .view_debug").html('');
                $(".resultListTb").removeClass('debug');
                if(codeEditor2.getValue()==""){ alert("您还没有标程，请先添加试题答案（标程）"); return; }
                $scope.updateCode();
                var codeSelectOne = codeEditor2.getValue();
                if($(".langSelect2").val()==""){ alert("请选择标程答案语言");return false;}
                if($(".jcenter-list input:checked").length==0){alert("请选择测试用例！");return false;}
                $.post("/factory/saveCode",{ques_id:$scope.step1search.ques_id,codeList:JSON.stringify(window.acm.codeCollectionAns)},function(data){
                    var testlist =[];
                    $(".jcenter-list .datahave input:checked").each(function(){
                        testlist.push($(this).val());
                    });
                    $.post("/factory/runOnlineCodeTwo",{
                        ques_id:$scope.step1search.ques_id,
                        language:$(".langSelect2").val(),
                        language_name:$(".langSelect2").val(),
                        code_content:codeSelectOne,
                        testlist:testlist.join(",")
                    },function(data){
                        var resultHtml = '';
                        if(data.status=="ok"){
                            resultSource = $.parseJSON(data.data);
                            setTimeout("window.acm.loadResult()",2000);
                            $(".showDebugMSG").remove();
                            $.cxDialog({
                                title: '提示', info:$('.runing'), lockScroll: true, background: '#000',height:350, width: 650, okText:'确定',
                                baseClass:"noHidden",
                                ok:function(){

                                }
                            });
                            $(".runingResult tbody tr").remove();
                            if($(".result_loading").length==0){
                                $(".runingResult").append('<div class="result_loading" style="width: 100%;text-align: center;padding: 20px;font-size:18px;">您请稍等，程序正在疯狂运行...<br><br><img src="/images/loading.gif"></div>');

                            }
                            if(!$(".resultListTb").hasClass("debug")){$(".resultListTb").addClass("debug");}
                        }else{
                            alert(data.msg);
                        }
                    });
                });
            }

            $scope.updateScore = function(){
                var updateHtml ='<div class="updateScoreBox"><table>';
                updateHtml+='<tr><td>用例名字</td><td>难度</td><td>数据类型</td><td>数据规模</td><td>分数</td></tr>';
                $(".resultListTb tbody tr.datahave").each(function(){
                    updateHtml+='<tr style="height:40px;" id="'+$(this).attr("data-id")+'"><td>'+$($(this).find("td").eq(1)).find("span").html()+'</td><td>'+$($(this).find("td").eq(3)).find("b").html()+'</td><td>'+$($(this).find("td").eq(4)).find("b").html()+'</td><td>'+$($(this).find("td").eq(3)).find("b").html()+'</td>';
                    if($($(this).find("td").eq(1)).find("b").html()==""){
                        updateHtml+='<td><select style="top:0px" onchange="window.acm.initUpdateScoreV()"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></td>';
                    }else{
                        updateHtml+='<td><select style="top:0px" onchange="window.acm.initUpdateScoreV()">';
                        for(var i=1;i<11;i++){
                            if(i==parseInt($($(this).find("td").eq(5)).find("b").html())){
                                updateHtml += '<option selected value="'+i+'">'+i+'</option>';
                            }else{
                                updateHtml += '<option value="'+i+'">'+i+'</option>';
                            }
                        }
                        updateHtml+='</select></td>';
                    }
                    updateHtml+='</tr>';
                });
                updateHtml+='</table><div class="showUpdateResult" style="margin-top: 20px;"></div></div>';
                $.cxDialog({
                    title: '批量调整分数', info:updateHtml, lockScroll: true, background: '#000', width: 650, okText:'确定',
                    baseClass:"noHidden",
                    ok:function(){
                        var updateData = '[';
                        $(".updateScoreBox table tr").each(function(){
                            var id = $(this).attr("id");
                            if(id!=undefined){
                                var score = $(this).find("select").val();
                                if(updateData.length!=1){updateData+=',';}
                                updateData+='{id:"'+id+'",score:'+score+'}';
                            }
                        });
                        updateData += ']';
                        $.post("/factory/saveTestScore",{
                            updateData:updateData
                        },function(data){
                            if(data.status=="ok"){
                                $scope.initCsEgList();
                            }else{
                                alert('更新失败！');return false;
                            }
                        });
                    }
                });
                window.acm.initUpdateScoreV();
                //$(".updateScoreBox select").easyDropDown({ onSelect: function(selected){ initUpdateScoreV(); }});
            }

            window.acm.initUpdateScoreV = function(){
                var scoreTotal = 0;
                $(".updateScoreBox table select").each(function(){
                    var score = $(this).val();
                    scoreTotal+= parseInt(score);
                });
                $(".showUpdateResult").html('现在总分为：<span class="red;font-size:18px;">'+ scoreTotal +'</span>');
            }

            $scope.createTemps = function(){
                $scope.generate = {};
                $scope.generate.language = 'C,C++,Java8,Python2,PHP,CSharp,Objective-C,JavaScript';
                $scope.generate.returntype = $(".backType").val();
                $scope.generate.functionname = $("#funtionName").val();
                var parameters = '[';
                if($(".item-list-box .item-list").length>0){
                    $(".item-list-box .item-list").each(function(){
                        var type = $(this).find("select").val();
                        var name = $(this).find(".fun_name").val();
                        //parameters.push({"type":type,"name":name});
                        if(parameters.length!=1){parameters += ',';}
                        parameters += '{"name":"'+name+'","type":"'+type+'"}';
                    });
                }
                parameters += ']';
                $scope.generate.parameters = parameters;

                $.post('https://capture.acmcoder.com/template/generate.php',$scope.generate,function(data){
                    if(data && data.length>0){
                        window.acm.codeCollection = [];
                        data = $.parseJSON(data);
                        for(var i=0;i<data.length;i++){
                            var curHtml = data[i].head;
                            if(data[i].language.indexOf("Python")>-1){
                                curHtml +='\r\n\r\n#请完成下面这个函数，实现题目要求的功能\r\n#当然，你也可以不按照下面这个模板来作答，完全按照自己的想法来 ^-^ \r\n#******************************开始写代码******************************\r\n\r\n';
                                curHtml += data[i].body;
                                curHtml +='\r\n\r\n#******************************结束写代码******************************\r\n\r\n\r\n';
                            }else{
                                curHtml +='\r\n\r\n/*请完成下面这个函数，实现题目要求的功能\r\n当然，你也可以不按照下面这个模板来作答，完全按照自己的想法来 ^-^ \r\n******************************开始写代码******************************/\r\n';
                                curHtml += data[i].body;
                                curHtml +='/******************************结束写代码******************************/\r\n\r\n\r\n';
                            }
                            curHtml += data[i].tail;
                            window.acm.codeCollectionInit(data[i].lang,curHtml);
                        }
                        window.acm.initLoadCode();

                        $("#"+$(".langSelect1").parents('.scrollable').attr("id")).easyDropDown('select',1);
                        alert('编程代码模板生成成功！');
                    }
                });
                var postData = {};
                postData.questionId = $scope.step1search.ques_id;
                postData.tempOptions = eval(parameters);
                postData.functionname = $scope.generate.functionname;
                postData.returntype = $scope.generate.returntype;
                $http.post('/api/proQuestionEdit',postData).success(function (data) {

                }).error(function (data) {
                    console.log("服务器错误：" + data);
                });

            }
            window.initLoadCode1 = function(){
                window.acm.codeCollectionSave();
                window.acm.initLoadCode();
            }
            window.acm.codeCollectionSave = function(){
                var selectId = $("#selectlangid").val();
                if(selectId!=""){
                    for(var i=0;i<window.acm.codeCollection.length;i++){
                        if(window.acm.codeCollection[i].language === selectId){
                            window.acm.codeCollection[i].data_code = codeEditor1.getValue();
                        }
                    }
                }
                $("#selectlangid").val($(".langSelect1").val());
            }
            window.acm.initLoadCode = function () {
                var select_id = $(".langSelect1").val();
                var strValue = "";
                for (var i = 0; i < window.acm.codeCollection.length; i++) {
                    if (window.acm.codeCollection[i].language.toString() === select_id) {
                        strValue = window.acm.codeCollection[i].data_code;
                    }
                }
                if(strValue==undefined || strValue==null){ strValue ="";}
                codeEditor1.setValue(strValue);
            }

            var initBindPageFun = function () {
                $(document).on('click','.chose-radio input:radio',function () {
                    $.each($('.chose-radio input:radio'),function(){
                        $(this).prop('checked',false)
                    })
                    $(this).prop('checked',true)
                })
                $(document).on('click','.parse input:radio',function () {
                    $.each($('.parse input:radio'),function(){
                        $(this).prop('checked',false).parent().siblings('td').find('.addQues-ok').hide()
                    })
                    $(this).prop('checked',true).parent().siblings('td').find('.addQues-ok').show();
                })
                /*输入描述*/
                window.codeUE3= UE.getEditor('myEditor3',{
                     //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                     toolbars: [
                     ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                     'bold', 'italic',
                     ]
                     ],
                     //focus时自动清空初始化时的内容
                     autoClearinitialContent:true,
                     //关闭字数统计
                     wordCount:false,
                     //关闭elementPath
                     elementPathEnabled:false,
                     autoFloatEnabled:false,
                     autoHeightEnabled:false,
                     //默认的编辑区域高度
                     //                initialFrameHeight:100,

                 })

                /*输出描述*/
                window.codeUE4=UE.getEditor('myEditor4',{
                 //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                 toolbars:[
                 ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                 'bold', 'italic',
                 ]
                 ],
                 //focus时自动清空初始化时的内容
                 autoClearinitialContent:true,
                 //关闭字数统计
                 wordCount:false,
                 //关闭elementPath
                 elementPathEnabled:false,
                 autoFloatEnabled:false,
                 autoHeightEnabled:false,
                 //默认的编辑区域高度
                 //                initialFrameHeight:100,

                 })
                /*输入样例*/
                window.codeUE5=UE.getEditor('myEditor5',{
                 //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                 toolbars: [
                 ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                 'bold', 'italic',
                 ]
                 ],
                 //focus时自动清空初始化时的内容
                 autoClearinitialContent:true,
                 //关闭字数统计
                 wordCount:false,
                 //关闭elementPath
                 elementPathEnabled:false,
                 autoFloatEnabled:false,
                 autoHeightEnabled:false,
                 //默认的编辑区域高度
                 //                initialFrameHeight:100,

                 })
                /*输出样例*/
                window.codeUE6=UE.getEditor('myEditor6',{
                 //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                 toolbars:[
                 ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                 'bold', 'italic',
                 ]
                 ],
                 //focus时自动清空初始化时的内容
                 autoClearinitialContent:true,
                 //关闭字数统计
                 wordCount:false,
                 //关闭elementPath
                 elementPathEnabled:false,
                 autoFloatEnabled:false,
                 autoHeightEnabled:false,
                 //默认的编辑区域高度
                 //                initialFrameHeight:100,

                 })

                $('.timeInput').keyup(function(){
                    $(".addpro-tsCnt.timeOther span").html(parseInt($scope.step1search.time)+2);
                });
                $('.memoryInput').keyup(function(){
                    $(".addpro-tsCnt.memOther span").html(parseInt($scope.step1search.memory)+512);
                });
                function returnFloat(value){
                    var xsd=value.toString().split(".");
                    if(xsd.length==1){
                        return value;
                    }
                    if(xsd.length>1){
                        if(xsd[1].length>=2){
                            value = xsd[0]+'.'+xsd[1].substring(0,1);
                        }
                        return value;
                    }
                }

                if(window.acm.positionId!=undefined && window.acm.paperId!=undefined){
                    $(".addpap_t9").addClass('limitedCode');
                }

                /*题型筛选*/
                $('.addpap_t9 ul li').click(function () {
                    if(!$(this).parents('.addpap_t9').hasClass('limitedCode')){
                        if($(this).attr("id")=="6"){
                            location.href='/ques#/add/onlinecode';
                        }
                        else if($(this).attr("id")=="8"){
                            location.href='/ques#/add/webcode';
                        }else{
                            location.href='/ques#/add/' + $(this).attr("id");
                        }
                    }else{
                        if($(this).attr("id")==8){
                            location.href='/ques#/add/webcode/'+ window.acm.positionId + '/' + window.acm.paperId;
                        }else{
                            alert('该子卷不可切换此题型！');
                        }
                    }
                })
                /*切换试题是，清空选中内容*/
                function clearText() {
                    $('.danxuan-s input').prop('checked', false);
                    $('.danxuan-s .addQues-ok').hide();
                }

                window.acm.initBindFunction = function () {
                    $('.addItem').unbind("click").bind("click", function () {
                        var item = $('.item-list-box-copy').clone();
                        item.removeClass("item-list-box-copy").addClass("item-list").removeClass("hide");
                        $('.item-list-box').append(item);
                        $(".item-list-box .item-list:last-child select").easyDropDown({cutOff: 6,onSelect: function(selected){ initLoadCode(); }});
                        window.acm.initBindFunction();
                    })
                    $('.delItem').unbind("click").bind("click", function () {
                        $(this).parent().remove();
                    })
                }
                window.acm.initBindFunction();
            }

        }]
);

quesControllers.controller("EditOnlineCodeController", ['$scope', '$http','$routeParams','$location', '$timeout',
        function($scope, $http,$routeParams,$location, $timeout)
        {
            window.scrollTo(0,169);
            if(window.ueTitle!=undefined){ window.ueTitle.destroy(); }
            if(window.codeUE3!=undefined){ window.codeUE3.destroy(); }
            if(window.codeUE4!=undefined){ window.codeUE4.destroy(); }
            if(window.codeUE5!=undefined){ window.codeUE5.destroy(); }
            if(window.codeUE6!=undefined){ window.codeUE6.destroy(); }
            if(window.onlineAnsUE!=undefined){ window.onlineAnsUE.destroy(); }
            if(window.daanjiexiUE!=undefined){ window.daanjiexiUE.destroy(); }

            /*版本判断*/
            $http.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") +  "&r=" + Math.random(),{}).success(function (data) {

                $scope.entInfo = data.data;
                $scope.version = data.data.exam_version;
                $.cookie('version',data.data.exam_version,{ path: '/'})
            }).error(function (data) {
                console.log(data);
            });

            if($.cookie("endExamNotes")){
                $.cookie('endExamNotes', null, { expires: -1, path: '/',domain:'.acmcoder.com' });
            }
            if(localStorage.quesNodes!=undefined){
                var dataV = $.parseJSON(localStorage.quesNodes);
                dataV.forEach(function(item){
                    if(item.id==126){ $scope.LevelData = item.child; }
                });
                $timeout(function () {
                    $scope.qnTimeout();
                });
            }else{
                $http.get('/api/quesNodes').success(function (data) {
                    localStorage.quesNodes = JSON.stringify(data.result);
                    data.result.forEach(function(item){
                        if(item.id==126){ $scope.LevelData = item.child; }
                    });
                    $timeout(function () {
                        $scope.qnTimeout();
                    });
                }).error(function (data) {
                    alert("管理员累晕了，没有反馈结果，请重试一下～～");
                });
            }

            $scope.qnTimeout = function(){
                //$($(".online-know ul li")[0]).addClass('A_N_P_Ali');

                $('.checkChooise.zhishidian ul li').bind('click',function () {
                    if($(this).hasClass('A_N_P_Ali')){
                        $(this).removeClass("A_N_P_Ali");
                    }else{
                        if($('.checkChooise.zhishidian ul li.A_N_P_Ali').length>=3){
                            alert('此项最多只能选择3个！');return;
                        }else{
                            if($(this).text()!='全选'){
                                $(this).addClass("A_N_P_Ali");
                            }

                        }
                    }
                })
                $('.checkChooise.onLine-langue ul li').bind('click',function () {
                    if($(this).hasClass('must') && $(this).hasClass('A_N_P_Ali')){ return; }
                    if($(this).hasClass('A_N_P_Ali')){
                        $(this).removeClass("A_N_P_Ali");
                    }else{
                        if($(this).text()!='全选'){
                            $(this).addClass("A_N_P_Ali");
                        }
                    }
                    $scope.step1search.language=[];
                    $(".onLine-langue ul li.A_N_P_Ali").each(function(){
                        $scope.step1search.language.push({"id":$(this).attr("data-id"),"name":$(this).attr("data-name")});
                    });
                    if(typeof codeEditor1!='undefined'){
                        window.acm.initLoadSelect();
                        $(".langSelect1").easyDropDown('select',1);
                    }

                    if($(".onLine-langue.checkChooise .A_N_P_Ali").length!=$(".onLine-langue.checkChooise li").length-1){
                        $(".onLine-langue.checkChooise .contralKnow").removeClass('A_N_P_AliL');
                    }else if($(".onLine-langue.checkChooise .A_N_P_Ali").length == $(".onLine-langue.checkChooise li").length-1){
                        $(".onLine-langue.checkChooise .contralKnow").addClass('A_N_P_AliL');
                    }
                })
            }

            $(".addpap_t9.questype").addClass('limited');
            /*权限判断*/
            $http.post('/api/userRight',{}).success(function (data) {
                $scope.rightStr = data.result.join(',');
                if($scope.rightStr.indexOf('right_id12')==-1){
                    $.cxDialog({
                        title: '提示',info: '<div style="padding:20px; text-align:center;">您没有添加和编辑编程题的权限</div>',lockScroll: true,closeBtn:false,background: '#000',width: 400,okText:'我知道了',
                        ok:function(){
                            history.go(-1);
                        }
                    });
                }
            }).error(function (data) {
                console.log("服务器错误：" + data);
            });
            $scope.step1search ={ time:1,memory:64 };
            $scope.step1search.ques_id = $routeParams.questionId;
            $http.post('/api/proQuestionDetail',{questionId:$routeParams.questionId}).success(function (data) {
                $.extend($scope.step1search,data.result);
                $scope.thisQues = data.result;
                $scope.step1Init();
                console.log('got question detail');
                $timeout(function(){
                    refreshFunc();
                });
            }).error(function (data) {
                console.log("服务器错误：" + data);
            });
            $scope.egList = [];
            $scope.egTotalScore = 0;
            $scope.step1search.language = [{"id":0,"name":"C"}];

            $timeout(function () {
                $(".topbt.topbt-2 h3").html('编辑试题');
                $(".NextStepBtn").addClass('hide');
                $(".step2Box,.submitBox").removeClass('hide');
                window.renderCodemirror = window.setInterval(function(){
                    if(typeof CodeMirror == "function"){
                        $scope.step2Init();
                        window.clearInterval(window.renderCodemirror);
                    }
                },500)
            });

            $scope.warning = function () {
                initAddQuesFun($scope,$http,"");
                console.log("f1");
            }

            /*=====================================================*/
            var refreshFunc = function() {
                window.acm.initLoadSelect = function(){
                    if($(".onLine-langue li.A_N_P_Ali").length>0){
                        if($(".langSelect1").parents(".dropdown").length==0){
                            $(".langSelect1").remove();
                            $(".codeEditBox.ans1 .code-item").prepend('<select class="langSelect1 dropdown" onchange="initLoadCode1()"><option value="">请选择模板语言</option></select>');
                            $($(".langSelect1")[0]).parents(".dropdown").remove();
                        }else{
                            $(".langSelect1").parents(".dropdown").after('<select class="langSelect1 dropdown" onchange="initLoadCode1()"><option value="">请选择模板语言</option></select>');
                            $($(".langSelect1")[0]).parents(".dropdown").remove();
                        }

                        for(var i=0;i<$scope.step1search.language.length;i++){
                            $(".langSelect1").append($('<option value="' + $scope.step1search.language[i].id + '">' + $scope.step1search.language[i].name + '</option>'));
                        }
                        $(".langSelect1").easyDropDown({ cutOff: 6 });


                        $(".langSelect2").parents(".dropdown").after('<select class="langSelect2 dropdown" ><option value="">请选择标程答案语言</option></select>');
                        $($(".langSelect2")[0]).parents(".dropdown").remove();
                        for(var i=0;i<$scope.step1search.language.length;i++){
                            $(".langSelect2").append($('<option value="' + $scope.step1search.language[i].id + '">' + $scope.step1search.language[i].name + '</option>'));
                        }

                        if($scope.step1search.codeAns!=undefined && $scope.step1search.codeAns.language!=""){
                            $(".langSelect2").easyDropDown({ cutOff: 6 });
                            if($(".langSelect2 option[value="+$scope.step1search.codeAns.language+"]").index()>=0){
                                $(".langSelect2").easyDropDown('select', $(".langSelect2 option[value="+$scope.step1search.codeAns.language+"]").index());
                            }else{
                                $(".langSelect2").easyDropDown('select',1);
                            }
                        }else{
                            $(".langSelect2").easyDropDown({ cutOff: 6 });
                        }
                        //if(window.codeEditor1){ codeEditor1.setValue(''); }
                    }else{
                        $(".langSelect1").parents(".dropdown").after('<select class="langSelect1 dropdown" ><option value="">请选择模板语言</option></select>');
                        $($(".langSelect1")[0]).parents(".dropdown").remove();
                        $(".langSelect1").easyDropDown({ cutOff: 6 });

                        $(".langSelect2").parents(".dropdown").after('<select class="langSelect2 dropdown" ><option value="">请选择标程答案语言</option></select>');
                        $($(".langSelect2")[0]).parents(".dropdown").remove();
                        $(".langSelect2").easyDropDown({ cutOff: 6 });
                        //if(window.codeEditor1){ codeEditor1.setValue(''); }
                    }
                }

                /*实例化*/
                //编程题题干
                window.ueTitle = UE.getEditor('myEditor1',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars: [
                        [ 'source','undo', 'redo','fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic', 'underline', 'fontborder','|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify','|', 'strikethrough', 'superscript', 'subscript', 'removeformat','|', 'insertorderedlist', 'insertunorderedlist','lineheight', '|',
                            'link', 'unlink','|',
                            'simpleupload','imagefloat', 'emotion', 'insertvideo', 'music', 'attachment','insertframe',
                            'horizontal', '|',
                            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol','|','insertcode',]
                    ],
                    //关闭字数统计
                    wordCount:false,
                    autoFloatEnabled:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    //默认的编辑区域高度
                    initialFrameHeight:120,

                })
                window.ueTitle.addListener( 'ready', function( editor ) {
                    window.ueTitle.setContent('<p style="color: #ccc">请填写题干内容</p>')
                    window.ueTitle.addListener("click",function(){
                        if(window.ueTitle.getContent().indexOf('请填写题干内容')>-1){ window.ueTitle.setContent(''); }
                    })
                    if($scope.step1search.quesDesc!=undefined){ window.ueTitle.setContent($scope.step1search.quesDesc); }
                })
                initBindPageFun();

                /*选中效果*/
                $('.diffcult .xing-kong').click(function(){
                    var index =$(this).index();
                    $(this).parents(".diffcult").attr("value",index);
                    $('.xing-kong').removeClass('active');
                    $('.xing-kong:lt('+index+')').addClass('active');
                });
            }
            $scope.thisQues = {};

            $scope.step1Init = function(){
                $scope.step1search.allowlangsArray = [];
                if($scope.step1search.allowlangs!=undefined && $scope.step1search.allowlangs!=''){
                    $scope.step1search.allowlangsArray = $scope.step1search.allowlangs.split(',');
                }
                $(".onLine-langue li").removeClass('A_N_P_Ali');
                for(var i=0;i<$scope.step1search.allowlangsArray.length;i++){
                    $(".onLine-langue li[data-id="+$scope.step1search.allowlangsArray[i]+"]").addClass('A_N_P_Ali');
                }
                $scope.step1search.hint_des = $scope.step1search.hint ;
                $scope.step1search.time  = parseInt($scope.step1search.timeLimit)/1000 ;
                $scope.step1search.memory  = parseInt($scope.step1search.memoryLimit)/1024 ;
                if($scope.step1search.temps!=undefined){
                    for(var i=0;i<30;i++){
                        if($scope.step1search.temps['l'+i]!=undefined){
                            window.acm.codeCollectionInit(i,$scope.step1search.temps['l'+i]);
                        }
                    }
                }

                $timeout(function(){
                    $scope.step1search.language =[];
                    $('.onLine-langue ul li').each(function(){
                        for(var i=0;i<$scope.step1search.allowlangsArray.length;i++){
                            if($scope.step1search.allowlangsArray[i]==$(this).attr("data-id")){
                                $scope.step1search.language.push({"id":parseInt($(this).attr("data-id")),"name":$(this).attr("data-name")});
                            }
                        }
                    });

                    $(".addpro-tsCnt.timeOther span").html(parseInt($scope.step1search.time)+2);
                    $(".addpro-tsCnt.memOther span").html(parseInt($scope.step1search.memory)+512);

                });

            }
            $scope.updateFenzhi = function(questionId,fenzhi){
                $http.post('/api/proQuestionEdit',{questionId:questionId,fenzhi:fenzhi}).success(function (data) {

                }).error(function (data) {
                    console.log("服务器错误：" + data);
                });
            }

            $scope.showStep1 = function(){
                $('.step1Box').removeClass('hide');
                $('.showStep1').addClass("hide");
            }
            $scope.saveStep1 = function(obj){
                if($(".btn.saveStep1").hasClass("limited")){ return; }
                $(".btn.saveStep1").addClass("limited");
                //$(window).bind('beforeunload',function(){return '------------------------------------------------\n提示：未保存的内容将会丢失。\n------------------------------------------------';});
                var postData = {};
                postData.ques_id = $routeParams.questionId;
                postData.quesremark = ueTitle.getContent();
                postData.tags = '';

                postData.input_des = window.codeUE3.getContent();
                postData.output_des = window.codeUE4.getContent();
                postData.input_eg = window.codeUE5.getContent();
                postData.output_eg = window.codeUE6.getContent();
                postData.level  =$(".diffcult .xing-kong.active").length;
                if($scope.step1search.time==undefined){ $scope.step1search.time=1; }
                if($scope.step1search.memory==undefined){ $scope.step1search.memory=64; }
                postData.time = $scope.step1search.time;
                postData.memory = $scope.step1search.memory;
                postData.ques_title = $scope.step1search.questitle;
                postData.hint_des = $scope.step1search.hint_des;

                if(postData.ques_title=="" || postData.ques_title==undefined){alert('请输入题目名字');$(".btn.saveStep1").removeClass("limited"); return;}
                if(postData.level==0){ alert('请选择难度值'); $(".btn.saveStep1").removeClass("limited");return ; }
                var re = /^[0-9]+$/;
                if(postData.time==""){alert("请输入时间限制");$(".btn.saveStep1").removeClass("limited");return ;}
                else{
                    if(!re.test(postData.time) || parseInt(postData.time)<=0 || parseInt(postData.time)>=2147483647){ alert("时间限制的数据格式不对");$(".btn.saveStep1").removeClass("limited");return ;}
                    if(parseInt(postData.time)>3){alert('时间限制不能超过3s'); $(".btn.saveStep1").removeClass("limited");return ; }
                }
                if(postData.memory==""){alert("请输入内存限制");$(".btn.saveStep1").removeClass("limited");return ;}
                else{
                    if(!re.test(postData.memory) || parseInt(postData.memory)<=0 || parseInt(postData.memory)>=2147483647){ alert("内存限制的数据格式不对");$(".btn.saveStep1").removeClass("limited");return ;}
                    if(parseInt(postData.memory)>128){alert('内存限制不能超过128M'); $(".btn.saveStep1").removeClass("limited");return ; }
                }


                if(postData.quesremark==""|| postData.quesremark.indexOf("请填写题干内容")>-1){alert("题目描述必填");$(".btn.saveStep1").removeClass("limited");return ;}
                if(postData.input_des==""){alert("输入描述必填");$(".btn.saveStep1").removeClass("limited");return ;}
                if(postData.output_des==""){alert("输出描述必填");$(".btn.saveStep1").removeClass("limited");return ;}
                if(postData.input_eg==""){alert("输入样例必填");$(".btn.saveStep1").removeClass("limited");return ;}
                if(postData.output_eg==""){alert("输出样例必填");$(".btn.saveStep1").removeClass("limited");return ;}
                if($(".onLine-langue ul li.A_N_P_Ali").length==0){ alert("请至少选择一种语言！");$(".btn.saveStep1").removeClass("limited");return ; }

                //if(postData.quesremark.length>15000){ alert("题干内容超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                //if(postData.input_des.length>600){ alert("输入描述超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                if(postData.output_des.length>600){ alert("输出描述超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                //if(postData.input_eg.length>600){ alert("输入样例超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                if(postData.output_eg.length>4000){ alert("输出样例超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                //if(postData.hint_des!=undefined && postData.hint_des.length>600){ alert("Hint内容超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }

                $.post('/factory/saveEditingQues1',postData,function(data){
                    $(".btn.saveStep1").removeClass("limited");
                    if(data.status=='ok'){
                        $http.post('/api/proQuestionDetail',{questionId:$routeParams.questionId}).success(function (data) {
                            $scope.thisQues = data.result;
                            //更新标签、知识点
                            var postData = {};
                            postData.questionId = $scope.step1search.ques_id;
                            postData.biaoji1 = $scope.step1search.biaoji1;
                            postData.biaoji2 = $scope.step1search.biaoji2;
                            postData.biaoji3 = $scope.step1search.biaoji3;
                            postData.biaoji4 = $scope.step1search.biaoji4;
                            postData.javatimelimit = ((parseInt($scope.step1search.time) + 2) * 1000).toString();
                            postData.javamemorylimit = ((parseInt($scope.step1search.memory) + 512)*1024).toString();
                            if($(".checkChooise.zhishidian ul li.A_N_P_Ali")[0]!=undefined){ postData.zsd11 = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[0]).attr("data-id");postData.zsd11Title = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[0]).attr("data-name"); }
                            if($(".checkChooise.zhishidian ul li.A_N_P_Ali")[1]!=undefined){ postData.zsd21 = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[1]).attr("data-id");postData.zsd21Title = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[1]).attr("data-name"); }
                            if($(".checkChooise.zhishidian ul li.A_N_P_Ali")[2]!=undefined){ postData.zsd31 = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[2]).attr("data-id");postData.zsd31Title = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[2]).attr("data-name"); }
                            postData.allowlangs = [];
                            $(".onLine-langue li.A_N_P_Ali").each(function(){
                                postData.allowlangs.push($(this).attr("data-id"));
                            })
                            postData.allowlangs = postData.allowlangs.join(',') ;
                            postData.timeLimit = (parseInt($scope.step1search.time) * 1000).toString();
                            postData.memoryLimit = (parseInt($scope.step1search.memory) * 1024).toString();
                            $http.post('/api/proQuestionEdit',postData).success(function (data) {
                                $scope.saveStep3();
                            }).error(function (data) {
                                console.log("服务器错误：" + data);
                            });
                        }).error(function (data) {
                            console.log("服务器错误：" + data);
                        });

                    }else{
                        alert(data.msg);
                        //alert('保存数据失败！');
                    }
                });



            }

            $scope.step2Init = function(){
                if(typeof CodeMirror != 'undefined'){
                    if($('.CodeMirror-scroll').length==0){
                        codeEditor2 = CodeMirror.fromTextArea(document.getElementById("code_content2"), {
                            lineNumbers: true,
                            styleActiveLine: true,
                            matchBrackets: true,
                            highlightSelectionMatches: {showToken: /\w/},
                            indentUnit: 4,
                        });
                        //codeEditor2.setOption("theme", "eclipse");

                    }else {
                        return false;
                    }
                }else{
                    console.log('怎么没有加载CodeMirror?');
                }
                //答案解析
                window.onlineAnsUE =  UE.getEditor('onlineAns',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars: [
                        ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',  'bold', 'italic', 'underline', 'fontborder','|', 'link', 'unlink','|', 'simpleupload','imagefloat', 'insertcode',]
                    ],
                    //focus时自动清空初始化时的内容
                    autoClearinitialContent:true,
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    //默认的编辑区域高度
//                initialFrameHeight:160,

                });
                window.onlineAnsUE.addListener( 'ready', function( editor ) {
                    $(window.onlineAnsUE.iframe.contentWindow.document.body).css("color","#777");
                    window.onlineAnsUE.setContent('请填写题目考察的知识方向、解题思路等信息，便于后期交流、讨论。不会显示给考生。（选填）');
                    window.onlineAnsUE.addListener("click",function(){
                        if(window.onlineAnsUE.getContent().indexOf('请填写题目考察的知识方向')>-1){ window.onlineAnsUE.setContent(''); }
                    })
                    if($scope.step1search.daanjiexi!=undefined && $scope.step1search.daanjiexi!=null){  window.onlineAnsUE.setContent($scope.step1search.daanjiexi); }
                });

                $('.createTemp ul li').unbind('click').bind('click',function(){
                    if(!$(this).hasClass('A_N_P_Ali')){
                        $(this).addClass('A_N_P_Ali').siblings('li').removeClass('A_N_P_Ali');
                        if($(this).attr('data-id')==1){
                            $('.answerModel.codeEditBox.ans1').removeClass('hide');
                            if($("#code_content").parent().find(".CodeMirror").length==0){
                                window.codeEditor1 = CodeMirror.fromTextArea(document.getElementById("code_content"), {
                                    lineNumbers: true,
                                    styleActiveLine: true,
                                    matchBrackets: true,
                                    highlightSelectionMatches: {showToken: /\w/},
                                    indentUnit: 4,
                                });
                            }
                            window.acm.step2codeSave = false;$(".item-peizhi-hide").show();
                        }else{
                            $('.answerModel.codeEditBox.ans1').addClass('hide');$(".item-peizhi-hide").hide();
                        }
                    }

                    var postData = {};
                    postData.questionId = $scope.step1search.ques_id;
                    postData.autoflag = '是';
                    if($('.createTemp ul li.A_N_P_Ali').attr("data-id")==0){
                        postData.autoflag = '否';
                    }
                    $http.post('/api/proQuestionEdit',postData).success(function (data) {

                    }).error(function (data) {
                        console.log("服务器错误：" + data);
                    });
                });

                $(".dropdown").easyDropDown({ cutOff: 4 });


                $(".resultListTb .tfoot-bottom .checkAll").click(function(){
                    if($(this).is(":checked")){
                        $(".resultListTb tbody .datahave input").prop("checked",true);
                    }else{
                        $(".resultListTb tbody .datahave input").prop("checked",false);
                    }
                });
                $(document).on("click",".resultListTb tbody .jcenter-list-checkbox",function(){
                    if($(".resultListTb tbody .jcenter-list-checkbox:checked").length==$(".resultListTb tbody .jcenter-list-checkbox").length){
                        $(".resultListTb .tfoot-bottom .checkAll").prop('checked',true);
                    }else{
                        $(".resultListTb .tfoot-bottom .checkAll").prop('checked',false);
                    }
                });

                if($scope.step1search.temps!=undefined && $scope.step1search.autoflag!="否"){
                    $($('.createTemp ul li')[0]).click();
                    $(".item-peizhi-hide").show();
                }
                if($scope.step1search.returntype!=undefined){
                    $(".backType").easyDropDown('select',$(".backType option[value="+$scope.step1search.returntype+"]").index());
                }
                $.post("/api/proQuestionTestCaseList",{quesid:$scope.step1search.myojId},function(data){
                    if(data.errmsg==""){
                        $scope.egList = data.result;
                        $scope.egTotalScore = 0;
                        $scope.egList.forEach(function(item){
                            $scope.egTotalScore += parseInt(item.score);
                        });
                        $scope.$apply();
                        $(".resultListTb .tfoot-bottom .checkAll").prop('checked',false);
                    }else{
                        alert(data.errmsg);
                    }
                });
                window.acm.initLoadSelect();
                if($scope.step1search.codeAns!=undefined && $scope.step1search.codeAns.language!=""){
                    $(".langSelect2").easyDropDown('select', $(".langSelect2 option[value="+$scope.step1search.codeAns.language+"]").index());
                    $(".langSelect1").easyDropDown('select',1);
                    //
                }
            }

            $scope.initLoadTemps = function(temps){
                window.acm.codeCollectionSave();
                temps = {};
                if($(".createTemp ul li.A_N_P_Ali").index()==0){
                    for(var i=0;i< window.acm.codeCollection.length;i++){
                        if(window.acm.codeCollection[i].language==0){ temps.l0 = window.acm.codeCollection[i].data_code; }
                        if(window.acm.codeCollection[i].language==1){ temps.l1 = window.acm.codeCollection[i].data_code; }
                        if(window.acm.codeCollection[i].language==3){ temps.l3 = window.acm.codeCollection[i].data_code; }
                        if(window.acm.codeCollection[i].language==6){ temps.l6 = window.acm.codeCollection[i].data_code; }
                        if(window.acm.codeCollection[i].language==7){ temps.l7 = window.acm.codeCollection[i].data_code; }
                        if(window.acm.codeCollection[i].language==9){ temps.l9 = window.acm.codeCollection[i].data_code; }
                        if(window.acm.codeCollection[i].language==10){ temps.l10 = window.acm.codeCollection[i].data_code; }
                        if(window.acm.codeCollection[i].language==18){ temps.l18 = window.acm.codeCollection[i].data_code; }
                    }
                }
                return temps;
            }
            window.acm.codeCollectionInit = function(lang,code){
                var mybool = false;
                for(var i=0;i<window.acm.codeCollection.length;i++){
                    if(window.acm.codeCollection[i].language===lang){
                        mybool = true;
                        window.acm.codeCollection[i].data_code = code;
                    }
                }
                if(!mybool){
                    window.acm.codeCollection.push({"language":lang.toString(),"data_code":code});
                }
            }

            $scope.initLoadSelect = function(){
                if($(".onLine-langue ul li.A_N_P_Ali").length>0){
                    var ElementId = 'langSelect' + parseInt(Math.random()*9999);
                    var select = $('<select id="'+ElementId+'"></select>');
                    $(".onLine-langue ul li.A_N_P_Ali").each(function(){
                        var value = $(this).attr("data-id");
                        var txt = $(this).attr("data-name");
                        select.append($('<option value="' + value + '">' + txt + '</option>'));
                        window.acm.codeCollectionInit(value,"");
                    });
                    $(".loadSelect").html("").append(select);
                    $(".loadSelect #"+ElementId).easyDropDown({cutOff: 10,onChange:function(){
                        codeCollectionSave();
                        initLoadCode();
                    }});
                    var selectTXT = $(".loadSelect.loadSelect1 select").val();
                    $("#selectlangid").val(selectTXT);
                    initLoadCode();
                }else{
                    var ElementId = 'langSelect' + parseInt(Math.random()*9999);
                    var select = $('<select id="'+ElementId+'"><option value="">请选择</option></select>');

                    $(".loadSelect").html("").append(select);
                    $(".loadSelect #"+ElementId).easyDropDown({cutOff: 10,onChange:function(){
                        codeCollectionSave();
                        initLoadCode();
                    }});
                }
            }

            $scope.saveStep2 = function(){
                if($("#submit-qus").hasClass("limited")){ return; }
                $("#submit-qus").addClass("limited");
                $scope.saveStep1(3);
            }

            window.acm.limitRelease=0;
            $scope.saveStep3 = function(){
                if($scope.egList.length==0){ alert('您还没有添加测试用例！'); return; }
                confirm('确定要结束编辑并保存吗？',function(){
                    if(window.acm.limitRelease==1){ return ; } else{ window.acm.limitRelease=1;}
                    //保存标程和题目解析
                    $scope.updateCode();
                    var postData = {};
                    postData.questionId = $scope.step1search.ques_id;
                    postData.codeAns = window.acm.codeCollectionAns;
                    postData.daanjiexi = window.onlineAnsUE.getContent();
                    postData.temps = $scope.initLoadTemps(postData.temps);
                    //if(){}
                    postData.tcComments=[];
                    postData.tcScores=[];
                    postData.fenzhi = $scope.egTotalScore;
                    for(var i=0;i<$scope.egList.length;i++){
                        postData.tcComments.push($scope.egList[i].name);
                        postData.tcScores.push($scope.egList[i].score);
                    }
                    postData.tcComments = postData.tcComments.join('\n');
                    postData.tcScores = postData.tcScores.join('\n');
                    postData.testcases = $scope.egList.length;
                    postData.rateOfPro =0;
                    if(postData.fenzhi==null ||postData.fenzhi==undefined){ postData.fenzhi=0; }
                    $http.post('/api/proQuestionEdit',postData).success(function (data) {
                        if(data.errmsg==""){

                            $.post('/factory/releaseQuestion',{quesId:postData.questionId,releaseType:'company',company:$scope.entInfo.ent_id},function(data){
                                if(data.status=='ok'){

                                    $http.post('/api/proQuestionEdit',{ questionId :postData.questionId,rateOfPro:0}).success(function (data) { }).error(function (data) {  });
                                    $.cxDialog({
                                        title: '提示',
                                        info: '<div style="padding:20px; text-align:center;">试题添加成功！</div>',
                                        lockScroll: true,
                                        background: '#000',
                                        width: 400,
                                        okText:'我知道了',
                                        ok:function(){
                                            document.location.href='/ques';
                                        },
                                        closeBtnFun:function(){
                                            document.location.href='/ques';
                                        }
                                    });
                                }
                                else{

                                    $http.post('/api/proQuestionEdit',{ questionId :postData.questionId,rateOfPro:2}).success(function (data) { }).error(function (data) {  });
                                    $.cxDialog({
                                        title: '提示',
                                        info: '<div style="padding:20px; text-align:center;">数据保存成功！尚有未通过的测试用例，此题暂时无法正常使用，建议完善试题！</div>',
                                        lockScroll: true,
                                        background: '#000',
                                        width: 400,
                                        okText:'继续完善',
                                        ok:function(){

                                        },
                                        noText:'先不改了',
                                        no:function(){
                                            location.href='/ques#/list';
                                        },
                                        closeBtnFun:function(){

                                        }
                                    });
                                }
                                window.acm.limitRelease=0;
                            });

                            $("#submit-qus").removeClass("limited");
                        }else{
                            alert(data.errmsg);
                            $("#submit-qus").removeClass("limited");
                        }
                    }).error(function (data) {
                        console.log("服务器错误：" + data);
                    });
                });

            }
            window.acm.codeCollection = [];
            window.acm.codeCollectionAns = {language:'',data_code:''};

            window.acm.step2codeSave = false;
            window.acm.addEgBool = true;
            $scope.addCsEg = function(){
                //检查第二部
                var postData = {};
                postData.ques_id = $scope.step1search.ques_id;
                postData.language = [];
                $(".onLine-langue ul li.A_N_P_Ali").each(function(){
                    postData.language.push($(this).attr("data-id"));
                });
                postData.language = postData.language.join(',').toString();
                postData.returntype = $(".backType").val();
                postData.autoflag = '是';
                postData.functionname = $("#funtionName").val();

                postData.parameters = '[]';
                postData.codeList = JSON.stringify(window.acm.codeCollection);
                if($(".createTemp li.A_N_P_Ali").attr('data-id')==0){
                    postData.codeList=[];
                    postData.autoflag = '否';
                }
                if(window.acm.step2codeSave){
                    $scope.addCsEgFun();
                }else{
                    $.post('/factory/saveEditingQues2',postData,function(data){
                        if(data.status=='ok'){
                            //添加测试用例
                            $scope.addCsEgFun();
                        }else{
                            alert(data.msg);
                        }
                    });
                }
            }

            $scope.addCsEgFun = function(){
                window.acm.step2codeSave = true;
                if(window.acm.addEgBool){
                    $("#egName").val('');$("#egInput").val('');$("#egOutput").val('');
                    $("#egDifficulty").easyDropDown('select',0);
                    $("#egScore").easyDropDown('select',2);
                    $("#datatype").easyDropDown('select',0);
                    $("#datascale").easyDropDown('select',0);
                }
                $.cxDialog({
                    title: '添加测试用例',
                    info: $('.test-exp-hide'),
                    lockScroll: true,
                    background: '#000',
                    width: 400,
                    okText: '确定',
                    ok: function () {
                        var test_id="";
                        var egName = $("#egName").val();
                        var egDifficulty = $("#egDifficulty").val();
                        var egScore = $("#egScore").val();
                        var egdatascale = $("#datascale").val();
                        var egdatatype = $("#datatype").val();
                        var egInput = $("#egInput").val();
                        var egOutput= $("#egOutput").val();
                        if(egName==""){window.acm.addEgBool = false;alertBackClick("请输入用例名字！",$(".addEgBtn"));return false;}
                        if(egInput==""){window.acm.addEgBool = false;alertBackClick("请输入用例输入！",$(".addEgBtn"));return false;}
                        if(egOutput==""){window.acm.addEgBool = false;alertBackClick("请输入用例输出！",$(".addEgBtn"));return false;}
                        var postData = {egName:egName,test_id:test_id,egScore:egScore,ques_id:$scope.step1search.ques_id,egDifficulty:egDifficulty,datascale:egdatascale,datatype:egdatatype,egInput:egInput,egOutput:egOutput};

                        if($scope.step1search.ques_id!=null){

                            $.post("/factory/saveEditingTest",postData,function(data){
                                window.acm.addEgBool = true;
                                if(data.status=="ok"){
                                    $scope.initCsEgList();
                                }else{
                                    alert(data.msg);
                                }
                            });
                        }else{
                            document.location.href='/ques#/list';
                        }
                    }
                })
            }

            $scope.initCsEgList = function(){
                $.post("/api/proQuestionTestCaseList",{quesid:$scope.thisQues.myojId},function(data){
                    if(data.errmsg==""){
                        $scope.egList = data.result;
                        $scope.egTotalScore = 0;
                        $scope.egList.forEach(function(item){
                            $scope.egTotalScore += parseInt(item.score);
                        });
                        $scope.$apply();
                        $(".resultListTb .tfoot-bottom .checkAll").prop('checked',false);

                        $scope.updateFenzhi($scope.thisQues._id,$scope.egTotalScore);
                    }else{
                        alert(data.errmsg);
                    }
                });
            }

            $scope.editCsEg =  function(test_id){
                $.post("/factory/findTest",{test_id:test_id},function(data){
                    if(data){
                        $("#egName").val(data.egName);
                        $("#egInput").val(data.egInput);
                        $("#egOutput").val(data.egOutput);
                        if(data.egDifficulty!=""){ $("#egDifficulty").easyDropDown('select', parseInt($("#egDifficulty option[value="+data.egDifficulty+"]").attr("lv"))); }
                        if(data.egDataType!=""){$("#datatype").easyDropDown('select', parseInt($("#datatype option[value="+data.egDataType+"]").attr("lv")));}
                        if(data.egDataScale!=""){$("#datascale").easyDropDown('select', parseInt($("#datascale option[value="+data.egDataScale+"]").attr("lv")));}
                        loadSelectData($("#egDifficulty"),data.egDifficulty);
                        loadSelectData($("#egScore"),data.egScore);
                        $.cxDialog({
                            title: '编辑测试用例',
                            info:$('.test-exp-hide'),
                            lockScroll: true,
                            background: '#000',
                            width: 400,
                            okText:'确定',
                            ok:function(){
                                var egName = $("#egName").val();
                                var egDifficulty = $("#egDifficulty").val();
                                var egdatascale = $("#datascale").val();
                                var egdatatype = $("#datatype").val();
                                var egInput = $("#egInput").val();
                                var egOutput= $("#egOutput").val();
                                var egScore = $("#egScore").val();
                                if(egName==""){alert("请输入用例名字！");return false;}
                                if(egInput==""){alert("请输入用例输入！");return false;}
                                if(egOutput==""){alert("请输入用例输出！");return false;}
                                if($scope.step1search.ques_id!=null){
                                    $.post("/factory/saveEditingTest",{egName:egName,test_id:test_id,egScore:egScore,ques_id:$scope.step1search.ques_id,egDifficulty:egDifficulty,datascale:egdatascale,datatype:egdatatype,egInput:egInput,egOutput:egOutput},function(data){
                                        if(data.status=="ok"){
                                            $scope.initCsEgList();
                                        }else{
                                            alert(data.msg);
                                        }
                                    });
                                }else{
                                    document.location.href='/ques';
                                }
                            }
                        });
                    }
                });

            }

            $scope.delCsEg = function(test_id){
                $.post("/factory/deleteEditingTest",{test_id:test_id},function(data){
                    if(data.status=="ok"){
                        $.cxDialog({
                            title: '提示',
                            info: '<div style="padding:20px; text-align:center;">'+data.msg+'</div>',
                            lockScroll: true,
                            background: '#000',
                            width: 400,
                            okText:'我知道了',
                            ok:function(){
                                $(".resultListTb tr[data-id="+test_id+"]").remove();
                                $scope.initCsEgList();
                            }
                        });
                    }else{
                        alert(data.msg);
                    }
                });
            }

            $scope.createTemps = function(){
                $scope.generate = {};
                $scope.generate.language = 'C,C++,Java8,Python2,PHP,CSharp,Objective-C,JavaScript';
                $scope.generate.returntype = $(".backType").val();
                $scope.generate.functionname = $("#funtionName").val();
                var parameters = '[';
                if($(".item-list-box .item-list").length>0){
                    $(".item-list-box .item-list").each(function(){
                        var type = $(this).find("select").val();
                        var name = $(this).find(".fun_name").val();
                        //parameters.push({"type":type,"name":name});
                        if(parameters.length!=1){parameters += ',';}
                        parameters += '{"name":"'+name+'","type":"'+type+'"}';
                    });
                }
                parameters += ']';
                $scope.generate.parameters = parameters;
                $.post('https://capture.acmcoder.com/template/generate.php',$scope.generate,function(data){
                    if(data && data.length>0){
                        window.acm.codeCollection = [];
                        data = $.parseJSON(data);
                        for(var i=0;i<data.length;i++){
                            var curHtml = data[i].head;
                            if(data[i].language.indexOf("Python")>-1){
                                curHtml +='\r\n\r\n#请完成下面这个函数，实现题目要求的功能\r\n#当然，你也可以不按照下面这个模板来作答，完全按照自己的想法来 ^-^ \r\n#******************************开始写代码******************************\r\n\r\n';
                                curHtml += data[i].body;
                                curHtml +='\r\n\r\n#******************************结束写代码******************************\r\n\r\n\r\n';
                            }else{
                                curHtml +='\r\n\r\n/*请完成下面这个函数，实现题目要求的功能\r\n当然，你也可以不按照下面这个模板来作答，完全按照自己的想法来 ^-^ \r\n******************************开始写代码******************************/\r\n';
                                curHtml += data[i].body;
                                curHtml +='/******************************结束写代码******************************/\r\n\r\n\r\n';
                            }
                            curHtml += data[i].tail;
                            window.acm.codeCollectionInit(data[i].lang,curHtml);
                        }

                        window.acm.initLoadCode();
                        $("#"+$(".langSelect1").parents('.scrollable').attr("id")).easyDropDown('select',1);
                        alert('编程代码模板生成成功！');
                    }
                });

                var postData = {};
                postData.questionId = $routeParams.questionId;
                postData.tempOptions = eval(parameters);
                postData.functionname = $scope.generate.functionname;
                postData.returntype = $scope.generate.returntype;
                $http.post('/api/proQuestionEdit',postData).success(function (data) {

                }).error(function (data) {
                    console.log("服务器错误：" + data);
                });
            }

            window.zipSelect = function(fileObj){
                var file = fileObj.files['0'];
                if (file) {
                    $(".cxdialog_info .upFile").html(file.name);
                }

            }

            /*上传测试用例*/
            $scope.uploadEg = function(){
                $.cxDialog({
                    title: '上传测试用例',
                    info: '<form action="/factory/impTest" method="post" id="fileUp" enctype ="multipart/form-data">  <input type="hidden" id="proid" name="proid" value="'+$scope.thisQues.myojId+'" /><div style="margin: 20px 0px 10px 0px;text-align:center;"><a href="javascript:void(0)" class="upFile" onclick="file.click()">+ 上传测试用例</a><input onchange="zipSelect(this)" accept="application/x-zip-compressed" style="display: none;" type="file" id="file" class="" name="file"/></div></form>',
                    background: '#000',
                    width: 400,
                    ok:function () {
                        if($("#file").val()!=""){
                            var formData = new FormData($("#fileUp")[0]);
                            var url ="/factory/impTest";
                            $.ajax({
                                url: url,
                                type: 'POST',
                                data: formData,
                                async: true,
                                cache: false,
                                contentType: false,
                                processData: false,
                                success: function (returndata) {
                                    if(returndata.status == 'no'){
                                        alert(returndata.msg);
                                    }else{
                                        $.post("/api/proQuestionTestCaseList",{quesid:$scope.thisQues.myojId},function(data){
                                            if(data.errmsg==""){
                                                $scope.egList = data.result;
                                                $scope.egTotalScore = 0;
                                                $scope.egList.forEach(function(item){
                                                    $scope.egTotalScore += parseInt(item.score);
                                                });
                                                $scope.$apply();
                                                $(".resultListTb .tfoot-bottom .checkAll").prop('checked',false);
                                            }else{
                                                alert(data.errmsg);
                                            }
                                        });
                                    }
                                },
                                error: function (returndata) {

                                }
                            });
                        }
                        else{
                            alert("请先选择上传文件！");
                            return false;
                        }
                    },
                    okText:"确定"
                });
            }
            //保存标程
            $scope.updateCode = function(){
                window.acm.codeCollectionAns = {language:$(".langSelect2").val(),data_code:codeEditor2.getValue()};
            }
            var resultSource,resultSource_t ;
            window.acm.loadResult = function(){
                if(resultSource.length>0){
                    var solution_id = resultSource[0].id;
                    var test_id = resultSource[0].test_id;
                    //var test_id = $(this).attr("value");
                    $.post("/factory/findResult",{solution_id:solution_id,test_id:test_id},function(data2){
                        if(data2==""){
                            setTimeout("window.acm.loadResult()",1000)
                        }else{
                            var resultSource_t = new Array();
                            var solution_id = data2.solution_id;
                            var test_id = "";
                            var egName = "";
                            for(var i=0;i<resultSource.length;i++){
                                if(resultSource[i].id.toString()==solution_id.toString()){
                                    egName = resultSource[i].name;
                                    test_id = resultSource[i].test_id;
                                }else{
                                    resultSource_t.push(resultSource[i]);
                                }
                            }
                            var errorHtml ='';
                            if(data2.error!=undefined){
                                errorHtml += '<div class="tipMsg"><pre>' + data2.error+ '</pre></div>' ;
                            }
                            var timeLimitedNum = 0;
                            var memoryLimitedNum = 0;
                            if(parseInt($("#langSelect").val())>=3){
                                timeLimitedNum = (parseInt($("#time_limit").val())+2)*1000;
                                memoryLimitedNum = (parseInt($("#memory_limit").val())+512)*1024;
                            }else{
                                timeLimitedNum = parseInt($("#time_limit").val())*1000;
                                memoryLimitedNum = parseInt($("#memory_limit").val())*1024;
                            }
                            var timeHtml = '';
                            if(data2.time > timeLimitedNum){
                                timeHtml = '<span class="red" title="时间超限">'+data2.time+'</span>';
                            }else{
                                timeHtml = data2.time ;
                            }
                            var memoryHtml = '';
                            if(data2.memory > memoryLimitedNum){
                                memoryHtml = '<span class="red" title="内存超限">'+data2.memory+'</span>';
                            }else{
                                memoryHtml = data2.memory ;
                            }

                            $(".resultListTb tr[data-id="+test_id+"] .view_debug").append('<table><tr><td class="bg-agreen"><b class="agreen"><a title="'+data2.statusname +'" class="showDebugLink  '+ (data2.statusname=='编译通过，运行正确 ( AC )'?'green':'red') +'">'+data2.statusname.substring(0,4) +'<i class="fa fa-angle-down"></i><a></b></td><td><b>'+timeHtml+'</b> ms</td><td><b>'+memoryHtml+'</b> kb</td></tr></table>');
                            $(".resultListTb tr[data-id="+test_id+"]").after('<tr class="showDebugMSG hide"><td colspan="12">'+errorHtml+'</td></tr>');
                            resultSource = resultSource_t;
                            if(resultSource.length>0){
                                window.acm.loadResult();
                            }else{
                                $.cxDialog.close();
                            }

                            $('.showDebugLink').unbind("click").bind('click',function(){
                                $(this).parents(".datahave").next().toggleClass("hide");
                            });
                        }
                    });
                }else{
                    $.cxDialog.close();
                    $(".btn-sty1.inappropriate.runcode").removeClass('limited');
                }
            }
            var loadSelectData = function(elemt,value){
                elemt.val(value);
                elemt.parents(".dropdown").find("span.selected").html(value);
                elemt.parents(".dropdown").find("ul li").each(function(){
                    if($(this).html()==value){
                        if(!$(this).hasClass("active")){
                            $(this).addClass("active");
                        }
                    }else{
                        $(this).removeClass("active");
                    }
                })
            }

            $scope.updateFenzhi = function(questionId,fenzhi){
                $http.post('/api/proQuestionEdit',{questionId:questionId,fenzhi:fenzhi}).success(function (data) {

                }).error(function (data) {
                    console.log("服务器错误：" + data);
                });
            }

            // 运行结果弹窗
            $scope.runCode = function(){
                if(!$(".btn-sty1.inappropriate.runcode").hasClass('limited')){
                    $(".btn-sty1.inappropriate.runcode").addClass('limited');
                }
                $(".datahave .view_debug").html('');
                $(".resultListTb").removeClass('debug');
                if(codeEditor2.getValue()==""){ alert("您还没有标程，请先添加试题答案（标程）"); return; }
                $scope.updateCode();
                var codeSelectOne = codeEditor2.getValue();
                if($(".langSelect2").val()==""){ alert("请选择标程答案语言");return false;}
                if($(".jcenter-list input:checked").length==0){alert("请选择测试用例！");return false;}
                $.post("/factory/saveCode",{ques_id:$scope.step1search.ques_id,codeList:JSON.stringify(window.acm.codeCollectionAns)},function(data){
                    var testlist =[];
                    $(".jcenter-list .datahave input:checked").each(function(){
                        testlist.push($(this).val());
                    });
                    $.post("/factory/runOnlineCodeTwo",{
                        ques_id:$scope.step1search.ques_id,
                        language:$(".langSelect2").val(),
                        language_name:$(".langSelect2").val(),
                        code_content:codeSelectOne,
                        testlist:testlist.join(",")
                    },function(data){
                        var resultHtml = '';
                        if(data.status=="ok"){
                            resultSource = $.parseJSON(data.data);
                            setTimeout("window.acm.loadResult()",2000);
                            $(".showDebugMSG").remove();
                            $.cxDialog({
                                title: '提示', info:$('.runing'), lockScroll: true, background: '#000', width: 650,height:350,okText:'确定',
                                baseClass:"noHidden",
                                ok:function(){

                                }
                            });
                            $(".runingResult tbody tr").remove();
                            if($(".result_loading").length==0){
                                $(".runingResult").append('<div class="result_loading" style="width: 100%;text-align: center;padding: 20px;font-size:18px;">您请稍等，程序正在疯狂运行...<br><br><img src="/images/loading.gif"></div>');

                            }
                            if(!$(".resultListTb").hasClass("debug")){$(".resultListTb").addClass("debug");}
                        }else{
                            alert(data.msg);
                        }
                    });
                });
            }

            $scope.updateScore = function(){
                var updateHtml ='<div class="updateScoreBox"><table>';
                updateHtml+='<tr><td>用例名字</td><td>难度</td><td>数据类型</td><td>数据规模</td><td>分数</td></tr>';
                $(".resultListTb tbody tr.datahave").each(function(){
                    updateHtml+='<tr style="height: 40px;" id="'+$(this).attr("data-id")+'"><td>'+$($(this).find("td").eq(1)).find("span").html()+'</td><td>'+$($(this).find("td").eq(2)).find("b").html()+'</td><td>'+$($(this).find("td").eq(3)).find("b").html()+'</td><td>'+$($(this).find("td").eq(4)).find("b").html()+'</td>';
                    if($($(this).find("td").eq(1)).find("b").html()==""){
                        updateHtml+='<td><select style="top:0px;" onchange="window.acm.initUpdateScoreV()"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></td>';
                    }else{
                        updateHtml+='<td><select style="top:0px;" onchange="window.acm.initUpdateScoreV()">';
                        for(var i=1;i<11;i++){
                            if(i==parseInt($($(this).find("td").eq(5)).find("b").html())){
                                updateHtml += '<option selected value="'+i+'">'+i+'</option>';
                            }else{
                                updateHtml += '<option value="'+i+'">'+i+'</option>';
                            }
                        }
                        updateHtml+='</select></td>';
                    }
                    updateHtml+='</tr>';
                });
                updateHtml+='</table><div class="showUpdateResult" style="margin-top: 20px;"></div></div>';
                $.cxDialog({
                    title: '批量调整分数', info:updateHtml, lockScroll: true, background: '#000', width: 650, okText:'确定',
                    baseClass:"noHidden",
                    ok:function(){
                        var updateData = '[';
                        $(".updateScoreBox table tr").each(function(){
                            var id = $(this).attr("id");
                            if(id!=undefined){
                                var score = $(this).find("select").val();
                                if(updateData.length!=1){updateData+=',';}
                                updateData+='{id:"'+id+'",score:'+score+'}';
                            }
                        });
                        updateData += ']';
                        $.post("/factory/saveTestScore",{
                            updateData:updateData
                        },function(data){
                            if(data.status=="ok"){
                                $scope.initCsEgList();
                            }else{
                                alert('更新失败！');return false;
                            }
                        });
                    }
                });
                window.acm.initUpdateScoreV();
                //$(".updateScoreBox select").easyDropDown({ onSelect: function(selected){ initUpdateScoreV(); }});
            }

            window.acm.initUpdateScoreV = function(){
                var scoreTotal = 0;
                $(".updateScoreBox table select").each(function(){
                    var score = $(this).val();
                    scoreTotal+= parseInt(score);
                });
                $(".showUpdateResult").html('现在总分为：<span class="red" style="font-weight: bolder;font-size: 18px;color: #ff8a00">'+ scoreTotal +'</span> 分');
            }


            window.initLoadCode1 = function(){
                window.acm.codeCollectionSave();
                window.acm.initLoadCode();
            }

            window.acm.codeCollectionSave = function(){
                var selectId = $("#selectlangid").val();
                if(selectId!=""){
                    for(var i=0;i<window.acm.codeCollection.length;i++){
                        if(window.acm.codeCollection[i].language === selectId){
                            window.acm.codeCollection[i].data_code = codeEditor1.getValue();
                        }
                    }
                }
                $("#selectlangid").val($(".langSelect1").val());
            }
            window.acm.initLoadCode = function () {
                var select_id = $(".langSelect1").val();
                var strValue = "";
                for (var i = 0; i < window.acm.codeCollection.length; i++) {
                    if (window.acm.codeCollection[i].language.toString() === select_id) {
                        strValue = window.acm.codeCollection[i].data_code;
                    }
                }
                if(strValue==undefined || strValue==null){ strValue ="";}
                codeEditor1.setValue(strValue);
            }

            var initBindPageFun = function () {
                $(document).on('click','.chose-radio input:radio',function () {
                    $.each($('.chose-radio input:radio'),function(){
                        $(this).prop('checked',false)
                    })
                    $(this).prop('checked',true)
                })
                $(document).on('click','.parse input:radio',function () {
                    $.each($('.parse input:radio'),function(){
                        $(this).prop('checked',false).parent().siblings('td').find('.addQues-ok').hide()
                    })
                    $(this).prop('checked',true).parent().siblings('td').find('.addQues-ok').show();
                })
                /*输入描述*/
                window.codeUE3= UE.getEditor('myEditor3',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars: [
                        ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic',
                        ]
                    ],
                    //focus时自动清空初始化时的内容
                    autoClearinitialContent:true,
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    autoHeightEnabled:false,
                    //默认的编辑区域高度
                    //                initialFrameHeight:100,

                })
                window.codeUE3.addListener( 'ready', function( editor ) {
                    if($scope.step1search.input!=undefined){ window.codeUE3.setContent($scope.step1search.input); }
                })
                /*输出描述*/
                window.codeUE4=UE.getEditor('myEditor4',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars:[
                        ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic',
                        ]
                    ],
                    //focus时自动清空初始化时的内容
                    autoClearinitialContent:true,
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    autoHeightEnabled:false,
                    //默认的编辑区域高度
                    //                initialFrameHeight:100,

                })
                window.codeUE4.addListener( 'ready', function( editor ) {
                    if($scope.step1search.output!=undefined){ window.codeUE4.setContent($scope.step1search.output); }
                })
                /*输入样例*/
                window.codeUE5=UE.getEditor('myEditor5',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars: [
                        ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic',
                        ]
                    ],
                    //focus时自动清空初始化时的内容
                    autoClearinitialContent:true,
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    autoHeightEnabled:false,
                    //默认的编辑区域高度
                    //                initialFrameHeight:100,

                })
                window.codeUE5.addListener( 'ready', function( editor ) {
                    if($scope.step1search.inputSample!=undefined){ window.codeUE5.setContent($scope.step1search.inputSample); }
                })
                /*输出样例*/
                window.codeUE6=UE.getEditor('myEditor6',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars:[
                        ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic',
                        ]
                    ],
                    //focus时自动清空初始化时的内容
                    autoClearinitialContent:true,
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    autoHeightEnabled:false,
                    //默认的编辑区域高度
                    //                initialFrameHeight:100,

                })
                window.codeUE6.addListener( 'ready', function( editor ) {
                    if($scope.step1search.outputSample!=undefined){ window.codeUE6.setContent($scope.step1search.outputSample); }
                })

                $('.timeInput').keyup(function(){
                    $(".addpro-tsCnt.timeOther span").html(parseInt($scope.step1search.time)+2);
                });
                $('.memoryInput').keyup(function(){
                    $(".addpro-tsCnt.memOther span").html(parseInt($scope.step1search.memory)+512);
                });
                function returnFloat(value){
                    var xsd=value.toString().split(".");
                    if(xsd.length==1){
                        return value;
                    }
                    if(xsd.length>1){
                        if(xsd[1].length>=2){
                            value = xsd[0]+'.'+xsd[1].substring(0,1);
                        }
                        return value;
                    }
                }

                /*题型筛选*/
                $('.addpap_t9 ul li').click(function () {
                    if(!$(this).parents('.addpap_t9').hasClass('limited')){
                        if($(this).attr("id")=="6"){
                            location.href='/ques#/add/onlinecode';
                        }
                        else if($(this).attr("id")=="8"){
                            location.href='/ques#/add/webcode';
                        }else{
                            location.href='/ques#/add/' + $(this).attr("id");
                        }
                    }
                })
                /*切换试题是，清空选中内容*/
                function clearText() {
                    $('.danxuan-s input').prop('checked', false);
                    $('.danxuan-s .addQues-ok').hide();
                }

                window.acm.initBindFunction = function () {
                    $('.addItem').unbind("click").bind("click", function () {
                        var item = $('.item-list-box-copy').clone();
                        item.removeClass("item-list-box-copy").addClass("item-list").removeClass("hide");
                        $('.item-list-box').append(item);
                        $(".item-list-box .item-list:last-child select").easyDropDown({cutOff: 6,onSelect: function(selected){ initLoadCode(); }});
                        window.acm.initBindFunction();
                    })
                    $('.delItem').unbind("click").bind("click", function () {
                        $(this).parent().remove();
                    })
                }
                window.acm.initBindFunction();

            }

        }]
);

quesControllers.controller("AddWebCodeController", ['$scope', '$http','$routeParams','$location', '$timeout',
        function($scope, $http,$routeParams,$location, $timeout)
        {
            if (Object.isNullString($routeParams.positionId)) {
                window.acm.positionId = undefined;
            }else{
                window.acm.positionId = $routeParams.positionId;
            }
            if (Object.isNullString($routeParams.paperId)) {
                window.acm.paperId = undefined;
            }else{
                window.acm.paperId = $routeParams.paperId;
            }
            if(window.ueTitle!=undefined){ window.ueTitle.destroy(); }
            /*if(window.codeUE3!=undefined){ window.codeUE3.destroy(); }
            if(window.codeUE4!=undefined){ window.codeUE4.destroy(); }
            if(window.codeUE5!=undefined){ window.codeUE5.destroy(); }
            if(window.codeUE6!=undefined){ window.codeUE6.destroy(); }*/
            if(window.onlineAnsUE!=undefined){ window.onlineAnsUE.destroy(); }
            if(window.daanjiexiUE!=undefined){ window.daanjiexiUE.destroy(); }
            if(window.ue2!=undefined){ window.ue2.destroy(); }
            /*版本判断*/
            $http.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") +  "&r=" + Math.random(),{}).success(function (data) {
                $scope.entInfo = data.data;
                $scope.version = data.data.exam_version;
                $.cookie('version',data.data.exam_version,{ path: '/'})
            }).error(function (data) {
                console.log(data);
            });
            if($.cookie("endExamNotes")){
                $.cookie('endExamNotes', null, { expires: -1, path: '/',domain:'.acmcoder.com' });
            }
            if(localStorage.quesNodes!=undefined){
                var dataV = $.parseJSON(localStorage.quesNodes);
                dataV.forEach(function(item){
                    if(item.id==126){ $scope.LevelData = item.child; }
                });
                $timeout(function () {
                    $scope.qnTimeout();
                });
            }else{
                $http.get('/api/quesNodes').success(function (data) {
                    localStorage.quesNodes = JSON.stringify(data.result);
                    data.result.forEach(function(item){
                        if(item.id==126){ $scope.LevelData = item.child; }
                    });
                    $timeout(function () {
                        $scope.qnTimeout();
                    });
                }).error(function (data) {
                    alert("管理员累晕了，没有反馈结果，请重试一下～～");
                });
            }

            $scope.qnTimeout = function(){
                //$($(".online-know ul li")[0]).addClass('A_N_P_Ali');

                $('.checkChooise.zhishidian ul li').bind('click',function () {
                    if($(this).hasClass('A_N_P_Ali')){
                        if($(this).text()!='全选'){
                            $(this).removeClass("A_N_P_Ali");
                        }

                    }else{
                        if($('.checkChooise.zhishidian ul li.A_N_P_Ali').length>=3){
                            alert('此项最多只能选择3个！');return;
                        }else{
                            if($(this).text()!='全选'){
                                $(this).addClass("A_N_P_Ali");
                            }

                        }
                    }
                })
                $('.checkChooise.onLine-langue ul li').bind('click',function () {
                    if($(this).hasClass('must') && $(this).hasClass('A_N_P_Ali')){ return; }
                    if($(this).hasClass('A_N_P_Ali')){
                        if($(this).text()!='全选'){
                            $(this).removeClass("A_N_P_Ali");
                        }
                    }else{
                        if($(this).text()!='全选'){
                            $(this).addClass("A_N_P_Ali");
                        }
                    }
                    $scope.step1search.language=[];
                    $(".onLine-langue ul li.A_N_P_Ali").each(function(){
                        $scope.step1search.language.push({"id":$(this).attr("data-id"),"name":$(this).attr("data-name")});
                    });
                    if(typeof codeEditor1!='undefined'){
                        window.acm.initLoadSelect();
                        $(".langSelect1").easyDropDown('select',1);
                    }
                    if($(".onLine-langue.checkChooise .A_N_P_Ali").length!=$(".onLine-langue.checkChooise li").length-1){
                        $(".onLine-langue.checkChooise .contralKnow").removeClass('A_N_P_AliL');
                    }else if($(".onLine-langue.checkChooise .A_N_P_Ali").length == $(".onLine-langue.checkChooise li").length-1){
                        $(".onLine-langue.checkChooise .contralKnow").addClass('A_N_P_AliL');
                    }
                })
            }

            /*权限判断*/
            $http.post('/api/userRight',{}).success(function (data) {
                $scope.rightStr = data.result.join(',');
                if($scope.rightStr.indexOf('right_id19')==-1){
                    $.cxDialog({
                        title: '提示',info: '<div style="padding:20px; text-align:center;">您没有添加和编辑WEB编程题的权限</div>',lockScroll: true,closeBtn:false,background: '#000',width: 400,okText:'我知道了',
                        ok:function(){
                            history.go(-1);
                        }
                    });
                }
            }).error(function (data) {
                console.log("服务器错误：" + data);
            });
            $scope.step1search ={ time:1,memory:64 };
            $scope.egList = [];
            $scope.egTotalScore = 0;
            $scope.step1search.language = [{"id":0,"name":"C"}];

            $timeout(function () {
                refreshFunc();
            });

            $scope.warning = function () {
                initAddQuesFun($scope,$http,"");
                console.log("f1");
            }
            $scope.step1search.ques_id = null;
            /*=====================================================*/
            var refreshFunc = function() {

                /*实例化*/
                //编程题题干
                window.ueTitle = UE.getEditor('myEditor1',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars: [
                        [ 'source','undo', 'redo','fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic', 'underline', 'fontborder','|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify','|', 'strikethrough', 'superscript', 'subscript', 'removeformat','|', 'insertorderedlist', 'insertunorderedlist','lineheight', '|',
                            'link', 'unlink','|',
                            'simpleupload','imagefloat', 'emotion', 'insertvideo', 'music', 'attachment','insertframe',
                            'horizontal', '|',
                            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol','|','insertcode',]
                    ],
                    //关闭字数统计
                    wordCount:false,
                    autoFloatEnabled:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    //默认的编辑区域高度
                    initialFrameHeight:120,

                })
                window.ueTitle.addListener( 'ready', function( editor ) {
                    window.ueTitle.setContent('<p style="color: #ccc">请填写题干内容</p>')
                    window.ueTitle.addListener("click",function(){
                        if(window.ueTitle.getContent().indexOf('请填写题干内容')>-1){ window.ueTitle.setContent(''); }
                    })
                })
                initBindPageFun();

                /*选中效果*/
                $('.diffcult .xing-kong').click(function(){
                    var index =$(this).index();
                    $(this).parents(".diffcult").attr("value",index);
                    $('.xing-kong').removeClass('active');
                    $('.xing-kong:lt('+index+')').addClass('active');
                });
            }
            $scope.thisQues = {};

            $scope.updateFenzhi = function(questionId,fenzhi){
                $http.post('/api/proQuestionEdit',{questionId:questionId,fenzhi:fenzhi}).success(function (data) {

                }).error(function (data) {
                    console.log("服务器错误：" + data);
                });
            }

            $scope.saveStep1 = function(obj){
                if($(".btn.saveStep1").hasClass("limited")){ return; }
                $(".btn.saveStep1").addClass("limited");
                //$(window).bind('beforeunload',function(){return '------------------------------------------------\n提示：未保存的内容将会丢失。\n------------------------------------------------';});

                $scope.step1search.quesremark = ueTitle.getContent();
                $scope.step1search.tags = '';

                $scope.step1search.input_des = '';
                $scope.step1search.output_des = '';
                $scope.step1search.input_eg = '';
                $scope.step1search.output_eg = '';
                $scope.step1search.level  =$(".diffcult .xing-kong.active").length;

                if($scope.step1search.time==undefined){ $scope.step1search.time=1; }
                if($scope.step1search.memory==undefined){ $scope.step1search.memory=64; }

                if($scope.step1search.questitle=="" || $scope.step1search.questitle==undefined){alert('请输入题目名字'); $(".btn.saveStep1").removeClass("limited");return;}
                $scope.step1search.ques_title = $scope.step1search.questitle;
                if($scope.step1search.level==0){ alert('请选择难度值');$(".btn.saveStep1").removeClass("limited"); return ; }
                var re = /^[0-9]+$/;
                if($scope.step1search.time==""){alert("请输入时间限制");$(".btn.saveStep1").removeClass("limited");return;}
                else{
                    if(!re.test($scope.step1search.time) || parseInt($scope.step1search.time)<=0 || parseInt($scope.step1search.time)>=2147483647){ alert("时间限制的数据格式不对");$(".btn.saveStep1").removeClass("limited");return ;}
                    if(parseInt($scope.step1search.time)>3){alert('时间限制不能超过3秒'); $(".btn.saveStep1").removeClass("limited");return ; }
                }
                if($scope.step1search.memory==""){alert("请输入内存限制");$(".btn.saveStep1").removeClass("limited");return ;}
                else{
                    if(!re.test($scope.step1search.memory) || parseInt($scope.step1search.memory)<=0 || parseInt($scope.step1search.memory)>=2147483647){ alert("内存限制的数据格式不对");$(".btn.saveStep1").removeClass("limited");return ;}
                    if(parseInt($scope.step1search.memory)>128){alert('内存限制不能超过128M');$(".btn.saveStep1").removeClass("limited"); return ; }
                }

                if($scope.step1search.quesremark=="" || $scope.step1search.quesremark.indexOf("请填写题干内容")>-1){alert("题干描述必填");$(".btn.saveStep1").removeClass("limited");return ;}
                /*if($scope.step1search.input_des==""){alert("输入描述必填");$(".btn.saveStep1").removeClass("limited");return ;}
                if($scope.step1search.output_des==""){alert("输出描述必填");$(".btn.saveStep1").removeClass("limited");return ;}
                if($scope.step1search.input_eg==""){alert("输入样例必填");$(".btn.saveStep1").removeClass("limited");return ;}
                if($scope.step1search.output_eg==""){alert("输出样例必填");$(".btn.saveStep1").removeClass("limited");return ;}*/

                //if($scope.step1search.quesremark.length>15000){ alert("题干内容超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                //if($scope.step1search.input_des.length>600){ alert("输入描述超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                if($scope.step1search.output_des.length>600){ alert("输出描述超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                //if($scope.step1search.input_eg.length>600){ alert("输入样例超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                if($scope.step1search.output_eg.length>4000){ alert("输出样例超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                //if($scope.step1search.hint_des!=undefined && $scope.step1search.hint_des.length>600){ alert("Hint内容超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }

                $.post('/factory/saveEditingQues1',$scope.step1search,function(data){
                    $(".btn.saveStep1").removeClass("limited");
                    if(data.status=='ok'){
                        if(data.ques_id!=undefined){
                            $scope.step1search.ques_id = data.ques_id;
                        }
                        $http.post('/api/proQuestionDetail',{questionId:$scope.step1search.ques_id}).success(function (data) {
                            $scope.thisQues = data.result;
                            //更新标签、知识点
                            var postData = {};
                            postData.questionId = $scope.step1search.ques_id;
                            postData.biaoji1 = $scope.step1search.biaoji1;
                            postData.biaoji2 = $scope.step1search.biaoji2;
                            postData.biaoji3 = $scope.step1search.biaoji3;
                            postData.biaoji4 = $scope.step1search.biaoji4;
                            postData.rateOfPro =1;
                            postData.javatimelimit = ((parseInt($scope.step1search.time) + 2) * 1000).toString();;
                            postData.javamemorylimit = ((parseInt($scope.step1search.memory) + 512)*1024).toString();;
                            if($(".checkChooise.zhishidian ul li.A_N_P_Ali")[0]!=undefined){ postData.zsd11 = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[0]).attr("data-id");postData.zsd11Title = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[0]).attr("data-name"); }
                            if($(".checkChooise.zhishidian ul li.A_N_P_Ali")[1]!=undefined){ postData.zsd21 = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[1]).attr("data-id");postData.zsd21Title = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[1]).attr("data-name"); }
                            if($(".checkChooise.zhishidian ul li.A_N_P_Ali")[2]!=undefined){ postData.zsd31 = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[2]).attr("data-id");postData.zsd31Title = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[2]).attr("data-name"); }
                            postData.allowlangs = '20';
                            postData.timeLimit = (parseInt($scope.step1search.time) * 1000).toString();
                            postData.memoryLimit = (parseInt($scope.step1search.memory) * 1024).toString();

                            $http.post('/api/proQuestionEdit',postData).success(function (data) {
                                if(!$(".step2Box").hasClass('hide') && obj==3){
                                    $scope.saveStep3();
                                }
                            }).error(function (data) {
                                console.log("服务器错误：" + data);
                            });
                        }).error(function (data) {
                            console.log("服务器错误：" + data);
                        });
                        $.cxDialog({
                            title: '提示',
                            info: '<div style="text-align: center;padding: 20px"><img style="max-width: 100px" src="/images/loading.gif"><span style="font-size: 16px;margin-left: 20px;">试题正在保存中~~</span><br></div>',
                            lockScroll: true,
                            background: '#000',
                            width: 400,
                            okText:'我知道了'
                        });

                        $('.step1Box').addClass('hide');
                        $('.step2Box,.submitBox').removeClass('hide');
                        $scope.step2Init();
                        $(".showStep1").removeClass('hide');
                        $(".saveStep1").hide();
                        setTimeout(function() {
                            $.cxDialog.close();
                        },1000)

                    }else{
                        alert(data.msg);
                        //alert('保存数据失败！');
                    }
                });
            }

            $scope.showStep1 = function(){
                $('.step1Box').removeClass('hide');
                $('.showStep1').addClass('hide');
            }
            $scope.initLoadTemps = function(temps){
                var temps = {"l0":"","l1":"","l2":"","l3":"","l4":"","l5":"","l6":"","l7":"","l8":"","l9":"","l10":"","l11":"","l12":"","l13":"","l14":"","l15":"","l16":"","l17":"","l18":"","l19":""};
                if($(".createTemp ul li.A_N_P_Ali").attr("data-id")==1){
                    temps.l20 = JSON.stringify(window.acm.temps);
                }
                return temps;
            }


            $scope.getWebRenderHTML = function() {
                var html = [];
                html.push('<html><head><title>ACMcoder HTML Render</title>');
                html.push('<style>');
                html.push(window.acm.codeCollectionAns.data_code.css);
                html.push('</style>');
                html.push('<script language="javascript" src="');
                html.push('https://cdn.acmcoder.com/assets/public/assets/js/jquery/jquery-1.11.3.min.js');
                html.push('"></script>');
                html.push('</head>');
                html.push('<body>');
                html.push(window.acm.codeCollectionAns.data_code.html);
                html.push('<script language="javascript">');
                html.push(window.acm.codeCollectionAns.data_code.js);
                html.push('</script>');
                html.push('</body>');
                html.push('</html>');
                return html.join('');
            }

            $scope.step2Init = function(){
                if(typeof CodeMirror != 'undefined'){
                    if($('.CodeMirror-scroll').length==0){
                        window.codeEditor2 = CodeMirror.fromTextArea(document.getElementById("code_content2"), {
                            lineNumbers: true,
                            styleActiveLine: true,
                            matchBrackets: true,
                            highlightSelectionMatches: {showToken: /\w/},
                            indentUnit: 4,
                        });
                        $(".answerModel.codeEditBox.ans1").removeClass('hide');
                        window.codeEditor1 = CodeMirror.fromTextArea(document.getElementById("code_content"), {
                                lineNumbers: true,
                                styleActiveLine: true,
                                matchBrackets: true,
                                highlightSelectionMatches: {showToken: /\w/},
                                indentUnit: 4,
                            });

                        $(".answerModel.codeEditBox.ans1").addClass('hide');

                    }else {
                        return false;
                    }
                }else{
                    console.log('怎么没有加载CodeMirror?');
                }
                //答案解析
                window.onlineAnsUE =  UE.getEditor('onlineAns',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars: [
                        ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',  'bold', 'italic', 'underline', 'fontborder','|', 'link', 'unlink','|', 'simpleupload','imagefloat', 'insertcode',]
                    ],
                    //focus时自动清空初始化时的内容
                    autoClearinitialContent:true,
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    //默认的编辑区域高度
//                initialFrameHeight:160,

                });
                window.onlineAnsUE.addListener( 'ready', function( editor ) {
                    $(window.onlineAnsUE.iframe.contentWindow.document.body).css("color","#777");
                    window.onlineAnsUE.setContent('请填写题目考察的知识方向、解题思路等信息，便于后期交流、讨论。不会显示给考生。（选填）');
                    window.onlineAnsUE.addListener("click",function(){
                        if(window.onlineAnsUE.getContent().indexOf('请填写题目考察的知识方向')>-1){ window.onlineAnsUE.setContent(''); }
                    })
                });

                $('.createTemp ul li').unbind('click').bind('click',function(){
                    if(!$(this).hasClass('A_N_P_Ali')){
                        $(this).addClass('A_N_P_Ali').siblings('li').removeClass('A_N_P_Ali');
                        if($(this).attr('data-id')==1){
                            $('.answerModel.codeEditBox.ans1').removeClass('hide');
                            if($("#code_content").parent().find(".CodeMirror").length==0){
                                window.codeEditor1 = CodeMirror.fromTextArea(document.getElementById("code_content"), {
                                    lineNumbers: true,
                                    styleActiveLine: true,
                                    matchBrackets: true,
                                    highlightSelectionMatches: {showToken: /\w/},
                                    indentUnit: 4,
                                });
                            }
                            window.acm.step2codeSave = false;
                        }else{
                            $('.answerModel.codeEditBox.ans1').addClass('hide');
                        }
                    }
                });

                $(".dropdown").easyDropDown({ cutOff: 4 });

                $(".resultListTb .tfoot-bottom .checkAll").click(function(){
                    if($(this).is(":checked")){
                        $(".resultListTb tbody .datahave input").prop("checked",true);
                    }else{
                        $(".resultListTb tbody .datahave input").prop("checked",false);
                    }
                });
                $(document).on("click",".resultListTb tbody .jcenter-list-checkbox",function(){
                    if($(".resultListTb tbody .jcenter-list-checkbox:checked").length==$(".resultListTb tbody .jcenter-list-checkbox").length){
                        $(".resultListTb .tfoot-bottom .checkAll").prop('checked',true);
                    }else{
                        $(".resultListTb .tfoot-bottom .checkAll").prop('checked',false);
                    }
                });

                $(".ans1 .code-item .langSelected li").unbind('click').bind('click',function () {
                        if(!$(this).hasClass("sel")){
                            window.acm.tempsCollectionSave();
                            $(this).addClass("sel").siblings().removeClass("sel");
                            if($(this).attr("data-id")==1){ window.codeEditor1.setValue(window.acm.temps.html); }
                            if($(this).attr("data-id")==2){ window.codeEditor1.setValue(window.acm.temps.css); }
                            if($(this).attr("data-id")==3){ window.codeEditor1.setValue(window.acm.temps.js); }
                        }
                    });
                $(".ans2 .code-item .langSelected li").unbind('click').bind('click',function () {
                        if(!$(this).hasClass("sel")){
                            window.acm.codeCollectionSave();
                            $(".iframeContainer").removeClass('show');
                            $(this).addClass("sel").siblings().removeClass("sel");
                            if($(this).attr("data-id")==1){ window.codeEditor2.setValue(window.acm.codeCollectionAns.data_code.html); }
                            if($(this).attr("data-id")==2){ window.codeEditor2.setValue(window.acm.codeCollectionAns.data_code.css); }
                            if($(this).attr("data-id")==3){ window.codeEditor2.setValue(window.acm.codeCollectionAns.data_code.js); }
                            if($(this).attr("data-id")==4){
                                $('.iframeContainer').html('<iframe id="ifmRender" border="0" frameborder="0" style="width:100%;height:100%"></iframe>');
                                var ifm = $('#ifmRender');
                                var iframeDoc = ifm.get(0).contentDocument||ifm.get(0).contentWindow.document;
                                var iframeWin = ifm.defaultView||ifm.parentWindow;
                                iframeDoc.open("text/html","replace");
                                iframeDoc.write($scope.getWebRenderHTML());
                                iframeDoc.close();
                                $(".iframeContainer").addClass('show');
                            }
                        }
                    });
                $(".createTemp ul li").unbind('click').bind('click',function(){
                        if($(this).attr("data-id")==1){
                            $(".answerModel.codeEditBox.ans1").removeClass('hide');
                        }else{
                            $(".answerModel.codeEditBox.ans1").addClass('hide');
                        }
                        $(this).addClass('A_N_P_Ali').siblings().removeClass('A_N_P_Ali');
                    });
                $(".createTemp ul li[data-id=0]").addClass('A_N_P_Ali');
            }
            window.acm.codeCollectionInit = function(lang,code){
                var mybool = false;
                for(var i=0;i<window.acm.codeCollection.length;i++){
                    if(window.acm.codeCollection[i].language===lang){
                        mybool = true;
                        window.acm.codeCollection[i].data_code = code;
                    }
                }
                if(!mybool){
                    window.acm.codeCollection.push({"language":lang.toString(),"data_code":code});
                }
            }

            $scope.saveStep2 = function(){

                if($("#submit-qus").hasClass("limited")){ return; }
                $("#submit-qus").addClass("limited");
                if($(".step1Box").hasClass('hide')){
                    $scope.saveStep3();
                }else{
                    $scope.saveStep1(3);
                }
            }

            window.acm.limitRelease=0;
            $scope.saveStep3 = function(){
                if($scope.egList.length==0){ alert('您还没有添加测试用例！'); return; }
                confirm('确定要结束编辑并保存吗？',function(){
                    if(window.acm.limitRelease==1){ return ; } else{ window.acm.limitRelease=1;}
                    //保存标程和题目解析
                    window.acm.codeCollectionSave();
                    window.acm.tempsCollectionSave();

                    var postData = {};
                    postData.questionId = $scope.step1search.ques_id;
                    postData.codeAns = window.acm.codeCollectionAns;
                    postData.daanjiexi = window.onlineAnsUE.getContent();
                    postData.temps = $scope.initLoadTemps(postData.temps);
                    postData.tcComments=[];
                    postData.tcScores=[];
                    for(var i=0;i<$scope.egList.length;i++){
                        postData.tcComments.push($scope.egList[i].name);
                        postData.tcScores.push($scope.egList[i].score);
                    }
                    postData.tcComments = postData.tcComments.join('\n');
                    postData.tcScores = postData.tcScores.join('\n');
                    postData.testcases = $scope.egList.length;

                    if($(".createTemp ul li.A_N_P_Ali").index()==1){ postData.temps =[]; }
                    postData.fenzhi = $scope.egTotalScore;
                    if(postData.fenzhi==null ||postData.fenzhi==undefined){ postData.fenzhi=0; }


                    $http.post('/api/proQuestionEdit',postData).success(function (data) {
                        if(data.errmsg==""){
                            //发布设置
                            $.post('/factory/releaseQuestion',{quesId:postData.questionId,releaseType:'company',company:$scope.entInfo.ent_id},function(data){
                                if(data.status=='ok'){
                                    $http.post('/api/proQuestionEdit',{ questionId :postData.questionId,rateOfPro:0}).success(function (data) { }).error(function (data) {  });
                                    if(window.acm.positionId!=undefined && window.acm.paperId!=undefined){
                                        var postData2 ={
                                            paperId:window.acm.paperId,
                                            positionId :window.acm.positionId,
                                            quesIds:$scope.step1search.ques_id,
                                            quesMode:0
                                        };
                                        $http.post('/api/addQuestionIntoPaper ',postData2).success(function (data) {
                                            if(data.errmsg==""){

                                                $.cookie("addInPaper",1);
                                                $.cxDialog({
                                                    title: '提示',
                                                    info: '<div style="padding:20px; text-align:center;">试题添加成功！</div>',
                                                    lockScroll: true,
                                                    background: '#000',
                                                    width: 400,
                                                    okText:'我知道了',
                                                    ok:function(){
                                                        document.location.href='/ques';
                                                    },
                                                    closeBtnFun:function(){
                                                        document.location.href='/ques';
                                                    }
                                                });
                                            }else{ alert(data.errmsg); }
                                        }).error(function (data) {
                                            console.log("管理员累晕了，没有反馈结果，请重试一下～～");
                                        });
                                    }else{

                                        $.cxDialog({
                                            title: '提示',
                                            info: '<div style="padding:20px; text-align:center;">试题添加成功！</div>',
                                            lockScroll: true,
                                            background: '#000',
                                            width: 400,
                                            okText:'我知道了',
                                            ok:function(){
                                                document.location.href='/ques';
                                            },
                                            closeBtnFun:function(){
                                                document.location.href='/ques';
                                            }
                                        });
                                    }
                                }else{

                                    $http.post('/api/proQuestionEdit',{ questionId :postData.questionId,rateOfPro:2}).success(function (data) { }).error(function (data) {  });
                                    $.cxDialog({
                                        title: '提示',
                                        info: '<div style="padding:20px; text-align:center;">数据保存成功！尚有未通过的测试用例，此题暂时无法正常使用，建议完善试题！</div>',
                                        lockScroll: true,
                                        background: '#000',
                                        width: 400,
                                        okText:'继续完善',
                                        ok:function(){

                                        },
                                        noText:'先不改了',
                                        no:function(){
                                            location.href='/ques#/list';
                                        },
                                        closeBtnFun:function(){

                                        }
                                    });
                                }
                                $("#submit-qus").removeClass("limited");
                                window.acm.limitRelease=0;
                            });


                        }else{
                            alert(data.errmsg);$("#submit-qus").removeClass("limited");
                        }
                    }).error(function (data) {
                        console.log("服务器错误：" + data);
                    });
                });

            }
            window.acm.codeCollection = [];
            window.acm.codeCollectionAns = {language:'20',data_code:{html:'',css:'',js:''}};
            window.acm.temps = {html:'',css:'',js:''};


            window.acm.step2codeSave = false;
            window.acm.addEgBool = true;
            $scope.addCsEg = function(){
                //检查第二部
                var postData = {};
                postData.ques_id = $scope.step1search.ques_id;
                postData.language = [];
                $(".onLine-langue ul li.A_N_P_Ali").each(function(){
                    postData.language.push($(this).attr("data-id"));
                });
                postData.language = "20";
                postData.returntype = 'bool';
                postData.autoflag = '是';
                postData.functionname = 'main';
                postData.parameters = '[]';
                postData.codeList = JSON.stringify(window.acm.codeCollection);
                if($(".createTemp li.A_N_P_Ali").attr('data-id')==0){
                    postData.codeList=[];
                    postData.autoflag = '否';
                }
                if(window.acm.step2codeSave){
                    $scope.addCsEgFun();
                }else{
                    $.post('/factory/saveEditingQues2',postData,function(data){
                        if(data.status=='ok'){
                            //添加测试用例
                            $scope.addCsEgFun();
                        }else{
                            alert(data.msg);
                        }
                    });
                }
            }

            $scope.addCsEgFun = function(){
                window.acm.step2codeSave = true;
                if(window.acm.addEgBool){
                    $("#egName").val('');$("#egInput").val('function acmcoder_test_for_webfrontend() {\n                    //测试用例写在此处，函数名请勿修改。\n                }');
                    $("#egOutput").val('');
                    $("#egDifficulty").easyDropDown('select',0);
                    $("#egScore").easyDropDown('select',2);
                    $("#datatype").easyDropDown('select',0);
                    $("#datascale").easyDropDown('select',0);
                }
                $.cxDialog({
                    title: '添加测试用例',
                    info: $('.test-exp-hide'),
                    lockScroll: true,
                    background: '#000',
                    width: 400,
                    okText: '确定',
                    ok: function () {
                        var test_id="";
                        var egName = $("#egName").val();
                        var egDifficulty = $("#egDifficulty").val();
                        var egScore = $("#egScore").val();
                        var egdatascale = $("#datascale").val();
                        var egdatatype = $("#datatype").val();
                        var egInput = $("#egInput").val();
                        var egOutput= $("#egOutput").val();
                        if(egName==""){window.acm.addEgBool = false;alertBackClick("请输入用例名字！",$(".addEgBtn"));return false;}
                        if(egInput==""){window.acm.addEgBool = false;alertBackClick("请输入用例输入！",$(".addEgBtn"));return false;}
                        if(egOutput==""){window.acm.addEgBool = false;alertBackClick("请输入用例输出！",$(".addEgBtn"));return false;}
                        if(egInput.indexOf('acmcoder_test_for_webfrontend')==-1){window.acm.addEgBool = false;alertBackClick("用例输入必须包含acmcoder_test_for_webfrontend()方法！",$(".addEgBtn"));return false;}
                        var postData = {egName:egName,test_id:test_id,egScore:egScore,ques_id:$scope.step1search.ques_id,egDifficulty:egDifficulty,datascale:egdatascale,datatype:egdatatype,egInput:egInput,egOutput:egOutput};

                        if($scope.step1search.ques_id!=null){

                            $.post("/factory/saveEditingTest",postData,function(data){
                                if(data.status=="ok"){
                                    $scope.initCsEgList();
                                }else{
                                    alert(data.msg);
                                }
                            });
                        }else{
                            document.location.href='/ques#/list';
                        }
                    }
                })
            }
            $scope.initCsEgList = function(){
                $.post("/api/proQuestionTestCaseList",{quesid:$scope.thisQues.myojId},function(data){
                    if(data.errmsg==""){
                        $scope.egList = data.result;
                        $scope.egTotalScore = 0;
                        $scope.egList.forEach(function(item){
                            $scope.egTotalScore += parseInt(item.score);
                        });
                        $scope.$apply();
                        $(".resultListTb .tfoot-bottom .checkAll").prop('checked',false);

                        $scope.updateFenzhi($scope.thisQues._id,$scope.egTotalScore);
                    }else{
                        alert(data.errmsg);
                    }
                });
            }

            $scope.editCsEg =  function(test_id){
                $.post("/factory/findTest",{test_id:test_id},function(data){
                    if(data){
                        $("#egName").val(data.egName);
                        $("#egInput").val(data.egInput);
                        $("#egOutput").val(data.egOutput);
                        if(data.egDifficulty!=""){ $("#egDifficulty").easyDropDown('select', parseInt($("#egDifficulty option[value="+data.egDifficulty+"]").attr("lv"))); }
                        if(data.egDataType!=""){$("#datatype").easyDropDown('select', parseInt($("#datatype option[value="+data.egDataType+"]").attr("lv")));}
                        if(data.egDataScale!=""){$("#datascale").easyDropDown('select', parseInt($("#datascale option[value="+data.egDataScale+"]").attr("lv")));}
                        loadSelectData($("#egDifficulty"),data.egDifficulty);
                        loadSelectData($("#egScore"),data.egScore);
                        $.cxDialog({
                            title: '编辑测试用例',
                            info:$('.test-exp-hide'),
                            lockScroll: true,
                            background: '#000',
                            width: 400,
                            okText:'确定',
                            ok:function(){
                                var egName = $("#egName").val();
                                var egDifficulty = $("#egDifficulty").val();
                                var egdatascale = $("#datascale").val();
                                var egdatatype = $("#datatype").val();
                                var egInput = $("#egInput").val();
                                var egOutput= $("#egOutput").val();
                                var egScore = $("#egScore").val();
                                if(egName==""){alert("请输入用例名字！");return false;}
                                if(egInput==""){alert("请输入用例输入！");return false;}
                                if(egOutput==""){alert("请输入用例输出！");return false;}

                                if(egInput.indexOf('acmcoder_test_for_webfrontend')==-1){window.acm.addEgBool = false;alertBackClick("用例输入必须包含acmcoder_test_for_webfrontend()方法！",$(".addEgBtn"));return false;}
                                if($scope.step1search.ques_id!=null){
                                    $.post("/factory/saveEditingTest",{egName:egName,test_id:test_id,egScore:egScore,ques_id:$scope.step1search.ques_id,egDifficulty:egDifficulty,datascale:egdatascale,datatype:egdatatype,egInput:egInput,egOutput:egOutput},function(data){
                                        if(data.status=="ok"){
                                            $.post("/api/proQuestionTestCaseList",{quesid:$scope.thisQues.myojId},function(data){
                                                if(data.errmsg==""){
                                                    $scope.egList = data.result;
                                                    $scope.egTotalScore = 0;
                                                    $scope.egList.forEach(function(item){
                                                        $scope.egTotalScore += parseInt(item.score);
                                                    });
                                                    $scope.$apply();
                                                    $(".resultListTb .tfoot-bottom .checkAll").prop('checked',false);
                                                }else{
                                                    alert(data.errmsg);
                                                }
                                            });
                                        }else{
                                            alert(data.msg);
                                        }
                                    });
                                }else{
                                    document.location.href='/ques';
                                }
                            }
                        });
                    }
                });

            }

            $scope.delCsEg = function(test_id){
                $.post("/factory/deleteEditingTest",{test_id:test_id},function(data){
                    if(data.status=="ok"){
                        $.cxDialog({
                            title: '提示',
                            info: '<div style="padding:20px; text-align:center;">'+data.msg+'</div>',
                            lockScroll: true,
                            background: '#000',
                            width: 400,
                            okText:'我知道了',
                            ok:function(){
                                $(".resultListTb tr[data-id="+test_id+"]").remove();
                                $scope.initCsEgList();
                            }
                        });
                    }else{
                        alert(data.msg);
                    }
                });
            }
            window.zipSelect = function(fileObj){
                var file = fileObj.files['0'];
                if (file) {
                    $(".cxdialog_info .upFile").html(file.name);
                }

            }

            /*上传测试用例*/
            $scope.uploadEg = function(){
                $.cxDialog({
                    title: '上传测试用例',
                    info: '<form action="/factory/impTest" method="post" id="fileUp" enctype ="multipart/form-data">  <input type="hidden" id="proid" name="proid" value="'+$scope.thisQues.myojId+'" /><div style="margin: 20px 0px 10px 0px;text-align:center;"><a href="javascript:void(0)" class="upFile" onclick="file.click()">+ 上传测试用例</a><input accept="application/x-zip-compressed" style="display: none;" type="file" id="file" class="" name="file"/></div></form>',
                    background: '#000',
                    width: 400,
                    ok:function () {
                        if($("#file").val()!=""){
                            var formData = new FormData($("#fileUp")[0]);
                            var url ="/factory/impTest";
                            $.ajax({
                                url: url,
                                type: 'POST',
                                data: formData,
                                async: true,
                                cache: false,
                                contentType: false,
                                processData: false,
                                success: function (returndata) {
                                    if(returndata.status == 'no'){
                                        alert(returndata.msg);
                                    }else{
                                        $scope.initCsEgList();
                                    }
                                },
                                error: function (returndata) {

                                }
                            });
                        }
                        else{
                            alert("请先选择上传文件！");
                            return false;
                        }
                    },
                    okText:"确定"
                });
            }
           
            var resultSource,resultSource_t ;
            window.acm.loadResult = function(){
                if(resultSource.length>0){
                    var solution_id = resultSource[0].id;
                    var test_id = resultSource[0].test_id;
                    //var test_id = $(this).attr("value");
                    $.post("/factory/findResult",{solution_id:solution_id,test_id:test_id},function(data2){
                        if(data2==""){
                            setTimeout("window.acm.loadResult()",1000)
                        }else{
                            var resultSource_t = new Array();
                            var solution_id = data2.solution_id;
                            var test_id = "";
                            var egName = "";
                            for(var i=0;i<resultSource.length;i++){
                                if(resultSource[i].id.toString()==solution_id.toString()){
                                    egName = resultSource[i].name;
                                    test_id = resultSource[i].test_id;
                                }else{
                                    resultSource_t.push(resultSource[i]);
                                }
                            }
                            var errorHtml ='';
                            if(data2.error!=undefined){
                                errorHtml += '<div class="tipMsg"><pre>' + data2.error+ '</pre></div>' ;
                            }
                            var timeLimitedNum = 0;
                            var memoryLimitedNum = 0;
                            if(parseInt($("#langSelect").val())>=3){
                                timeLimitedNum = (parseInt($("#time_limit").val())+2)*1000;
                                memoryLimitedNum = (parseInt($("#memory_limit").val())+512)*1024;
                            }else{
                                timeLimitedNum = parseInt($("#time_limit").val())*1000;
                                memoryLimitedNum = parseInt($("#memory_limit").val())*1024;
                            }
                            var timeHtml = '';
                            if(data2.time > timeLimitedNum){
                                timeHtml = '<span class="red" title="时间超限">'+data2.time+'</span>';
                            }else{
                                timeHtml = data2.time ;
                            }
                            var memoryHtml = '';
                            if(data2.memory > memoryLimitedNum){
                                memoryHtml = '<span class="red" title="内存超限">'+data2.memory+'</span>';
                            }else{
                                memoryHtml = data2.memory ;
                            }

                            $(".resultListTb tr[data-id="+test_id+"] .view_debug").append('<table><tr><td class="bg-agreen"><b class="agreen"><a title="'+data2.statusname +'" class="showDebugLink '+ (data2.statusname=='编译通过，运行正确 ( AC )'?'green':'red') +'">'+data2.statusname.substring(0,4) +'<i class="fa fa-angle-down"></i><a></b></td><td><b>'+timeHtml+'</b> ms</td><td><b>'+memoryHtml+'</b> kb</td></tr></table>');
                            $(".resultListTb tr[data-id="+test_id+"]").after('<tr class="showDebugMSG hide"><td colspan="12">'+errorHtml+'</td></tr>');
                            resultSource = resultSource_t;
                            if(resultSource.length>0){
                                window.acm.loadResult();
                            }else{
                                $.cxDialog.close();
                            }
                            $('.showDebugLink').unbind("click").bind('click',function(){
                                $(this).parents(".datahave").next().toggleClass("hide");
                            });
                        }
                    });
                }else{
                    $(".btn-sty1.inappropriate.runcode").removeClass('limited');
                    $.cxDialog.close();
                }
            }
            var loadSelectData = function(elemt,value){
                elemt.val(value);
                elemt.parents(".dropdown").find("span.selected").html(value);
                elemt.parents(".dropdown").find("ul li").each(function(){
                    if($(this).html()==value){
                        if(!$(this).hasClass("active")){
                            $(this).addClass("active");
                        }
                    }else{
                        $(this).removeClass("active");
                    }
                })
            }

            // 运行结果弹窗
            $scope.runCode = function(){
                if(!$(".btn-sty1.inappropriate.runcode").hasClass('limited')){
                    $(".btn-sty1.inappropriate.runcode").addClass('limited');
                }
                $(".datahave .view_debug").html('');
                $(".resultListTb").removeClass('debug');
                if(codeEditor2.getValue()==""){ alert("您还没有标程，请先添加试题答案（标程）"); return; }
                window.acm.codeCollectionSave();
                var codeSelectOne = codeEditor2.getValue();
                if($(".langSelect2").val()==""){ alert("请选择标程答案语言");return false;}
                if($(".jcenter-list input:checked").length==0){alert("请选择测试用例！");return false;}
                $.post("/factory/saveCode",{ques_id:$scope.step1search.ques_id,codeList:JSON.stringify(window.acm.codeCollectionAns)},function(data){
                    var testlist =[];
                    $(".jcenter-list .datahave input:checked").each(function(){
                        testlist.push($(this).val());
                    });
                    $.post("/factory/runOnlineCodeTwo",{
                        ques_id:$scope.step1search.ques_id,
                        language:20,
                        language_name:20,
                        code_content:$scope.getWebRenderHTML(),
                        testlist:testlist.join(",")
                    },function(data){
                        var resultHtml = '';
                        if(data.status=="ok"){
                            resultSource = $.parseJSON(data.data);
                            setTimeout("window.acm.loadResult()",2000);
                            $(".showDebugMSG").remove();
                            $.cxDialog({
                                title: '提示', info:$('.runing'), lockScroll: true, background: '#000',height:350, width: 650, okText:'确定',
                                baseClass:"noHidden",
                                ok:function(){

                                }
                            });
                            $(".runingResult tbody tr").remove();
                            if($(".result_loading").length==0){
                                $(".runingResult").append('<div class="result_loading" style="width: 100%;text-align: center;padding: 20px;font-size:18px;">您请稍等，程序正在疯狂运行...<br><br><img src="/images/loading.gif"></div>');

                            }
                            if(!$(".resultListTb").hasClass("debug")){$(".resultListTb").addClass("debug");}
                        }else{
                            alert(data.msg);
                        }
                    });
                });
            }

            $scope.updateScore = function(){
                var updateHtml ='<div class="updateScoreBox"><table>';
                updateHtml+='<tr><td>用例名字</td><td>难度</td><td>数据类型</td><td>数据规模</td><td>分数</td></tr>';
                $(".resultListTb tbody tr.datahave").each(function(){
                    updateHtml+='<tr style="height:40px;" id="'+$(this).attr("data-id")+'"><td>'+$($(this).find("td").eq(1)).find("span").html()+'</td><td>'+$($(this).find("td").eq(3)).find("b").html()+'</td><td>'+$($(this).find("td").eq(4)).find("b").html()+'</td><td>'+$($(this).find("td").eq(3)).find("b").html()+'</td>';
                    if($($(this).find("td").eq(1)).find("b").html()==""){
                        updateHtml+='<td><select style="top:0px" onchange="window.acm.initUpdateScoreV()"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></td>';
                    }else{
                        updateHtml+='<td><select style="top:0px" onchange="window.acm.initUpdateScoreV()">';
                        for(var i=1;i<11;i++){
                            if(i==parseInt($($(this).find("td").eq(5)).find("b").html())){
                                updateHtml += '<option selected value="'+i+'">'+i+'</option>';
                            }else{
                                updateHtml += '<option value="'+i+'">'+i+'</option>';
                            }
                        }
                        updateHtml+='</select></td>';
                    }
                    updateHtml+='</tr>';
                });
                updateHtml+='</table><div class="showUpdateResult" style="margin-top: 20px;"></div></div>';
                $.cxDialog({
                    title: '批量调整分数', info:updateHtml, lockScroll: true, background: '#000', width: 650, okText:'确定',
                    baseClass:"noHidden",
                    ok:function(){
                        var updateData = '[';
                        $(".updateScoreBox table tr").each(function(){
                            var id = $(this).attr("id");
                            if(id!=undefined){
                                var score = $(this).find("select").val();
                                if(updateData.length!=1){updateData+=',';}
                                updateData+='{id:"'+id+'",score:'+score+'}';
                            }
                        });
                        updateData += ']';
                        $.post("/factory/saveTestScore",{
                            updateData:updateData
                        },function(data){
                            if(data.status=="ok"){
                                $scope.initCsEgList();
                            }else{
                                alert('更新失败！');return false;
                            }
                        });
                    }
                });
                window.acm.initUpdateScoreV();
                //$(".updateScoreBox select").easyDropDown({ onSelect: function(selected){ initUpdateScoreV(); }});
            }

            window.acm.initUpdateScoreV = function(){
                var scoreTotal = 0;
                $(".updateScoreBox table select").each(function(){
                    var score = $(this).val();
                    scoreTotal+= parseInt(score);
                });
                $(".showUpdateResult").html('现在总分为：<span class="red;font-size:18px;">'+ scoreTotal +'</span>');
            }

            $scope.createTemps = function(){
                $scope.generate = {};
                $scope.generate.language = 'C,C++,Java8,Python2,PHP,CSharp,Objective-C,JavaScript';
                $scope.generate.returntype = $(".backType").val();
                $scope.generate.functionname = $("#funtionName").val();
                var parameters = '[';
                if($(".item-list-box .item-list").length>0){
                    $(".item-list-box .item-list").each(function(){
                        var type = $(this).find("select").val();
                        var name = $(this).find(".fun_name").val();
                        //parameters.push({"type":type,"name":name});
                        if(parameters.length!=1){parameters += ',';}
                        parameters += '{"name":"'+name+'","type":"'+type+'"}';
                    });
                }
                parameters += ']';
                $scope.generate.parameters = parameters;

                $.post('https://capture.acmcoder.com/template/generate.php',$scope.generate,function(data){
                    if(data && data.length>0){
                        window.acm.codeCollection = [];
                        data = $.parseJSON(data);
                        for(var i=0;i<data.length;i++){
                            var curHtml = data[i].head;
                            if(data[i].language.indexOf("Python")>-1){
                                curHtml +='\r\n\r\n#请完成下面这个函数，实现题目要求的功能\r\n#当然，你也可以不按照下面这个模板来作答，完全按照自己的想法来 ^-^ \r\n#******************************开始写代码******************************\r\n\r\n';
                                curHtml += data[i].body;
                                curHtml +='\r\n\r\n#******************************结束写代码******************************\r\n\r\n\r\n';
                            }else{
                                curHtml +='\r\n\r\n/*请完成下面这个函数，实现题目要求的功能\r\n当然，你也可以不按照下面这个模板来作答，完全按照自己的想法来 ^-^ \r\n******************************开始写代码******************************/\r\n';
                                curHtml += data[i].body;
                                curHtml +='/******************************结束写代码******************************/\r\n\r\n\r\n';
                            }
                            curHtml += data[i].tail;
                            window.acm.codeCollectionInit(data[i].lang,curHtml);
                        }
                        window.acm.initLoadCode();

                        $("#"+$(".langSelect1").parents('.scrollable').attr("id")).easyDropDown('select',1);
                        alert('编程代码模板生成成功！');
                    }
                });
                var postData = {};
                postData.questionId = $scope.step1search.ques_id;
                postData.tempOptions = eval(parameters);
                $http.post('/api/proQuestionEdit',postData).success(function (data) {

                }).error(function (data) {
                    console.log("服务器错误：" + data);
                });

            }
            window.initLoadCode1 = function(){
                window.acm.codeCollectionSave();
            }
            window.acm.tempsCollectionSave = function(){
                var id = $(".ans1 .langSelected .sel").attr("data-id");
                if(id==1){ window.acm.temps.html = window.codeEditor1.getValue(); }
                if(id==2){ window.acm.temps.css = window.codeEditor1.getValue(); }
                if(id==3){ window.acm.temps.js = window.codeEditor1.getValue(); }
            }
            window.acm.codeCollectionSave = function(){
                var id = $(".ans2 .langSelected .sel").attr("data-id");
                if(id==1){ window.acm.codeCollectionAns.data_code.html = window.codeEditor2.getValue(); }
                if(id==2){ window.acm.codeCollectionAns.data_code.css = window.codeEditor2.getValue(); }
                if(id==3){ window.acm.codeCollectionAns.data_code.js = window.codeEditor2.getValue(); }
            }
            window.acm.initLoadCode = function () {
                var select_id = $(".langSelect1").val();
                var strValue = "";
                for (var i = 0; i < window.acm.codeCollection.length; i++) {
                    if (window.acm.codeCollection[i].language.toString() === select_id) {
                        strValue = window.acm.codeCollection[i].data_code;
                    }
                }
                if(strValue==undefined || strValue==null){ strValue ="";}
                codeEditor1.setValue(strValue);
            }

            var initBindPageFun = function () {
                $(document).on('click','.chose-radio input:radio',function () {
                    $.each($('.chose-radio input:radio'),function(){
                        $(this).prop('checked',false)
                    })
                    $(this).prop('checked',true)
                })
                $(document).on('click','.parse input:radio',function () {
                    $.each($('.parse input:radio'),function(){
                        $(this).prop('checked',false).parent().siblings('td').find('.addQues-ok').hide()
                    })
                    $(this).prop('checked',true).parent().siblings('td').find('.addQues-ok').show();
                })
                /*输入描述*/
                /*window.codeUE3= UE.getEditor('myEditor3',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars: [
                        ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic',
                        ]
                    ],
                    //focus时自动清空初始化时的内容
                    autoClearinitialContent:true,
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    autoHeightEnabled:false,
                    //默认的编辑区域高度
                    //                initialFrameHeight:100,

                })

                /!*输出描述*!/
                window.codeUE4=UE.getEditor('myEditor4',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars:[
                        ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic',
                        ]
                    ],
                    //focus时自动清空初始化时的内容
                    autoClearinitialContent:true,
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    autoHeightEnabled:false,
                    //默认的编辑区域高度
                    //                initialFrameHeight:100,

                })
                /!*输入样例*!/
                window.codeUE5=UE.getEditor('myEditor5',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars: [
                        ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic',
                        ]
                    ],
                    //focus时自动清空初始化时的内容
                    autoClearinitialContent:true,
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    autoHeightEnabled:false,
                    //默认的编辑区域高度
                    //                initialFrameHeight:100,

                })
                /!*输出样例*!/
                window.codeUE6=UE.getEditor('myEditor6',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars:[
                        ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic',
                        ]
                    ],
                    //focus时自动清空初始化时的内容
                    autoClearinitialContent:true,
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    autoHeightEnabled:false,
                    //默认的编辑区域高度
                    //                initialFrameHeight:100,

                })*/

                $('.timeInput').keyup(function(){
                    $(".addpro-tsCnt.timeOther span").html(parseInt($scope.step1search.time)+2);
                });
                $('.memoryInput').keyup(function(){
                    $(".addpro-tsCnt.memOther span").html(parseInt($scope.step1search.memory)+512);
                });
                function returnFloat(value){
                    var xsd=value.toString().split(".");
                    if(xsd.length==1){
                        return value;
                    }
                    if(xsd.length>1){
                        if(xsd[1].length>=2){
                            value = xsd[0]+'.'+xsd[1].substring(0,1);
                        }
                        return value;
                    }
                }

                if(window.acm.positionId!=undefined && window.acm.paperId!=undefined){
                    $(".addpap_t9").addClass('limitedCode');
                }

                /*题型筛选*/
                $('.addpap_t9 ul li').click(function () {
                    if(!$(this).parents('.addpap_t9').hasClass('limitedCode')){
                        if($(this).attr("id")=="6"){
                            location.href='/ques#/add/onlinecode';
                        }
                        else if($(this).attr("id")=="8"){
                            location.href='/ques#/add/webcode';
                        }else{
                            location.href='/ques#/add/' + $(this).attr("id");
                        }
                    }
                    else{
                        if($(this).attr("id")==6){
                            location.href='/ques#/add/onlinecode/'+ window.acm.positionId + '/' + window.acm.paperId;
                        }else{
                            alert('该子卷不可切换此题型！');
                        }
                    }
                })
                /*切换试题是，清空选中内容*/
                function clearText() {
                    $('.danxuan-s input').prop('checked', false);
                    $('.danxuan-s .addQues-ok').hide();
                }

                window.acm.initBindFunction = function () {
                    $('.addItem').unbind("click").bind("click", function () {
                        var item = $('.item-list-box-copy').clone();
                        item.removeClass("item-list-box-copy").addClass("item-list").removeClass("hide");
                        $('.item-list-box').append(item);
                        $(".item-list-box .item-list:last-child select").easyDropDown({cutOff: 6,onSelect: function(selected){ initLoadCode(); }});
                        window.acm.initBindFunction();
                    })
                    $('.delItem').unbind("click").bind("click", function () {
                        $(this).parent().remove();
                    })
                }
                window.acm.initBindFunction();
            }

        }]
);

quesControllers.controller("EditWebCodeController", ['$scope', '$http','$routeParams','$location', '$timeout',
        function($scope, $http,$routeParams,$location, $timeout)
        {
            window.scrollTo(0,169);
            if(window.ueTitle!=undefined){ window.ueTitle.destroy(); }
            /*if(window.codeUE3!=undefined){ window.codeUE3.destroy(); }
            if(window.codeUE4!=undefined){ window.codeUE4.destroy(); }
            if(window.codeUE5!=undefined){ window.codeUE5.destroy(); }
            if(window.codeUE6!=undefined){ window.codeUE6.destroy(); }*/
            if(window.onlineAnsUE!=undefined){ window.onlineAnsUE.destroy(); }
            if(window.daanjiexiUE!=undefined){ window.daanjiexiUE.destroy(); }

            window.acm.codeCollection = [];
            window.acm.codeCollectionAns = {language:'20',data_code:{}};
            window.acm.temps = {};
            $scope.thisQues = {};

            /*版本判断*/
            $http.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") +  "&r=" + Math.random(),{}).success(function (data) {
                $scope.entInfo = data.data;
                $scope.version = data.data.exam_version;
                $.cookie('version',data.data.exam_version,{ path: '/'})
            }).error(function (data) {
                console.log(data);
            });

            if($.cookie("endExamNotes")){
                $.cookie('endExamNotes', null, { expires: -1, path: '/',domain:'.acmcoder.com' });
            }
            if(localStorage.quesNodes!=undefined){
                var dataV = $.parseJSON(localStorage.quesNodes);
                dataV.forEach(function(item){
                    if(item.id==126){ $scope.LevelData = item.child; }
                });
                $timeout(function () {
                    $scope.qnTimeout();
                });
            }else{
                $http.get('/api/quesNodes').success(function (data) {
                    localStorage.quesNodes = JSON.stringify(data.result);
                    data.result.forEach(function(item){
                        if(item.id==126){ $scope.LevelData = item.child; }
                    });
                    $timeout(function () {
                        $scope.qnTimeout();
                    });
                }).error(function (data) {
                    alert("管理员累晕了，没有反馈结果，请重试一下～～");
                });
            }

            $scope.qnTimeout = function(){
                //$($(".online-know ul li")[0]).addClass('A_N_P_Ali');

                $('.checkChooise.zhishidian ul li').bind('click',function () {
                    if($(this).hasClass('A_N_P_Ali')){
                        $(this).removeClass("A_N_P_Ali");
                    }else{
                        if($('.checkChooise.zhishidian ul li.A_N_P_Ali').length>=3){
                            alert('此项最多只能选择3个！');return;
                        }else{
                            if($(this).text()!='全选'){
                                $(this).addClass("A_N_P_Ali");
                            }

                        }
                    }
                })
                $('.checkChooise.onLine-langue ul li').bind('click',function () {
                    if($(this).hasClass('must') && $(this).hasClass('A_N_P_Ali')){ return; }
                    if($(this).hasClass('A_N_P_Ali')){
                        $(this).removeClass("A_N_P_Ali");
                    }else{
                        if($(this).text()!='全选'){
                            $(this).addClass("A_N_P_Ali");
                        }
                    }
                    $scope.step1search.language=[];
                    $(".onLine-langue ul li.A_N_P_Ali").each(function(){
                        $scope.step1search.language.push({"id":$(this).attr("data-id"),"name":$(this).attr("data-name")});
                    });
                    if(typeof codeEditor1!='undefined'){
                        window.acm.initLoadSelect();
                        $(".langSelect1").easyDropDown('select',1);
                    }

                    if($(".onLine-langue.checkChooise .A_N_P_Ali").length!=$(".onLine-langue.checkChooise li").length-1){
                        $(".onLine-langue.checkChooise .contralKnow").removeClass('A_N_P_AliL');
                    }else if($(".onLine-langue.checkChooise .A_N_P_Ali").length == $(".onLine-langue.checkChooise li").length-1){
                        $(".onLine-langue.checkChooise .contralKnow").addClass('A_N_P_AliL');
                    }
                })
            }

            $(".addpap_t9.questype").addClass('limited');
            /*权限判断*/
            $http.post('/api/userRight',{}).success(function (data) {
                $scope.rightStr = data.result.join(',');
                if($scope.rightStr.indexOf('right_id19')==-1){
                    $.cxDialog({
                        title: '提示',info: '<div style="padding:20px; text-align:center;">您没有添加和编辑WEB编程题的权限</div>',lockScroll: true,closeBtn:false,background: '#000',width: 400,okText:'我知道了',
                        ok:function(){
                            history.go(-1);
                        }
                    });
                }
            }).error(function (data) {
                console.log("服务器错误：" + data);
            });
            $scope.step1search ={ time:1,memory:64 };
            $scope.step1search.ques_id = $routeParams.questionId;
            $http.post('/api/proQuestionDetail',{questionId:$routeParams.questionId}).success(function (data) {
                $.extend($scope.step1search,data.result);
                $scope.thisQues = data.result;
                if($scope.step1search.codeAns!=undefined){
                    window.acm.codeCollectionAns = $scope.step1search.codeAns;
                }
                if($scope.step1search.temps!=undefined && $scope.step1search.temps.l20!=undefined){
                    window.acm.temps = $.parseJSON($scope.step1search.temps.l20);
                }else{
                    $scope.step1search.temps = {};
                    $scope.step1search.temps.html = $scope.step1search.temps.css = $scope.step1search.temps.js =  '';
                    window.acm.temps = $scope.step1search.temps;
                }
                $scope.step1Init();
                console.log('got question detail');
                $timeout(function(){
                    refreshFunc();
                });
            }).error(function (data) {
                console.log("服务器错误：" + data);
            });
            $scope.egList = [];
            $scope.egTotalScore = 0;
            $scope.step1search.language = [{"id":0,"name":"C"}];

            $timeout(function () {
                $(".topbt.topbt-2 h3").html('编辑试题');
                $(".NextStepBtn").addClass('hide');
                $(".step2Box,.submitBox").removeClass('hide');
                window.renderCodemirror = window.setInterval(function(){
                    if(typeof CodeMirror == "function"){
                        $scope.step2Init();
                        window.clearInterval(window.renderCodemirror);
                    }
                },500)
            });

            $scope.warning = function () {
                initAddQuesFun($scope,$http,"");
                console.log("f1");
            }

            /*=====================================================*/
            var refreshFunc = function() {
                /*实例化*/
                //编程题题干
                window.ueTitle = UE.getEditor('myEditor1',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars: [
                        [ 'source','undo', 'redo','fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic', 'underline', 'fontborder','|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify','|', 'strikethrough', 'superscript', 'subscript', 'removeformat','|', 'insertorderedlist', 'insertunorderedlist','lineheight', '|',
                            'link', 'unlink','|',
                            'simpleupload','imagefloat', 'emotion', 'insertvideo', 'music', 'attachment','insertframe',
                            'horizontal', '|',
                            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol','|','insertcode',]
                    ],
                    //关闭字数统计
                    wordCount:false,
                    autoFloatEnabled:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    //默认的编辑区域高度
                    initialFrameHeight:120,

                })
                window.ueTitle.addListener( 'ready', function( editor ) {
                    window.ueTitle.setContent('<p style="color: #ccc">请填写题干内容</p>')
                    window.ueTitle.addListener("click",function(){
                        if(window.ueTitle.getContent().indexOf('请填写题干内容')>-1){ window.ueTitle.setContent(''); }
                    })
                    if($scope.step1search.quesDesc!=undefined){ window.ueTitle.setContent($scope.step1search.quesDesc); }
                })
                initBindPageFun();

                /*选中效果*/
                $('.diffcult .xing-kong').click(function(){
                    var index =$(this).index();
                    $(this).parents(".diffcult").attr("value",index);
                    $('.xing-kong').removeClass('active');
                    $('.xing-kong:lt('+index+')').addClass('active');
                });
            }
            $scope.thisQues = {};

            $scope.step1Init = function(){
                $scope.step1search.hint_des = $scope.step1search.hint ;
                $scope.step1search.time  = parseInt($scope.step1search.timeLimit)/1000 ;
                $scope.step1search.memory  = parseInt($scope.step1search.memoryLimit)/1024 ;
                if($scope.step1search.temps!=undefined && $scope.step1search.temps.l20!=undefined){
                    $.extend($scope.step1search.temps,$.parseJSON($scope.step1search.temps.l20));
                }

                $timeout(function(){
                    $(".addpro-tsCnt.timeOther span").html(parseInt($scope.step1search.time)+2);
                    $(".addpro-tsCnt.memOther span").html(parseInt($scope.step1search.memory)+512);
                    $(".ans1 .code-item .langSelected li").unbind('click').bind('click',function () {
                        if(!$(this).hasClass("sel")){
                            window.acm.tempsCollectionSave();
                            $(this).addClass("sel").siblings().removeClass("sel");
                            if($(this).attr("data-id")==1){ window.codeEditor1.setValue(window.acm.temps.html); }
                            if($(this).attr("data-id")==2){ window.codeEditor1.setValue(window.acm.temps.css); }
                            if($(this).attr("data-id")==3){ window.codeEditor1.setValue(window.acm.temps.js); }
                        }
                    });
                    $(".ans2 .code-item .langSelected li").unbind('click').bind('click',function () {
                        if(!$(this).hasClass("sel")){
                            window.acm.codeCollectionSave();
                            $(".iframeContainer").removeClass('show');
                            $(this).addClass("sel").siblings().removeClass("sel");
                            if($(this).attr("data-id")==1){ window.codeEditor2.setValue($scope.step1search.codeAns.data_code.html); }
                            if($(this).attr("data-id")==2){ window.codeEditor2.setValue($scope.step1search.codeAns.data_code.css); }
                            if($(this).attr("data-id")==3){ window.codeEditor2.setValue($scope.step1search.codeAns.data_code.js); }
                            if($(this).attr("data-id")==4){
                                $('.iframeContainer').html('<iframe id="ifmRender" border="0" frameborder="0" style="width:100%;height:100%"></iframe>');
                                var ifm = $('#ifmRender');
                                var iframeDoc = ifm.get(0).contentDocument||ifm.get(0).contentWindow.document;
                                var iframeWin = ifm.defaultView||ifm.parentWindow;
                                iframeDoc.open("text/html","replace");
                                iframeDoc.write($scope.getWebRenderHTML());
                                iframeDoc.close();
                                $(".iframeContainer").addClass('show');
                            }
                        }
                    });
                    if($scope.step1search.temps!=undefined && $scope.step1search.temps.l20!=undefined){
                        $(".createTemp ul li[data-id=1]").addClass('A_N_P_Ali');
                        $(".answerModel.codeEditBox.ans1").removeClass('hide');
                    }else{
                        $(".createTemp ul li[data-id=0]").addClass('A_N_P_Ali');
                        $(".answerModel.codeEditBox.ans1").addClass('hide');
                    }
                    $(".createTemp ul li").unbind('click').bind('click',function(){
                        if($(this).attr("data-id")==1){
                            $(".answerModel.codeEditBox.ans1").removeClass('hide');
                        }else{
                            $(".answerModel.codeEditBox.ans1").addClass('hide');
                        }
                        $(this).addClass('A_N_P_Ali').siblings().removeClass('A_N_P_Ali');
                    });
                });
            }
            $scope.getWebRenderHTML = function() {
                var html = [];
                html.push('<html><head><title>ACMcoder HTML Render</title>');
                html.push('<style>');
                html.push(window.acm.codeCollectionAns.data_code.css);
                html.push('</style>');
                html.push('<script language="javascript" src="');
                html.push('https://cdn.acmcoder.com/assets/public/assets/js/jquery/jquery-1.11.3.min.js');
                html.push('"></script>');
                html.push('</head>');
                html.push('<body>');
                html.push(window.acm.codeCollectionAns.data_code.html);
                html.push('<script language="javascript">');
                html.push(window.acm.codeCollectionAns.data_code.js);
                html.push('</script>');
                html.push('</body>');
                html.push('</html>');
                return html.join('');
            }

            $scope.showStep1 = function(){
                $('.step1Box').removeClass('hide');
                $('.showStep1').addClass("hide");
            }
            $scope.saveStep1 = function(obj){
                if($(".btn.saveStep1").hasClass("limited")){ return; }
                $(".btn.saveStep1").addClass("limited");
                //$(window).bind('beforeunload',function(){return '------------------------------------------------\n提示：未保存的内容将会丢失。\n------------------------------------------------';});
                var postData = {};
                postData.ques_id = $routeParams.questionId;
                postData.quesremark = ueTitle.getContent();
                postData.tags = '';

                postData.input_des = '';
                postData.output_des = '';
                postData.input_eg = '';
                postData.output_eg = '';
                postData.level  =$(".diffcult .xing-kong.active").length;
                if($scope.step1search.time==undefined){ $scope.step1search.time=1; }
                if($scope.step1search.memory==undefined){ $scope.step1search.memory=64; }
                postData.time = $scope.step1search.time;
                postData.memory = $scope.step1search.memory;
                postData.ques_title = $scope.step1search.questitle;
                postData.hint_des = $scope.step1search.hint_des;

                if(postData.ques_title=="" || postData.ques_title==undefined){alert('请输入题目名字');$(".btn.saveStep1").removeClass("limited"); return;}
                if(postData.level==0){ alert('请选择难度值'); $(".btn.saveStep1").removeClass("limited");return ; }
                var re = /^[0-9]+$/;
                if(postData.time==""){alert("请输入时间限制");$(".btn.saveStep1").removeClass("limited");return ;}
                else{
                    if(!re.test(postData.time) || parseInt(postData.time)<=0 || parseInt(postData.time)>=2147483647){ alert("时间限制的数据格式不对");$(".btn.saveStep1").removeClass("limited");return ;}
                    if(parseInt(postData.time)>3){alert('时间限制不能超过3s'); $(".btn.saveStep1").removeClass("limited");return ; }
                }
                if(postData.memory==""){alert("请输入内存限制");$(".btn.saveStep1").removeClass("limited");return ;}
                else{
                    if(!re.test(postData.memory) || parseInt(postData.memory)<=0 || parseInt(postData.memory)>=2147483647){ alert("内存限制的数据格式不对");$(".btn.saveStep1").removeClass("limited");return ;}
                    if(parseInt(postData.memory)>128){alert('内存限制不能超过128M'); $(".btn.saveStep1").removeClass("limited");return ; }
                }


                if(postData.quesremark==""|| postData.quesremark.indexOf("请填写题干内容")>-1){alert("题目描述必填");$(".btn.saveStep1").removeClass("limited");return ;}
                /*if(postData.input_des==""){alert("输入描述必填");$(".btn.saveStep1").removeClass("limited");return ;}
                if(postData.output_des==""){alert("输出描述必填");$(".btn.saveStep1").removeClass("limited");return ;}
                if(postData.input_eg==""){alert("输入样例必填");$(".btn.saveStep1").removeClass("limited");return ;}
                if(postData.output_eg==""){alert("输出样例必填");$(".btn.saveStep1").removeClass("limited");return ;}*/

                //if(postData.quesremark.length>15000){ alert("题干内容超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                //if(postData.input_des.length>600){ alert("输入描述超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                if(postData.output_des.length>600){ alert("输出描述超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                //if(postData.input_eg.length>600){ alert("输入样例超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                if(postData.output_eg.length>4000){ alert("输出样例超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }
                //if(postData.hint_des !=undefined && postData.hint_des.length>600){ alert("Hint内容超过字数限制！");$(".btn.saveStep1").removeClass("limited");return ; }

                $.post('/factory/saveEditingQues1',postData,function(data){
                    $(".btn.saveStep1").removeClass("limited");
                    if(data.status=='ok'){
                        $http.post('/api/proQuestionDetail',{questionId:$routeParams.questionId}).success(function (data) {
                            $scope.thisQues = data.result;
                            //更新标签、知识点
                            var postData = {};
                            postData.questionId = $scope.step1search.ques_id;
                            postData.biaoji1 = $scope.step1search.biaoji1;
                            postData.biaoji2 = $scope.step1search.biaoji2;
                            postData.biaoji3 = $scope.step1search.biaoji3;
                            postData.biaoji4 = $scope.step1search.biaoji4;
                            postData.javatimelimit = ((parseInt($scope.step1search.time) + 2) * 1000).toString();
                            postData.javamemorylimit = ((parseInt($scope.step1search.memory) + 512)*1024).toString();
                            if($(".checkChooise.zhishidian ul li.A_N_P_Ali")[0]!=undefined){ postData.zsd11 = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[0]).attr("data-id");postData.zsd11Title = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[0]).attr("data-name"); }
                            if($(".checkChooise.zhishidian ul li.A_N_P_Ali")[1]!=undefined){ postData.zsd21 = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[1]).attr("data-id");postData.zsd21Title = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[1]).attr("data-name"); }
                            if($(".checkChooise.zhishidian ul li.A_N_P_Ali")[2]!=undefined){ postData.zsd31 = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[2]).attr("data-id");postData.zsd31Title = $($(".checkChooise.zhishidian ul li.A_N_P_Ali")[2]).attr("data-name"); }

                            postData.allowlangs = "20";
                            postData.timeLimit = (parseInt($scope.step1search.time) * 1000).toString();
                            postData.memoryLimit = (parseInt($scope.step1search.memory) * 1024).toString();
                            $http.post('/api/proQuestionEdit',postData).success(function (data) {
                                $scope.saveStep3();
                            }).error(function (data) {
                                console.log("服务器错误：" + data);
                            });
                        }).error(function (data) {
                            console.log("服务器错误：" + data);
                        });

                    }else{
                        alert(data.msg);
                        //alert('保存数据失败！');
                    }
                });



            }

            $scope.step2Init = function(){
                if(typeof CodeMirror != 'undefined'){
                    if($('.CodeMirror-scroll').length==0){
                        window.codeEditor2 = CodeMirror.fromTextArea(document.getElementById("code_content2"), {
                            lineNumbers: true,
                            styleActiveLine: true,
                            matchBrackets: true,
                            highlightSelectionMatches: {showToken: /\w/},
                            indentUnit: 4,
                        });
                        //codeEditor2.setOption("theme", "eclipse");
                        if($scope.step1search.temps!=undefined){
                            $(".answerModel.codeEditBox.ans1").removeClass('hide');
                            window.codeEditor1 = CodeMirror.fromTextArea(document.getElementById("code_content"), {
                                lineNumbers: true,
                                styleActiveLine: true,
                                matchBrackets: true,
                                highlightSelectionMatches: {showToken: /\w/},
                                indentUnit: 4,
                            });
                            window.acm.step2codeSave = false;
                            if( $scope.step1search.temps.l20!=undefined){
                                window.codeEditor1.setValue($scope.step1search.temps.html);
                            }else{
                                $(".answerModel.codeEditBox.ans1").addClass('hide');
                            }
                        }
                        if($scope.step1search.codeAns!=undefined && $scope.step1search.codeAns.language!=""){
                            window.codeEditor2.setValue($scope.step1search.codeAns.data_code.html);
                        }else{
                            $scope.step1search.codeAns = {};
                        }
                    }else {
                        return false;
                    }
                }else{
                    console.log('怎么没有加载CodeMirror?');
                }
                //答案解析
                window.onlineAnsUE =  UE.getEditor('onlineAns',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars: [
                        ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',  'bold', 'italic', 'underline', 'fontborder','|', 'link', 'unlink','|', 'simpleupload','imagefloat', 'insertcode',]
                    ],
                    //focus时自动清空初始化时的内容
                    autoClearinitialContent:true,
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    //默认的编辑区域高度
//                initialFrameHeight:160,

                });
                window.onlineAnsUE.addListener( 'ready', function( editor ) {
                    $(window.onlineAnsUE.iframe.contentWindow.document.body).css("color","#777");
                    window.onlineAnsUE.setContent('请填写题目考察的知识方向、解题思路等信息，便于后期交流、讨论。不会显示给考生。（选填）');
                    window.onlineAnsUE.addListener("click",function(){
                        if(window.onlineAnsUE.getContent().indexOf('请填写题目考察的知识方向')>-1){ window.onlineAnsUE.setContent(''); }
                    })
                    if($scope.step1search.daanjiexi!=undefined && $scope.step1search.daanjiexi!=null){  window.onlineAnsUE.setContent($scope.step1search.daanjiexi); }
                });



                $(".dropdown").easyDropDown({ cutOff: 4 });


                $(document).on("click",".resultListTb tbody .jcenter-list-checkbox",function(){
                    if($(".resultListTb tbody .jcenter-list-checkbox:checked").length==$(".resultListTb tbody .jcenter-list-checkbox").length){
                        $(".resultListTb .tfoot-bottom .checkAll").prop('checked',true);
                    }else{
                        $(".resultListTb .tfoot-bottom .checkAll").prop('checked',false);
                    }
                });

                $(".resultListTb .tfoot-bottom .checkAll").click(function(){
                    if($(this).is(":checked")){
                        $(".resultListTb tbody .datahave input").prop("checked",true);
                    }else{
                        $(".resultListTb tbody .datahave input").prop("checked",false);
                    }
                });
                $(document).on("click",".resultListTb tbody .jcenter-list-checkbox",function(){
                    if($(".resultListTb tbody .jcenter-list-checkbox:checked").length==$(".resultListTb tbody .jcenter-list-checkbox").length){
                        $(".resultListTb .tfoot-bottom .checkAll").prop('checked',true);
                    }else{
                        $(".resultListTb .tfoot-bottom .checkAll").prop('checked',false);
                    }
                });


                if($scope.step1search.returntype!=undefined){
                    $(".backType").easyDropDown('select',$(".backType option[value="+$scope.step1search.returntype+"]").index());
                }
                $.post("/api/proQuestionTestCaseList",{quesid:$scope.step1search.myojId},function(data){
                    if(data.errmsg==""){
                        $scope.egList = data.result;
                        $scope.egTotalScore = 0;
                        $scope.egList.forEach(function(item){
                            $scope.egTotalScore += parseInt(item.score);
                        });
                        $scope.$apply();
                        $(".resultListTb .tfoot-bottom .checkAll").prop('checked',false);
                    }else{
                        alert(data.errmsg);
                    }
                });
            }

            $scope.saveStep2 = function(){

                if($("#submit-qus").hasClass("limited")){ return; }
                $("#submit-qus").addClass("limited");
                $scope.saveStep1(3);
            }

            $scope.initLoadTemps = function(temps){
                var temps = {"l0":"","l1":"","l2":"","l3":"","l4":"","l5":"","l6":"","l7":"","l8":"","l9":"","l10":"","l11":"","l12":"","l13":"","l14":"","l15":"","l16":"","l17":"","l18":"","l19":""};
                if($(".createTemp ul li.A_N_P_Ali").attr("data-id")==1){
                    temps.l20 = JSON.stringify(window.acm.temps);
                }
                return temps;
            }
            window.acm.limitRelease=0;
            $scope.saveStep3 = function(){
                if($scope.egList.length==0){ alert('您还没有添加测试用例！'); return; }
                confirm('确定要结束编辑并保存吗？',function(){
                    if(window.acm.limitRelease==1){ return ; } else{ window.acm.limitRelease=1;}
                    //保存标程和题目解析
                    window.acm.codeCollectionSave();
                    window.acm.tempsCollectionSave();
                    var postData = {};
                    postData.questionId = $scope.step1search.ques_id;
                    postData.codeAns = window.acm.codeCollectionAns;
                    postData.daanjiexi = window.onlineAnsUE.getContent();
                    postData.temps = $scope.initLoadTemps(postData.temps);
                    //if(){}
                    postData.tcComments=[];
                    postData.tcScores=[];
                    postData.fenzhi = $scope.egTotalScore;
                    for(var i=0;i<$scope.egList.length;i++){
                        postData.tcComments.push($scope.egList[i].name);
                        postData.tcScores.push($scope.egList[i].score);
                    }
                    postData.tcComments = postData.tcComments.join('\n');
                    postData.tcScores = postData.tcScores.join('\n');
                    postData.testcases = $scope.egList.length;
                    postData.rateOfPro =0;
                    if(postData.fenzhi==null ||postData.fenzhi==undefined){ postData.fenzhi=0; }
                    $http.post('/api/proQuestionEdit',postData).success(function (data) {
                        if(data.errmsg==""){

                            $.post('/factory/releaseQuestion',{quesId:postData.questionId,releaseType:'company',company:$scope.entInfo.ent_id},function(data){
                                if(data.status=='ok'){

                                    $http.post('/api/proQuestionEdit',{ questionId :postData.questionId,rateOfPro:0}).success(function (data) { }).error(function (data) {  });
                                    $.cxDialog({
                                        title: '提示',
                                        info: '<div style="padding:20px; text-align:center;">试题添加成功！</div>',
                                        lockScroll: true,
                                        background: '#000',
                                        width: 400,
                                        okText:'我知道了',
                                        ok:function(){
                                            document.location.href='/ques';
                                        },
                                        closeBtnFun:function(){
                                            document.location.href='/ques';
                                        }
                                    });
                                }
                                else{

                                    $http.post('/api/proQuestionEdit',{ questionId :postData.questionId,rateOfPro:2}).success(function (data) { }).error(function (data) {  });
                                    $.cxDialog({
                                        title: '提示',
                                        info: '<div style="padding:20px; text-align:center;">数据保存成功！尚有未通过的测试用例，此题暂时无法正常使用，建议完善试题！</div>',
                                        lockScroll: true,
                                        background: '#000',
                                        width: 400,
                                        okText:'继续完善',
                                        ok:function(){

                                        },
                                        noText:'先不改了',
                                        no:function(){
                                            location.href='/ques#/list';
                                        },
                                        closeBtnFun:function(){

                                        }
                                    });
                                }
                                window.acm.limitRelease=0;
                                $("#submit-qus").removeClass("limited");
                            });


                        }else{
                            alert(data.errmsg);$("#submit-qus").removeClass("limited");
                        }
                    }).error(function (data) {
                        console.log("服务器错误：" + data);
                    });
                });

            }

            window.acm.step2codeSave = false;
            window.acm.addEgBool = true;
            $scope.addCsEg = function(){
                //检查第二部
                var postData = {};
                postData.ques_id = $scope.step1search.ques_id;
                postData.language = "20";
                postData.returntype = 'bool';
                postData.autoflag = '是';
                postData.functionname = 'main';
                postData.parameters = '[]';
                postData.codeList = JSON.stringify(window.acm.codeCollection);
                if($(".createTemp li.A_N_P_Ali").attr('data-id')==0){
                    postData.codeList=[];
                    postData.autoflag = '否';
                }
                if(window.acm.step2codeSave){
                    $scope.addCsEgFun();
                }else{
                    $.post('/factory/saveEditingQues2',postData,function(data){
                        if(data.status=='ok'){
                            //添加测试用例
                            $scope.addCsEgFun();
                        }else{
                            alert(data.msg);
                        }
                    });
                }
            }

            $scope.addCsEgFun = function(){
                window.acm.step2codeSave = true;
                if(window.acm.addEgBool){
                    $("#egName").val('');
                    $("#egInput").val('function acmcoder_test_for_webfrontend() {\n                    //测试用例写在此处，函数名请勿修改。\n                }');
                    $("#egOutput").val('');
                    $("#egDifficulty").easyDropDown('select',0);
                    $("#egScore").easyDropDown('select',2);
                    $("#datatype").easyDropDown('select',0);
                    $("#datascale").easyDropDown('select',0);
                }
                $.cxDialog({
                    title: '添加测试用例',
                    info: $('.test-exp-hide'),
                    lockScroll: true,
                    background: '#000',
                    width: 400,
                    okText: '确定',
                    ok: function () {
                        var test_id="";
                        var egName = $("#egName").val();
                        var egDifficulty = $("#egDifficulty").val();
                        var egScore = $("#egScore").val();
                        var egdatascale = $("#datascale").val();
                        var egdatatype = $("#datatype").val();
                        var egInput = $("#egInput").val();
                        var egOutput= $("#egOutput").val();
                        if(egName==""){window.acm.addEgBool = false;alertBackClick("请输入用例名字！",$(".addEgBtn"));return false;}
                        if(egInput==""){window.acm.addEgBool = false;alertBackClick("请输入用例输入！",$(".addEgBtn"));return false;}
                        if(egOutput==""){window.acm.addEgBool = false;alertBackClick("请输入用例输出！",$(".addEgBtn"));return false;}
                        if(egInput.indexOf('acmcoder_test_for_webfrontend')==-1){window.acm.addEgBool = false;alertBackClick("用例输入必须包含acmcoder_test_for_webfrontend()方法！",$(".addEgBtn"));return false;}
                        var postData = {egName:egName,test_id:test_id,egScore:egScore,ques_id:$scope.step1search.ques_id,egDifficulty:egDifficulty,datascale:egdatascale,datatype:egdatatype,egInput:egInput,egOutput:egOutput};

                        if($scope.step1search.ques_id!=null){

                            $.post("/factory/saveEditingTest",postData,function(data){
                                window.acm.addEgBool = true;
                                if(data.status=="ok"){
                                    $scope.initCsEgList();
                                }else{
                                    alert(data.msg);
                                }
                            });
                        }else{
                            document.location.href='/ques#/list';
                        }
                    }
                })
            }
            $scope.updateFenzhi = function(questionId,fenzhi){
                $http.post('/api/proQuestionEdit',{questionId:questionId,fenzhi:fenzhi}).success(function (data) {

                }).error(function (data) {
                    console.log("服务器错误：" + data);
                });
            }
            $scope.initCsEgList = function(){
                $.post("/api/proQuestionTestCaseList",{quesid:$scope.thisQues.myojId},function(data){
                    if(data.errmsg==""){
                        $scope.egList = data.result;
                        $scope.egTotalScore = 0;
                        $scope.egList.forEach(function(item){
                            $scope.egTotalScore += parseInt(item.score);
                        });
                        $scope.$apply();
                        $(".resultListTb .tfoot-bottom .checkAll").prop('checked',false);

                        $scope.updateFenzhi($scope.thisQues._id,$scope.egTotalScore);
                    }else{
                        alert(data.errmsg);
                    }
                });
            }

            $scope.editCsEg =  function(test_id){
                $.post("/factory/findTest",{test_id:test_id},function(data){
                    if(data){
                        $("#egName").val(data.egName);
                        $("#egInput").val(data.egInput);
                        $("#egOutput").val(data.egOutput);
                        if(data.egDifficulty!=""){ $("#egDifficulty").easyDropDown('select', parseInt($("#egDifficulty option[value="+data.egDifficulty+"]").attr("lv"))); }
                        if(data.egDataType!=""){$("#datatype").easyDropDown('select', parseInt($("#datatype option[value="+data.egDataType+"]").attr("lv")));}
                        if(data.egDataScale!=""){$("#datascale").easyDropDown('select', parseInt($("#datascale option[value="+data.egDataScale+"]").attr("lv")));}
                        loadSelectData($("#egDifficulty"),data.egDifficulty);
                        loadSelectData($("#egScore"),data.egScore);
                        $.cxDialog({
                            title: '编辑测试用例',
                            info:$('.test-exp-hide'),
                            lockScroll: true,
                            background: '#000',
                            width: 400,
                            okText:'确定',
                            ok:function(){
                                var egName = $("#egName").val();
                                var egDifficulty = $("#egDifficulty").val();
                                var egdatascale = $("#datascale").val();
                                var egdatatype = $("#datatype").val();
                                var egInput = $("#egInput").val();
                                var egOutput= $("#egOutput").val();
                                var egScore = $("#egScore").val();
                                if(egName==""){alert("请输入用例名字！");return false;}
                                if(egInput==""){alert("请输入用例输入！");return false;}
                                if(egOutput==""){alert("请输入用例输出！");return false;}

                                if(egInput.indexOf('acmcoder_test_for_webfrontend')==-1){window.acm.addEgBool = false;alertBackClick("用例输入必须包含acmcoder_test_for_webfrontend()方法！",$(".addEgBtn"));return false;}
                                if($scope.step1search.ques_id!=null){
                                    $.post("/factory/saveEditingTest",{egName:egName,test_id:test_id,egScore:egScore,ques_id:$scope.step1search.ques_id,egDifficulty:egDifficulty,datascale:egdatascale,datatype:egdatatype,egInput:egInput,egOutput:egOutput},function(data){
                                        if(data.status=="ok"){
                                            $scope.initCsEgList();
                                        }else{
                                            alert(data.msg);
                                        }
                                    });
                                }else{
                                    document.location.href='/ques';
                                }
                            }
                        });
                    }
                });

            }

            $scope.delCsEg = function(test_id){
                $.post("/factory/deleteEditingTest",{test_id:test_id},function(data){
                    if(data.status=="ok"){
                        $.cxDialog({
                            title: '提示',
                            info: '<div style="padding:20px; text-align:center;">'+data.msg+'</div>',
                            lockScroll: true,
                            background: '#000',
                            width: 400,
                            okText:'我知道了',
                            ok:function(){
                                $(".resultListTb tr[data-id="+test_id+"]").remove();
                                $scope.initCsEgList();
                            }
                        });
                    }else{
                        alert(data.msg);
                    }
                });
            }
            window.zipSelect = function(fileObj){
                var file = fileObj.files['0'];
                if (file) {
                    $(".cxdialog_info .upFile").html(file.name);
                }

            }

            /*上传测试用例*/
            $scope.uploadEg = function(){
                $.cxDialog({
                    title: '上传测试用例',
                    info: '<form action="/factory/impTest" method="post" id="fileUp" enctype ="multipart/form-data">  <input type="hidden" id="proid" name="proid" value="'+$scope.thisQues.myojId+'" /><div style="margin: 20px 0px 10px 0px;text-align:center;"><a href="javascript:void(0)" class="upFile" onclick="file.click()">+ 上传测试用例</a><input  accept="application/x-zip-compressed" style="display: none;" type="file" id="file" class="" name="file"/></div></form>',
                    background: '#000',
                    width: 400,
                    ok:function () {
                        if($("#file").val()!=""){
                            var formData = new FormData($("#fileUp")[0]);
                            var url ="/factory/impTest";
                            $.ajax({
                                url: url,
                                type: 'POST',
                                data: formData,
                                async: true,
                                cache: false,
                                contentType: false,
                                processData: false,
                                success: function (returndata) {
                                    if(returndata.status == 'no'){
                                        alert(returndata.msg);
                                    }else{
                                        $scope.initCsEgList();
                                    }
                                },
                                error: function (returndata) {

                                }
                            });
                        }
                        else{
                            alert("请先选择上传文件！");
                            return false;
                        }
                    },
                    okText:"确定"
                });
            }
            //保存标程
            var resultSource,resultSource_t ;
            window.acm.loadResult = function(){
                if(resultSource.length>0){
                    var solution_id = resultSource[0].id;
                    var test_id = resultSource[0].test_id;
                    //var test_id = $(this).attr("value");
                    $.post("/factory/findResult",{solution_id:solution_id,test_id:test_id},function(data2){
                        if(data2==""){
                            setTimeout("window.acm.loadResult()",1000)
                        }else{
                            var resultSource_t = new Array();
                            var solution_id = data2.solution_id;
                            var test_id = "";
                            var egName = "";
                            for(var i=0;i<resultSource.length;i++){
                                if(resultSource[i].id.toString()==solution_id.toString()){
                                    egName = resultSource[i].name;
                                    test_id = resultSource[i].test_id;
                                }else{
                                    resultSource_t.push(resultSource[i]);
                                }
                            }
                            var errorHtml ='';
                            if(data2.error!=undefined){
                                errorHtml += '<div class="tipMsg"><pre>' + data2.error+ '</pre></div>' ;
                            }
                            var timeLimitedNum = 0;
                            var memoryLimitedNum = 0;
                            if(parseInt($("#langSelect").val())>=3){
                                timeLimitedNum = (parseInt($("#time_limit").val())+2)*1000;
                                memoryLimitedNum = (parseInt($("#memory_limit").val())+512)*1024;
                            }else{
                                timeLimitedNum = parseInt($("#time_limit").val())*1000;
                                memoryLimitedNum = parseInt($("#memory_limit").val())*1024;
                            }
                            var timeHtml = '';
                            if(data2.time > timeLimitedNum){
                                timeHtml = '<span class="red" title="时间超限">'+data2.time+'</span>';
                            }else{
                                timeHtml = data2.time ;
                            }
                            var memoryHtml = '';
                            if(data2.memory > memoryLimitedNum){
                                memoryHtml = '<span class="red" title="内存超限">'+data2.memory+'</span>';
                            }else{
                                memoryHtml = data2.memory ;
                            }

                            $(".resultListTb tr[data-id="+test_id+"] .view_debug").append('<table><tr><td class="bg-agreen"><b class="agreen"><a title="'+data2.statusname +'" class="showDebugLink  '+ (data2.statusname=='编译通过，运行正确 ( AC )'?'green':'red') +'">'+data2.statusname.substring(0,4) +'<i class="fa fa-angle-down"></i><a></b></td><td><b>'+timeHtml+'</b> ms</td><td><b>'+memoryHtml+'</b> kb</td></tr></table>');
                            $(".resultListTb tr[data-id="+test_id+"]").after('<tr class="showDebugMSG hide"><td colspan="12">'+errorHtml+'</td></tr>');
                            resultSource = resultSource_t;
                            if(resultSource.length>0){
                                window.acm.loadResult();
                            }else{
                                $.cxDialog.close();
                            }

                            $('.showDebugLink').unbind("click").bind('click',function(){
                                $(this).parents(".datahave").next().toggleClass("hide");
                            });
                        }
                    });
                }else{
                    $.cxDialog.close();
                    $(".btn-sty1.inappropriate.runcode").removeClass('limited');
                }
            }
            var loadSelectData = function(elemt,value){
                elemt.val(value);
                elemt.parents(".dropdown").find("span.selected").html(value);
                elemt.parents(".dropdown").find("ul li").each(function(){
                    if($(this).html()==value){
                        if(!$(this).hasClass("active")){
                            $(this).addClass("active");
                        }
                    }else{
                        $(this).removeClass("active");
                    }
                })
            }

            // 运行结果弹窗
            $scope.runCode = function(){
                if(!$(".btn-sty1.inappropriate.runcode").hasClass('limited')){
                    $(".btn-sty1.inappropriate.runcode").addClass('limited');
                }
                $(".datahave .view_debug").html('');
                $(".resultListTb").removeClass('debug');
                if(codeEditor2.getValue()==""){ alert("您还没有标程，请先添加试题答案（标程）"); return; }
                window.acm.codeCollectionSave();
                var codeSelectOne = codeEditor2.getValue();
                if($(".langSelect2").val()==""){ alert("请选择标程答案语言");return false;}
                if($(".jcenter-list input:checked").length==0){alert("请选择测试用例！");return false;}
                $.post("/factory/saveCode",{ques_id:$scope.step1search.ques_id,codeList:JSON.stringify(window.acm.codeCollectionAns)},function(data){
                    var testlist =[];
                    $(".jcenter-list .datahave input:checked").each(function(){
                        testlist.push($(this).val());
                    });
                    $.post("/factory/runOnlineCodeTwo",{
                        ques_id:$scope.step1search.ques_id,
                        language:20,
                        language_name:20,
                        code_content:$scope.getWebRenderHTML(),
                        testlist:testlist.join(",")
                    },function(data){
                        var resultHtml = '';
                        if(data.status=="ok"){
                            resultSource = $.parseJSON(data.data);
                            setTimeout("window.acm.loadResult()",2000);
                            $(".showDebugMSG").remove();
                            $.cxDialog({
                                title: '提示', info:$('.runing'), lockScroll: true, background: '#000', width: 650,height:350,okText:'确定',
                                baseClass:"noHidden",
                                ok:function(){

                                }
                            });
                            $(".runingResult tbody tr").remove();
                            if($(".result_loading").length==0){
                                $(".runingResult").append('<div class="result_loading" style="width: 100%;text-align: center;padding: 20px;font-size:18px;">您请稍等，程序正在疯狂运行...<br><br><img src="/images/loading.gif"></div>');

                            }
                            if(!$(".resultListTb").hasClass("debug")){$(".resultListTb").addClass("debug");}
                        }else{
                            alert(data.msg);
                        }
                    });
                });
            }

            $scope.updateScore = function(){
                var updateHtml ='<div class="updateScoreBox"><table>';
                updateHtml+='<tr><td>用例名字</td><td>难度</td><td>数据类型</td><td>数据规模</td><td>分数</td></tr>';
                $(".resultListTb tbody tr.datahave").each(function(){
                    updateHtml+='<tr style="height: 40px;" id="'+$(this).attr("data-id")+'"><td>'+$($(this).find("td").eq(1)).find("span").html()+'</td><td>'+$($(this).find("td").eq(2)).find("b").html()+'</td><td>'+$($(this).find("td").eq(3)).find("b").html()+'</td><td>'+$($(this).find("td").eq(4)).find("b").html()+'</td>';
                    if($($(this).find("td").eq(1)).find("b").html()==""){
                        updateHtml+='<td><select style="top:0px;" onchange="window.acm.initUpdateScoreV()"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></td>';
                    }else{
                        updateHtml+='<td><select style="top:0px;" onchange="window.acm.initUpdateScoreV()">';
                        for(var i=1;i<11;i++){
                            if(i==parseInt($($(this).find("td").eq(5)).find("b").html())){
                                updateHtml += '<option selected value="'+i+'">'+i+'</option>';
                            }else{
                                updateHtml += '<option value="'+i+'">'+i+'</option>';
                            }
                        }
                        updateHtml+='</select></td>';
                    }
                    updateHtml+='</tr>';
                });
                updateHtml+='</table><div class="showUpdateResult" style="margin-top: 20px;"></div></div>';
                $.cxDialog({
                    title: '批量调整分数', info:updateHtml, lockScroll: true, background: '#000', width: 650, okText:'确定',
                    baseClass:"noHidden",
                    ok:function(){
                        var updateData = '[';
                        $(".updateScoreBox table tr").each(function(){
                            var id = $(this).attr("id");
                            if(id!=undefined){
                                var score = $(this).find("select").val();
                                if(updateData.length!=1){updateData+=',';}
                                updateData+='{id:"'+id+'",score:'+score+'}';
                            }
                        });
                        updateData += ']';
                        $.post("/factory/saveTestScore",{
                            updateData:updateData
                        },function(data){
                            if(data.status=="ok"){
                                $scope.initCsEgList();
                            }else{
                                alert('更新失败！');return false;
                            }
                        });
                    }
                });
                window.acm.initUpdateScoreV();
                //$(".updateScoreBox select").easyDropDown({ onSelect: function(selected){ initUpdateScoreV(); }});
            }

            window.acm.initUpdateScoreV = function(){
                var scoreTotal = 0;
                $(".updateScoreBox table select").each(function(){
                    var score = $(this).val();
                    scoreTotal+= parseInt(score);
                });
                $(".showUpdateResult").html('现在总分为：<span class="red" style="font-weight: bolder;font-size: 18px;color: #ff8a00">'+ scoreTotal +'</span> 分');
            }

            window.initLoadCode1 = function(){
                window.acm.codeCollectionSave();
                window.acm.initLoadCode();
            }

            window.acm.tempsCollectionSave = function(){
                var id = $(".ans1 .langSelected .sel").attr("data-id");
                if(id==1){ window.acm.temps.html = window.codeEditor1.getValue(); }
                if(id==2){ window.acm.temps.css = window.codeEditor1.getValue(); }
                if(id==3){ window.acm.temps.js = window.codeEditor1.getValue(); }
            }
            window.acm.codeCollectionSave = function(){
                var id = $(".ans2 .langSelected .sel").attr("data-id");
                if(id==1){ window.acm.codeCollectionAns.data_code.html = window.codeEditor2.getValue(); }
                if(id==2){ window.acm.codeCollectionAns.data_code.css = window.codeEditor2.getValue(); }
                if(id==3){ window.acm.codeCollectionAns.data_code.js = window.codeEditor2.getValue(); }
            }

            var initBindPageFun = function () {
                $(document).on('click','.chose-radio input:radio',function () {
                    $.each($('.chose-radio input:radio'),function(){
                        $(this).prop('checked',false)
                    })
                    $(this).prop('checked',true)
                })
                $(document).on('click','.parse input:radio',function () {
                    $.each($('.parse input:radio'),function(){
                        $(this).prop('checked',false).parent().siblings('td').find('.addQues-ok').hide()
                    })
                    $(this).prop('checked',true).parent().siblings('td').find('.addQues-ok').show();
                })
                /*输入描述*/
                /*window.codeUE3= UE.getEditor('myEditor3',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars: [
                        ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic',
                        ]
                    ],
                    //focus时自动清空初始化时的内容
                    autoClearinitialContent:true,
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    autoHeightEnabled:false,
                    //默认的编辑区域高度
                    //                initialFrameHeight:100,

                })
                window.codeUE3.addListener( 'ready', function( editor ) {
                    if($scope.step1search.input!=undefined){ window.codeUE3.setContent($scope.step1search.input); }
                })
                /!*输出描述*!/
                window.codeUE4=UE.getEditor('myEditor4',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars:[
                        ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic',
                        ]
                    ],
                    //focus时自动清空初始化时的内容
                    autoClearinitialContent:true,
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    autoHeightEnabled:false,
                    //默认的编辑区域高度
                    //                initialFrameHeight:100,

                })
                window.codeUE4.addListener( 'ready', function( editor ) {
                    if($scope.step1search.output!=undefined){ window.codeUE4.setContent($scope.step1search.output); }
                })
                /!*输入样例*!/
                window.codeUE5=UE.getEditor('myEditor5',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars: [
                        ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic',
                        ]
                    ],
                    //focus时自动清空初始化时的内容
                    autoClearinitialContent:true,
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    autoHeightEnabled:false,
                    //默认的编辑区域高度
                    //                initialFrameHeight:100,

                })
                window.codeUE5.addListener( 'ready', function( editor ) {
                    if($scope.step1search.inputSample!=undefined){ window.codeUE5.setContent($scope.step1search.inputSample); }
                })
                /!*输出样例*!/
                window.codeUE6=UE.getEditor('myEditor6',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars:[
                        ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic',
                        ]
                    ],
                    //focus时自动清空初始化时的内容
                    autoClearinitialContent:true,
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    autoHeightEnabled:false,
                    //默认的编辑区域高度
                    //                initialFrameHeight:100,

                })
                window.codeUE6.addListener( 'ready', function( editor ) {
                    if($scope.step1search.outputSample!=undefined){ window.codeUE6.setContent($scope.step1search.outputSample); }
                })*/

                $('.timeInput').keyup(function(){
                    $(".addpro-tsCnt.timeOther span").html(parseInt($scope.step1search.time)+2);
                });
                $('.memoryInput').keyup(function(){
                    $(".addpro-tsCnt.memOther span").html(parseInt($scope.step1search.memory)+512);
                });
                function returnFloat(value){
                    var xsd=value.toString().split(".");
                    if(xsd.length==1){
                        return value;
                    }
                    if(xsd.length>1){
                        if(xsd[1].length>=2){
                            value = xsd[0]+'.'+xsd[1].substring(0,1);
                        }
                        return value;
                    }
                }

                /*题型筛选*/
                $('.addpap_t9 ul li').click(function () {
                    if(!$(this).parents('.addpap_t9').hasClass('limited')){
                        if($(this).attr("id")=="6"){
                            location.href='/ques#/add/onlinecode';
                        }
                        else if($(this).attr("id")=="8"){
                            location.href='/ques#/add/webcode';
                        }else{
                            location.href='/ques#/add/' + $(this).attr("id");
                        }
                    }
                })
                /*切换试题是，清空选中内容*/
                function clearText() {
                    $('.danxuan-s input').prop('checked', false);
                    $('.danxuan-s .addQues-ok').hide();
                }

                window.acm.initBindFunction = function () {
                    $('.addItem').unbind("click").bind("click", function () {
                        var item = $('.item-list-box-copy').clone();
                        item.removeClass("item-list-box-copy").addClass("item-list").removeClass("hide");
                        $('.item-list-box').append(item);
                        $(".item-list-box .item-list:last-child select").easyDropDown({cutOff: 6,onSelect: function(selected){ initLoadCode(); }});
                        window.acm.initBindFunction();
                    })
                    $('.delItem').unbind("click").bind("click", function () {
                        $(this).parent().remove();
                    })
                }
                window.acm.initBindFunction();

            }

        }]
);

quesControllers.controller("EditController", ['$scope', '$http','$routeParams','$location', '$timeout',
        function($scope, $http,$routeParams,$location, $timeout)
        {
            window.scrollTo(0,169);
            if (Object.isNullString($routeParams.questionId)) {
                $location.path('/list');
                return ;
            }
            $scope.searchItem ={};
            $http.post('/api/questionQuoteCount',{questionId:$routeParams.questionId}).success(function (data) {
                $scope.questionQuoteCount = data.result;
            }).error(function (data) {
                console.log("服务器错误：" + data);
            });

            /*权限判断*/
            $http.post('/api/userRight',{}).success(function (data) {
                $scope.rightStr = data.result.join(',');
                if($scope.rightStr.indexOf('right_id12')>-1){
                    $(".addpap_t9 li[id=6]").removeClass('hide');
                }
            }).error(function (data) {
                console.log("服务器错误：" + data);
            });
            if($.cookie('version')){
                $scope.version = parseInt($.cookie('version'));
            }else{
                $http.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") +  "&r=" + Math.random(),{}).success(function (data) {
                    $scope.userInfo = data.data;
                    $scope.version = data.data.exam_version;
                    $.cookie('version',data.data.exam_version,{ path: '/'});
                    $.cookie('role_type', data.data.role_type);if($.cookie('role_type')==1 && $.cookie('version')!=1){ $('.yonghuGuanli').removeClass('hide'); }
                }).error(function (data) {
                    console.log(data);
                });
            }


            ///api/questionQuoteCount
            $(".topbt.topbt-2 h3").html('编辑试题');
            if(window.ue2!=undefined){
                window.ue2.destroy();
            }
            if(window.daanjiexiUE!=undefined){
                window.daanjiexiUE.destroy();
            }
            if(window.ue5!=undefined){
                window.ue5.destroy();
            }

            $(".questype").addClass("limited");

            window.levelChange = function(){
                var level1Value = $(".zsd11_level1").val();
                if(level1Value==""){
                    $(".zsd11_level2").parents('.dropdown').remove();

                }else{
                    $(".zsd11_level2").parents('.dropdown').remove();
                    if($(".zsd11_level1").parents('.dropdown').length==1){
                        $(".zsd11_level1").parents('.dropdown').after('<select class="zsd11_level2" name="zsd11_level2"><option value="">请选择</option></select>');
                    }else{
                        $(".zsd11_level1").after('<select class="zsd11_level2" name="zsd11_level2"><option value="">请选择</option></select>');
                    }

                    $scope.Level1Data.forEach(function (item) {
                        if(item.id==level1Value){
                            $scope.Level2Data = item.child;
                            $scope.Level2Data.forEach(function(item){
                                $(".zsd11_level2").append('<option  value="'+item.id+'" >'+item.name+'</option>');
                            });
                            $(".zsd11_level2 option[value='"+$scope.searchItem.zsd11+"']").attr("selected","true");
                            $(".zsd11_level2").easyDropDown({ cutOff: 6 });
                        }
                    });
                }
            }
            window.acm.tkNumChangeNum =1;

            window.tkNumChange = function () {
                $('.content-model').html('');
                var num = $(".tkNumdropdown").val();
                for(var i=0;i<parseInt(num);i++){
                    $('.copymodel span').text(i+1);
                    var text = $('.copymodel').html();
                    $('.content-model').append(text);
                }
                if(parseInt(num)>1){ $(".sp_Tcb-ti span.youxu").removeClass('hide') }else{ if(!$(".sp_Tcb-ti span.youxu").hasClass('hide')){$(".sp_Tcb-ti span.youxu").addClass('hide');}}
            }
            window.acm.initBindFun = function () {
                /*实例化*/
                window.ue2 =  UE.getEditor('myEditor',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars: [
                        [ 'source','undo', 'redo','fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic', 'underline', 'fontborder','|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify','|', 'strikethrough', 'superscript', 'subscript', 'removeformat','|', 'insertorderedlist', 'insertunorderedlist','lineheight', '|',
                            'link', 'unlink','|',
                            'simpleupload','imagefloat', 'emotion', 'insertvideo', 'music', 'attachment','insertframe',
                            'horizontal', '|',
                            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol','|','insertcode',]
                    ],
                    //focus时自动清空初始化时的内容
                    autoClearinitialContent:false,
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    //默认的编辑区域高度
//                initialFrameHeight:160,

                })
                window.ue2.addListener( 'ready', function( editor ) {
                    $(window.ue2.iframe.contentWindow.document.body).css("background","#666").css("color","#fff");
                    if($scope.searchItem.questitle!=undefined && $scope.searchItem.questitle!=''){
                        window.ue2.setContent($scope.searchItem.questitle);
                    }
                    initBindPageFun();
                })

                window.daanjiexiUE =  UE.getEditor('daanjiexi',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars: [
                        ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',  'bold', 'italic', 'underline', 'fontborder','|', 'link', 'unlink','|', 'simpleupload','imagefloat', 'insertcode',]
                    ],
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    //默认的编辑区域高度
//                initialFrameHeight:160,

                })
                window.daanjiexiUE.addListener( 'ready', function( editor ) {
                    $(window.daanjiexiUE.iframe.contentWindow.document.body).css("color","#777");
                    if($scope.searchItem.daanjiexi!=undefined && $scope.searchItem.daanjiexi!=''){
                        window.daanjiexiUE.setContent($scope.searchItem.daanjiexi);
                    }
                })


                $('.answer .editTip').unbind("click").bind("click",function(){
                    //如果存在编辑器，返回
                    if($(this).parent().find(".edui-editor.edui-default").length){
                        return;
                    }
                    var $target = $(this).parent();
                    if(window.ue && window.ue.container!=undefined){
                        //如果不存在
                        $(".editorBox.init").removeClass("init");
                        $('.answer .content').css('border','1px solid #dadada');
                        //获取原来的dom
                        var currentParnet = ue.container.parentNode.parentNode;
                        //获取原来的内容
                        var currentContent = ue.getContent();
                        //获取目标的dom
                        //获取目标的内容
                        window.targetContent = $target.children("div.addQues-optextarea-div").html();

                        //消除编辑器
                        window.ue.destroy();
                        //填充原来内容
                        var textarea = currentContent.replace(/\<\/?p\>/gim, '');
                        $(currentParnet).html('<div class="content"><div class="addQues-optextarea-div" contenteditable="true">'+textarea+'</div><div class="editTip"><a href="javascript:void(0)">使用编辑器</a></div></div>');
                        $target.html(window.targetContent);
                        //初始化
                        $target.attr("id","editor1");
                        $target.html('');
                        initRadioEditor();
                        setTimeout(function(){
                            if(window.targetContent!=undefined){
                                window.ue.setContent(window.targetContent);
                            }
                        },500)
                    }
                    else{
                        //初始化
                        window.targetContent = $target.children("div.addQues-optextarea-div").html();
                        $target.html('');
                        $target.attr("id","editor1");
                        initRadioEditor();
                    }
                    window.acm.initBindFun();
                });

                $('.answer .addQues-optextarea-div').unbind("click").bind("click",function () {
                    if(window.ue){
                        var currentContent = window.ue.getContent();
                        var targetEml =  ue.container.parentNode.parentNode;
                        window.ue.destroy();
                        $(targetEml).html('<div class="content"><div class="addQues-optextarea-div" contenteditable="true">'+currentContent+'</div><div class="editTip"><a href="javascript:void(0)">使用编辑器</a></div></div>');
                        if($scope.version==3){
                            $(this).parent().find(".editTip a").click();
                        }
                    }
                    window.acm.initBindFun();
                });
            }
            /*单选选中正确答案*/
            window.acm.checkOnly = function(){
                $('.answer .an:gt(2)').show();
                $('.answer .an input').show();
                $('.addQues-close').show();
                $('.add-answer').show()
                $('.an input:checkbox').attr('type','radio').prop('checked',false);
                $(document).off('.addQues-close').on('click','.an input:radio',function () {
                    $.each($('.an input:radio'),function(){
                        $(this).prop('checked',false).parent().siblings('td').find('.addQues-ok').hide()
                    })
                    $(this).prop('checked',true).parent().siblings('td').find('.addQues-ok').show();
                })
            }
            /*多选题*/
            window.acm.checkMore = function(){
                $(' .answer .an:gt(2)').show();
                $('.answer .an input').show();
                $('.addQues-close').show();
                $('.add-answer').show()
                $('.an input:radio').attr('type','checkbox').prop('checked',false);
                $(document).off(".addQues-close").on('click','.an input:checkbox',function () {
                    if($(this).is('input:checked')){
                        $(this).parent().siblings('td').find('.addQues-ok').show()
                    }else {
                        $(this).parent().siblings('td').find('.addQues-ok').hide();
                    }
                })
            }
            /*填空题*/
            window.acm.emptyBlank = function() {
                $('.danxuan-s').hide();//单选场次隐藏
                $('.tiankong').show();
                $('.answer .an input').hide();
                $('.addQues-close').hide();
                $('.add-answer').hide()
                $('.tiankong .answer .an:gt(2)').hide();//只显示一项答案
                $(document).on('click','.des-bank .selectUI li a',function(){
                    $('.content-model').html('');
                    for(var i=0;i<parseInt($(this).text());i++){
                        $('.copymodel span').text(i+1);
                        var text = $('.copymodel').html();
                        $('.content-model').append(text);
                    }
                })

            }
            /*判断题*/
            window.acm.judgeQuetion =function() {
                /* $('.answer .an:gt(3)').hide();
                 $('.answer .an input').show();
                 $('.addQues-close').hide();
                 $('.add-answer').hide()*/
            }
            /*问答题*/
            window.acm.askQuestion = function() {
                $('.danxuan-s').hide();
                $('.que-ask').show();
                /*问答题编译器实例化*/
                /*=====================================================*/
                window.ue5 = UE.getEditor('Editor2',{
                    //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                    toolbars: [
                        ['source','fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic', 'underline', 'fontborder','|',
                            'link', 'unlink','|',
                            'simpleupload','imagefloat',
                            'insertcode',]
                    ],
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                    autoFloatEnabled:false
                })
            }

            window.acm.questionId = $routeParams.questionId;
            var refreshFunc = function() {
                $http.post('/api/questionDetail ',{questionId:window.acm.questionId}).success(function (data) {
                    $.extend($scope.searchItem , data.result);
                    if($scope.searchItem.questype==4){
                        if($scope.searchItem.answer!="" && $scope.searchItem.answer!=null){
                            $scope.searchItem.answerArr = [];
                            $scope.searchItem.answer1 = $scope.searchItem.answer.split('@@');
                            for(var i=0;i<$scope.searchItem.answer1.length;i++){
                                $scope.searchItem.answerArr.push({"value":$scope.searchItem.answer1[i]});
                            }
                            $scope.searchItem.answerCount = $scope.searchItem.answerArr.length;

                        }
                    }
                    if($scope.searchItem.questype==3){ $scope.searchItem.optionsExt = $scope.searchItem.options; }
                    if($scope.searchItem.questype==6){ alert('还没有开放编程题！',function(){ history.go(-1); }); }
                    $timeout(function () {
                        window.acm.initBindFun();
                        if($scope.searchItem.questype == 1){
                            window.acm.checkOnly();
                        }
                        if($scope.searchItem.questype == 2 || $scope.searchItem.questype == 7){
                            window.acm.checkMore();
                        }
                        else if($scope.searchItem.questype == 5){
                            window.acm.askQuestion();
                        }else{
                        }
                        $(".tkNumdropdown").val($scope.searchItem.answerCount);
                        $(".tkNumdropdown").easyDropDown({ cutOff: 6 });
                    });
                    if(localStorage.quesNodes!=undefined){
                        $scope.Level1Data = $.parseJSON(localStorage.quesNodes);
                        var item_value = 0;
                        $scope.Level1Data.forEach(function(item){
                            for(var i=0;i<item.child.length;i++){
                                if(item.child[i].id==$scope.searchItem.zsd11){
                                    item_value = item.id;
                                    break;
                                }
                            }
                        });
                        $timeout(function(){
                            $(".zsd11_level1 option[value='"+item_value+"']").attr("selected","true");
                            levelChange();
                            $(".dropdown").easyDropDown({ cutOff: 6 });
                        });
                    }else{
                        $http.get('/api/quesNodes').success(function (data) {
                            $scope.Level1Data = data.result;
                            localStorage.quesNodes = JSON.stringify(data.result);
                            var item_value = 0;
                            $scope.Level1Data.forEach(function(item){
                                for(var i=0;i<item.child.length;i++){
                                    if(item.child[i].id==$scope.searchItem.zsd11){
                                        item_value = item.id;
                                        break;
                                    }
                                }
                            });
                            $timeout(function(){
                                $(".zsd11_level1 option[value='"+item_value+"']").attr("selected","true");
                                levelChange();
                                $(".dropdown").easyDropDown({ cutOff: 6 });
                            });
                        }).error(function (data) {
                            alert("管理员累晕了，没有反馈结果，请重试一下～～");
                        });
                    }

                }).error(function (data) {
                    alert("管理员累晕了，没有反馈结果，请重试一下～～");
                });
            }

            $scope.warning = function(){
                if(window.intervalid!=undefined){
                    clearInterval(window.intervalid);
                    $('.btn_no').attr('id','new-t')
                    $('.btn_no').text('确认更新 3s');
                }
                if($scope.questionQuoteCount<=1){
                    $scope.saveQues();
                }else{
                    $.cxDialog({
                        title: '提示',
                        info: '<div class="cxDialogContent" style="position: relative;left: 10px;"><table><tr><td><i class="fa fa-exclamation-triangle" style="font-size: 60px;"></i></td><td  style="line-height: 24px;"><span class="fb">您确认要更新此试题内容吗？<br>更新后<span style="color: red">所有</span>用到此试题的<span style="color: red">试卷</span>,<br><span style="color: red">都会同步更新此题！</span></span></td></tr></table></div>',
                        lockScroll: true,
                        width: 450,
                        background: '#000',
                        noText: '确认更新 3s',
                        ok: function () {
                        },
                        okText: '我再想想',
                        no: function () {
                            if ($('.btn_no').text() == '确认更新') {
                                $scope.saveQues();
                                return false;
                            } else {
                                $('#cxdialog').css({
                                    'display': 'block',
                                    'width': '450px',
                                    'marginLeft': '-225px',
                                    'marginTop': '-114.5px'
                                })
                                return false;
                            }
                        }
                    })
                    var i = 3;//倒计时5秒
                    $('.btn_no').text('确认更新 '+i+'s');
                    $('.btn_no').attr('id','new-t');
                    window.intervalid = setInterval(function(){
                        if (i == 1) {
                            $('.btn_no').removeAttr('id');
                            i=0;
                            $('.btn_no').text('确认更新');
                            clearInterval(intervalid);
                        } else{
                            $('.btn_no').attr('id','new-t')
                            i--;
                            $('.btn_no').text('确认更新 '+i+'s');
                        }
                    }, 1000);
                }
            }
            $scope.saveQues = function () {
                initAddQuesFun($scope,$http,window.acm.questionId);
            }

            var initRadioEditor = function () {
                window.ue = UE.getEditor("editor1", {
//                serverUrl: '/assessment/ueditor',
                    toolbars: [
                        ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                            'bold', 'italic', 'underline', 'fontborder','superscript', 'subscript','removeformat','|',
                            'simpleupload','imagefloat',
                            'insertcode',]
                    ],
                    //focus时自动清空初始化时的内容
                    //关闭字数统计
                    wordCount:false,
                    autoHeightEnabled:true,
                    elementPathEnabled:false,
                    autoFloatEnabled:false,
                    //默认的编辑区域高度
                    'enterTag' : 'br'
                });
                window.ue.addListener( 'ready', function( editor ) {
                    //ue.setContent(window.targetContent);
                    window.ue.options.autoHeightEnabled = true;
                    $(ue.iframe.contentWindow.document.body).css("background","#e7e7e7");

                    if(window.targetContent!=undefined){
                        window.ue.setContent(window.targetContent);
                    }
                    window.ue.focus();
                })
            }

            var initBindPageFun = function () {


                var sp_Tc2 = $('.sp_Tc2 ul');
                sp_Tc2.on('click','li',function(){
                    if(!$(this).hasClass('A_N_P_Ali')){
                        $(this).siblings().removeClass('A_N_P_Ali');
                        $(this).addClass('A_N_P_Ali');
                    }
                    if($(this).parents('.popupWindow').length==1){
                        if($(this).attr("dataid")==0){ $(".assistBox li[data=s5]").removeClass('A_N_P_Ali');}
                    }
                });
                /*添加试题*/
                $('.add-answer').click(function (){
                    var copyAnswer = $('.copy').html();
                    var ele = $(copyAnswer);
                    ele.find(".forEditor").attr("id","t"+(parseInt(Math.random()*1000000)));
                    if($('.answer .an').length>9){
                        $.cxDialog({
                            title: '提示',
                            info: '<div class="cxDialogContent">最多只能支持8个选项</div>',
                            lockScroll: true,
                            background: '#000',
                            width: 400,
                        });
                    }else{
                        $('.answer').append(ele);
                    }
                    window.acm.initBindFun();
                })

                $(document).on('click','.chose-radio input:radio',function () {
                    $.each($('.chose-radio input:radio'),function(){
                        $(this).prop('checked',false)
                    })
                    $(this).prop('checked',true)
                })
                $(document).on('click','.parse input:radio',function () {
                    $.each($('.parse input:radio'),function(){
                        $(this).prop('checked',false).parent().siblings('td').find('.addQues-ok').hide()
                    })
                    $(this).prop('checked',true).parent().siblings('td').find('.addQues-ok').show();
                })


                $('.time-a').blur(function () {
                    $(this).css('border','1px solid #dadada')
                })
                $('.time-a').keyup(function(){
                    var str=$(this).val();
                    $(this).css('border','1px solid #2abcb8')
                    if(str.length>2 && parseInt(str)>100){
                        $.cxDialog({
                            title: '提示',
                            info: '<div class="cxDialogContent">最多输入100分</div>',
                            lockScroll: true,
                            background: '#000',
                            width: 400,
                        });
                        $(this).val('');
                    }else {
                        if(!str||isNaN(str)){
                            $(this).val('')
                        }else{
                            if(str.indexOf(".")>-1){
                                $(this).val(returnFloat(str));
                            }
                        }
                    }

                })
                function returnFloat(value){
                    var xsd=value.toString().split(".");
                    if(xsd.length==1){
                        return value;
                    }
                    if(xsd.length>1){
                        if(xsd[1].length>=2){
                            value = xsd[0]+'.'+xsd[1].substring(0,1);
                        }
                        return value;
                    }
                }
                $timeout(function () {
                    window.acm.initBindFun();
                });
                var danxuanEditor;
                $('.diffcult .xing-kong').click(function(){
                    var index =$(this).index();
                    $(this).parents(".diffcult").attr("value",index);
                    $.each($('.diffcult .xing-kong'),function () {
                        $(this).css('background','url(../../images/icon.png) no-repeat -59px -109px');
                    })
                    $('.xing-kong:lt('+index+')').css('background','url(../../images/icon.png) no-repeat 0px -109px');
                    if($(this).hasClass('active')){
                        $(this).css('background','url(../../images/icon.png) no-repeat -59px -109px');
                        $(this).removeClass('active');
                    }else{
                        $(this).css('background','url(../../images/icon.png) no-repeat 0px -109px');
                        $(this).addClass('active');
                    }
                })


                /*切换试题是，清空选中内容*/
                function clearText() {
                    $('.danxuan-s input').prop('checked', false);
                    $('.danxuan-s .addQues-ok').hide();
                }
                /*清空题目解析内容*/

                /*删除选项*/
                $(document).on('click','.addQues-close',function () {
                    if($(".questype .A_N_P_Ali").attr("id")==2){
                        if($('.addQues-close').length<5){
                            alert("至少保留3个选项");
                        }  else{
                            if($(this).parents(".editorBox").find(".fromEditBox").length==1){
                                $(".copyEditBox").append($(".editor1.fromEditBox"));$(this).parents('.an').remove()
                            }
                            else{
                                $(this).parents('.an').remove()
                            }
                        }
                    }else{
                        if($('.addQues-close').length<4){
                            alert("至少保留2个选项");
                        }  else{
                            if($(this).parents(".editorBox").find(".fromEditBox").length==1){
                                $(".copyEditBox").append($(".editor1.fromEditBox"));$(this).parents('.an').remove()
                            }
                            else{
                                $(this).parents('.an').remove()
                            }
                        }
                    }

                });

                /*多选*/
                $('.que-ask ul li').click(function(){
                    if($(this).parents('.assistBox').length==1 && $(this).attr("data")=="s5"){
                        if($(this).hasClass('A_N_P_Ali')){
                            $(this).removeClass('A_N_P_Ali')
                        }else{
                            if($(".popupWindow ul li.A_N_P_Ali").attr("dataid")==1){
                                $(this).addClass('A_N_P_Ali')
                            }else{
                                confirm('使用“本机文件上传”功能，须允许考生跳出页面作答，此时有作弊的可能 <br>你确定允许考生跳出页面作答吗？',function(){
                                    $(".popupWindow ul li[dataid=1]").addClass('A_N_P_Ali');$(".popupWindow ul li[dataid=0]").removeClass('A_N_P_Ali');$(".assistBox ul li[data=s5]").addClass('A_N_P_Ali');
                                });
                            }
                        }
                    }else{
                        if($(this).hasClass('A_N_P_Ali')){
                            $(this).removeClass('A_N_P_Ali')
                        } else{
                            $(this).addClass('A_N_P_Ali')
                        }
                    }
                })
            }

            refreshFunc();

        }]
);

quesControllers.controller("AddInPaperController", ['$scope', '$http','$routeParams', '$timeout',
    function($scope, $http,$routeParams, $timeout)
    {
        /*版本判断*/
        $scope.selectOption=1;
        if($.cookie('version')){
            $scope.version = parseInt($.cookie('version'));
        }else{
            $http.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") +  "&r=" + Math.random(),{}).success(function (data) {
                $scope.version = data.data.exam_version;
                $.cookie('version',data.data.exam_version,{ path: '/'});
                $.cookie('role_type', data.data.role_type);if($.cookie('role_type')==1 && $.cookie('version')!=1){ $('.yonghuGuanli').removeClass('hide'); }
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
        if (Object.isNullString($routeParams.paperId)) {
            $location.path('/list');
            return ;
        }
        if (Object.isNullString($routeParams.positionId)) {
            $location.path('/list');
            return ;
        }
        $(".tkNumdropdown").easyDropDown({ cutOff: 6 });
        $scope.searchItem ={fenzhiRule:"0",answerCount:"1",answerArr:[""],optionsExt:[{opttitle: "", optvalue: 0}, {opttitle: "", optvalue: 1}]  };
        $scope.searchItem.paperId = $routeParams.paperId;
        $scope.searchItem.positionId = $routeParams.positionId;
        if(window.ue2!=undefined){
            window.ue2.destroy();
        }
        if(window.ue5!=undefined){
            window.ue5.destroy();
        }
        if(window.daanjiexiUE!=undefined){
            window.daanjiexiUE.destroy();
        }

        window.levelChange = function(){
            var level1Value = $(".zsd11_level1").val();
            if(level1Value==""){
                $(".zsd11_level2").parents('.dropdown').remove();

            }else{
                $(".zsd11_level2").parents('.dropdown').remove();
                $(".zsd11_level1").parents('.dropdown').after('<select class="zsd11_level2" name="zsd11_level2"><option value="">请选择</option></select>');

                $scope.Level1Data.forEach(function (item) {
                    if(item.id==level1Value){
                        $scope.Level2Data = item.child;
                        $scope.Level2Data.forEach(function(item){
                            $(".zsd11_level2").append('<option  value="'+item.id+'" >'+item.name+'</option>');
                        });
                        $(".zsd11_level2").easyDropDown({ cutOff: 6 });
                    }
                });
            }
        }

        var refreshFunc = function() {

            if(localStorage.quesNodes!=undefined){
                $scope.Level1Data = $.parseJSON(localStorage.quesNodes);
                $timeout(function () {
                    $(".dropdown").easyDropDown({ cutOff: 6 });
                });
            }else{
                $http.get('/api/quesNodes').success(function (data) {
                    $scope.Level1Data = data.result;
                    localStorage.quesNodes = JSON.stringify(data.result);
                    $timeout(function () {
                        $(".dropdown").easyDropDown({ cutOff: 6 });
                    });
                }).error(function (data) {
                    alert("管理员累晕了，没有反馈结果，请重试一下～～");
                });
            }
            $http.post('/api/paperDetail ',{paperId:$scope.searchItem.paperId}).success(function (data) {
                $scope.paperDetail = data.result;
                if($scope.paperDetail.forCode==true){
                    $(".addpap_t9 li[id=6]").removeClass('hide');
                    $(".addpap_t9 li[id=8]").removeClass('hide');
                }else{
                    $(".addpap_t9 li[id=6]").addClass('hide');
                    $(".addpap_t9 li[id=8]").addClass('hide');
                }
            }).error(function (data) {
                alert("管理员累晕了，没有反馈结果，请重试一下～～");
            });
        }

        $timeout(function () {
            refreshFunc();
            initBindPageFun();
        });

        $scope.warning = function () {
            initAddQuesFun($scope,$http,"");
        }

        var initRadioEditor = function () {
            window.ue = UE.getEditor("editor1", {
//                serverUrl: '/assessment/ueditor',
                toolbars: [
                    ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                        'bold', 'italic', 'underline', 'fontborder','superscript', 'subscript','removeformat','|',

                        'simpleupload','imagefloat',
                        'insertcode',]
                ],
                //focus时自动清空初始化时的内容
                //关闭字数统计
                wordCount:false,
                autoHeightEnabled:true,
                elementPathEnabled:false,
                autoFloatEnabled:false,
                //默认的编辑区域高度
                'enterTag' : 'br'
            });
            window.ue.addListener( 'ready', function( editor ) {
                //ue.setContent(window.targetContent);
                window.ue.options.autoHeightEnabled = true;
                $(ue.iframe.contentWindow.document.body).css("background","#e7e7e7");

                if(window.targetContent!=undefined){
                    window.ue.setContent(window.targetContent);
                }
                window.ue.focus();
            })
        }

        window.acm.initBindFun = function () {
            $('.answer .editTip').unbind("click").bind("click",function(){
                //如果存在编辑器，返回
                if($(this).parent().find(".edui-editor.edui-default").length){
                    return;
                }
                var $target = $(this).parent();
                if(window.ue && window.ue.container!=undefined){
                    //如果不存在
                    $(".editorBox.init").removeClass("init");
                    $('.answer .content').css('border','1px solid #dadada');
                    //获取原来的dom
                    var currentParnet = ue.container.parentNode.parentNode;
                    //获取原来的内容
                    var currentContent = ue.getContent();
                    //获取目标的dom
                    //获取目标的内容
                    window.targetContent = $target.children("div.addQues-optextarea-div").html();

                    //消除编辑器
                    window.ue.destroy();
                    //填充原来内容
                    var textarea = currentContent.replace(/\<\/?p\>/gim, '');
                    $(currentParnet).html('<div class="content"><div class="addQues-optextarea-div" contenteditable="true">'+textarea+'</div><div class="editTip"><a href="javascript:void(0)">使用编辑器</a></div></div>');
                    $target.html(window.targetContent);
                    //初始化
                    $target.attr("id","editor1");
                    $target.html('');
                    initRadioEditor();
                    setTimeout(function(){
                        if(window.targetContent!=undefined){
                            window.ue.setContent(window.targetContent);
                        }
                    },500)
                }
                else{
                    //初始化
                    window.targetContent = $target.children("div.addQues-optextarea-div").html();
                    $target.html('');
                    $target.attr("id","editor1");
                    initRadioEditor();
                }
                window.acm.initBindFun();
            });

            $('.answer .addQues-optextarea-div').unbind("click").bind("click",function () {
                if(window.ue){
                    var currentContent = window.ue.getContent();
                    var targetEml =  ue.container.parentNode.parentNode;
                    window.ue.destroy();
                    $(targetEml).html('<div class="content"><div class="addQues-optextarea-div" contenteditable="true">'+currentContent+'</div><div class="editTip"><a href="javascript:void(0)">使用编辑器</a></div></div>');
                    if($scope.version==3){
                        $(this).parent().find(".editTip a").click();
                    }
                }
                window.acm.initBindFun();
            });
        }

        /*单选选中正确答案*/
        window.acm.checkOnly = function(){
            $('.answer .an:gt(2)').show();
            $('.answer .an input').show();
            $('.addQues-close').show();
            $('.add-answer').show()
            $('.an input:checkbox').attr('type','radio').prop('checked',false);
            $(document).off('.addQues-close').on('click','.an input:radio',function () {
                $.each($('.an input:radio'),function(){
                    $(this).prop('checked',false).parent().siblings('td').find('.addQues-ok').hide()
                })
                $(this).prop('checked',true).parent().siblings('td').find('.addQues-ok').show();
            })
        }
        /*多选题*/
        window.acm.checkMore= function(){
            $(' .answer .an:gt(2)').show();
            $('.answer .an input').show();
            $('.addQues-close').show();
            $('.add-answer').show()
            $('.an input:radio').attr('type','checkbox').prop('checked',false);
            $(document).off(".addQues-close").on('click','.an input:checkbox',function () {
                if($(this).is('input:checked')){
                    $(this).parent().siblings('td').find('.addQues-ok').show()
                }else {
                    $(this).parent().siblings('td').find('.addQues-ok').hide();
                }
            })
        }
        /*填空题*/
        window.acm.emptyBlank =function() {
            $('.danxuan-s').hide();//单选场次隐藏
            $('.tiankong').show();
            $('.answer .an input').hide();
            $('.addQues-close').hide();
            $('.add-answer').hide()
            $('.tiankong .answer .an:gt(2)').hide();//只显示一项答案
            $(document).on('click','.des-bank .selectUI li a',function(){
                $('.content-model').html('');
                for(var i=0;i<parseInt($(this).text());i++){
                    $('.copymodel span').text(i+1);
                    var text = $('.copymodel').html();
                    $('.content-model').append(text);
                }
            })

        }
        /*判断题*/
        window.acm.judgeQuetion =function() {
            /* $('.answer .an:gt(3)').hide();
             $('.answer .an input').show();
             $('.addQues-close').hide();
             $('.add-answer').hide()*/
        }
        /*问答题*/
        window.acm.askQuestion =function() {
            $('.danxuan-s').hide();
            $('.que-ask').show();
            /*问答题编译器实例化*/
            /*=====================================================*/
            window.ue5 =  UE.getEditor('Editor2',{
                //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                toolbars: [
                    ['source','fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                        'bold', 'italic', 'underline', 'fontborder','|',
                        'link', 'unlink','|',
                        'simpleupload','imagefloat',
                        'insertcode',]
                ],
                //focus时自动清空初始化时的内容
                autoClearinitialContent:true,
                //关闭字数统计
                wordCount:false,
                //关闭elementPath
                elementPathEnabled:false,
                autoFloatEnabled:false
            })
        }
        /*=====================================================*/

        window.acm.tkNumChangeNum  = 1;

        var initBindPageFun = function () {
            window.tkNumChange = function () {
                var num = $(".tkNumdropdown").val();
                if(parseInt(num)>window.acm.tkNumChangeNum){
                    for(var i=window.acm.tkNumChangeNum;i<parseInt(num);i++){
                        $('.copymodel span').text(i+1);
                        var text = $('.copymodel').html();
                        $('.content-model').append(text);
                    }
                }else{
                    $('.content-model div.tkDiv:gt('+(parseInt(num)-1)+')').remove();
                }
                window.acm.tkNumChangeNum = parseInt(num);
                if(parseInt(num)>1){ $(".sp_Tcb-ti span.youxu").removeClass('hide') }else{ if(!$(".sp_Tcb-ti span.youxu").hasClass('hide')){$(".sp_Tcb-ti span.youxu").addClass('hide');}}
            }
            window.acm.checkOnly()
            var sp_Tc2 = $('.sp_Tc2 ul');
            sp_Tc2.on('click','li',function(){
                if(!$(this).hasClass('A_N_P_Ali')){
                    $(this).siblings().removeClass('A_N_P_Ali');
                    $(this).addClass('A_N_P_Ali');
                }
                if($(this).parents('.popupWindow').length==1){
                    if($(this).attr("dataid")==0){ $(".assistBox li[data=s5]").removeClass('A_N_P_Ali');}
                }
            });
            /*添加试题*/
            $('.add-answer').click(function (){
                var copyAnswer = $('.copy').html();
                var ele = $(copyAnswer);
                ele.find(".forEditor").attr("id","t"+(parseInt(Math.random()*1000000)));
                if($('.answer .an').length>9){
                    $.cxDialog({
                        title: '提示',
                        info: '<div class="cxDialogContent">最多只能支持8个选项</div>',
                        lockScroll: true,
                        background: '#000',
                        width: 400,
                    });
                }else{
                    $('.answer').append(ele);
                }
                window.acm.initBindFun();
            })

            $(document).on('click','.chose-radio input:radio',function () {
                $.each($('.chose-radio input:radio'),function(){
                    $(this).prop('checked',false)
                })
                $(this).prop('checked',true)
            })
            $(document).on('click','.parse input:radio',function () {
                $.each($('.parse input:radio'),function(){
                    $(this).prop('checked',false).parent().siblings('td').find('.addQues-ok').hide()
                })
                $(this).prop('checked',true).parent().siblings('td').find('.addQues-ok').show();
            })

            $('.time-a').blur(function () {
                $(this).css('border','1px solid #dadada')
            })
            $('.time-a').keyup(function(){
                var str=$(this).val();
                $(this).css('border','1px solid #2abcb8')
                if(str.length>2 && parseInt(str)>100){
                    $.cxDialog({
                        title: '提示',
                        info: '<div class="cxDialogContent">最多输入100分</div>',
                        lockScroll: true,
                        background: '#000',
                        width: 400,
                    });
                    $(this).val('');
                }else {
                    if(!str||isNaN(str)){
                        $(this).val('')
                    }  else{
                        if(str.indexOf(".")>-1){
                            $(this).val(returnFloat(str));
                        }
                    }
                }

            })
            function returnFloat(value){
                var xsd=value.toString().split(".");
                if(xsd.length==1){
                    return value;
                }
                if(xsd.length>1){
                    if(xsd[1].length>=2){
                        value = xsd[0]+'.'+xsd[1].substring(0,1);
                    }
                    return value;
                }
            }
            window.acm.initBindFun();
            var danxuanEditor;
            /*选中效果*/
            $('.diffcult .xing-kong').click(function(){
                var index =$(this).index();
                $(this).parents(".diffcult").attr("value",index);
                $('.xing-kong').removeClass('active');
                $('.xing-kong:lt('+index+')').addClass('active');
            });
            /*题型筛选*/
            $('.addpap_t9 ul li').click(function () {
                if($(this).attr("id")=="6"){
                    location.href='/ques#/add/onlinecode';
                }
                else if($(this).attr("id")=="8"){
                    location.href='/ques#/add/webcode';
                }
                if(!$(this).hasClass('A_N_P_Ali')){
                    $(this).siblings().removeClass('A_N_P_Ali');
                    $(this).addClass('A_N_P_Ali');
                }
                if($(this).attr("id")=="4"){
                    if(ue2.getContent()!="" && ue2.getContent().indexOf('请填写题干内容')>-1){
                        ue2.setContent('<p style="color: #ccc">请在题目中用（    ）表示需填空部分。如有多个填空，请分别用（    ）区分开</p>')
                    }
                    ue2.addListener("click",function(){
                        if(ue2.getContent().indexOf('表示需填空部分。如有多个填空，请分别用')>-1){ ue2.setContent(''); }
                    })
                }else{
                    if(ue2.getContent()!="" && ue2.getContent().indexOf('表示需填空部分。如有多个填空，请分别用')>-1){
                        ue2.setContent('<p style="color: #ccc">请填写题干内容</p>')
                    }
                    ue2.addListener("click",function(){
                        if(ue2.getContent().indexOf('请填写题干内容')>-1){ ue2.setContent(''); }
                    })
                }
                if($(this).hasClass('A_N_P_Ali')){
                    if($(this).text()=='单选题' ){
                        clearText()
                        $('.noOnline').show();
                        $('.onLine').hide();
                        $('.des-bank').hide();
                        $('.des-bank-2 ').hide();
                        $('.tiankong').hide();
                        $('.question-ask').hide()
                        $('.sp_Tc6').show();
                        $('.que-ask').hide();
                        $('.danxuan-s').show();
                        $('.parse-l').hide()
                        /*$('.time-online').hide();
                        $('.time-noline').show()*/
                        window.acm.checkOnly()

                    }
                    else if($(this).text()=='多选题' || $(this).text()=='不定项选择题'){
                        clearText()
                        $('.noOnline').show();
                        $('.onLine').hide();
                        $('.des-bank').hide();
                        $('.des-bank-2 ').show();
                        $('.tiankong').hide()
                        $('.question-ask').hide()
                        $('.sp_Tc6').show();
                        $('.que-ask').hide();
                        $('.danxuan-s').show();
                        $('.parse-l').hide()
                        $('.time-online').hide();
                        $('.time-noline').show();
                        /*$('#selectMore').show();
                        $('#blankL').hide();*/
                        window.acm.checkMore()
                    }
                    else if($(this).text()=='填空题'){


                        $('.noOnline').show();
                        $('.onLine').hide();
                        $('.des-bank').show();
                        $('.des-bank-2 ').hide();
                        $('.tiankong').show()
                        $('.question-ask').hide()
                        $('.sp_Tc6').show();
                        $('.que-ask').hide();
                        $('.parse-l').hide()
                        $('.time-online').hide();
                        $('.time-noline').show();
                        /*$('#selectMore').hide();
                        $('#blankL').show();*/
                        window.acm.emptyBlank()
                    }
                    else if($(this).text()=='判断题'){

                        clearText()
                        $('.danxuan').hide();
                        $('.noOnline').show();
                        $('.onLine').hide();
                        $('.des-bank').hide();
                        $('.des-bank-2 ').hide();
                        $('.tiankong').hide()
                        $('.question-ask').hide()
                        $('.sp_Tc6').show();
                        $('.que-ask').hide();
                        $('.parse-l').show()
                        $('.time-online').hide();
                        $('.time-noline').show()
                        window.acm.judgeQuetion();

                    }
                    else if($(this).text()=='问答题'){

                        $('.noOnline').show();
                        $('.onLine').hide();
                        $('.des-bank').hide();
                        $('.des-bank-2 ').hide();
                        $('.tiankong').hide();
                        $('.question-ask').show();
                        $('.sp_Tc6').show();
                        $('.parse-l').hide()
                        $('.time-online').hide();
                        $('.time-noline').show()
                        window.acm.askQuestion()
                    }
                } else{

                }
            })
            /*切换试题是，清空选中内容*/
            function clearText() {
                $('.danxuan-s input').prop('checked', false);
                $('.danxuan-s .addQues-ok').hide();
            }
            /*清空题目解析内容*/
           /* $('.itemCode').one('focus',function(){
                $(this).val('').css('color','inherit');
            })*/
            /*删除选项*/
            $(document).on('click','.addQues-close',function () {
                if($(".questype .A_N_P_Ali").attr("id")==2){
                    if($('.addQues-close').length<5){
                        alert("至少保留3个选项");
                    }  else{
                        if($(this).parents(".editorBox").find(".fromEditBox").length==1){
                            $(".copyEditBox").append($(".editor1.fromEditBox"));$(this).parents('.an').remove()
                        }
                        else{
                            $(this).parents('.an').remove()
                        }
                    }
                }else{
                    if($('.addQues-close').length<4){
                        alert("至少保留2个选项");
                    }  else{
                        if($(this).parents(".editorBox").find(".fromEditBox").length==1){
                            $(".copyEditBox").append($(".editor1.fromEditBox"));$(this).parents('.an').remove()
                        }
                        else{
                            $(this).parents('.an').remove()
                        }
                    }
                }
            });

            /*多选*/
            $('.que-ask ul li').click(function(){
                if($(this).parents('.assistBox').length==1 && $(this).attr("data")=="s5"){
                    if($(this).hasClass('A_N_P_Ali')){
                        $(this).removeClass('A_N_P_Ali')
                    }else{
                        if($(".popupWindow ul li.A_N_P_Ali").attr("dataid")==1){
                            $(this).addClass('A_N_P_Ali')
                        }else{
                            confirm('使用“本机文件上传”功能，须允许考生跳出页面作答，此时有作弊的可能 <br>你确定允许考生跳出页面作答吗？',function(){
                                $(".popupWindow ul li[dataid=1]").addClass('A_N_P_Ali');$(".popupWindow ul li[dataid=0]").removeClass('A_N_P_Ali');$(".assistBox ul li[data=s5]").addClass('A_N_P_Ali');
                            });
                        }
                    }
                }else{
                    if($(this).hasClass('A_N_P_Ali')){
                        $(this).removeClass('A_N_P_Ali')
                    } else{
                        $(this).addClass('A_N_P_Ali')
                    }
                }
            });

            /*实例化*/
            window.ue2 =  UE.getEditor('myEditor',{
                //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                toolbars: [
                    [ 'source','undo', 'redo','fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',
                        'bold', 'italic', 'underline', 'fontborder','|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify','|', 'strikethrough', 'superscript', 'subscript', 'removeformat','|', 'insertorderedlist', 'insertunorderedlist','lineheight', '|',
                        'link', 'unlink','|',
                        'simpleupload','imagefloat', 'emotion', 'insertvideo', 'music', 'attachment','insertframe',
                        'horizontal', '|',
                        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol','|','insertcode',]
                ],
                //focus时自动清空初始化时的内容
                autoClearinitialContent:false,
                //关闭字数统计
                wordCount:false,
                //关闭elementPath
                elementPathEnabled:false,
                autoFloatEnabled:false,
                //默认的编辑区域高度
//                initialFrameHeight:160,

            })
            window.ue2.addListener( 'ready', function( editor ) {
                $(window.ue2.iframe.contentWindow.document.body).css("background","#666").css("color","#fff");
                window.ue2.setContent('<p style="color: #ccc">请填写题干内容</p>')
                window.ue2.addListener("click",function(){
                    if(window.ue2.getContent().indexOf('请填写题干内容')>-1){ window.ue2.setContent(''); }
                })

            })

            window.daanjiexiUE =  UE.getEditor('daanjiexi',{
                //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                toolbars: [
                    ['fontfamily', 'fontsize','|', 'forecolor', 'backcolor','pasteplain', '|',  'bold', 'italic', 'underline', 'fontborder','|', 'link', 'unlink','|', 'simpleupload','imagefloat', 'insertcode',]
                ],
                //focus时自动清空初始化时的内容
                autoClearinitialContent:true,
                //关闭字数统计
                wordCount:false,
                //关闭elementPath
                elementPathEnabled:false,
                autoFloatEnabled:false,
                //默认的编辑区域高度
//                initialFrameHeight:160,

            })
            window.daanjiexiUE.addListener( 'ready', function(editor) {
                $(window.daanjiexiUE.iframe.contentWindow.document.body).css("color","#777");
                window.daanjiexiUE.setContent('请填写题目考察的知识方向、解题思路等信息，便于后期交流、讨论。不会显示给考生。（选填）');
                window.daanjiexiUE.addListener("click",function(){
                    if(window.daanjiexiUE.getContent().indexOf('请填写题目考察的知识方向')>-1){ window.daanjiexiUE.setContent(''); }
                })
                if($scope.version==3 && $scope.selectOption==1){
                    $($(".optionsListBox .editTip")[0]).click();
                }
            })
        }
    }]
);

quesControllers.controller("SelectController", ['$scope', '$http','$routeParams', '$timeout',
    function($scope, $http,$routeParams, $timeout)
    {
        window.levelChange = function(){
            var level1Value = $(".zsd11_level1").val();
            if(level1Value==""){
                $(".zsd11_level2").parents('.dropdown').remove();

            }else{
                $(".zsd11_level2").parents('.dropdown').remove();
                $(".zsd11_level1").parents('.dropdown').after('<select class="zsd11_level2" name="zsd11_level2"><option value="">请选择</option></select>');

                $scope.Level1Data.forEach(function (item) {
                    if(item.id==level1Value){
                        $scope.Level2Data = item.child;
                        $scope.Level2Data.forEach(function(item){
                            $(".zsd11_level2").append('<option  value="'+item.id+'" >'+item.name+'</option>');
                        });
                        $(".zsd11_level2").easyDropDown({ cutOff: 6 });
                    }
                });
            }
        }
        /*版本判断*/
        if($.cookie('version')){
            $scope.version = parseInt($.cookie('version'));
        }else{
            $http.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") +  "&r=" + Math.random(),{}).success(function (data) {
                $scope.version = data.data.exam_version;
                $.cookie('version',data.data.exam_version,{ path: '/'});
                $.cookie('role_type', data.data.role_type);if($.cookie('role_type')==1 && $.cookie('version')!=1){ $('.yonghuGuanli').removeClass('hide'); }
            }).error(function (data) {
                console.log(data);
            });
        }
        /*权限判断*/
        $http.post('/api/userRight',{}).success(function (data) {
            $scope.rightStr = data.result.join(',');

            $timeout(function () {
                $(".leixing").easyDropDown({ cutOff: 6});
            });
        }).error(function (data) {
            console.log("服务器错误：" + data);
        });
        $scope.searchItem = {pageSize:'15'};
        //if(localStorage.searchItem!=undefined){ $scope.searchItem = $.parseJSON(localStorage.searchItem); }
        if (Object.isNullString($routeParams.positionId)) {
            $location.path('/position#/list');
            return;
        }
        if (Object.isNullString($routeParams.paperId)) {
            $location.path('/position#/list');
            return;
        }
        window.acm.positionId = $routeParams.positionId;
        window.acm.paperId = $routeParams.paperId;
        if($.cookie("jurisdiction")){
            $scope.jurisdiction = eval($.cookie("jurisdiction"));
        }
        if($.cookie('version')){
            $scope.version = parseInt($.cookie('version'));
        }else{
            $http.get("https://kao.acmcoder.com/examcomp/getEntinfo1?uid=" + $.cookie("kao_token") +  "&r=" + Math.random(),{}).success(function (data) {
                $scope.version = data.data.exam_version;
                $.cookie('version',data.data.exam_version,{ path: '/'});
                $.cookie('role_type', data.data.role_type);if($.cookie('role_type')==1 && $.cookie('version')!=1){ $('.yonghuGuanli').removeClass('hide'); }
            }).error(function (data) {
                console.log(data);
            });
        }

        $scope.pageNum = window.acm.pageNum =1;
        if(localStorage.quesNodes!=undefined){
            $scope.Level1Data = $.parseJSON(localStorage.quesNodes);
            $timeout(function () {
                $(".zhishidian").easyDropDown({ cutOff: 6 });
            });
        }else{
            $http.get('/api/quesNodes').success(function (data) {
                $scope.Level1Data = data.result;
                localStorage.quesNodes = JSON.stringify(data.result);
                $timeout(function () {
                    $(".zhishidian").easyDropDown({ cutOff: 6 });
                });
            }).error(function (data) {
                alert("管理员累晕了，没有反馈结果，请重试一下～～");
            });
        }
        $http.post("/api/paperDetail",{ paperId:window.acm.paperId }).success(function (data) {
            $scope.paperDetail = data.result;
        }).error(function (data) {
            alert("管理员累晕了，没有反馈结果，请重试一下～～");
        });

        $scope.searchQuesesBtn = function () {
            $scope.searchQueses(1);$(".apa_ri-qx .Input_zbsk").prop('checked',false);
        }
        $scope.searchQueses = function (pageNum) {
            $(".result_loading").removeClass('hide');
            var postData =  $scope.searchItem;

            $scope.pageNum = postData.pageNum = pageNum;
            postData.pageSize = parseInt($(".pageCountDropdown").val());
            postData.paperId = window.acm.paperId;
            if($(".questionState .A_N_P_Sli").index()==1){ postData.questionState = 0; }else{ postData.questionState = 1;}

            if($(".startTime").val()==""){ postData.startTime = getNowFormatDate(new Date(Date.now()-1000*24*3600*730)); }else{ postData.startTime = $(".startTime").val(); }

            if($(".endTime").val()==""){ postData.endTime = getNowFormatDate(new Date(Date.now()+1000*24*3600*1)); }
            else{
                postData.endTime = $(".endTime").val();
            }
            if($(".zsd11_level2").val()!=""){ postData.zsd11 = $(".zsd11_level2").val(); }
            else if($(".zsd11_level1").val()!="" && $(".zsd11_level2").val()==""){
                postData.zsd11 = [];
                $scope.Level2Data.forEach(function(item){
                    postData.zsd11.push(item.id);
                });
                postData.zsd11 = postData.zsd11.join(',');
            }
            if(postData.zsd11 ==""){postData.zsd11 =undefined;}
            postData.rateOfPro = 0;

            $http.post('/api/searchQuestionWithQuery',postData).success(function (data) {
                $scope.questions = data.result.list;
                $scope.questionsCount = data.result.count;
                $(".result_loading").addClass('hide');
                if(window.acm.pageNum == pageNum){
                    $scope.initLoadPager(pageNum);
                }
                $scope.pageNum = window.acm.pageNum = pageNum;

                var quesStartNum  = (postData.pageNum -1)* postData.pageSize +1;
                var start = 0;
                $scope.questions.forEach(function(item){
                    item.quesNum = quesStartNum + start;
                    start ++ ;
                });


                $timeout(function () {
                    $('.apa_ri-qx input').unbind("click").bind('click', function () {
                        var sureBool = true;

                        if (!$(this).is(":checked")) {
                            $('.apa_ri-cenbt input').prop('checked', false);
                            $('.apa_ri-cenbt input').removeClass('Input_zbsk');
                            $(this).removeClass('Input_zbsk');
                            $('.apa_ri-cenbt input').parents('.apa_ri-cen').removeClass('apa_ali');
                        } else {
                            $('.apa_ri-cenbt input').prop('checked', true);
                            $('.apa_ri-cenbt input').addClass('Input_zbsk');
                            $(this).addClass('Input_zbsk');
                            $('.apa_ri-cenbt input').parents('.apa_ri-cen').addClass('apa_ali');
                        }
                        $(".ques_list .apa_ri-cenbt input").each(function(){
                            if($(this).is(":checked")){
                                if($scope.paperDetail.forCode==true && (parseInt($(this).attr("dataType"))!=6 && parseInt($(this).attr("dataType"))!=22)){ $(this).prop("checked",false) ;$(this).parents('.apa_ri-cen').removeClass('apa_ali');sureBool = false; alert("此子卷是编程题试卷。只可以添加编程题！");   }
                                if($scope.paperDetail.forCode!=true && (parseInt($(this).attr("dataType"))==6 || parseInt($(this).attr("dataType"))==22)){ $(this).prop("checked",false) ;$(this).parents('.apa_ri-cen').removeClass('apa_ali');sureBool = false; alert("此子卷是普通试卷！不可以添加编程题！"); }
                            }
                        });
                        if(!sureBool){
                            $('.apa_ri-qx input').prop('checked',false);
                        }
                        $scope.initSelectCount();
                    });
                    $('.apa_ri-cenbt input').unbind("click").bind('click', function () {
                        if ($(this).hasClass('Input_zbsk')) {
                            $(this).removeClass('Input_zbsk');
                            $(this).parents('.apa_ri-cen').removeClass('apa_ali');
                        } else {
                            $(this).addClass('Input_zbsk');
                            $(this).parents('.apa_ri-cen').addClass('apa_ali');
                        }
                        if($('.apa_ri-cenbt input:checked').length != $('.apa_ri-cenbt input').length){ $('.apa_ri-qx input').prop('checked', false); }else{
                            $('.apa_ri-qx input').prop('checked', true);
                        }
                        $scope.initSelectCount();
                    });

                    hljs.initHighlighting.called = false;
                    hljs.initHighlighting();
                });
            }).error(function (data) {
                alert("管理员累晕了，没有反馈结果，请重试一下～～");
            });
        }
        $scope.selectQueses = [];

        $scope.initSelectCount = function(){
            var addArray = [];
            var delArray = [];
            $(".ques_list .apa_ri-cenbt input").each(function(){
                if($(this).is(":checked")){
                    addArray.push($(this).val());
                }else{
                    delArray.push($(this).val());
                }
            })
            //处理数据
            //添加的元素，如果不存在则添加
            for(var i=0;i<addArray.length;i++){
                var myBool = false;
                for(var j=0;j<$scope.selectQueses.length;j++){
                    if($scope.selectQueses[j]._id==addArray[i]){ myBool = true; }
                }
                if(!myBool){
                    $scope.selectQueses.push($.parseJSON($(".apa_ri-cenbt input[value="+addArray[i]+"]").attr('data-q')));
                }
            }
            //删除的元素，如果存在则删除
            var newArray =[];
            for(var i=0;i<$scope.selectQueses.length;i++){
                var myBool = false;
                for(var j=0;j<delArray.length;j++){
                    if($scope.selectQueses[i]._id==delArray[j]){ myBool = true; }
                }
                if(!myBool){ newArray.push($scope.selectQueses[i]); }
                else{
                    //console.log($scope.selectQueses[i]);
                }
            }
            $scope.selectQueses = newArray;
            $scope.$apply();
        }

        $scope.initLoadPager = function(pageNum){
            if($scope.questionsCount>parseInt($(".pageCountDropdown").val())){
                var page_index = pageNum;
                var  num_entries = $scope.questionsCount % parseInt($(".pageCountDropdown").val());
                if(num_entries==0){ num_entries = parseInt($scope.questionsCount / parseInt($(".pageCountDropdown").val())); }else{
                    num_entries = parseInt($scope.questionsCount / parseInt($(".pageCountDropdown").val()))+1;
                }

                var PageCallback  = function (page_index,jq) {
                    page_index +=1;
                    if(window.acm.pageNum != page_index){
                        $scope.searchQueses(page_index);
                        $('.apa_ri-qx input').prop("checked",false);
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

        $timeout(function () {
            $(".nandu").easyDropDown({ cutOff: 6});
            $(".pageCountDropdown").easyDropDown({ cutOff: 6});
            $(".pageCountDropdown").easyDropDown('select',$(".pageCountDropdown option[value="+$scope.searchItem.pageSize+"]").index());
            $(".pageCountDropdown").unbind("change").bind('change',function () {
                $scope.searchQueses(1);
                console.log($(".pageCountDropdown").val());
            });
            $scope.searchQueses(1);

            $(document).on('click','.addT',function () {
                var addBool = true;
                var scoreBool = 0;
                $(".ques_list .apa_ri-cenbt input").each(function(){
                    if($(this).is(":checked")){
                        if($scope.paperDetail.forCode==true && (parseInt($(this).attr("dataType"))!=6 && parseInt($(this).attr("dataType"))!=22)){ addBool = false;alert("此子卷是编程题试卷。只可以添加编程题！");   }
                        if($scope.paperDetail.forCode!=true  && (parseInt($(this).attr("dataType"))==6 || parseInt($(this).attr("dataType"))==22)){ addBool = false; alert("此子卷是普通试卷！不可以添加编程题！"); }


                        if($scope.paperDetail.forCode==true){
                            if(scoreBool==0){ scoreBool = parseInt($(this).attr("datafenzhi")); }
                            if(scoreBool!=$(this).attr("datafenzhi")){
                                addBool = false; alert("分值不同的编程题，不允许进行抽题！");
                            }
                        }
                    }
                })
                if(addBool){
                    $.cxDialog({
                        title: '抽题作答',
                        info: $('.select_son_page'),
                        lockScroll: true,
                        background: '#000',
                        width:430,
                        okText:'提交',
                        ok:function(){
                            $("span.warming").remove();
                            var number = $('.number').val();
                            var fenzhi = $('.fenzhiInput').val();
                            if((number=="" || fenzhi=="") && $scope.paperDetail.forCode!=true){
                                $(".choutiBox").append('<span style="color:Red;display: block;font-size: 12px;line-height: 20px;margin-top: 10px;" class="warming"><i class="fa fa-exclamation-circle"></i>抽题数量和分值必填！</span>');
                                return false;
                            }
                            if(isNaN(fenzhi) && $scope.paperDetail.forCode!=true){
                                $(".choutiBox").append('<span style="color:Red;display: block;font-size: 12px;line-height: 20px;margin-top: 10px;" class="warming"><i class="fa fa-exclamation-circle"></i>请输入数字！</span>');
                                return false;
                            }
                            if(fenzhi==0){
                                $(".choutiBox").append('<span style="color:Red;display: block;font-size: 12px;line-height: 20px;margin-top: 10px;" class="warming"><i class="fa fa-exclamation-circle"></i>分值不能为0！</span>');
                                return false;
                            }

                            if($scope.paperDetail.forCode==true){ fenzhi = scoreBool; }

                            if(!isNaN(number)){
                                if(!/^[1-9]*[1-9][0-9]*$/.test(number)){
                                    $(".choutiBox").append('<span style="color:Red;display: block;font-size: 12px;line-height: 20px;margin-top: 10px;" class="warming"><i class="fa fa-exclamation-circle"></i>请输入正整数</span>');
                                    return false;
                                }
                                if(parseInt(number)>=$scope.selectQueses.length){
                                    $(".choutiBox").append('<span style="color:Red;display: block;font-size: 12px;line-height: 20px;margin-top: 10px; " class="warming"><i class="fa fa-exclamation-circle"></i>抽题数请小于所选题数！</span>');
                                    return false;
                                }else{
                                    var quesIdList = [];
                                    for(var i=0;i<$scope.selectQueses.length;i++){
                                        quesIdList.push($scope.selectQueses[i]._id)
                                    }
                                    if(($scope.paperDetail.quesNum + parseInt(number))<300){
                                        $http.post("/api/addQuestionIntoPaperRnd",{ paperId:window.acm.paperId,positionId : window.acm.positionId,quesIds:quesIdList.join(','),chouTi:parseInt(number),fenzhi:parseFloat(fenzhi)}).success(function (data) {
                                            if(data.errmsg==""){ alert("添加成功！",function(){
                                                location.href='/ques#/manager/'+window.acm.positionId+'/'+window.acm.paperId;
                                            });
                                            }else{ alert(data.errmsg); }
                                        }).error(function (data) {
                                            alert("管理员累晕了，没有反馈结果，请重试一下～～");
                                        });
                                    }else{
                                        $(".choutiBox").append('<span style="color:Red;display: block;font-size: 12px;line-height: 20px;margin-top: 10px;" class="warming">所选试题总和超过300道了！</span>');
                                        return false;
                                    }
                                }
                            } else{
                                $(".choutiBox").append('<span style="color:Red;display: block;font-size: 12px;line-height: 20px;margin-top: 10px;" class="warming"><i class="fa fa-exclamation-circle"></i>请输入数字</span>');
                                return false;

                            }

                        }
                    });
                }
            });
           /* $('.addT').bind('click',function () {

            });*/
        });
        
        $scope.selectPaper = function () {
            var quesList=[];
            var sureBool = true;

            if($scope.selectQueses.length>0){
                $scope.selectQueses.forEach(function(item){
                    if($scope.paperDetail.forCode==true && item.questype!=6 && item.questype!=22){ sureBool = false;alert("此子卷是编程题试卷。只可以添加编程题！"); }
                    if($scope.paperDetail.forCode!=true && (item.questype==6 || item.questype==22)){ sureBool = false;alert("此子卷是普通试卷。只可以添加普通试题！"); }
                    quesList.push(item._id);
                });
            }else{
                sureBool = false;alert("请选择试卷！");
            }
            if(!sureBool){   return; }
            if(($scope.selectQueses.length + $scope.paperDetail.quesNum)>300){ alert('选择的试题，超过300道啦！不可以这么多！'); return ; }
            if($scope.selectQueses.length>0){
                var postData ={
                    paperId:window.acm.paperId,
                    positionId : window.acm.positionId,
                    quesIds:quesList.join(','),
                    quesMode:0
                };

                $(".submitB").addClass('limited');

                $http.post('/api/addQuestionIntoPaper ',postData).success(function (data) {
                    $(".submitB").removeClass('limited');
                    if(data.errmsg==""){
                        var shwom = "<div style='width: 100%;text-align: center;position: relative;top: 10px;'>添加成功！</div>";
                        if(data.result.length!=0){
                            shwom = "<b style='font-size: 20px;margin-bottom: 20px;display: inline-block;width: 100%;text-align: center;position: relative;left: 9px;font-weight: normal'>试题导入结果</b><br> <img src='../../images/sureNews.png' style='position: relative;left:17px;top: -10px;'><div style='float:right'><span>成功导入：</span> <b style='font-size:20px;color: #2abcb8;'>"+ (quesList.length - data.result.length ) +"</b>  道<br> <span >未导入 ：</span></span><b style='color: #FF8A00;font-size: 20px;'>" + data.result.length + "</b> 道<br><span style='color: #999;'>原因：此子卷中已有此试题</span></div>";
                        }
                        $.cxDialog({
                            title: '提示',
                            info: '<div style="padding: 20px;text-align: left;line-height: 30px;padding-top:10px;font-family: Microsoft Yahei">'+shwom+'</div>',
                            lockScroll: true,background: '#000',width:400,okText:'我知道了',
                            ok:function(){
                                document.location.href='/ques#/manager/'+window.acm.positionId+'/'+window.acm.paperId;
                            },noText:'取消',
                         /*   no:function(){
                                document.location.href='/ques#/manager/'+window.acm.positionId+'/'+window.acm.paperId;
                            },*/closeBtnFun:function () {
                                document.location.href='/ques#/manager/'+window.acm.positionId+'/'+window.acm.paperId;
                            }
                        });
                    }else{ alert(data.errmsg); }
                }).error(function (data) {
                    $(".submitB").removeClass('limited');
                    alert("管理员累晕了，没有反馈结果，请重试一下～～");
                });
            }else{

            }
        }
    }]
);

window.getNowFormatDate=function(date){var seperator1="-";var seperator2=":";var month=date.getMonth()+1;var strDate=date.getDate();if(month>=1&&month<=9){month="0"+month}if(strDate>=0&&strDate<=9){strDate="0"+strDate}var currentdate=date.getFullYear()+seperator1+month+seperator1+strDate;return currentdate};