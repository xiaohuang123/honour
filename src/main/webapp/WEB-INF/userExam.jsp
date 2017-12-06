<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style type="text/css">@charset "UTF-8";[ng\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-animate-anchor{position:absolute;}</style>
    <title>考试试卷</title>
    <link rel="icon" type="image/ico" href="https://image.acmcoder.com/assets/public/v1.0/exam/images/favicon.ico">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/files/bootstrap.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/files/font-awesome.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/files/main.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/files/mydomain.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/files/animate.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/files/main.v1.css">

    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/files/codemirror.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/files/eclipse.css">

    <style type="text/css">
        .leftMenu { padding: 0px 0px; }
        .leftMenu h4 { font-size:16px; line-height: 46px; }
    </style>


    <script src="${pageContext.request.contextPath}/files/hm.js"></script><script type="text/javascript" src="${pageContext.request.contextPath}/files/clipboard.min.js"></script>


    <script src="${pageContext.request.contextPath}/files/sea.js" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/files/Promise.js" type="text/javascript" language="JavaScript"></script>

    <script src="${pageContext.request.contextPath}/files/jquery-1.11.3.min.js" type="text/javascript" language="JavaScript"></script>

    <script type="text/javascript" src="${pageContext.request.contextPath}/files/jquery.cookie.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/files/headerBtns.js"></script>

    <script src="${pageContext.request.contextPath}/files/jslib.js" language="JavaScript" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/files/require.js" language="JavaScript" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/files/Cookie.js" language="JavaScript" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/files/bootstrap.min.js" type="text/javascript" language="JavaScript"></script>

    <script src="${pageContext.request.contextPath}/files/angular.min.js" type="text/javascript" language="JavaScript"></script>
    <script src="${pageContext.request.contextPath}/files/angular-route.min.js" type="text/javascript" language="JavaScript"></script>
    <script src="${pageContext.request.contextPath}/files/angular-ui-router.js" type="text/javascript" language="JavaScript"></script>
    <script src="${pageContext.request.contextPath}/files/angular-animate.min.js" type="text/javascript" language="JavaScript"></script>
    <script language="javascript" type="text/javascript" src="${pageContext.request.contextPath}/files/angularExt.js"></script>


    <script src="${pageContext.request.contextPath}/files/highlight.pack.js"></script>

    <script language="javascript" type="text/javascript">
        var lft = '';
        var module = { exports: {} };
        var exports = module.exports;
    </script>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/files/jquery.cxdialog.css">
    <script type="text/javascript" src="${pageContext.request.contextPath}/files/jquery.cxdialog.js"></script>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/files/pagination.css">
    <script type="text/javascript" src="${pageContext.request.contextPath}/files/jquery.pagination.js"></script>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/files/jquery.easydropdown.css">
    <script type="text/javascript" src="${pageContext.request.contextPath}/files/jquery.easydropdown.js"></script>


    <script src="${pageContext.request.contextPath}/files/ueditor.config.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath}/files/ueditor.all.js" type="text/javascript" charset="utf-8"></script>

    <script src="${pageContext.request.contextPath}/files/jquery.form.js"></script>
    <script src="${pageContext.request.contextPath}/files/jquery.uploadfile.js"></script>
    <link href="${pageContext.request.contextPath}/files/uploadfile.css" rel="stylesheet">

    <script type="text/javascript" src="${pageContext.request.contextPath}/files/MathJax.js"></script>
    <script src="${pageContext.request.contextPath}/files/sender.js" type="text/javascript"></script>
    <script>
        function onlogin(){
            console.log("websocket connected!");
        }
    </script>
<style type="text/css">.MathJax_Hover_Frame {border-radius: .25em; -webkit-border-radius: .25em; -moz-border-radius: .25em; -khtml-border-radius: .25em; box-shadow: 0px 0px 15px #83A; -webkit-box-shadow: 0px 0px 15px #83A; -moz-box-shadow: 0px 0px 15px #83A; -khtml-box-shadow: 0px 0px 15px #83A; border: 1px solid #A6D ! important; display: inline-block; position: absolute}
.MathJax_Menu_Button .MathJax_Hover_Arrow {position: absolute; cursor: pointer; display: inline-block; border: 2px solid #AAA; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px; font-family: 'Courier New',Courier; font-size: 9px; color: #F0F0F0}
.MathJax_Menu_Button .MathJax_Hover_Arrow span {display: block; background-color: #AAA; border: 1px solid; border-radius: 3px; line-height: 0; padding: 4px}
.MathJax_Hover_Arrow:hover {color: white!important; border: 2px solid #CCC!important}
.MathJax_Hover_Arrow:hover span {background-color: #CCC!important}
</style><style type="text/css">#MathJax_About {position: fixed; left: 50%; width: auto; text-align: center; border: 3px outset; padding: 1em 2em; background-color: #DDDDDD; color: black; cursor: default; font-family: message-box; font-size: 120%; font-style: normal; text-indent: 0; text-transform: none; line-height: normal; letter-spacing: normal; word-spacing: normal; word-wrap: normal; white-space: nowrap; float: none; z-index: 201; border-radius: 15px; -webkit-border-radius: 15px; -moz-border-radius: 15px; -khtml-border-radius: 15px; box-shadow: 0px 10px 20px #808080; -webkit-box-shadow: 0px 10px 20px #808080; -moz-box-shadow: 0px 10px 20px #808080; -khtml-box-shadow: 0px 10px 20px #808080; filter: progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')}
#MathJax_About.MathJax_MousePost {outline: none}
.MathJax_Menu {position: absolute; background-color: white; color: black; width: auto; padding: 2px; border: 1px solid #CCCCCC; margin: 0; cursor: default; font: menu; text-align: left; text-indent: 0; text-transform: none; line-height: normal; letter-spacing: normal; word-spacing: normal; word-wrap: normal; white-space: nowrap; float: none; z-index: 201; box-shadow: 0px 10px 20px #808080; -webkit-box-shadow: 0px 10px 20px #808080; -moz-box-shadow: 0px 10px 20px #808080; -khtml-box-shadow: 0px 10px 20px #808080; filter: progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')}
.MathJax_MenuItem {padding: 2px 2em; background: transparent}
.MathJax_MenuArrow {position: absolute; right: .5em; padding-top: .25em; color: #666666; font-size: .75em}
.MathJax_MenuActive .MathJax_MenuArrow {color: white}
.MathJax_MenuArrow.RTL {left: .5em; right: auto}
.MathJax_MenuCheck {position: absolute; left: .7em}
.MathJax_MenuCheck.RTL {right: .7em; left: auto}
.MathJax_MenuRadioCheck {position: absolute; left: 1em}
.MathJax_MenuRadioCheck.RTL {right: 1em; left: auto}
.MathJax_MenuLabel {padding: 2px 2em 4px 1.33em; font-style: italic}
.MathJax_MenuRule {border-top: 1px solid #CCCCCC; margin: 4px 1px 0px}
.MathJax_MenuDisabled {color: GrayText}
.MathJax_MenuActive {background-color: Highlight; color: HighlightText}
.MathJax_MenuDisabled:focus, .MathJax_MenuLabel:focus {background-color: #E8E8E8}
.MathJax_ContextMenu:focus {outline: none}
.MathJax_ContextMenu .MathJax_MenuItem:focus {outline: none}
#MathJax_AboutClose {top: .2em; right: .2em}
.MathJax_Menu .MathJax_MenuClose {top: -10px; left: -10px}
.MathJax_MenuClose {position: absolute; cursor: pointer; display: inline-block; border: 2px solid #AAA; border-radius: 18px; -webkit-border-radius: 18px; -moz-border-radius: 18px; -khtml-border-radius: 18px; font-family: 'Courier New',Courier; font-size: 24px; color: #F0F0F0}
.MathJax_MenuClose span {display: block; background-color: #AAA; border: 1.5px solid; border-radius: 18px; -webkit-border-radius: 18px; -moz-border-radius: 18px; -khtml-border-radius: 18px; line-height: 0; padding: 8px 0 6px}
.MathJax_MenuClose:hover {color: white!important; border: 2px solid #CCC!important}
.MathJax_MenuClose:hover span {background-color: #CCC!important}
.MathJax_MenuClose:hover:focus {outline: none}
</style><style type="text/css">.MathJax_Preview .MJXf-math {color: inherit!important}
</style><style type="text/css">.MJX_Assistive_MathML {position: absolute!important; top: 0; left: 0; clip: rect(1px, 1px, 1px, 1px); padding: 1px 0 0 0!important; border: 0!important; height: 1px!important; width: 1px!important; overflow: hidden!important; display: block!important; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none}
.MJX_Assistive_MathML.MJX_Assistive_MathML_Block {width: 100%!important}
</style><style type="text/css">#MathJax_Zoom {position: absolute; background-color: #F0F0F0; overflow: auto; display: block; z-index: 301; padding: .5em; border: 1px solid black; margin: 0; font-weight: normal; font-style: normal; text-align: left; text-indent: 0; text-transform: none; line-height: normal; letter-spacing: normal; word-spacing: normal; word-wrap: normal; white-space: nowrap; float: none; -webkit-box-sizing: content-box; -moz-box-sizing: content-box; box-sizing: content-box; box-shadow: 5px 5px 15px #AAAAAA; -webkit-box-shadow: 5px 5px 15px #AAAAAA; -moz-box-shadow: 5px 5px 15px #AAAAAA; -khtml-box-shadow: 5px 5px 15px #AAAAAA; filter: progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')}
#MathJax_ZoomOverlay {position: absolute; left: 0; top: 0; z-index: 300; display: inline-block; width: 100%; height: 100%; border: 0; padding: 0; margin: 0; background-color: white; opacity: 0; filter: alpha(opacity=0)}
#MathJax_ZoomFrame {position: relative; display: inline-block; height: 0; width: 0}
#MathJax_ZoomEventTrap {position: absolute; left: 0; top: 0; z-index: 302; display: inline-block; border: 0; padding: 0; margin: 0; background-color: white; opacity: 0; filter: alpha(opacity=0)}
</style><style type="text/css">.MathJax_Preview {color: #888}
#MathJax_Message {position: fixed; left: 1em; bottom: 1.5em; background-color: #E6E6E6; border: 1px solid #959595; margin: 0px; padding: 2px 8px; z-index: 102; color: black; font-size: 80%; width: auto; white-space: nowrap}
#MathJax_MSIE_Frame {position: absolute; top: 0; left: 0; width: 0px; z-index: 101; border: 0px; margin: 0px; padding: 0px}
.MathJax_Error {color: #CC0000; font-style: italic}
</style><style type="text/css">.MJXp-script {font-size: .8em}
.MJXp-right {-webkit-transform-origin: right; -moz-transform-origin: right; -ms-transform-origin: right; -o-transform-origin: right; transform-origin: right}
.MJXp-bold {font-weight: bold}
.MJXp-italic {font-style: italic}
.MJXp-scr {font-family: MathJax_Script,'Times New Roman',Times,STIXGeneral,serif}
.MJXp-frak {font-family: MathJax_Fraktur,'Times New Roman',Times,STIXGeneral,serif}
.MJXp-sf {font-family: MathJax_SansSerif,'Times New Roman',Times,STIXGeneral,serif}
.MJXp-cal {font-family: MathJax_Caligraphic,'Times New Roman',Times,STIXGeneral,serif}
.MJXp-mono {font-family: MathJax_Typewriter,'Times New Roman',Times,STIXGeneral,serif}
.MJXp-largeop {font-size: 150%}
.MJXp-largeop.MJXp-int {vertical-align: -.2em}
.MJXp-math {display: inline-block; line-height: 1.2; text-indent: 0; font-family: 'Times New Roman',Times,STIXGeneral,serif; white-space: nowrap; border-collapse: collapse}
.MJXp-display {display: block; text-align: center; margin: 1em 0}
.MJXp-math span {display: inline-block}
.MJXp-box {display: block!important; text-align: center}
.MJXp-box:after {content: " "}
.MJXp-rule {display: block!important; margin-top: .1em}
.MJXp-char {display: block!important}
.MJXp-mo {margin: 0 .15em}
.MJXp-mfrac {margin: 0 .125em; vertical-align: .25em}
.MJXp-denom {display: inline-table!important; width: 100%}
.MJXp-denom > * {display: table-row!important}
.MJXp-surd {vertical-align: top}
.MJXp-surd > * {display: block!important}
.MJXp-script-box > *  {display: table!important; height: 50%}
.MJXp-script-box > * > * {display: table-cell!important; vertical-align: top}
.MJXp-script-box > *:last-child > * {vertical-align: bottom}
.MJXp-script-box > * > * > * {display: block!important}
.MJXp-mphantom {visibility: hidden}
.MJXp-munderover {display: inline-table!important}
.MJXp-over {display: inline-block!important; text-align: center}
.MJXp-over > * {display: block!important}
.MJXp-munderover > * {display: table-row!important}
.MJXp-mtable {vertical-align: .25em; margin: 0 .125em}
.MJXp-mtable > * {display: inline-table!important; vertical-align: middle}
.MJXp-mtr {display: table-row!important}
.MJXp-mtd {display: table-cell!important; text-align: center; padding: .5em 0 0 .5em}
.MJXp-mtr > .MJXp-mtd:first-child {padding-left: 0}
.MJXp-mtr:first-child > .MJXp-mtd {padding-top: 0}
.MJXp-mlabeledtr {display: table-row!important}
.MJXp-mlabeledtr > .MJXp-mtd:first-child {padding-left: 0}
.MJXp-mlabeledtr:first-child > .MJXp-mtd {padding-top: 0}
.MJXp-merror {background-color: #FFFF88; color: #CC0000; border: 1px solid #CC0000; padding: 1px 3px; font-style: normal; font-size: 90%}
.MJXp-scale0 {-webkit-transform: scaleX(.0); -moz-transform: scaleX(.0); -ms-transform: scaleX(.0); -o-transform: scaleX(.0); transform: scaleX(.0)}
.MJXp-scale1 {-webkit-transform: scaleX(.1); -moz-transform: scaleX(.1); -ms-transform: scaleX(.1); -o-transform: scaleX(.1); transform: scaleX(.1)}
.MJXp-scale2 {-webkit-transform: scaleX(.2); -moz-transform: scaleX(.2); -ms-transform: scaleX(.2); -o-transform: scaleX(.2); transform: scaleX(.2)}
.MJXp-scale3 {-webkit-transform: scaleX(.3); -moz-transform: scaleX(.3); -ms-transform: scaleX(.3); -o-transform: scaleX(.3); transform: scaleX(.3)}
.MJXp-scale4 {-webkit-transform: scaleX(.4); -moz-transform: scaleX(.4); -ms-transform: scaleX(.4); -o-transform: scaleX(.4); transform: scaleX(.4)}
.MJXp-scale5 {-webkit-transform: scaleX(.5); -moz-transform: scaleX(.5); -ms-transform: scaleX(.5); -o-transform: scaleX(.5); transform: scaleX(.5)}
.MJXp-scale6 {-webkit-transform: scaleX(.6); -moz-transform: scaleX(.6); -ms-transform: scaleX(.6); -o-transform: scaleX(.6); transform: scaleX(.6)}
.MJXp-scale7 {-webkit-transform: scaleX(.7); -moz-transform: scaleX(.7); -ms-transform: scaleX(.7); -o-transform: scaleX(.7); transform: scaleX(.7)}
.MJXp-scale8 {-webkit-transform: scaleX(.8); -moz-transform: scaleX(.8); -ms-transform: scaleX(.8); -o-transform: scaleX(.8); transform: scaleX(.8)}
.MJXp-scale9 {-webkit-transform: scaleX(.9); -moz-transform: scaleX(.9); -ms-transform: scaleX(.9); -o-transform: scaleX(.9); transform: scaleX(.9)}
.MathJax_PHTML .noError {vertical-align: ; font-size: 90%; text-align: left; color: black; padding: 1px 3px; border: 1px solid}
</style><style type="text/css">.MathJax_Display {text-align: center; margin: 1em 0em; position: relative; display: block!important; text-indent: 0; max-width: none; max-height: none; min-width: 0; min-height: 0; width: 100%}
.MathJax .merror {background-color: #FFFF88; color: #CC0000; border: 1px solid #CC0000; padding: 1px 3px; font-style: normal; font-size: 90%}
.MathJax .MJX-monospace {font-family: monospace}
.MathJax .MJX-sans-serif {font-family: sans-serif}
#MathJax_Tooltip {background-color: InfoBackground; color: InfoText; border: 1px solid black; box-shadow: 2px 2px 5px #AAAAAA; -webkit-box-shadow: 2px 2px 5px #AAAAAA; -moz-box-shadow: 2px 2px 5px #AAAAAA; -khtml-box-shadow: 2px 2px 5px #AAAAAA; filter: progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true'); padding: 3px 4px; z-index: 401; position: absolute; left: 0; top: 0; width: auto; height: auto; display: none}
.MathJax {display: inline; font-style: normal; font-weight: normal; line-height: normal; font-size: 100%; font-size-adjust: none; text-indent: 0; text-align: left; text-transform: none; letter-spacing: normal; word-spacing: normal; word-wrap: normal; white-space: nowrap; float: none; direction: ltr; max-width: none; max-height: none; min-width: 0; min-height: 0; border: 0; padding: 0; margin: 0}
.MathJax:focus, body :focus .MathJax {display: inline-table}
.MathJax.MathJax_FullWidth {text-align: center; display: table-cell!important; width: 10000em!important}
.MathJax img, .MathJax nobr, .MathJax a {border: 0; padding: 0; margin: 0; max-width: none; max-height: none; min-width: 0; min-height: 0; vertical-align: 0; line-height: normal; text-decoration: none}
img.MathJax_strut {border: 0!important; padding: 0!important; margin: 0!important; vertical-align: 0!important}
.MathJax span {display: inline; position: static; border: 0; padding: 0; margin: 0; vertical-align: 0; line-height: normal; text-decoration: none}
.MathJax nobr {white-space: nowrap!important}
.MathJax img {display: inline!important; float: none!important}
.MathJax * {transition: none; -webkit-transition: none; -moz-transition: none; -ms-transition: none; -o-transition: none}
.MathJax_Processing {visibility: hidden; position: fixed; width: 0; height: 0; overflow: hidden}
.MathJax_Processed {display: none!important}
.MathJax_ExBox {display: block!important; overflow: hidden; width: 1px; height: 60ex; min-height: 0; max-height: none}
.MathJax .MathJax_EmBox {display: block!important; overflow: hidden; width: 1px; height: 60em; min-height: 0; max-height: none}
.MathJax_LineBox {display: table!important}
.MathJax_LineBox span {display: table-cell!important; width: 10000em!important; min-width: 0; max-width: none; padding: 0; border: 0; margin: 0}
.MathJax .MathJax_HitBox {cursor: text; background: white; opacity: 0; filter: alpha(opacity=0)}
.MathJax .MathJax_HitBox * {filter: none; opacity: 1; background: transparent}
#MathJax_Tooltip * {filter: none; opacity: 1; background: transparent}
@font-face {font-family: MathJax_Main; src: url('https://cdn.acmcoder.com/static/1.0.1/plugins/MathJax-master/fonts/HTML-CSS/TeX/woff/MathJax_Main-Regular.woff?V=2.7.2-beta.1') format('woff'), url('https://cdn.acmcoder.com/static/1.0.1/plugins/MathJax-master/fonts/HTML-CSS/TeX/otf/MathJax_Main-Regular.otf?V=2.7.2-beta.1') format('opentype')}
@font-face {font-family: MathJax_Main-bold; src: url('https://cdn.acmcoder.com/static/1.0.1/plugins/MathJax-master/fonts/HTML-CSS/TeX/woff/MathJax_Main-Bold.woff?V=2.7.2-beta.1') format('woff'), url('https://cdn.acmcoder.com/static/1.0.1/plugins/MathJax-master/fonts/HTML-CSS/TeX/otf/MathJax_Main-Bold.otf?V=2.7.2-beta.1') format('opentype')}
@font-face {font-family: MathJax_Main-italic; src: url('https://cdn.acmcoder.com/static/1.0.1/plugins/MathJax-master/fonts/HTML-CSS/TeX/woff/MathJax_Main-Italic.woff?V=2.7.2-beta.1') format('woff'), url('https://cdn.acmcoder.com/static/1.0.1/plugins/MathJax-master/fonts/HTML-CSS/TeX/otf/MathJax_Main-Italic.otf?V=2.7.2-beta.1') format('opentype')}
@font-face {font-family: MathJax_Math-italic; src: url('https://cdn.acmcoder.com/static/1.0.1/plugins/MathJax-master/fonts/HTML-CSS/TeX/woff/MathJax_Math-Italic.woff?V=2.7.2-beta.1') format('woff'), url('https://cdn.acmcoder.com/static/1.0.1/plugins/MathJax-master/fonts/HTML-CSS/TeX/otf/MathJax_Math-Italic.otf?V=2.7.2-beta.1') format('opentype')}
@font-face {font-family: MathJax_Caligraphic; src: url('https://cdn.acmcoder.com/static/1.0.1/plugins/MathJax-master/fonts/HTML-CSS/TeX/woff/MathJax_Caligraphic-Regular.woff?V=2.7.2-beta.1') format('woff'), url('https://cdn.acmcoder.com/static/1.0.1/plugins/MathJax-master/fonts/HTML-CSS/TeX/otf/MathJax_Caligraphic-Regular.otf?V=2.7.2-beta.1') format('opentype')}
@font-face {font-family: MathJax_Size1; src: url('https://cdn.acmcoder.com/static/1.0.1/plugins/MathJax-master/fonts/HTML-CSS/TeX/woff/MathJax_Size1-Regular.woff?V=2.7.2-beta.1') format('woff'), url('https://cdn.acmcoder.com/static/1.0.1/plugins/MathJax-master/fonts/HTML-CSS/TeX/otf/MathJax_Size1-Regular.otf?V=2.7.2-beta.1') format('opentype')}
@font-face {font-family: MathJax_Size2; src: url('https://cdn.acmcoder.com/static/1.0.1/plugins/MathJax-master/fonts/HTML-CSS/TeX/woff/MathJax_Size2-Regular.woff?V=2.7.2-beta.1') format('woff'), url('https://cdn.acmcoder.com/static/1.0.1/plugins/MathJax-master/fonts/HTML-CSS/TeX/otf/MathJax_Size2-Regular.otf?V=2.7.2-beta.1') format('opentype')}
@font-face {font-family: MathJax_Size3; src: url('https://cdn.acmcoder.com/static/1.0.1/plugins/MathJax-master/fonts/HTML-CSS/TeX/woff/MathJax_Size3-Regular.woff?V=2.7.2-beta.1') format('woff'), url('https://cdn.acmcoder.com/static/1.0.1/plugins/MathJax-master/fonts/HTML-CSS/TeX/otf/MathJax_Size3-Regular.otf?V=2.7.2-beta.1') format('opentype')}
@font-face {font-family: MathJax_Size4; src: url('https://cdn.acmcoder.com/static/1.0.1/plugins/MathJax-master/fonts/HTML-CSS/TeX/woff/MathJax_Size4-Regular.woff?V=2.7.2-beta.1') format('woff'), url('https://cdn.acmcoder.com/static/1.0.1/plugins/MathJax-master/fonts/HTML-CSS/TeX/otf/MathJax_Size4-Regular.otf?V=2.7.2-beta.1') format('opentype')}
.MathJax .noError {vertical-align: ; font-size: 90%; text-align: left; color: black; padding: 1px 3px; border: 1px solid}
</style></head>
<body ng-app="ngCompApp" class="ng-scope"><div id="MathJax_Message" style="display: none;"></div><div style="visibility: hidden; overflow: hidden; position: absolute; top: 0px; height: 1px; width: auto; padding: 0px; border: 0px; margin: 0px; text-align: left; text-indent: 0px; text-transform: none; line-height: normal; letter-spacing: normal; word-spacing: normal;"><div id="MathJax_Hidden"></div></div>
<a class="showQQMess" target="_blank" href="http://wpa.qq.com/msgrd?v=3&amp;uin=2531743633&amp;site=qq&amp;menu=yes"><img style="width:70px; height:110px;" border="0" src="${pageContext.request.contextPath}/files/QQ20170905.png" alt="赛码网" title="赛码网"></a>

<input type="hidden" id="did" name="did" value="59bf94638d9ede67f839406b">
    <div class="">
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container-fluid container" style="height: 60px; min-height: 60px">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
                    <span class="sr-only">切换导航</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" style="padding: 0px; margin-left: 0px;margin-top: 6px;display: inline-block;max-width:120px;text-align: center;line-height: 56px;height: 56px;margin-top: 0px;" href="https://kao.acmcoder.com/b/"><img style="max-height: 100%;max-width: 100%;display: inline;" src="${pageContext.request.contextPath}/files/logo.png" alt="ACMcoder"></a>
                <p class="examCenter"><span>考试中心</span></p>
            </div>
            <div class="collapse navbar-collapse" id="navbar-collapse">
                <ul  style="margin-left:300px;font-size: 30px;">
                <li><a href="${pageContext.request.contextPath}/toUserExam.do?rank=${loginUser.rank}"><i
							class="icon-plus-sign"></i>我的试卷</a></li>
				</ul> 
                <ul class="nav navbar-nav userLinks navbar-right hidden-xs" style="margin-right:10px;">
                    <li class="dropdownLoginOut">
                        <a id="aemail" href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="icon-cogs"></i>
                    
                            <p style="margin-right: 20px;font-family: 楷体;color: red;font-size:22px;">${loginUser.name}</p>
                             <p style="margin-right: 35px;color:silver; font-size: 15px;">VIP_${loginUser.rank}</p>
                             <b class="" style="margin-left:6px">
                                 <i class="fa fa-angle-down" style="color: #999;position: relative;top: 2px;"></i>
                             </b>

                            <table class="headlogotable">
                                <tbody><tr>
                                    <td>
                                        <img src="${pageContext.request.contextPath}/files/cs50010.png"  class="hgimg userLogo">
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </a>

                        <ul id="uemail" class="dropdown-menu w100" style="left: inherit;right: 5px; width: 110px;"><li style="text-align: center;width: 110px;height: 32px;">
                        <a style="width: 108px;padding: 8px 0px;font-size: 12px;" href="https://kao.acmcoder.com/b/accountInfo">
                        <img src="${pageContext.request.contextPath}/files/person.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;个人信息</a></li>
                        <li style="text-align: center;width: 110px;height: 32px;"><a style="width: 108px;padding: 8px 0px;font-size: 12px;" href="https://kao.acmcoder.com/b/entInfo"><img src="${pageContext.request.contextPath}/files/compnew.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;公司信息</a></li>
                        <li style="text-align: center;width: 110px;height: 32px;"><a style="width: 108px;padding: 8px 0px;font-size: 12px;" href="https://kao.acmcoder.com/b/compSet"><img src="${pageContext.request.contextPath}/files/testnew2.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;考试信息</a></li>
                        <li class="yonghuGuanli" style="text-align: center;width: 110px;height: 32px;"><a style="width: 108px;padding: 8px 0px;font-size: 12px;" href="https://kao.acmcoder.com/b/userSet"><img src="${pageContext.request.contextPath}/files/cog.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;用户管理</a></li>
                        <li style="text-align: center;width: 110px;height: 32px;"><a style="width:108px;padding: 8px 0px;font-size: 12px;" href="javascript:void(0)" class="logOut" data-href="https://kao.acmcoder.com/enterprise/login"><img src="${pageContext.request.contextPath}/files/exit.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;退出登陆</a></li></ul>
                    </li>
                    
                </ul>
            </div> 
        </div>
    </nav>
    <div class="banner_list">
        

    <div id="container" class="container">


        <div class="cont">

            <div class="col-md-12" style="">
                <div class="allBox" style="width: 1100px;box-shadow: 0px 1px 4px rgba(0,0,0,0.1);">
               

<script language="javascript" type="text/javascript">
    lft = 'mypaper';
</script>



<!-- ngView:  --><div class="ng-scope" ng-view=""><link rel="stylesheet" href="${pageContext.request.contextPath}/files/all_user_PT.css" class="ng-scope">
<link rel="stylesheet" href="${pageContext.request.contextPath}/files/project.css" class="ng-scope">
<link rel="stylesheet" href="${pageContext.request.contextPath}/files/test-paper.css" class="ng-scope">

<div class="plist test_public myPositionList ng-scope">
    <div class="topbt topbt-2">
        <h3>考试试卷</h3>
    </div>
    <div class="pageShow">
    <div class="con_top addNewPaper">
       <!-- <div class="fl">
            <select id="prjList" class="hide"></select>
        </div>-->
        <div style="position:absolute;top:70px;">
            <input class="select-n" type="text" placeholder="试卷名称关键字">
            <a class="select-t" href="javascript:void(0)"></a>
        </div>
      	<div align="center">
            <font style="color: red;font-family: 楷体;font-size: 20px;">${vipmsg}</font>
       </div>
        <span style="text-align: center;" id="addSiama"><a href="${pageContext.request.contextPath}/showErrorQuestion.do?uid=${loginUser.uid}" ng-click="newPaper()">查看我的错题</a></span>
         <span style="width:20px;background-color: silver;">|</span>
        <span style="text-align: center;" id="addSiama"><a href="${pageContext.request.contextPath}/randomQuestion.do" ng-click="newPaper()">随机刷试题</a></span>
        <span style="width:20px;background-color: silver;">|</span>
        <span style="text-align: center;" id="addSiama"><a href="${pageContext.request.contextPath}/vipRandomQuestion.do?rank=${loginUser.rank}" ng-click="newPaper()">提升用户VIP</a></span>
       
    </div>

    <table class="public-tab">
        <tbody><tr align="center" valign="middle">
            <td width="300">试卷名称<!--{{ positions.length }}--></td>
            <td width="100">子卷数</td>
            <td width="100">总题数</td>
            <td width="100">总分值</td>
            <td width="100">总时长</td>
            <!-- ngIf: jurisdiction[1].p ==1 -->
            <td width="135">试卷级别</td>
            <td>考试</td>
        </tr>
        </tbody></table>
<c:if test="${testPaper != null}">
<c:forEach items="${testPaper}" var="p">
	
	<div class="plist-table ng-scope" ng-repeat="p in positions" positionid="59bf94649884314cc6ebd8b8">
        <table class="plist-ctab" data-positiontitle="赛码样卷（示例）" data-aftertitle="Demo体验使用" data-timetype="0" data-opentype="" data-opentime="0" data-papercode="">
            <tbody>
            <tr align="center" data-paper="[{&quot;_id&quot;:&quot;59bf94649884314cc6ebd8b9&quot;,&quot;title&quot;:&quot;选择题（示例）&quot;,&quot;name&quot;:&quot;&quot;,&quot;quesNum&quot;:10,&quot;fenzhi&quot;:&quot;40.0&quot;,&quot;allTime&quot;:20,&quot;quesPrev&quot;:true,&quot;editAnswerAfterSubmit&quot;:false,&quot;forCode&quot;:false,&quot;createDate&quot;:&quot;2017-09-18T09:39:48.258Z&quot;,&quot;answerType&quot;:false,&quot;randQues&quot;:true,&quot;randOpts&quot;:true,&quot;OrderNo&quot;:0},{&quot;_id&quot;:&quot;59bf94649884314cc6ebd8cf&quot;,&quot;title&quot;:&quot;填空题（示例）&quot;,&quot;name&quot;:&quot;&quot;,&quot;quesNum&quot;:5,&quot;fenzhi&quot;:&quot;10.0&quot;,&quot;allTime&quot;:10,&quot;quesPrev&quot;:true,&quot;editAnswerAfterSubmit&quot;:false,&quot;forCode&quot;:false,&quot;createDate&quot;:&quot;2017-09-18T09:39:48.376Z&quot;,&quot;answerType&quot;:false,&quot;randQues&quot;:true,&quot;randOpts&quot;:true,&quot;OrderNo&quot;:0},{&quot;_id&quot;:&quot;59bf94649884314cc6ebd8db&quot;,&quot;title&quot;:&quot;问答题（示例）&quot;,&quot;name&quot;:&quot;&quot;,&quot;quesNum&quot;:3,&quot;fenzhi&quot;:&quot;50.0&quot;,&quot;allTime&quot;:30,&quot;quesPrev&quot;:true,&quot;editAnswerAfterSubmit&quot;:true,&quot;forCode&quot;:false,&quot;createDate&quot;:&quot;2017-09-18T09:39:48.454Z&quot;,&quot;answerType&quot;:false,&quot;randQues&quot;:false,&quot;randOpts&quot;:true,&quot;OrderNo&quot;:0}]" valign="middle" style="height:66px"><td width="300" class="plist-bt">
                <span>-</span>
                <div class="M ng-binding" style="line-height: ;" title="${p.pname}">${p.pname}</div>
            </td>
                <td width="100"><span style="font-weight: bolder;font-size: 14px;" class="ng-binding">${p.seednum}</span> 卷</td>
                <td width="100"><span style="font-weight: bolder;font-size: 14px;" class="ng-binding">${p.qnum}</span> 题</td>
                <td width="100"><span style="font-weight: bolder;font-size: 14px;" class="ng-binding">${p.minute}</span> 分</td>
                <td width="100"><span style="font-weight: bolder;font-size: 14px;" class="ng-binding">${p.time}</span></td>
                <td ng-if="p.preparedExt!=1" width="135" class="unlocked ng-scope"><i class="fa fa-unlock"></i><span style="top:42px">
                	<c:if test="${p.rank==1}">SE基础题</c:if>
                	<c:if test="${p.rank==2}">WEB题</c:if>
                	<c:if test="${p.rank==3}">框架题</c:if>
                	<c:if test="${p.rank==4}">架构设计</c:if>
                </span></td>
                <td class="plist-x">
                    <ul class="testPaper-list">
                        <li><a ng-if="p.papers.length&gt;0" href="${pageContext.request.contextPath}/myExam.do?pid=${p.id}" target="_blank" class="ng-scope">评分做题</a></li>
                    </ul>
                </td>
            </tr>
            </tbody>
        </table>
       
   
   	</div>
	

      
 </c:forEach>
   
</c:if>	
	


  

    <div style="text-align: center">
        <div id="pagination" class="pagination"></div>
    </div>

    <div class="set_p_r-bot backToPaperList" style="width:1066px;">
        <div class="des-content" style="background: #2abcb9;">
             <h5>说明：</h5>
             <ul>
                  <li><i></i></li>
                  <li><i></i></li>
                  <li><i></i></li>
             </ul>
        </div>
        <div class="Add_Paper_l-tj add-xj" style="width: 400px;margin-top: 7px; "><a href="http://kaosys.acmcoder.com/paper#/list" style="position: relative;top: 2px;">试卷已经全部准备好！下一步，开始发起考试场次   <i class="fa fa-chevron-circle-right"></i></a></div>

    </div>

    <div class="plist-f"></div>
    <div class="clear"></div>
    </div>
</div>







<script type="text/javascript" src="${pageContext.request.contextPath}/files/position.js" class="ng-scope"></script>
</div>

                </div>
            </div>
        </div>
    </div>

    </div>
    <script type="text/javascript" src="${pageContext.request.contextPath}/files/footer.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/files/base.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/files/qrcode.js"></script>

    <div class="hide">
        <div class="uploadDiv"></div>
    </div>



<div class="footer"><div class="public"><div class="footer-left" style="width:60%"><div class="footer-logo" style="margin-top: -5px;padding-top:0px;">
<img src="${pageContext.request.contextPath}/files/blogo.png" style=" position: relative;left: -32px;top: 2px;"></div>
<div class="footer-txt"><a target="_blank" href="http://www.acmcoder.com/aboutus/about.html">关于我们</a>　|　<a target="_blank" href="http://www.acmcoder.com/aboutus/contact.html">联系我们</a>　|　<a target="_blank" href="http://www.acmcoder.com/aboutus/shengming.html">免责声明</a>
<br>Copyright © acmcoder.com<br><span class="inputSpan">All Rights Reversed 京ICP备15012255-1</span></div></div><div class="footer-right" style="width:40%;float: left;padding-top: 40px;text-align: center;line-height: 17px;">
<table style="line-height: 26px;text-align: center;"><tbody><tr><td width="100"><img src="${pageContext.request.contextPath}/files/f-phone.png"></td><td style="font-size: 14px;width:200px">客服热线：010-85359782<br>销售热线：010-85359766</td><td style="font-size: 14px;"><a class="weixinPng" href="javascript:void(0)" style="color:white;position: relative;">
<img src="${pageContext.request.contextPath}/files/f-weixin.png"> &nbsp;&nbsp;iamacmcoder<img class="hide" style="width: 80px;position: absolute;left: 130px;top: -50px;" src="${pageContext.request.contextPath}/files/saimaweixin.jpg"></a><br><a href="javascript:void(0)" style="color:white"><img src="${pageContext.request.contextPath}/files/f-qq.png"> &nbsp;&nbsp;2531743633</a><br></td></tr></tbody></table></div></div></div><div class="topW" style="display: none; right: 62.5px;"><span></span></div><div style="position: absolute; width: 0px; height: 0px; overflow: hidden; padding: 0px; border: 0px; margin: 0px;"><div id="MathJax_Font_Test" style="position: absolute; visibility: hidden; top: 0px; left: 0px; width: auto; padding: 0px; border: 0px; margin: 0px; white-space: nowrap; text-align: left; text-indent: 0px; text-transform: none; line-height: normal; letter-spacing: normal; word-spacing: normal; font-size: 40px; font-weight: normal; font-style: normal; font-family: MathJax_Size1, script;"></div></div></body></html>