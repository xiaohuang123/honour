/**
 * Created by wangguoxiang on 2017/3/27 0027.
 * on 2017/3/27 0027.
 * contact me by QQ:794153926
 */
$(document).ready(function () {
    $("body").append('<div class="footer">'+
            '<div class="public">'+
                '<div class="footer-left" style="width:60%">'+
                    '<div class="footer-logo" style="margin-top: -5px;padding-top:0px;">'+
                        '<img src="https://kaosys.acmcoder.com/images/blogo.png" style=" position: relative;left: -32px;top: 2px;" />'+
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
                        '<span class="inputSpan">All Rights Reversed 京ICP备15012255-1</span>'+
                    '</div>'+
                '</div>'+
                '<div class="footer-right" style="width:40%;float: left;padding-top: 40px;text-align: center;line-height: 17px;">'+
                    '<table style="line-height: 26px;text-align: center;">'+
                      '<tbody>'+
                      '<tr>'+
                      '<td width="100"><img src="https://kaosys.acmcoder.com/images/f-phone.png"></td>'+
                     '<td style="font-size: 14px;width:200px">客服热线：010-85359782<br>销售热线：010-85359766</td>'+
                     '<td style="font-size: 14px;"><a class="weixinPng" href="javascript:void(0)" style="color:white;position: relative;"><img src="https://kaosys.acmcoder.com/images/f-weixin.png"> &nbsp;&nbsp;iamacmcoder<img class="hide" style="width: 80px;position: absolute;left: 130px;top: -50px;" src="https://kaosys.acmcoder.com/images/saimaweixin.jpg"></a><br>'+
                     '<a href="javascript:void(0)" style="color:white"><img src="https://kaosys.acmcoder.com/images/f-qq.png"> &nbsp;&nbsp;2531743633</a><br></td>'+
                       '</tr>'+
                   '</tbody>'+
                   '</table>'+
                    
                '</div>'+
            '</div>'+
        '</div>');
    if(location.href.indexOf("91saima")>-1){
        $('.inputSpan').html('All Rights Reversed 京ICP备15012255-4')
    }
    else {
        $('.inputSpan').html('All Rights Reversed 京ICP备15012255-1')
    }
});
