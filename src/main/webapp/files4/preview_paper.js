$(function(){

    ////展开
    //var sp_zk = $('.proMsx_zk');
    //sp_zk.on('click',function(){
    //    if($(this).parents('.set_p_r-3').hasClass('sp_zk')){
    //        $(this).parents('.set_p_r-3').removeClass('sp_zk');
    //    }else{
    //        $(this).parents('.set_p_r-3').addClass('sp_zk');
    //    }
    //    console.log($(this).parents('set_p_r-3'))
    //});
    //var sp_x_clos = $('.set_p_r-bt span');
    //sp_x_clos.on('click',function(){
        
    //    var sp_xclo1 = $(this).parents('.set_p_r').attr('class');
    //    var sp_xclo2 = sp_xclo1.split(' ');
    //    console.log(sp_xclo2[1]);
    //    $('.'+sp_xclo2[1]).remove();
    //});


    $(".set_p_r-3btl").click(function () {
        if ($(this).find(".fa").hasClass("fa-angle-up")) {
            $(this).find(".fa").addClass("fa-angle-down").removeClass("fa-angle-up");
            $(this).find("span").html("展开");
            $(this).parents('.set_p_r-3').addClass('sp_zk');

        } else {
            $(this).find(".fa").removeClass("fa-angle-down").addClass("fa-angle-up");
            $(this).find("span").html("收起");
            $(this).parents('.set_p_r-3').removeClass('sp_zk');
        }
    });

    $("#t-two").click(function () {
        $(".set_p_r-3.set_p_r-4").hide();
        $(this).siblings().removeClass("cur");
        if (!$(this).hasClass("cur")) { $(this).addClass("cur"); }
    });
    $("#t-one").click(function () {
        $(".set_p_r-3.set_p_r-4").show();
        $(this).siblings().removeClass("cur");
        if (!$(this).hasClass("cur")) { $(this).addClass("cur"); }
    });
});