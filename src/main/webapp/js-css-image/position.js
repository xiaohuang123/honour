/**
 * Created by wangguoxiang on 2017/4/7 0007.
 * on 2017/4/7 0007.
 * contact me by QQ:794153926
 */

var initBindPageFun  = function () {
    $('.add-img').before('<span class="Id-img"><img src="/v4.0/images/exam1.png" style="border: 1px solid #dadada"></span>').mouseover(function(){
        $('.Id-img').css('display','block');
    }).mouseleave(function(){
        $('.Id-img').css('display','none');
    })
    $('.add-before').before('<span class="Id-after" style="width:80px;height:22px; ">展开所有子卷</span>').mouseover(function(){
        $('.Id-after').css('display','block');
    }).mouseleave(function(){
        $('.Id-after').css('display','none');
    })
    $('.add-after').before('<span class="Id-before" style="width:80px;height:22px; ">收起所有子卷</span>').mouseover(function(){
        $('.Id-before').css('display','block');
    }).mouseleave(function(){
        $('.Id-before').css('display','none');
    })

    var anp_sel_ul = $('.A_N_P_select ul');
    anp_sel_ul.on('click','li',function(){
        if(!$(this).hasClass('A_N_P_S_li')){
            $(this).siblings().removeClass('A_N_P_S_li');
            $(this).addClass('A_N_P_S_li');
        }
    });

    //内容切换 A_N_P_Tk
    var anp_tk_input1 = $('.A_N_P_Tkone'),
        anp_tk_input2 = $('.A_N_P_Tktwo'),

        anp_tk_sibi1 = $('.sibe_A'),
        anp_tk_sibi2 = $('.sibe_B');
    anp_tk_input1.on('click',function(){
        anp_tk_sibi1.css('display','block');
        anp_tk_sibi2.css('display','none');
    });
    anp_tk_input2.on('click',function(){
        anp_tk_sibi2.css('display','block');
        anp_tk_sibi1.css('display','none');
    });
    //点击更换框 A_N_P_Sul
    var anp_ul_li = $('.A_N_P_Sul ul');
    anp_ul_li.on('click','li',function(){
        if(!$(this).hasClass('A_N_P_Sli')){
            $(this).siblings().removeClass('A_N_P_Sli');
            $(this).addClass('A_N_P_Sli');
        }
    });
    var anp_t_a = $('.Add_New_Paper_Tone-a ul');
    anp_t_a.on('click','li',function(){
        if(!$(this).hasClass('A_N_P_Sli')){
            $(this).siblings().removeClass('A_N_P_Sli');
            $(this).addClass('A_N_P_Sli');
        }
    });

    $("#sign").click(function(){
        $.cxDialog({
            title: '添加职位',
            info: $("#signResume").html(),
            lockScroll: true,
            background: '#000',
            width:600,
            height:360,
            okText:"确认",
            ok:function(){
                $(".A_N_P_li").show();
            }
        });
    });
    $("body").on("click",".signResume-btn",function(){
        var txt = $(this).siblings(".signResume-text").val();
        if(txt!=""){
            TagBoxAdd(txt);
            $(this).siblings(".signResume-text").val("");
        }
    });
    $("body").on("click",".signResume-ul li",function(){
        var txt = $(this).text();
        if(txt!=""){
            TagAdd(txt);
        }
    });
    $("body").on("click",".signResume-tag li a",function(){
        $(this).parent().remove();
    });
    function TagAdd(txt){
        var htm ='<li><a href="javascript:void(0)"><span>'+txt+'</span><i></i></a></li>';
        $(".signResume-tag ul").append(htm);
    }

    function TagBoxAdd(txt) {
        var htm = '<li>' + txt + '</li>';
        $(".signResume-ul").append(htm);
    }

    var anp_li_clos = $('.A_N_P_li ul li');
    anp_li_clos.on('click','em',function(){
        $(this).parent().remove();
    });
    //内容切换 A_N_P_Tk
    var anp_tk_input1 = $('.A_N_P_Tkone'),
        anp_tk_input2 = $('.A_N_P_Tktwo'),
        anp_tk_sibi1 = $('.sibe_A'),
        anp_tk_sibi2 = $('.sibe_B');
    anp_tk_input1.on('click',function(){
        anp_tk_sibi1.css('display','block');
        anp_tk_sibi2.css('display','none');
    });
    anp_tk_input2.on('click',function(){
        anp_tk_sibi2.css('display','block');
        anp_tk_sibi1.css('display','none');
    });
    //点击更换框 A_N_P_Sul
    var anp_ul_li = $('.A_N_P_Sul ul');
    anp_ul_li.on('click','li',function(){
        if(!$(this).hasClass('A_N_P_Sli')){
            $(this).siblings().removeClass('A_N_P_Sli');
            $(this).addClass('A_N_P_Sli');
        }
    });
    var anp_t_a = $('.Add_New_Paper_Tone-a ul');
    anp_t_a.on('click','li',function(){
        if(!$(this).hasClass('A_N_P_Sli')){
            $(this).siblings().removeClass('A_N_P_Sli');
            $(this).addClass('A_N_P_Sli');
        }
    });
//add_paper.html
    //弹窗 选择我以往添加过的子卷
    var addpap_t9 = $('.addpap_t9 ul');
    addpap_t9.on('click','li',function(){
        if($(this).parents(".addpap_t9").hasClass("disabled")) {
            return;
        }
        if(!$(this).hasClass('A_N_P_Ali')){
            $(this).siblings().removeClass('A_N_P_Ali');
            $(this).addClass('A_N_P_Ali');
        }
    });

    //弹窗 T6 bt切换
    var addpap_t6 = $('.addpap_t6 ul');
    addpap_t6.on('click','li',function(){
        if(!$(this).hasClass('Add_Paper_T629')){
            $(this).siblings().removeClass('Add_Paper_T629');
            $(this).addClass('Add_Paper_T629');
        }
    });


    var Tone_plus = $('.t-one-plus')
    Tone_plus.click(function () {
        $('.t-one').css('display', 'block');
    });

    var plist_z = $('.plist-bt');
    plist_z.on('click','span',function(){
            if($(this).parents('.plist-table').hasClass('plisttab2')){
                $(this).parents('.plist-table').removeClass('plisttab2');
                $(this).parents('.plist-table').css('height','inherit');
                $(this).html('-');
            }else{
                $(this).parents('.plist-table').addClass('plisttab2');
                $(this).parents('.plist-table').css('height','66px');
                $(this).html('+');
            }
    });

    //有子卷，默认展开
    if($(".plist-ctab2")){
        $(".plist-ctab2").parents(".plist-table").removeClass("plisttab2");
        $(".plist-bt span").html("-");
    }

    //plist-table 不同色背景
    var plist_table = $('.plist-table');
    plist_table.each(function(i,k){
        if(i%=2){
            $(this).css('background','#fff');
        }
    });


    $(".plist .plisttab2 .plist-x .copy").click(function () {
        $.cxDialog({
            title: '复制试卷',
            info: '<div class="cxDialogContent"><table><tr><td><i class="fa fa-exclamation-circle"></i></td><td><span class="fbig fb">您确定要复制吗？</span></td></tr></table> </div>',
            lockScroll: true,
            background: '#000',
            okText: "确定",
            ok: function () {

            },
            noText: "取消",
            no: function () {

            }
        });
    });

    $(".plist-ctab2.able .plist-x .del").click(function () {
        window.acm.paperId = $(this).parents("tr").attr("paperid");
        window.acm.positionId = $(this).parents(".plist-table").attr("positionid");
        $.cxDialog({
            title: '删除试卷',
            info: '<div class="cxDialogContent"><table><tr><td><i class="fa fa-exclamation-triangle"></i></td><td><span class="fbig fb">您确定要删除吗？</span><br> 删除后无法恢复！</td></tr></table> </div>',

            lockScroll: true,
            background: '#000',
            okText: "确定",
            ok: function () {
                $.post("/api/removePaper",{paperId:window.acm.paperId,positionId:window.acm.positionId},function (data) {
                    if(data.errmsg==""){
                        alert("删除子卷成功！",function(){
                            location.reload();
                        });
                    }else{
                        alert(data.errmsg);
                    }
                });
            },
            noText: "取消",
            no: function () {

            }
        });
    });

    $(".plist-ctab2.able .plist-x .up").click(function(){
        window.acm.paperId = $(this).parents("tr").attr("paperid");
        window.acm.positionId = $(this).parents(".plist-table").attr("positionid");
        var dom = $(this).parents("tr");
        var dom1 = $(this).parents("tr").prev();
        if(!dom1.hasClass("tr_header")){
            dom.after(dom1);
            initSortFun(function(){
                dom1.after(dom);
            });
        }
    });
    $(".plist-ctab2.able .plist-x .down").click(function(){
        window.acm.paperId = $(this).parents("tr").attr("paperid");
        window.acm.positionId = $(this).parents(".plist-table").attr("positionid");
        var dom = $(this).parents("tr");
        var dom1 = $(this).parents("tr").next();
        if(dom1.length==1){
            dom1.after(dom);
            initSortFun(function(){
                dom.after(dom1);
            });
        }
    });
    
    var initSortFun = function (callback) {
        var postData=[];
        var orderNo=10;
        $(".plist-table[positionid="+window.acm.positionId+"] tr[paperid="+window.acm.paperId+"]").parent().find("tr.paperData").each(function () {
            $($(this).find("td")[0]).html('子卷' + orderNo/10);
            postData.push({"paperId":$(this).attr("paperid"),"orderNo":orderNo,"positionId": window.acm.positionId});
            orderNo+=10;
        });
        if(postData.length>0){
            $.post("/api/sortPaper",{paperArr:JSON.stringify(postData),positionId:window.acm.positionId},function (data) {
                if(data.errmsg==""){
                }else{
                    callback();
                    alert(data.errmsg);
                }
            });
        }
    }

    /*$(".addNewPaper>span").click(function () {
       /!* $(".new-paper-T").show();*!/
    });*/


    $(".plist .plist-table .plist-ctab2 a.up").click(function () {
        var arrayIndex = $(this).parent().parent().attr("data-arrayindex");
        if (parseInt(arrayIndex) != 1) {
            $(this).parent().parent().parent().find("tr").eq(arrayIndex - 1).before($(this).parent().parent().parent().find("tr").eq(arrayIndex));
            initArraryIndex();
        }
    });
    $(".plist .plist-table .plist-ctab2 a.down").click(function () {
        var arrayIndex = parseInt($(this).parent().parent().attr("data-arrayindex"));
        if (parseInt(arrayIndex) != ($(this).parent().parent().parent().find("tr").length - 1)) {
            $(this).parent().parent().parent().find("tr").eq(arrayIndex+1).after($(this).parent().parent().parent().find("tr").eq(arrayIndex));
            initArraryIndex();
        }
    });


    //锁定试卷
    /*$(".testPaper-list li:nth-child(3)").click(function(){
        var flag= $(this).parents(".plist-x").prev().hasClass("unlocked");
        console.log(flag);
        if(flag){
            $(this).parents(".plist-x").prev().removeClass("unlocked").addClass("locked").children("i").removeClass("fa-unlock")
                .addClass("fa-lock").next().html("已锁定");
            $(this).css({"background":"#eee"}).children("a").css("color","#333");
        }
    });*/


    //选择已有子卷，弹窗
    /*$(".Test_Paper_xNew_Ttwo2").click(function(){
        /!*$('.t-one').css('display', 'none');
        $.cxDialog({
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
        });*!/
    });*/


    //添加试题弹窗
    $('.addQuestion .add.able').on('click',function () {
        var paperData = $(this).parents(".paperData").attr("paperdata");
        var paperData = eval("(" + paperData + ")");

        window.acm.paperId = paperData._id;
        window.acm.positionId = $(this).parents(".plist-table").attr('positionid');
        $(".addQuesChooiseBox .selectQuesLink").attr('href','/ques#/select/'+ window.acm.positionId + '/' + window.acm.paperId);
        $(".addQuesChooiseBox .importQuesLink").attr('href','/ques#/import/'+ window.acm.positionId + '/' + window.acm.paperId);
        var widthV = 854;
        if(paperData.forCode){
            $(".addQuesChooiseBox .addQuessLink").attr('href','/ques#/add/onlinecode/'+ window.acm.positionId + '/' + window.acm.paperId);
            $(".Test_Paper_xNew_Tone.Add_ques_title").hide();
            widthV = 598;
        }else{
            $(".addQuesChooiseBox .addQuessLink").attr('href','/ques#/add/'+ window.acm.positionId + '/' + window.acm.paperId);
            $(".Test_Paper_xNew_Tone.Add_ques_title").show();
            widthV = 854;
        }
        $.cxDialog({
            title: '请选择添加试题方式',width:widthV,
            info: $('.addQuesChooiseBox'),
            lockScroll: true,background: '#000',
        });
    });
    $('.addQuestion .add.disabled,.addQuestion .edit.disable,.plist-ctab2.disable .plist-x a').on('click',function () {
        alert('试卷已锁定，无法操作！');
    });


    $(".testPaper-list").on("click",".randQues",function(){
        var countN = $(this).parents(".plist-table").find(".plist-ctab2").find("tr").length-1;
        $(".select_son_page span").html(countN);
        $(".select_son_page").attr("positionid",$(this).parents(".plist-table").attr("positionid"));

        $.cxDialog({
            title: '抽选答子卷',
            info: $('.select_son_page'),
            lockScroll: true,
            background: '#000',
            width:530,
            height:300,
            okText:"确认",
            ok:function(){
                $.post("",{},function (data) {
                    console.log(data);
                });
            }
        });
    })

    var initArraryIndex = function () {
        $(".plist").find(".plist-table .plist-ctab2").each(function () {
            var indexNum =0;
            $(this).find("tr").each(function () {
                $(this).attr("data-arrayindex", indexNum);
                indexNum++;
            });
        });
    }
    //弹窗关闭 prof_T
    var prof_T_x = $('.profbt_T span'),
        prof_T_xl = $('.closepro'),
        prof_T_xl2 = $('.closepro2'),
        prof_T = $('.prof_T');
    prof_T_x.click(function(){
        $(this).parents('.prof_T').css('display','none');
    });
    prof_T_xl.click(function(){
        $(this).parents('.prof_T').css('display','none');
    });
//input全选
    var Pinp = $('.addman input'),
        Cinp = $('.procen input');
    Pinp.on('click',function(){
        if ($(this).hasClass('Input_zbsk')){
            Cinp.prop("checked",false);
            $(this).removeClass('Input_zbsk');
        }else{
            Cinp.prop("checked",true);
            $(this).addClass('Input_zbsk');
        }
    });
//下拉列表菜单
    var
        ProMb1span = $('.profbj_M_b1 span'),
        ProMtab = $('.profbj_M_b1 table'),
        ProMbinput = $('.profbj_M_binput'),
        ProMbinputz = $('.profbj_M_b1 input');
    ProMb1span.on('click',function(){
        if($(this).hasClass('profbj_M_span')){
            $(this).nextAll('table').hide();
            $(this).html('+');
            $(this).removeClass('profbj_M_span');
            $(this).nextAll('h5').removeClass('cenT29');
        }else{
            $(this).nextAll('table').show();
            $(this).html('-');
            $(this).addClass('profbj_M_span');
            $(this).nextAll('h5').addClass('cenT29');
        }

    });
    ProMtabHide()
    function ProMtabHide(){
        ProMtab.hide();
    }
//下拉列表全选
    ProMbinput.on('click',function(){
        if($(this).hasClass('Input_zbsk')){
            $(this).parent().find('input').prop("checked",false);
            $(this).removeClass('Input_zbsk');
        }else{
            $(this).parent().find('input').prop("checked",true);
            $(this).addClass('Input_zbsk');
        }
    });
    //表格背景条变色
    var TabBac = $('.table-background'),
        TabInp = $('.table-background input');
    TabBac.find('tr').each(function(i){
        if(i%=2){
            $(this).addClass('tbackground');
        }
    });
    TabInp.on('click',function(a){
        if ($(this).hasClass('Input_zbsk')){
            $(this).prop('checked',false);
            $(this).removeClass('Input_zbsk');
            $(this).parents('tr').removeClass('table-back');
        }else{
            $(this).prop('checked',true);
            $(this).addClass('Input_zbsk');
            $(this).parents('tr').addClass('table-back');
        }
    });
    var proSelect = $('select');
    proSelect.on('click',function(){
        $(this).css('color','#333');
    });
    var proInput = $('input');
    proInput.on('click',function(){
        $(this).css('color','#333');
    });

    var Tone = $('#t-one'),
        Ttwo = $('#t-two,#t-two2'),
        Tthree = $('#t-three'),
        Tfour = $('#t-four'),
        Tfive = $('#t-five'),
        Tmove = $('.t-move');
    Tone.click(function(){
        $('.t-one').css('display','block');
    });
    Ttwo.click(function(){
        $('.prof_T').hide();
        $('.t-three .probody_T .profbt_T i').html('添加子卷');
        window.acm.paperId = undefined;
        $('.t-two').css('display','block');
    });
    Tthree.click(function(){
        $('.t-three').css('display','block');
    });
    Tfour.click(function(){
        $('.t-four').css('display','block');
    });
    Tfive.click(function(){
        $('.t-five').css('display','block');
    });
    Tmove.click(function(){
        $('#t-move').css('display','block');
    });


    $(".set_p_r-5cen .del").click(function () {
        debugger;
        var thisP = $(this).parents(".set_p_r-3");
        $.cxDialog({
            title: '删除试题',
            info: '<div class="cxDialogContent"><table><tr><td><i class="fa fa-exclamation-triangle"></i></td><td><span class="fbig fb">您确定要删除吗？</span><br> 删除后无法恢复！</td></tr></table> </div>',
            lockScroll: true,
            background: '#000',
            okText: "确定删除",
            ok: function () {
                thisP.remove();
            },
            noText: "取消",
            no: function () {
            }
        });
    });



    //点击更换框 A_N_P_select
    var anp_sel_ul = $('.A_N_P_select ul');
    anp_sel_ul.on('click','li',function(){
        if(!$(this).hasClass('A_N_P_S_li')){
            $(this).siblings().removeClass('A_N_P_S_li');
            $(this).addClass('A_N_P_S_li');
        }
    });

    //内容切换 A_N_P_Tk
    var anp_tk_input1 = $('.A_N_P_Tkone'),
        anp_tk_input2 = $('.A_N_P_Tktwo'),

        anp_tk_sibi1 = $('.sibe_A'),
        anp_tk_sibi2 = $('.sibe_B');
    anp_tk_input1.on('click',function(){
        anp_tk_sibi1.css('display','block');
        anp_tk_sibi2.css('display','none');
    });
    anp_tk_input2.on('click',function(){
        anp_tk_sibi2.css('display','block');
        anp_tk_sibi1.css('display','none');
    });
    //点击更换框 A_N_P_Sul
    var anp_ul_li = $('.A_N_P_Sul ul');
    anp_ul_li.on('click','li',function(){
        if(!$(this).hasClass('A_N_P_Sli')){
            $(this).siblings().removeClass('A_N_P_Sli');
            $(this).addClass('A_N_P_Sli');
        }
    });
    var anp_t_a = $('.Add_New_Paper_Tone-a ul');
    anp_t_a.on('click','li',function(){
        if(!$(this).hasClass('A_N_P_Sli')){
            $(this).siblings().removeClass('A_N_P_Sli');
            $(this).addClass('A_N_P_Sli');
        }
    });

    $(".fdsafk123 .del").click(function () {
        debugger;
        $.cxDialog({
            title: '删除',
            info: '<div class="cxDialogContent"><table><tr><td><i class="fa fa-exclamation-triangle"></i></td><td><span class="fbig fb">您确定要删除吗？</span><br> 删除后无法恢复！</td></tr></table> </div>',
            lockScroll: true,
            background: '#000',
            width:400,
            okText:"确认",
            ok:function(){

            },
            noText: "取消",
            no: function () {

            }
        });
    });


    $('.lock.abtn').click(function(){
        window.acm.positionId=$(this).parents(".plist-table").attr("positionid");
        $.cxDialog({
            title: '锁定试卷',
            info: '<div style="padding:20px; text-align:center;">你确定要锁定试卷吗？</div>',
            lockScroll: true,
            background: '#000',
            width:300,
            okText:"确认",
            ok:function(){
                $.post("/api/setPositionPrepared",{positionId:window.acm.positionId,prepared:1},function (data) {
                    if(data.errmsg==""){
                        alert("锁定试卷成功！",function(){
                            location.reload();
                        });
                    }else{
                        alert(data.errmsg);
                    }
                });
            },
            noText: "取消",
            no: function () {

            }
        });
    })
    $('.lock.bbtn').click(function(){
        window.acm.positionId=$(this).parents(".plist-table").attr("positionid");
        $.cxDialog({
            title: '解锁试卷',
            info: '<div style="padding:20px; text-align:center;">你确定要解锁试卷吗？</div>',
            lockScroll: true,
            background: '#000',
            width:300,
            okText:"确认",
            ok:function(){
                $.post("/api/setPositionPrepared",{positionId:window.acm.positionId,prepared:0},function (data) {
                    if(data.errmsg==""){
                        alert("解锁试卷成功！",function(){
                            location.reload();
                        });
                    }else{
                        alert(data.errmsg);
                    }
                });
            },
            noText: "取消",
            no: function () {

            }
        });
    })



}

