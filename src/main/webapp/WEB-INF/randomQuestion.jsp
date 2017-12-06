<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style type="text/css">@charset "UTF-8";[ng\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-animate-anchor{position:absolute;}</style>
    <meta charset="UTF-8">
    <title>随机出题</title>
    <link rel="icon" type="image/ico" href="https://image.acmcoder.com/assets/public/v1.0/exam/images/favicon.ico">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/files4/bootstrap.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/files4/font-awesome.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/files4/main.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/files4/mydomain.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/files4/animate.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/files4/main.v1.css">

    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/files4/codemirror.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/files4/eclipse.css">

    <style type="text/css">
        .leftMenu { padding: 0px 0px; }
        .leftMenu h4 { font-size:16px; line-height: 46px; }
    </style>


    <script src="${pageContext.request.contextPath}/files4/hm.js"></script><script type="text/javascript" src="${pageContext.request.contextPath}/files4/clipboard.min.js"></script>


    <script src="${pageContext.request.contextPath}/files4/sea.js" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/files4/Promise.js" type="text/javascript" language="JavaScript"></script>

    <script src="${pageContext.request.contextPath}/files4/jquery-1.11.3.min.js" type="text/javascript" language="JavaScript"></script>

    <script type="text/javascript" src="${pageContext.request.contextPath}/files4/jquery.cookie.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/files4/headerBtns.js"></script>

    <script src="${pageContext.request.contextPath}/files4/jslib.js" language="JavaScript" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/files4/require.js" language="JavaScript" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/files4/Cookie.js" language="JavaScript" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/files4/bootstrap.min.js" type="text/javascript" language="JavaScript"></script>

    <script src="${pageContext.request.contextPath}/files4/angular.min.js" type="text/javascript" language="JavaScript"></script>
    <script src="${pageContext.request.contextPath}/files4/angular-route.min.js" type="text/javascript" language="JavaScript"></script>
    <script src="${pageContext.request.contextPath}/files4/angular-ui-router.js" type="text/javascript" language="JavaScript"></script>
    <script src="${pageContext.request.contextPath}/files4/angular-animate.min.js" type="text/javascript" language="JavaScript"></script>
    <script language="javascript" type="text/javascript" src="${pageContext.request.contextPath}/files4/angularExt.js"></script>

    <!--<script type="text/javascript" src="/assets/ckeditor/ckeditor.js"></script>
    <script type="text/javascript" src="/assets/ckeditor/adapters/jquery.js"></script>
    <link href="/assets/ckeditor/plugins/codesnippet/lib/highlight/styles/monokai_sublime.css" rel="stylesheet">-->

    <script src="${pageContext.request.contextPath}/files4/highlight.pack.js"></script>

    <script language="javascript" type="text/javascript">
        var lft = '';
        var module = { exports: {} };
        var exports = module.exports;
    </script>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/files4/jquery.cxdialog.css">
    <script type="text/javascript" src="${pageContext.request.contextPath}/files4/jquery.cxdialog.js"></script>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/files4/pagination.css">
    <script type="text/javascript" src="${pageContext.request.contextPath}/files4/jquery.pagination.js"></script>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/files4/jquery.easydropdown.css">
    <script type="text/javascript" src="${pageContext.request.contextPath}/files4/jquery.easydropdown.js"></script>


    <script src="${pageContext.request.contextPath}/files4/ueditor.config.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath}/files4/ueditor.all.js" type="text/javascript" charset="utf-8"></script>
    <!--<script src="/v4.0/js/ueditor/ueditor.config.js" type="text/javascript" charset="utf-8"></script>
    <script src="/v4.0/js/ueditor/ueditor.all.js" type="text/javascript" charset="utf-8"></script>-->

    <script src="${pageContext.request.contextPath}/files4/jquery.form.js"></script>
    <script src="${pageContext.request.contextPath}/files4/jquery.uploadfile.js"></script>
    <link href="${pageContext.request.contextPath}/files4/uploadfile.css" rel="stylesheet">

    <script type="text/javascript" src="${pageContext.request.contextPath}/files4/MathJax.js"></script>
    <script src="${pageContext.request.contextPath}/files4/sender.js" type="text/javascript"></script>
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
<body ng-app="ngCompApp" class="ng-scope"><div style="visibility: hidden; overflow: hidden; position: absolute; top: 0px; height: 1px; width: auto; padding: 0px; border: 0px; margin: 0px; text-align: left; text-indent: 0px; text-transform: none; line-height: normal; letter-spacing: normal; word-spacing: normal;"><div id="MathJax_Hidden"></div></div><div id="MathJax_Message" style="display: none;"></div>
<a class="showQQMess" target="_blank" href="http://wpa.qq.com/msgrd?v=3&amp;uin=2531743633&amp;site=qq&amp;menu=yes"><img style="width:70px; height:110px;" border="0" src="${pageContext.request.contextPath}/files4/QQ20170905.png" alt="赛码网" title="赛码网"></a>

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
                <a class="navbar-brand" style="padding: 0px; margin-left: 0px;margin-top: 6px;display: inline-block;max-width:120px;text-align: center;line-height: 56px;height: 56px;margin-top: 0px;" href="https://kao.acmcoder.com/b/"><img style="max-height: 100%;max-width: 100%;display: inline;" src="${pageContext.request.contextPath}/files4/logo.png" alt="ACMcoder"></a>
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

                        <ul id="uemail" class="dropdown-menu w100" style="left: inherit;right: 5px; width: 110px;"><li style="text-align: center;width: 110px;height: 32px;"><a style="width: 108px;padding: 8px 0px;font-size: 12px;" href="https://kao.acmcoder.com/b/accountInfo"><img src="${pageContext.request.contextPath}/files4/person.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;个人信息</a></li><li style="text-align: center;width: 110px;height: 32px;"><a style="width: 108px;padding: 8px 0px;font-size: 12px;" href="https://kao.acmcoder.com/b/entInfo"><img src="${pageContext.request.contextPath}/files4/compnew.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;公司信息</a></li><li style="text-align: center;width: 110px;height: 32px;"><a style="width: 108px;padding: 8px 0px;font-size: 12px;" href="https://kao.acmcoder.com/b/compSet"><img src="${pageContext.request.contextPath}/files4/testnew2.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;考试信息</a></li><li class="yonghuGuanli hide" style="text-align: center;width: 110px;height: 32px;"><a style="width: 108px;padding: 8px 0px;font-size: 12px;" href="https://kao.acmcoder.com/b/userSet"><img src="${pageContext.request.contextPath}/files4/cog.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;用户管理</a></li><li style="text-align: center;width: 110px;height: 32px;"><a style="width:108px;padding: 8px 0px;font-size: 12px;" href="javascript:void(0)" class="logOut" data-href="https://kao.acmcoder.com/enterprise/login"><img src="${pageContext.request.contextPath}/files4/exit.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;退出登陆</a></li></ul>
                    </li>
                    
                </ul>
            </div>
        </div>
    </nav>
   

    <div id="container" class="container">


        <div class="cont">

            <div class="col-md-12" style="">
                <div class="allBox" style="width: 1100px;box-shadow: 0px 1px 4px rgba(0,0,0,0.1);">
                  
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/files4/all.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/files4/test-paper.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/files4/project.css">

<script language="javascript" type="text/javascript">
    lft = 'paper';
</script>
<!-- ngView:  --><div class="ng-scope" ng-view="">
<link href="${pageContext.request.contextPath}/files4/monokai-sublime.css" rel="stylesheet" class="ng-scope">
<link href="${pageContext.request.contextPath}/files4/rainbow.css" rel="stylesheet" class="ng-scope">
<script src="${pageContext.request.contextPath}/files4/highlight.pack(1).js" type="text/javascript" charset="utf-8" class="ng-scope"></script>

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/files4/all_user_PT.css" class="ng-scope">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/files4/test-paper.css" class="ng-scope">
<style rel="stylesheet" type="text/css" class="ng-scope">
.Add_Paper_right .prepap-r-bt h3 {
display: inline-block;  position: relative;  top: 20px;  }
.Add_Paper_right .prepap-r-bt h3 {  line-height: initial;  }
.prepap-r-bt h3 em {  font-weight: 100;  overflow: hidden;  white-space: nowrap;  text-overflow: ellipsis;  max-width: 105px;  display: inline-block;  }
.Test_Paper_cNew{min-height: 240px;}
.container .Add_Paper_right {  width: 825px;  border-top: 1px solid rgba(221, 224, 231, 0.45);  }
.set_p_r-5cbt{display: inline-block}
.set_p_r-5cen ul li{margin-bottom: 6px;height:inherit}
.set_p_r-5cen ul{padding-left:106px;}
.allBox{box-shadow: none!important;}
.f6 {display: initial;padding-left:0px;}
/*.f6 p{display: initial!important;}*/
.f1{float: none}
.set_p_r-5cen ul li{font-family: "微软雅黑"}
.container .Add_Paper_right{position: relative;left: -17px;}
.apa_ri-cenul{width: 750px;}
    .set_p_r-5cbt img{max-height: 100%;max-width: 100%}
.Add_Paper_l-z{height: inherit}
</style>
<!--Center-->
<div class="Add_Paper ng-scope">
    <div class="Add_Paper_left">
        <div></div>
        
        <form action="${pageContext.request.contextPath}/randomQuestionDo.do" method="post">
	       <input type="hidden" name="rank" value="${loginUser.rank}"> 
	       
	       <div ng-repeat="paper in papers" paperid="59bf94649884314cc6ebd8b9" ng-click="loadPaper(paper)" class="Add_Paper_l-tj leftGuid prepapbt cur">
	       <b style="font-weight: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width: 180px;display: inline-block;" class="ng-binding">
	      		<select name="type">
	      			<option value="0">--请选择试题的类型--</option>
	      			<option value="1">--单选题--</option>
	      			<option value="3">--多选题--</option>
	      			<option value="2">--填空题--</option>
	      		</select>
	       </b></div>
	       
	        <div ng-repeat="paper in papers" paperid="59bf94649884314cc6ebd8b9" ng-click="loadPaper(paper)" class="Add_Paper_l-tj leftGuid prepapbt cur">
	       <b style="font-weight: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width: 180px;display: inline-block;" class="ng-binding">
	      		<select name="num">
	      			<option value="5">5</option>
	      			<option value="10">10</option>
	      			<option value="15">15</option>
	      			<option value="20">20</option>
	      		</select>
	       </b></div>
	       
	         <div ng-repeat="paper in papers" paperid="59bf94649884314cc6ebd8b9" ng-click="loadPaper(paper)" class="Add_Paper_l-tj leftGuid prepapbt cur">
	       <b style="font-weight: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width: 180px;display: inline-block;" class="ng-binding">
	      		<input type="submit" value="随机出题" style="width: 80px;height: 100%;font-size: 20px;">
	       </b></div>
     </form>
    </div>
    <div class="Add_Paper_right previewPaper">
        <div class="Add_Paper_r-bt prepap-r-bt">
			
        </div>
        <div class="Add_Paper_r-2 prepap-r-cen paperView">
<c:if test="${rq!=null}">           
<c:forEach items="${rq}" var="q" varStatus="vs">
	<c:if test="${q.type==1}">
	
			
			<input type="hidden" name="qid" value="${q.id}">
			<div class="set_p_r-5cen ng-scope" ng-repeat="p in paperQues">
                <!-- ngRepeat: pq in p.ques --><div ng-repeat="pq in p.ques" class="quesViewList ng-scope">
                    <div class="set_p_r-5cbt viewPaperTitle">
                        <div class="fl"> <span style="float: left" class="ng-binding">${vs.count}．</span>
                          <span ng-if="pq.questype==1" style="float: left;color: #2abcb9;font-weight: bolder" class="ng-scope">单选题</span><!-- end ngIf: pq.questype==1 -->
                           
                            　<span>|</span>　</div>
                        <div style="overflow: hidden">
                        <div class="fl f6 ng-binding" style="width:100%" ng-bind-html="pq.questitle | trustHtml"><p>${q.title}
                        	<!-- <input name="ya" type="text" style="background-color:orange; width: 35px;"> -->
                        	<select name="ya" style="background-color:silver;">
                        		<option value="">---请选择选项---</option>
                        		<option value="A">A</option>
                        		<option value="B">B</option>
                        		<option value="C">C</option>
                        		<option value="D">D</option>
                        	</select>
                        	<span id="${vs.index}"></span>
                        	<span id="awid"></span> 
                        	</p><p>
                        	<input type="hidden" name="aw" value="${q.answer}"></p></div>
                        </div>
                    </div>
			<ul><li>
                             <table><tbody><tr><td>
                               <span class="xoption ng-scope" ng-if="o.optvalue==1" style="font-family:&quot;微软雅黑&quot;">A、&nbsp;&nbsp;</span><!-- end ngIf: o.optvalue==1 -->  
                             </td><td> <pre style="max-width: 645px;"><span style="display: inline-block;" ng-bind-html="o.opttitle  | trustHtml" class="ng-binding"><p>${q.ops[0]}&nbsp; &nbsp;</p></span></pre></td>
                             </tr></tbody></table>
                        </li><!-- end ngRepeat: o in pq.options --><li ng-repeat="o in pq.options" class="ng-scope">
                             <table><tbody><tr><td>
                                
                                 <span class="xoption ng-scope" ng-if="o.optvalue==1" style="font-family:&quot;微软雅黑&quot;">B、&nbsp;&nbsp;</span><!-- end ngIf: o.optvalue==1 -->
                                
                             </td><td> <pre style="max-width: 645px;"><span style="display: inline-block;" ng-bind-html="o.opttitle  | trustHtml" class="ng-binding"><p>${q.ops[1]}&nbsp; &nbsp;</p></span></pre></td>
                             </tr></tbody></table>
                        </li><li ng-repeat="o in pq.options" class="ng-scope">
                             <table><tbody><tr><td>
                                
                                 <span class="xoption ng-scope" ng-if="o.optvalue==2" style="font-family:&quot;微软雅黑&quot;">C、&nbsp;&nbsp;</span><!-- end ngIf: o.optvalue==2 -->
                                 
                             </td><td> <pre style="max-width: 645px;"><span style="display: inline-block;" ng-bind-html="o.opttitle  | trustHtml" class="ng-binding"><p>${q.ops[2]}&nbsp; &nbsp;</p></span></pre></td>
                             </tr></tbody></table>
                        </li><li ng-repeat="o in pq.options" class="ng-scope">
                             <table><tbody><tr><td>
                                 
                                 <span class="xoption ng-scope" ng-if="o.optvalue==3" style="font-family:&quot;微软雅黑&quot;">D、&nbsp;&nbsp;</span><!-- end ngIf: o.optvalue==3 -->
                                 
                             </td><td> <pre style="max-width: 645px;"><span style="display: inline-block;" ng-bind-html="o.opttitle  | trustHtml" class="ng-binding"><p>${q.ops[3]}&nbsp;&nbsp;</p></span></pre></td>
                             </tr></tbody></table>
                        </li>
                    </ul>

		    </div>
		</div>
</c:if>



<c:if test="${q.type==2}">
	<input type="hidden" id="tkaw" value="${q._option}">

			<div class="set_p_r-5cen ng-scope" ng-repeat="p in paperQues">
                <!-- ngRepeat: pq in p.ques --><div ng-repeat="pq in p.ques" class="quesViewList ng-scope">
                    <div class="set_p_r-5cbt viewPaperTitle">
                        <div class="fl"> <span style="float: left" class="ng-binding">${vs.count}．</span>
                          <span ng-if="pq.questype==1" style="float: left;color: #2abcb9;font-weight: bolder" class="ng-scope">填空题</span><!-- end ngIf: pq.questype==1 -->
                           
                            　<span>|</span>　</div>
                        <div style="overflow: hidden">
                        <div class="fl f6 ng-binding" style="width:100%" ng-bind-html="pq.questitle | trustHtml"><p>${q.title}</p><p>
</p></div>
                        </div>
                    </div>
			<ul><li>
                             <table><tbody><tr><td>
                             <span id="awid"></span> 
                             <textarea name="" cols="100" rows="6" style="background-color:orange; ">
                             	
                             </textarea>
                             	
                               </td></tr></tbody></table>
                        </li>
                    </ul>

		    </div>
		</div>
</c:if>


	<c:if test="${q.type==3}">
	
			
			<input type="hidden" name="qid" value="${q.id}">
			<div class="set_p_r-5cen ng-scope" ng-repeat="p in paperQues">
                <!-- ngRepeat: pq in p.ques --><div ng-repeat="pq in p.ques" class="quesViewList ng-scope">
                    <div class="set_p_r-5cbt viewPaperTitle">
                        <div class="fl"> <span style="float: left" class="ng-binding">${vs.count}．</span>
                          <span ng-if="pq.questype==1" style="float: left;color: #2abcb9;font-weight: bolder" class="ng-scope">多选题</span><!-- end ngIf: pq.questype==1 -->
                           
                            　<span>|</span>　</div>
                        <div style="overflow: hidden">
                        <div class="fl f6 ng-binding" style="width:100%" ng-bind-html="pq.questitle | trustHtml"><p>${q.title}
                        	<input name="ya" type="text" style="background-color:fuchsia; width: 100px;">
                        	<span id="${vs.index}"></span>
                        	<span id="awid"></span> 
                        	</p><p>
							<input type="hidden" name="aw" value="${q.answer}"></p></div>
                        </div>
                    </div>
			<ul>
			
						
						<li>
                             <table><tbody><tr><td>
                               <span class="xoption ng-scope" ng-if="o.optvalue==1" style="font-family:&quot;微软雅黑&quot;">A、&nbsp;&nbsp;</span><!-- end ngIf: o.optvalue==1 -->  
                             </td><td> <pre style="max-width: 645px;"><span style="display: inline-block;" ng-bind-html="o.opttitle  | trustHtml" class="ng-binding"><p>${q.ops[0]}&nbsp; &nbsp;</p></span></pre></td>
                             </tr></tbody></table>
                        </li>
                      
                        
                        <!-- end ngRepeat: o in pq.options -->
                        <li ng-repeat="o in pq.options" class="ng-scope">
                             <table><tbody>
                             
                             
                             <tr><td>
                                
                                 <span class="xoption ng-scope" ng-if="o.optvalue==1" style="font-family:&quot;微软雅黑&quot;">B、&nbsp;&nbsp;</span><!-- end ngIf: o.optvalue==1 -->
                                
                             </td><td> <pre style="max-width: 645px;"><span style="display: inline-block;" ng-bind-html="o.opttitle  | trustHtml" class="ng-binding"><p>${q.ops[1]}&nbsp; &nbsp;</p></span></pre></td>
                             </tr></tbody></table>
                        </li>
                        <li ng-repeat="o in pq.options" class="ng-scope">
                             <table><tbody><tr><td>
                                
                                 <span class="xoption ng-scope" ng-if="o.optvalue==2" style="font-family:&quot;微软雅黑&quot;">C、&nbsp;&nbsp;</span><!-- end ngIf: o.optvalue==2 -->
                                 
                             </td><td> <pre style="max-width: 645px;"><span style="display: inline-block;" ng-bind-html="o.opttitle  | trustHtml" class="ng-binding"><p>${q.ops[2]}&nbsp; &nbsp;</p></span></pre></td>
                             </tr></tbody></table>
                        </li><li ng-repeat="o in pq.options" class="ng-scope">
                             <table><tbody><tr><td>
                                 
                                 <span class="xoption ng-scope" ng-if="o.optvalue==3" style="font-family:&quot;微软雅黑&quot;">D、&nbsp;&nbsp;</span><!-- end ngIf: o.optvalue==3 -->
                                 
                             </td><td> <pre style="max-width: 645px;"><span style="display: inline-block;" ng-bind-html="o.opttitle  | trustHtml" class="ng-binding"><p>${q.ops[3]}&nbsp;&nbsp;</p></span></pre></td>
                             </tr></tbody></table>
                        </li>
                    </ul>

		    </div>
		</div>
</c:if>




</c:forEach>
</c:if> 

<div  align="center">

						<span id="espan"></span>	
						<br/><br/>
					<input type="button" value="提交" onclick="_countPaper()" style="background-color:silver; font-size: 23px;width: 53px;height: 40px;">

							
</div>

<script src="${pageContext.request.contextPath}/files4/preview_paper.js" type="text/javascript" charset="utf-8" class="ng-scope"></script>
<script type="text/javascript" class="ng-scope">
   
</script></div>
               
               
               
               
               
               
               
               
               
                </div>
            </div>
        </div>
    </div>

    </div>
    <script type="text/javascript" src="${pageContext.request.contextPath}/files4/footer.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/files4/base.js"></script> 
    <script type="text/javascript" src="${pageContext.request.contextPath}/files4/qrcode.js"></script>

    <div class="hide">
        <div class="uploadDiv">
        
        
        </div>
    </div>

</div></div></div>
</body>
<script type="text/javascript">

	/* 通过getElementsByName获取是对象的数组 ,不要在后面跟.属性了 */
		var flags=false;

		function _countPaper(){
		
					var msg = "你是否要提交试卷?\n\n请确认！";
					
if (confirm(msg) == true) {
			var aw=document.getElementsByName("aw");
			var ya=document.getElementsByName("ya");
			var qid=document.getElementsByName("qid");
			var count=0;
			 for(var i=0;i<ya.length;i++){
				if(ya[i].value!=null && ya[i].value!=""){
					if(ya[i].value==aw[i].value){
						count++;
						document.getElementById(i).innerHTML="<font color='aqua'>✔</font>";
					}else{
						document.getElementById(i).innerHTML="<font color='red'>✘</font>";
						document.getElementById("awid").innerHTML="<font color='red'>答案:"+aw[i].value+"</font>";
					}
				}else{
					document.getElementById(i).innerHTML="<font color='red'>未答题</font>";
			}  
		}
					
		
		}
	}
		
		

		
</script>

</html>