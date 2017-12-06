<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style type="text/css">@charset "UTF-8";[ng\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-animate-anchor{position:absolute;}</style>
    <title>我的试卷</title>
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
                 <ul class="nav navbar-nav guiderLinks"  style="margin-left:30px;font-size: 20px;">
                 <li>
                <a href="https://kao.acmcoder.com/b/"><i class="icon-plus-sign"></i> 首页</a></li>
                
                <li><a href="${pageContext.request.contextPath}/toMyExam.do"><i
							class="icon-plus-sign"></i> 试卷</a></li> 
                <li><a href="https://kaosys.acmcoder.com/paper#/list"><i class="icon-plus-sign"></i> 场次</a></li><li><a href="https://kaosys.acmcoder.com/cands#/home"><i class="icon-plus-sign"></i> 考生</a></li><li><a href="https://kaosys.acmcoder.com/monitor#/list"><i class="icon-plus-sign"></i> 监考</a></li><li><a href="https://kaosysy.acmcoder.com/prj/reviewPaperList.do"><i class="icon-plus-sign"></i> 报告</a></li><li><a href="https://kaosys.acmcoder.com/ques#/list"><i class="icon-plus-sign"></i> 题库</a></li>
                
                </ul>
                <ul class="nav navbar-nav userLinks navbar-right hidden-xs" style="margin-right:10px;">
                    
                    <li class="dropdownLoginOut">
                        <a id="aemail" href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="icon-cogs"></i>
                             <p style="margin-right: 20px;font-family: 楷体;color: red;font-size:22px;">${loginUser.name}</p>
                             <p style="margin-right: 35px;color:silver; font-size: 15px;">管理员</p>
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
        <h3>我的试卷</h3>
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
        <span style="text-align: center;" id="addSiama"><a href="${pageContext.request.contextPath}/addTestPaper.do" ng-click="newPaper()">+ 新建试卷</a></span>
        <span style="width:20px;background-color: silver;">||</span>
        <span style="text-align: center;" id="addSiama"><a href="/show.do?type=1" ng-click="newPaper()">+ 录入试题</a></span>
        <p style="position: relative;">
            <span class="Id-img"><img src="${pageContext.request.contextPath}/files/exam1.png" style="border: 1px solid #dadada"></span><span class="Id-img"><img src="${pageContext.request.contextPath}/files/exam1.png" style="border: 1px solid #dadada"></span><a href="javascript:void(0)" style="position: relative" class="add-img">
                    <span style="text-align: center;"><span style="padding-top:8px;color: #2abcb8;font-weight: bolder">示例</span>
                    </span>
            </a>
            <span class="Id-after" style="width:80px;height:22px; ">展开所有子卷</span><span class="Id-after" style="width:80px;height:22px; ">展开所有子卷</span><a href="javascript:void(0)" style="position: relative" class="add-before">
                <span style="text-align: center;border: 1px solid #dadada;boder-right:none" class="blue active"><img src="${pageContext.request.contextPath}/files/icon2.png" style="width: 42%;margin-top: 7px;margin-left: 2px;"></span>
            </a>
            <span class="Id-before" style="width:80px;height:22px; ">收起所有子卷</span><span class="Id-before" style="width:80px;height:22px; ">收起所有子卷</span><a href="javascript:void(0)" style="position: relative" class="add-after">
                <span style="background: initial;border: 1px solid #dadada;text-align: center;border-left:none" class="blue"><img src="${pageContext.request.contextPath}/files/icon1.png" style="width: 42%;margin-top: 7px;margin-left: 2px;"></span>
            </a>
        </p>
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
            <td>操作</td>
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
                <%-- <td class="plist-x">
                    <ul class="testPaper-list">
                        <li><a ng-click="addPaper(p,$event)" class="addPaper">删除子卷</a></li>
                        <li><a ng-click="addPaper(p,$event)" href="${pageContext.request.contextPath}/addSeedPaper.do?id=${p.id}" class="addPaper">添加子卷</a></li>
                    </ul>
                </td> --%>
            </tr>
            </tbody>
        </table>
        <table ng-if="p.papers.length&gt;0" class="plist-ctab2 able">
            <tbody>
           
                <tr class="tr_header" align="center" valign="middle"><td width="62">No. <span></span></td><td width="190">子卷名称<span></span></td><td width="55">题数</td><td width="80">分值</td><td width="70">时长</td><td width="70">试题乱序</td><td width="70">选项乱序</td><td width="100">提交后修改</td><!-- ngIf: rightStr.indexOf('right_id11')>-1 --><td>操作</td></tr>
		           <%-- <c:if test="${seedPaper!=null}"> --%>
		            <c:forEach items="${seedPaper}" var="s" varStatus="vs">
		          		<c:if test="${s.pid == p.id}">
		                <!-- ngRepeat: pp in p.routinePaper --><tr ng-repeat="pp in p.routinePaper" class="paperData ng-scope" paperdata="{&quot;_id&quot;:&quot;59bf94649884314cc6ebd8b9&quot;,&quot;title&quot;:&quot;选择题（示例）&quot;,&quot;name&quot;:&quot;&quot;,&quot;quesNum&quot;:10,&quot;fenzhi&quot;:&quot;40.0&quot;,&quot;allTime&quot;:20,&quot;quesPrev&quot;:true,&quot;editAnswerAfterSubmit&quot;:false,&quot;forCode&quot;:false,&quot;createDate&quot;:&quot;2017-09-18T09:39:48.258Z&quot;,&quot;answerType&quot;:false,&quot;randQues&quot;:true,&quot;randOpts&quot;:true,&quot;OrderNo&quot;:0}" paperid="59bf94649884314cc6ebd8b9" align="center" valign="middle" data-arrayindex="">
		                    <td class="ng-binding">子卷</td>
		                    <td style="position: relative"><div class="paperTitle ng-binding" title="${s.spname}" style="max-width: 152px;">${s.spname}</div>
		                        <!-- ngIf: pp.forCode -->
		                        <span title="" class="ng-binding"></span></td>
		                    <td class="ng-binding">${s.sqnum}</td><td class="ng-binding">${s.sminute}</td>
		                    <td class="ng-binding">${s.stime}分钟</td>
		                    <td style="color: #999" class="ng-binding">乱序</td>
		                    <td style="color: #999" class="ng-binding">乱序</td>
		                    <td style="color: #999" class="ng-binding">不能修改</td>
		                    <td class="plist-x" style="float:none">
		                       <div>
		                        <span style="margin-left:0;">
		                            <a href="javascript:void(0)" ng-click="editSonPaper(pp,p)" class="update_paper2">编辑</a>|
		                            <a href="javascript:void(0)" class="del">删除</a>|
		                            <a class="up" href="javascript:void(0)">上移</a>|
		                            <a class="down" href="javascript:void(0)">下移</a>
		                        </span>
		                        <ul class="addQuestion" style="margin:-3px 0 0;float:none">
		                        <c:if test="${s.spname=='单选题'}">
			                        <li ng-if="pp.fromPaperId==undefined" class="ng-scope"><a class="add able" href="${pageContext.request.contextPath}/add.do?sid=${s.id}&type=1">添加试题</a></li>
			                      	<li ng-if="pp.fromPaperId==undefined" class="ng-scope"><a class="edit able" href="${pageContext.request.contextPath}/showQuestion.do?sid=${s.id}&type=1">管理试题</a></li>
		                        </c:if>
		                        <c:if test="${s.spname=='多选题'}">
			                        <li ng-if="pp.fromPaperId==undefined" class="ng-scope"><a class="add able" href="${pageContext.request.contextPath}/add.do?sid=${s.id}&type=3">添加试题</a></li>
			                      	<li ng-if="pp.fromPaperId==undefined" class="ng-scope"><a class="edit able" href="${pageContext.request.contextPath}/showQuestion.do?sid=${s.id}&type=3">管理试题</a></li>
		                        </c:if>
		                        <c:if test="${s.spname=='填空题'}">
			                        <li ng-if="pp.fromPaperId==undefined" class="ng-scope"><a class="add able" href="${pageContext.request.contextPath}/add.do?sid=${s.id}&type=2">添加试题</a></li>
			                      	<li ng-if="pp.fromPaperId==undefined" class="ng-scope"><a class="edit able" href="${pageContext.request.contextPath}/showQuestion.do?sid=${s.id}&type=2">管理试题</a></li>
		                        </c:if>
		                        </ul>
		                       </div>
		                    </td>
		                </tr>
		           
		           			</c:if>
		           		</c:forEach>
		           	<%-- </c:if> --%> 	
           		
        </tbody>
    </table><!-- end ngIf: p.papers.length>0 -->
   
   	</div>
	

      
 </c:forEach>
   
</c:if>	
	
	  <%-- <div class="plist-table ng-scope" ng-repeat="p in positions" positionid="59bf94649884314cc6ebd8b8">
        <table class="plist-ctab" data-positiontitle="赛码样卷（示例）" data-aftertitle="Demo体验使用" data-timetype="0" data-opentype="" data-opentime="0" data-papercode="">
            <tbody>
            <tr align="center" data-paper="[{&quot;_id&quot;:&quot;59bf94649884314cc6ebd8b9&quot;,&quot;title&quot;:&quot;选择题（示例）&quot;,&quot;name&quot;:&quot;&quot;,&quot;quesNum&quot;:10,&quot;fenzhi&quot;:&quot;40.0&quot;,&quot;allTime&quot;:20,&quot;quesPrev&quot;:true,&quot;editAnswerAfterSubmit&quot;:false,&quot;forCode&quot;:false,&quot;createDate&quot;:&quot;2017-09-18T09:39:48.258Z&quot;,&quot;answerType&quot;:false,&quot;randQues&quot;:true,&quot;randOpts&quot;:true,&quot;OrderNo&quot;:0},{&quot;_id&quot;:&quot;59bf94649884314cc6ebd8cf&quot;,&quot;title&quot;:&quot;填空题（示例）&quot;,&quot;name&quot;:&quot;&quot;,&quot;quesNum&quot;:5,&quot;fenzhi&quot;:&quot;10.0&quot;,&quot;allTime&quot;:10,&quot;quesPrev&quot;:true,&quot;editAnswerAfterSubmit&quot;:false,&quot;forCode&quot;:false,&quot;createDate&quot;:&quot;2017-09-18T09:39:48.376Z&quot;,&quot;answerType&quot;:false,&quot;randQues&quot;:true,&quot;randOpts&quot;:true,&quot;OrderNo&quot;:0},{&quot;_id&quot;:&quot;59bf94649884314cc6ebd8db&quot;,&quot;title&quot;:&quot;问答题（示例）&quot;,&quot;name&quot;:&quot;&quot;,&quot;quesNum&quot;:3,&quot;fenzhi&quot;:&quot;50.0&quot;,&quot;allTime&quot;:30,&quot;quesPrev&quot;:true,&quot;editAnswerAfterSubmit&quot;:true,&quot;forCode&quot;:false,&quot;createDate&quot;:&quot;2017-09-18T09:39:48.454Z&quot;,&quot;answerType&quot;:false,&quot;randQues&quot;:false,&quot;randOpts&quot;:true,&quot;OrderNo&quot;:0}]" valign="middle" style="height:66px"><td width="300" class="plist-bt">
                <span>-</span>
                <div class="M ng-binding" style="line-height: ;" title="赛码样卷（示例）">赛码样卷（示例）</div>
                <em ng-bind="p.afterTitle" title="Demo体验使用" class="ng-binding">Demo体验使用</em>
                <!-- ngIf: p.tagPaper.length>0|| p.randPaper.length>0 -->
            </td>
                <td width="100"><span style="font-weight: bolder;font-size: 14px;" class="ng-binding">3</span> 卷</td>
                <td width="100"><span style="font-weight: bolder;font-size: 14px;" class="ng-binding">18</span> 题</td>
                <td width="100"><span style="font-weight: bolder;font-size: 14px;" class="ng-binding">100</span> 分</td>
                <td width="100"><span style="font-weight: bolder;font-size: 14px;" class="ng-binding">60</span> 分钟</td>
                <!-- ngIf: jurisdiction[1].p ==1 -->

                <!-- ngIf: p.preparedExt==1 -->
                <!-- ngIf: p.preparedExt!=1 --><td ng-if="p.preparedExt!=1" width="135" class="unlocked ng-scope"><i class="fa fa-unlock"></i><span style="top:42px">未锁定</span></td><!-- end ngIf: p.preparedExt!=1 -->
                <td class="plist-x"><span><a href="javascript:void(0)" ng-click="editPaper(p)">编辑</a>|<a href="javascript:void(0)" ng-click="delPosition(p)" class="del ">删除</a>
                    <!-- ngIf: rightStr.indexOf('right_id18')>-1 && p.papers.length>0 -->
                </span>
                    <ul class="testPaper-list">
                        <li><a ng-click="addPaper(p,$event)" class="addPaper">添加子卷</a></li>
                        <li><a ng-if="p.papers.length&gt;0" href="${pageContext.request.contextPath}/myExam.do" target="_blank" class="ng-scope">预览试卷</a></li>
                    </ul>
                </td>
            </tr>
            </tbody>
        </table>
        <!-- ngIf: p.papers.length>0 --><table ng-if="p.papers.length&gt;0" class="plist-ctab2 able">
            <tbody>
                <tr class="tr_header" align="center" valign="middle"><td width="62">No. <span></span></td><td width="190">子卷名称<span></span></td><td width="55">题数</td><td width="80">分值</td><td width="70">时长</td><td width="70">试题乱序</td><td width="70">选项乱序</td><td width="100">提交后修改</td><!-- ngIf: rightStr.indexOf('right_id11')>-1 --><td>操作</td></tr>
                <!-- ngRepeat: pp in p.routinePaper --><tr ng-repeat="pp in p.routinePaper" class="paperData ng-scope" paperdata="{&quot;_id&quot;:&quot;59bf94649884314cc6ebd8b9&quot;,&quot;title&quot;:&quot;选择题（示例）&quot;,&quot;name&quot;:&quot;&quot;,&quot;quesNum&quot;:10,&quot;fenzhi&quot;:&quot;40.0&quot;,&quot;allTime&quot;:20,&quot;quesPrev&quot;:true,&quot;editAnswerAfterSubmit&quot;:false,&quot;forCode&quot;:false,&quot;createDate&quot;:&quot;2017-09-18T09:39:48.258Z&quot;,&quot;answerType&quot;:false,&quot;randQues&quot;:true,&quot;randOpts&quot;:true,&quot;OrderNo&quot;:0}" paperid="59bf94649884314cc6ebd8b9" align="center" valign="middle" data-arrayindex="">
                    <td class="ng-binding">子卷 1</td>
                    <td style="position: relative"><div class="paperTitle ng-binding" title="单选题（示例）" style="max-width: 152px;">单选题（示例）</div>
                        <!-- ngIf: pp.forCode -->
                        <span title="" class="ng-binding"></span></td>
                    <td class="ng-binding">10 题</td><td class="ng-binding">40.0 分</td>
                    <td class="ng-binding">20 分钟</td>
                    <td style="color: #999" class="ng-binding">乱序</td>
                    <td style="color: #999" class="ng-binding">乱序</td>
                    <td style="color: #999" class="ng-binding">不能修改</td>
                    <td class="plist-x" style="float:none">
                       <div>
                        <span style="margin-left:0;">
                            <a href="javascript:void(0)" ng-click="editSonPaper(pp,p)" class="update_paper2">编辑</a>|
                            <a href="javascript:void(0)" class="del">删除</a>|
                            <a class="up" href="javascript:void(0)">上移</a>|
                            <a class="down" href="javascript:void(0)">下移</a>
                        </span>
                        <ul class="addQuestion" style="margin:-3px 0 0;float:none">
                        <li ng-if="pp.fromPaperId==undefined" class="ng-scope"><a class="add able" href="${pageContext.request.contextPath}/add.do?type=1">添加试题</a></li>
                      	<li ng-if="pp.fromPaperId==undefined" class="ng-scope"><a class="edit able" href="${pageContext.request.contextPath}/showQuestion.do?type=1">管理试题</a></li>
                        </ul>
                       </div>
                    </td>
                </tr><!-- end ngRepeat: pp in p.routinePaper --><tr ng-repeat="pp in p.routinePaper" class="paperData ng-scope" paperdata="{&quot;_id&quot;:&quot;59bf94649884314cc6ebd8cf&quot;,&quot;title&quot;:&quot;填空题（示例）&quot;,&quot;name&quot;:&quot;&quot;,&quot;quesNum&quot;:5,&quot;fenzhi&quot;:&quot;10.0&quot;,&quot;allTime&quot;:10,&quot;quesPrev&quot;:true,&quot;editAnswerAfterSubmit&quot;:false,&quot;forCode&quot;:false,&quot;createDate&quot;:&quot;2017-09-18T09:39:48.376Z&quot;,&quot;answerType&quot;:false,&quot;randQues&quot;:true,&quot;randOpts&quot;:true,&quot;OrderNo&quot;:0}" paperid="59bf94649884314cc6ebd8cf" align="center" valign="middle" data-arrayindex="">
                    <td class="ng-binding">子卷 2</td>
                    <td style="position: relative"><div class="paperTitle ng-binding" title="填空题（示例）" style="max-width: 152px;">填空题（示例）</div>
                        <!-- ngIf: pp.forCode -->
                        <span title="" class="ng-binding"></span></td>
                    <td class="ng-binding">5 题</td><td class="ng-binding">10.0 分</td>
                    <td class="ng-binding">10 分钟</td>
                    <td style="color: #999" class="ng-binding">乱序</td>
                    <td style="color: #999" class="ng-binding">乱序</td>
                    <td style="color: #999" class="ng-binding">不能修改</td>
                    <!-- ngIf: rightStr.indexOf('right_id11')>-1 -->
                    <td class="plist-x" style="float:none">
                       <div>
                        <span style="margin-left:0;">
                            <a href="javascript:void(0)" ng-click="editSonPaper(pp,p)" class="update_paper2">编辑</a>|
                            <a href="javascript:void(0)" class="del">删除</a>|
                            <a class="up" href="javascript:void(0)">上移</a>|
                            <a class="down" href="javascript:void(0)">下移</a>
                        </span>
                        <ul class="addQuestion" style="margin:-3px 0 0;float:none">
                         <li ng-if="pp.fromPaperId==undefined" class="ng-scope"><a class="add able" href="${pageContext.request.contextPath}/add.do?type=2">添加试题</a></li>
                      	<li ng-if="pp.fromPaperId==undefined" class="ng-scope"><a class="edit able" href="${pageContext.request.contextPath}/showQuestion.do?type=2">管理试题</a></li>
                        </ul>
                       </div>
                    </td>
                </tr><!-- end ngRepeat: pp in p.routinePaper --><tr ng-repeat="pp in p.routinePaper" class="paperData ng-scope" paperdata="{&quot;_id&quot;:&quot;59bf94649884314cc6ebd8db&quot;,&quot;title&quot;:&quot;问答题（示例）&quot;,&quot;name&quot;:&quot;&quot;,&quot;quesNum&quot;:3,&quot;fenzhi&quot;:&quot;50.0&quot;,&quot;allTime&quot;:30,&quot;quesPrev&quot;:true,&quot;editAnswerAfterSubmit&quot;:true,&quot;forCode&quot;:false,&quot;createDate&quot;:&quot;2017-09-18T09:39:48.454Z&quot;,&quot;answerType&quot;:false,&quot;randQues&quot;:false,&quot;randOpts&quot;:true,&quot;OrderNo&quot;:0}" paperid="59bf94649884314cc6ebd8db" align="center" valign="middle" data-arrayindex="">
                    <td class="ng-binding">子卷 3</td>
                    <td style="position: relative"><div class="paperTitle ng-binding" title="多选题（示例）" style="max-width: 152px;">多选题（示例）</div>
                        <!-- ngIf: pp.forCode -->
                        <span title="" class="ng-binding"></span></td>
                    <td class="ng-binding">3 题</td><td class="ng-binding">50.0 分</td>
                    <td class="ng-binding">30 分钟</td>
                    <td style="color: #999" class="ng-binding">不乱序</td>
                    <td style="color: #999" class="ng-binding">乱序</td>
                    <td style="color: #999" class="ng-binding">允许修改</td>
                    <!-- ngIf: rightStr.indexOf('right_id11')>-1 -->
                    <td class="plist-x" style="float:none">
                       <div>
                        <span style="margin-left:0;">
                            <a href="javascript:void(0)" ng-click="editSonPaper(pp,p)" class="update_paper2">编辑</a>|
                            <a href="javascript:void(0)" class="del">删除</a>|
                            <a class="up" href="javascript:void(0)">上移</a>|
                            <a class="down" href="javascript:void(0)">下移</a>
                        </span>
                        <ul class="addQuestion" style="margin:-3px 0 0;float:none">
							 <li ng-if="pp.fromPaperId==undefined" class="ng-scope"><a class="add able" href="${pageContext.request.contextPath}/add.do?type=3">添加试题</a></li>
	                      	 <li ng-if="pp.fromPaperId==undefined" class="ng-scope"><a class="edit able" href="${pageContext.request.contextPath}/showQuestion.do?type=3">管理试题</a></li>
                        </ul>
                       </div>
                    </td>
                </tr><!-- end ngRepeat: pp in p.routinePaper -->
            </tbody>
        </table><!-- end ngIf: p.papers.length>0 -->
   
   	</div>
	 --%>
	





  

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


<!-- 弹窗 自己新建试卷 -->
<div class="ownPaper hide ng-scope">
    <div class="Add_New_Paper" style="padding-bottom: 10px;">

        <div class="A_N_P_name1" style="margin-left: 24px;"><b class="start"> * </b>&nbsp; 试卷名称：<input ng-model="paperModel.positionTitle" maxlength="40" class="input paperName ng-pristine ng-untouched ng-valid ng-valid-maxlength" type="search" placeholder="例如“软件开发类（Java）试卷”，必填项">
            <span style="font-size: 12px;color: #999999;margin-left: 4px;">此项显示给考生</span>
        </div>
        <div class="A_N_P_name2" style="margin-left: 40px;">试卷备注：
            <input class="input paperTip ng-pristine ng-untouched ng-valid ng-valid-maxlength" type="search" ng-model="paperModel.afterTitle" placeholder="例如：华北区使用，可不填" maxlength="30">

        </div>
       
        <div class="clear"></div>
    </div>
</div>
<!--内部版使用 赛码标准卷弹框选择-->
<!-- ngIf: version==3 || version==2 -->
<!-- 请选择 弹窗 -->
<div class="prof_T none t-one t-one3 ng-scope" style="display: none;">
    <table class="probody"><tbody><tr><td align="center" valign="middle">
        <div class="profbj Test_Paper_xNew_T1 Add_Paper_T1"></div>    <!--one-->
    </td></tr></tbody></table>
    <table class="probody2"><tbody><tr><td align="center" valign="middle">
        <div class="profbj2 Test_Paper_xNew_T2 Add_Paper_T2"></div>    <!--two-->
    </td></tr></tbody></table>
    <table class="probody_T profd-table"><tbody><tr><td align="center" valign="middle" style="width: 580px;">
        <div class="profcen_T Test_Paper_xNew_T3 Add_Paper_T3" style="width: 580px">  <!--底层-->
            <div class="profbt_T">选择子卷添加方式<span></span></div>
            <div class="Test_Paper_xNew_Tone Add_Paper_Tone Add_Paper_Tone3"><a id="t-two"><img src="${pageContext.request.contextPath}/files/test-p-t-right.png" style="margin-bottom: 17px;">
                新建子卷</a></div>
            <div class="Test_Paper_xNew_Ttwo Test_Paper_xNew_Ttwo2"><a ng-click="addExistingPaper()" href="javascript:void(0)">
                <img src="${pageContext.request.contextPath}/files/test-p-e-right.png">
                选择已有子卷
            </a></div>
            <!-- ngIf: version==3 || version==2 -->
        </div>
    </td></tr></tbody></table>
</div>

<!-- 新建子卷弹窗 -->
<div class="newSonPaper hide t-three ng-scope">
    <div class="profcen_T Add_Paper_T9">  底层
       <div class="profbt_T"><i>添加子卷</i><span></span></div>
        <div class="Add_Paper_T9-1" style="padding-left: 50px;">
            <div class="Add_Paper_T9-2">
                子卷名称：<input class="input" type="search" maxlength="30" placeholder="请填写子卷名称，例如“基础知识测试试卷”" style="width: 300px;margin-left: 4px;">
                子卷备注：<input class="input" type="search" maxlength="30" placeholder="请填写子卷备注名称">
            </div>
            <div class="Add_Paper_T9-3">子卷时长：<input type="text" maxlength="3" ng-disabled="editPaper.randPaper!=undefined || editPaper.tag!=undefined" class="input" style="margin-left: 5px;">分钟</div>
            <div class="Add_Paper_T9-4 paper_type none"><span>试卷类型：</span>
                <ul>
                    <li class="A_N_P_Ali">常规试卷<em></em></li>
                </ul>
            </div>
            <div class="Add_Paper_T9-4 randques addpap_t9 "><span>试题乱序：</span>
                <ul>
                    <li class="A_N_P_Ali">支持<em></em></li>
                    <li>不支持<em></em></li>
                </ul>
                <strong class="A_N_P_Tspan"><div><i>此项设置该子卷的试题按顺序作答 Or 乱序作答</i></div></strong>
            </div>
            <div class="Add_Paper_T9-4 randOpts addpap_t9 "><span>选项乱序：</span>
                <ul>
                    <li class="A_N_P_Ali">支持<em></em></li>
                    <li>不支持<em></em></li>
                </ul>
                <strong class="A_N_P_Tspan"><div><i>此项设置该子卷的试题（选择题）选项乱序 Or 不乱序显示</i></div></strong>
            </div>
            ngIf: rightStr.indexOf('right_id16')>-1
            <div id="backQueT" class="Add_Paper_T9-4 editansweraftersubmit Add_Paper_T9-6  " style="padding-left:7px;"><span>提交后修改试题：</span>
                <ul>
                    <li style="margin-left: 2px;">可修改<em></em><em></em></li>
                    <li class="A_N_P_Ali">不可修改<em></em></li>
                </ul>
                <strong class="A_N_P_Tspan"><div><i>此项设置该子做完提交后能否修改</i></div></strong>

            </div>
            ngIf: rightStr.indexOf('right_id11')>-1
            <div style="position: absolute;width: 191px;height: auto;right: 96px;top: 42%;line-height: 20px;border: 1px dashed #ff8a00;padding: 10px;color: #777;font-size: 12px;">注意：子卷为试卷中的一部分，例如：选择题子卷、填空题子卷、问答题子卷，不同类别的试卷请不要添加进同一个试卷中</div>
        </div>

       <div class="A_N_T-bottom A_P_tyes">
            <span class="A_N_yes paperSubmit" ><a href="javascript:void(0)">提交</a></span>
            &lt;!&ndash; <span class="A_N_no closepro"><a>返回</a></span> &ndash;&gt;
        </div>

    </div>
</div>

<!-- 选择已有子卷弹窗 -->
<div class="existing hide ng-scope">
  
    <div class="Add_Paper_existing" style="height:inherit;width: 519px;min-height: 50px;padding-left:inherit;box-sizing: border-box; padding-top: 16px;">
        <span>使用子卷：</span>
        <span><a href="javascript:void(0)" ng-click="loadPapers()">+ 选择子卷</a></span>
        <div class="xuanzeshijuanbox">
            ngRepeat: paper in selectPosition.papers
        </div>
    </div>
</div>

<!-- 已有子卷列表弹窗 -->
<!--选择试卷-->
<div id="xuanzeshijuan" class="hide  ng-scope" style="height: 350px; position: relative">
    <input type="hidden" id="selectpaper" name="selectpaper" value="" ng-model="inputKey" class="ng-pristine ng-untouched ng-valid">
    <div style="position: fixed;width: 789px;" class="top">
        <div class="montpro-ksBox monphoto-box">
            <p>子卷名称：<input type="text" class="key1 monphoto-input input"></p>
            <p>试卷备注：<input type="text" class="key2 monphoto-input input"></p>
            <a href="javascript:void(0)" ng-click="paperSearchBtn()" class="montpro-btn montphoto-btn search">搜索</a>
        </div>
        <table border="0" class="xzsj-tab table-background" cellspacing="0" cellpadding="0">
            <thead>
            <tr>
                <th width="31"></th>
                <th width="230px" class="xzsj-tab-td">子卷名称</th>
                <th width="150px" class="xzsj-tab-td">备注名称</th>
                <th width="80px">题量</th>
                <th width="80px">分值</th>
                <th width="80px">时长</th>
                <th>创建时间</th>

            </tr>
            </thead>
        </table>
    </div>
    <div class="bottom" style="height:250px;overflow: auto;    position: absolute;    width: 100%;    top: 98px;">
     
        <table border="0" class="xzsj-tab table-background" cellspacing="0" cellpadding="0">

            <tbody>

      
            </tbody>
        </table>

        <div style="text-align: center;height: 55px;"><div id="pagination2" class="pagination" style="margin:0px;margin-top: 6px;"></div></div>
    </div>
    <div class="clear"></div>
</div>
<!--抽选试卷试卷-->
<div class="hide select_son_page ng-scope" style="height: 302px; position: relative">
   <input type="hidden" id="selectpaper" name="selectpaper" value="" ng-model="inputKey"/>
    <div style="" class="top">
        <table border="0" class="xzsj-tab table-background" cellspacing="0" cellpadding="0" style="margin-top:0px;position: relative;z-index: 0;">
            <thead>
            <tr class="tbackground">
                <th width="31"></th>
                <th width="230px" class="xzsj-tab-td">子卷名称</th>
                <th width="150px" class="xzsj-tab-td">备注名称</th>
                <th width="80px">题量</th>
                <th width="80px">分值</th>
                <th width="80px">时长</th>
                
                <th>创建时间</th>

            </tr>
            </thead>
        </table>
    </div>
    <div class="bottom" style="height:250px;overflow: auto;    position: absolute;    width: 100%;    top:33px;">
        <!-- ngIf: paperList.length==0 && inputKey=='' -->
        <!-- ngIf: paperList.length==0 && inputKey!='' -->
        <table border="0" class="xzsj-tab table-background randPaperList" cellspacing="0" cellpadding="0">
            <tbody>
            <!-- ngRepeat: pl in randPaperData -->
            </tbody>
        </table>

       <!-- <div style="text-align: center;height: 55px;"><div id="pagination2" class="pagination" style="margin:0px;margin-top: 6px;"></div></div>-->
    </div>
    <div style="    text-align: center; position: absolute;bottom: 0px;overflow: hidden;padding-left: 20px;width: 100%;background:#F5F5F6;margin-top: 0px;height: 40px;">
        <div style="display: inline-block;font-size:14px;">已选子卷：<span style="color: #2abcb8;font-size: 18px;font-weight: bolder" class="chouti ng-binding">0</span> 套</div>
        <div style="margin-top: 0px;display: inline-block;font-size:14px;margin-left: 20px;">考生自行选取 &nbsp;<input class="choutiInput ng-pristine ng-untouched ng-valid" ng-model="selectRand" type="text" style="text-align: center;width: 50px;border: 1px solid #dadada;height: 32px;font-weight: bolder;font-size: 16px;color:#ff8a00">  &nbsp;套子卷作答</div>
    </div>
    <div class="clear"></div>
</div>
<!-- 添加试题弹窗 -->
<div class="addQuesChooiseBox ng-scope" style="display: none;">
    <div class="Test_Paper_xNew_Tone Add_ques_title"><a style="font-size: 14px;" id="t-two" class="importQuesLink" href="http://kaosys.acmcoder.com/ques#/import"><img src="${pageContext.request.contextPath}/files/test-p-t-left1.png">
        批量导入试题</a></div>
    <div class="Test_Paper_xNew_Ttwo "><a style="font-size: 14px;" href="http://kaosys.acmcoder.com/ques#/add" class="addQuessLink">
        <img src="${pageContext.request.contextPath}/files/test-p-t-right.png">
        自己录入
    </a></div>
    <div class="Test_Paper_xNew_Ttwo Add_Paper_Tone1"><a style="font-size: 14px;" href="http://kaosys.acmcoder.com/select_ques.html" class="selectQuesLink"><img style="margin-top: 17px;" src="${pageContext.request.contextPath}/files/test-p-e-right.png">
        从题库中选题</a></div>
</div>

<div class="randTypeBox hide ng-scope">
    <div class="type1" ng-click="randPaperAB(selectPosition)">按A、B卷抽卷<br><span>（抽整套试卷作答）</span></div>
    <div class="type2" ng-click="randPaperS(selectPosition,$event)">按子卷抽卷<br><span>（抽部分子卷作答）</span></div>
</div>

<div class="randABBox hide ng-scope">
    <div class="step1">
        考生从：
        <div class="dropdown scrollable"><span class="old"><select class="randABSelect" id="EasyDropDownA4A7C0"><option value="">请选择</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></span><span class="selected">请选择</span><span class="carat"></span><div><ul><li class="active">请选择</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li></ul></div></div>
        套 试卷中抽取 <span class="tip">1</span> 套 作答
    </div>
    <div class="step2">
        <!-- ngRepeat: p in setTag -->
    </div>
    <div class="copy hide">
        <div class="list">
            <div class="title"><div class="fl"><span class="numberPaper">A卷</span><span class="lab"><input maxlength="20" placeholder="请填写A卷名称" type="text" style="width:200px;" value=""></span> </div>   <div class="fl fb hide">A卷总时长：<span class="labtime">120</span>分钟</div><div class="selectPaper"><a class="btn"> + 选择试卷</a></div></div>
            <div class="selectList hide"></div>
           <!-- <div class="selectPaper"></div>-->
        </div>

    </div>

    <div class="step3">
        <h5 style="display: inline-block;margin: 4px;margin: 10px 0;">备注说明</h5><span style="color:#999"> （此内容会显示在考生作答页面）</span>
        <textarea style="height:80px;width:100%;" maxlength="300" id="textareaR" class="ng-binding">请从上方试卷中选取一套作答。注意：选择试卷只有一次机会，选定某试卷后，不能再作答其他试卷。因此，做决定时请务必慎重！</textarea>
    </div>
</div>

<div class="abPaperSelectListBox hide ng-scope" style="min-height: 200px;overflow: auto;">
    <div style="width: 772px;padding: 0px 10px;" class="top">
        <table border="0" class="xzsj-tab table-background" cellspacing="0" cellpadding="0">
            <thead>
            <tr>
                <th width="31"></th>
                <th width="230px" class="xzsj-tab-td">子卷名称</th>
                <th width="150px" class="xzsj-tab-td">备注名称</th>
                <th width="80px">题量</th>
                <th width="80px">分值</th>
                <th width="80px">时长</th>
                <!-- ngIf: rightStr.indexOf('right_id11')>-1 -->
                <th>创建时间</th>
            </tr>
            </thead>
            <tbody>
            <!-- ngRepeat: pl in abPaperList -->
            </tbody>
        </table>
    </div>
    <div class="clear"></div>
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