var positionid = '';


$(document).on('click','.xzsj-tab tr input:checkbox',function(){
    if($(this).is('input:checked')){
        $(this).parent().siblings('td').find('span').addClass('color-blue')
        $(this).parent().siblings('td').find('h2').addClass('color-blue')
    }else{
        $(this).parent().siblings('td').find('h2').removeClass('color-blue')
        $(this).parent().siblings('td').find('span').removeClass('color-blue')
    }
})

$(function () {
    $('.choutiInput').keyup(function(){
        var str=$(this).val();
        if(!str||isNaN(str)){
            $(this).val('')
        } else{
            if(str.indexOf(".")>-1){
                $(this).val(returnInt(str));
            }
        }
    })
    $('.Add_Paper_T9-3 .input').keyup(function(){
        var str=$(this).val();
        if(!str||isNaN(str)){
            $(this).val('')
        }else if(str.indexOf("0")==0){
            $(this).val('')
        } else{
            if(str.indexOf(".")>-1){
                $(this).val(returnInt(str));
            }
        }
    })
    function returnInt(value){
        var xsd=value.toString().split(".");
        if(xsd.length==1){
            return value;
        }
        if(xsd.length>1){
            if(xsd[1].length>=2){
                value = xsd[0];
            }
            return value;
        }
    }

})



