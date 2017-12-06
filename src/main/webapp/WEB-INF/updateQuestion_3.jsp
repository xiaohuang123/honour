<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style type="text/css">@charset "UTF-8";[ng\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-animate-anchor{position:absolute;}</style>
    <meta charset="UTF-8">
    <title>编辑多选题</title>
    <link rel="icon" type="image/ico" href="https://image.acmcoder.com/assets/public/v1.0/exam/images/favicon.ico">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/files2/bootstrap.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/files2/font-awesome.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/files2/main.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/files2/mydomain.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/files2/animate.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/files2/main.v1.css">

    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/files2/codemirror.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/files2/eclipse.css">

    <style type="text/css">
        .leftMenu { padding: 0px 0px; }
        .leftMenu h4 { font-size:16px; line-height: 46px; }
    </style>
<script src="${pageContext.request.contextPath}/files2/hm.js"></script><script type="text/javascript" src="${pageContext.request.contextPath}/files2/clipboard.min.js"></script>


    <script src="${pageContext.request.contextPath}/files2/sea.js" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/files2/Promise.js" type="text/javascript" language="JavaScript"></script>

    <script src="${pageContext.request.contextPath}/files2/jquery-1.11.3.min.js" type="text/javascript" language="JavaScript"></script>

    <script type="text/javascript" src="${pageContext.request.contextPath}/files2/jquery.cookie.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/files2/headerBtns.js"></script>

    <script src="${pageContext.request.contextPath}/files2/jslib.js" language="JavaScript" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/files2/require.js" language="JavaScript" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/files2/Cookie.js" language="JavaScript" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/files2/bootstrap.min.js" type="text/javascript" language="JavaScript"></script>

    <script src="${pageContext.request.contextPath}/files2/angular.min.js" type="text/javascript" language="JavaScript"></script>
    <script src="${pageContext.request.contextPath}/files2/angular-route.min.js" type="text/javascript" language="JavaScript"></script>
    <script src="${pageContext.request.contextPath}/files2/angular-ui-router.js" type="text/javascript" language="JavaScript"></script>
    <script src="${pageContext.request.contextPath}/files2/angular-animate.min.js" type="text/javascript" language="JavaScript"></script>
    <script language="javascript" type="text/javascript" src="${pageContext.request.contextPath}/files2/angularExt.js"></script>

    <!--<script type="text/javascript" src="/assets/ckeditor/ckeditor.js"></script>
    <script type="text/javascript" src="/assets/ckeditor/adapters/jquery.js"></script>
    <link href="/assets/ckeditor/plugins/codesnippet/lib/highlight/styles/monokai_sublime.css" rel="stylesheet">-->

    <script src="${pageContext.request.contextPath}/files2/highlight.pack.js"></script>

    <script language="javascript" type="text/javascript">
        var lft = '';
        var module = { exports: {} };
        var exports = module.exports;
    </script>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/files2/jquery.cxdialog.css">
    <script type="text/javascript" src="${pageContext.request.contextPath}/files2/jquery.cxdialog.js"></script>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/files2/pagination.css">
    <script type="text/javascript" src="${pageContext.request.contextPath}/files2/jquery.pagination.js"></script>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/files2/jquery.easydropdown.css">
    <script type="text/javascript" src="${pageContext.request.contextPath}/files2/jquery.easydropdown.js"></script>


    <script src="${pageContext.request.contextPath}/files2/ueditor.config.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath}/files2/ueditor.all.js" type="text/javascript" charset="utf-8"></script>
    <!--<script src="/v4.0/js/ueditor/ueditor.config.js" type="text/javascript" charset="utf-8"></script>
    <script src="/v4.0/js/ueditor/ueditor.all.js" type="text/javascript" charset="utf-8"></script>-->

    <script src="${pageContext.request.contextPath}/files2/jquery.form.js"></script>
    <script src="${pageContext.request.contextPath}/files2/jquery.uploadfile.js"></script>
    <link href="${pageContext.request.contextPath}/files2/uploadfile.css" rel="stylesheet">

    <script type="text/javascript" src="${pageContext.request.contextPath}/files2/MathJax.js"></script>
    <script src="${pageContext.request.contextPath}/files2/sender.js" type="text/javascript"></script>
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
</style><script src="${pageContext.request.contextPath}/files2/zh-cn.js" type="text/javascript" defer="defer"></script><link href="${pageContext.request.contextPath}/files2/ueditor.css" type="text/css" rel="stylesheet"><script src="${pageContext.request.contextPath}/files2/codemirror.js" type="text/javascript" defer="defer"></script><link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/files2/codemirror(1).css"><script src="${pageContext.request.contextPath}/files2/ZeroClipboard.js" type="text/javascript" defer="defer"></script></head>
<body ng-app="ngCompApp" class="ng-scope"><div style="visibility: hidden; overflow: hidden; position: absolute; top: 0px; height: 1px; width: auto; padding: 0px; border: 0px; margin: 0px; text-align: left; text-indent: 0px; text-transform: none; line-height: normal; letter-spacing: normal; word-spacing: normal;"><div id="MathJax_Hidden"></div></div><div id="MathJax_Message" style="display: none;"></div>
<a class="showQQMess" target="_blank" href="http://wpa.qq.com/msgrd?v=3&amp;uin=2531743633&amp;site=qq&amp;menu=yes"><img style="width:70px; height:110px;" border="0" src="${pageContext.request.contextPath}/files2/QQ20170905.png" alt="赛码网" title="赛码网"></a>

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
                <a class="navbar-brand" style="padding: 0px; margin-left: 0px;margin-top: 6px;display: inline-block;max-width:120px;text-align: center;line-height: 56px;height: 56px;margin-top: 0px;" href="https://kao.acmcoder.com/b/"><img style="max-height: 100%;max-width: 100%;display: inline;" src="${pageContext.request.contextPath}/files2/logo.png" alt="ACMcoder"></a>
                <p class="examCenter"><span>考试中心</span></p>
            </div>
            <div class="collapse navbar-collapse" id="navbar-collapse">
				<ul  style="margin-left:300px;font-size: 30px;">
                <li><a href="${pageContext.request.contextPath}/toMyExam.do"><i
							class="icon-plus-sign"></i>我的试卷</a></li>
				</ul>
					
                <ul class="nav navbar-nav userLinks navbar-right hidden-xs" style="margin-right:10px;">
                    
                    <li class="dropdownLoginOut">
                        <a id="aemail" href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="icon-cogs"></i>
                           <p style="margin-right: 20px;font-family: 楷体;color: red;font-size: 25px;">张晨</p>
                             <b class="" style="margin-left:6px">
                                 <i class="fa fa-angle-down" style="color: #999;position: relative;top: 2px;"></i>
                             </b>

                            <table class="headlogotable">
                                <tbody><tr>
                                    <td>
                                        <img src="${pageContext.request.contextPath}/files2/cs50010.png"  class="hgimg userLogo">
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </a>

                        <ul id="uemail" class="dropdown-menu w100" style="left: inherit;right: 5px; width: 110px;"><li style="text-align: center;width: 110px;height: 32px;"><a style="width: 108px;padding: 8px 0px;font-size: 12px;" href="https://kao.acmcoder.com/b/accountInfo"><img src="${pageContext.request.contextPath}/files2/person.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;个人信息</a></li><li style="text-align: center;width: 110px;height: 32px;"><a style="width: 108px;padding: 8px 0px;font-size: 12px;" href="https://kao.acmcoder.com/b/entInfo"><img src="${pageContext.request.contextPath}/files2/compnew.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;公司信息</a></li><li style="text-align: center;width: 110px;height: 32px;"><a style="width: 108px;padding: 8px 0px;font-size: 12px;" href="https://kao.acmcoder.com/b/compSet"><img src="${pageContext.request.contextPath}/files2/testnew2.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;考试信息</a></li><li class="yonghuGuanli" style="text-align: center;width: 110px;height: 32px;"><a style="width: 108px;padding: 8px 0px;font-size: 12px;" href="https://kao.acmcoder.com/b/userSet"><img src="${pageContext.request.contextPath}/files2/cog.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;用户管理</a></li><li style="text-align: center;width: 110px;height: 32px;"><a style="width:108px;padding: 8px 0px;font-size: 12px;" href="javascript:void(0)" class="logOut" data-href="https://kao.acmcoder.com/enterprise/login"><img src="${pageContext.request.contextPath}/files2/exit.png" style="width: 14px;position: relative;left: -10px;top: -2px;">&nbsp;退出登陆</a></li></ul>
                    </li>
                    
                </ul>
            </div>
        </div>
    </nav>

    <div id="container" class="container">


        <div class="cont">

            <div class="col-md-12">
                <div class="allBox" style="width: 1100px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 1px 4px;">

 <div class="banner_list">
        
    </div>

<!-- ngView:  --><div class="ng-scope" ng-view=""><link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/files2/all_user_PT.css" class="ng-scope">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/files2/test-paper.css" class="ng-scope">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/files2/add_ques.css" class="ng-scope">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/files2/shCoreDefault.css" class="ng-scope">

<style type="text/css" class="ng-scope">
    .diffcult .time-a{width: 50px;}
    #submit-qus{top: 13px;}
    .fa-plus:before {
        content: "\f067";
        font-size: 12px;
        font-weight: normal;
    }
    .topbt-2{margin-top: 0px;}
    .sp_Tc21{margin: 20px 0}
    .timeInt:hover{border: 1px solid #2abcb8}
</style>
<div class="plist test_public  prof_t ng-scope">
    <div class="topbt topbt-2">
        <h3>编辑试题</h3>
        <div class="pronext"><a href="javascript:history.go(-1)">返回</a></div>
    </div>

    <!--  -->
    <div class="sp_Tcen">
        <!--<div class="sp_Tcb">添加试题</div>-->
        <div class="sp_Tcb1 addpap_t9 questype">
            <span>题型：</span>
            <ul>
                <li  id="1">单选题<em></em></li>
                <li class="A_N_P_Ali" class="" id="2"><a href="${pageContext.request.contextPath}/showQuestion.do?type=3&sid=${teq.sid}">多选题</a><em></em></li>
                <li class="" id="7">不定项选择题<em></em></li>
                <li class="" id="4">填空题<em></em></li>
                <li class="" id="3">判断题<em></em></li>
                <li class="" id="5">问答题<em></em></li>
                <li class="hide" id="6">在线编程题<em></em></li>
                <li class="hide" id="8">WEB编程题<em></em></li>
            </ul>
        </div>
        <div class="apa_ri-t3" style="margin:20px 0 0 45px;padding-left: 15px;">
            <ul>
                <li style="margin-left: 16px;">标签：<input type="text" ng-model="searchItem.biaoji1" placeholder="请填写标签（可不填）" style="margin-left: 8px;" maxlength="100" class="ng-pristine ng-untouched ng-valid ng-valid-maxlength"></li>
            </ul>
        </div>

        <!--<div class="sp_Tcb">录入题目</div>-->
        <div class="line" style="height: 1px;background: #ccc;margin: 10px 0px;margin-top: 20px;"></div>
        <!---------------------------------------------------------------------------->
   <form id="questionForm" action="${pageContext.request.contextPath}/updateDo.do" method="post">
   <input type="hidden" name="id" value="${teq.id}">
   <input type="hidden" name="type" value="${teq.type}">
    <input type="hidden" name="sid" value="${teq.sid}">
        <div class="noOnline" style="display: block">
            <div class="sp_Tcb-ti" style="padding-left: 79px; overflow: hidden; height: inherit;">
                <span>题干：</span>
                <div class="ueditor">
                    <div id="myEditor" class="edui-default">
                    	<textarea name="title" rows="5" cols="90">${teq.title}</textarea>
                    </div>
            </div>
            <div class="clear" style="height:0px;"></div>
          
      
        <!-------------------------------->
        <div class="sp_Tcb-ti parse parse-l" style="margin: 0px;height: 70px;padding-left:70px;display: none">
            <em style="float: left;font-size: 14px;margin-right: 13px;position: relative;left: 6px;overflow:hidden;"><b class="start"> * </b> 选项：</em>
            <div class="ueditor type3Box">
                <table style="margin-bottom: 10px;">
                    <tbody><tr>
                        <td width="20"> <input type="radio" ng-checked="searchItem.answer == searchItem.optionsExt[0].optvalue &amp;&amp; searchItem.answer!=undefined"></td>
                        <td>
                            <textarea class="itemCode ng-pristine ng-untouched ng-valid" style="background:#e7e7e7;width: 600px;height:40px;resize: none;overflow: hidden; padding-top: 9px;" ng-model="searchItem.optionsExt[0].opttitle"></textarea>
                        </td>
                        <td style="position: relative;"><span id="ques-ok3" class="addQues-ok" style="display: none;top: -21px;"></span></td>
                    </tr>
                </tbody></table>
                <table style="margin-bottom: 20px;">
                    <tbody><tr>
                        <td width="20"> <input type="radio" ng-checked="searchItem.answer == searchItem.optionsExt[1].optvalue &amp;&amp; searchItem.answer!=undefined"></td>
                        <td>
                            <textarea class="itemCode ng-pristine ng-untouched ng-valid" style="background:#e7e7e7;width: 600px;height:40px;resize: none;overflow: hidden; padding-top: 9px; " ng-model="searchItem.optionsExt[1].opttitle"></textarea>
                        </td>
                        <td style="position: relative;"><span id="ques-ok3" class="addQues-ok" style="display:none ;top: -21px;"></span></td>
                    </tr>
                </tbody></table>
            </div>
        </div>
        <!--------------------------------->
        <div class="danxuan danxuan-s" style="display: block">

            <span style="position: relative;"><b class="start"> * </b> 选项：</span>
            <div class="answer">
                <div class="copy hide an">
                    <div class="answer1 an editorBox utitl">
             
                        <div class="clear"></div>
                    </div>
                </div>

              <div class="optionsListBox ng-scope" ng-if="searchItem.options==undefined">
                    <div class="answer1 an editorBox utitl">
                    <table>
                        <tbody><tr>
                            <td> A:</td>
                            <td>
                                <div class="content">
                                    <div  class="addQues-optextarea-div" contenteditable="true">
                                    	<input type="text" name="options"  value="${teq.ops[0]}" style="width:100%;height:30px;background-color:yellow;">
                                    </div>
                                </div>
                            </td>
                           
                        </tr>
                    </tbody></table>
                    <div class="clear"></div>
                </div>

                    <div class="answer2 an editorBox utitl">
                    <table>
                        <tbody><tr>
                            <td> B:</td>
                            <td>
                                <div class="content">
                                    <div class="addQues-optextarea-div" contenteditable="true">
                                    	<input type="text" name="options"  value="${teq.ops[1]}" style="width:100%;height:30px;background-color:olive;">
                                    </div>
                                </div>
                            </td>
                            
                        </tr>
                    </tbody></table>
                    <div class="clear"></div>
                </div>

                    <div class="answer3 an editorBox utitl">
                    <table>
                        <tbody><tr>
                            <td> C:</td>
                            <td>
                                <div class="content">
                                    <div class="addQues-optextarea-div" contenteditable="true">
                                    	<input type="text" name="options" value="${teq.ops[2]}" style="width:100%;height:30px;background-color:orange;">
                                    </div>
                                </div>
                            </td>
                         
                        </tr>
                    </tbody></table>
                    <div class="clear"></div>
                </div>

                    <div class="answer4 an editorBox utitl">
                    <table>
                        <tbody><tr>
                            <td> D:</td>
                            <td>
                                <div class="content">
                                    <div class="addQues-optextarea-div" contenteditable="true">
                                    	<input type="text" name="options" value="${teq.ops[3]}" style="width:100%;height:30px;background-color:aqua;">
                                    </div>
                                </div>
                            </td>
                            
                        </tr>
                    </tbody></table>
                    <div class="clear"></div>
                </div>
                </div>
            </div>
    </div>


    
        <div class="diffcult nanduBox" style="margin-top: 0px;margin-bottom: 20px;" value="">
            <span>
                <b class="start"> * </b> 难度：
                <i class="xing-kong "></i>
                <i class="xing-kong "></i>
                <i class="xing-kong "></i>
                <i class="xing-kong "></i>
                <i class="xing-kong "></i>
            </span>
             <span class="time-noline"><b class="start"> * </b> 试题级别： 
            	<select name="rank" style="background-color: silver;width: 150px;height: 35px;font-size: 23px;font-family: 楷体;">
									<option value="1"  <c:if test="${teq.rank==1}">selected="selected"</c:if> >SE基础题</option>
									<option value="2"  <c:if test="${teq.rank==2}">selected="selected"</c:if> >WEB题</option>
			 						<option value="3"   <c:if test="${teq.rank==3}">selected="selected"</c:if> >框架题</option>
									<option value="4"   <c:if test="${teq.rank==4}">selected="selected"</c:if> >架构设计</option>
				</select>
            </span>

        </div>
        
        <div class="clear" style="height: 0px;"></div>
        <!----------------------->
        <div>
            <em style="float: left;font-size: 14px;margin-right: 13px;position: relative;left: 6px;overflow-y:auto;">题目解析：</em>
            <div class="ueditor">
            	 <div id="myEditor" class="edui-default">
                    	<textarea name="answer" rows="5" cols="50">${teq.answer}</textarea>
                 </div>
            </div>
        </div>
        <div class="clear"></div>
        <div class="submitBtns">
            <a href="javascript:document.getElementById('questionForm').submit();" ng-click="warning()">编辑保存</a>
        </div>
  
</div>
</form>

<script src="${pageContext.request.contextPath}/files2/ques.js" type="text/javascript" charset="utf-8" class="ng-scope"></script>
<script src="${pageContext.request.contextPath}/files2/shCore.js" type="text/javascript" charset="utf-8" class="ng-scope"></script>

</div>

<script language="javascript" type="text/javascript">
    lft = 'tkgl';
</script>


                </div>
            </div>
        </div>
    </div>

    </div>
    <script type="text/javascript" src="${pageContext.request.contextPath}/files2/footer.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/files2/base.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/files2/qrcode.js"></script>

    <div class="hide">
        <div class="uploadDiv"></div>
    </div>



<div class="footer"><div class="public"><div class="footer-left" style="width:60%"><div class="footer-logo" style="margin-top: -5px;padding-top:0px;"><img src="${pageContext.request.contextPath}/files2/blogo.png" style=" position: relative;left: -32px;top: 2px;"></div><div class="footer-txt"><a target="_blank" href="http://www.acmcoder.com/aboutus/about.html">关于我们</a>　|　<a target="_blank" href="http://www.acmcoder.com/aboutus/contact.html">联系我们</a>　|　<a target="_blank" href="http://www.acmcoder.com/aboutus/shengming.html">免责声明</a><br>Copyright © acmcoder.com<br><span class="inputSpan">All Rights Reversed 京ICP备15012255-1</span></div></div><div class="footer-right" style="width:40%;float: left;padding-top: 40px;text-align: center;line-height: 17px;"><table style="line-height: 26px;text-align: center;"><tbody><tr><td width="100"><img src="${pageContext.request.contextPath}/files2/f-phone.png"></td><td style="font-size: 14px;width:200px">客服热线：010-85359782<br>销售热线：010-85359766</td><td style="font-size: 14px;"><a class="weixinPng" href="javascript:void(0)" style="color:white;position: relative;"><img src="${pageContext.request.contextPath}/files2/f-weixin.png"> &nbsp;&nbsp;iamacmcoder<img class="hide" style="width: 80px;position: absolute;left: 130px;top: -50px;" src="${pageContext.request.contextPath}/files2/saimaweixin.jpg"></a><br><a href="javascript:void(0)" style="color:white"><img src="${pageContext.request.contextPath}/files2/f-qq.png"> &nbsp;&nbsp;2531743633</a><br></td></tr></tbody></table></div></div></div><div class="topW" style="right: 62.5px; display: none;"><span></span></div><div style="position: absolute; width: 0px; height: 0px; overflow: hidden; padding: 0px; border: 0px; margin: 0px;"><div id="MathJax_Font_Test" style="position: absolute; visibility: hidden; top: 0px; left: 0px; width: auto; padding: 0px; border: 0px; margin: 0px; white-space: nowrap; text-align: left; text-indent: 0px; text-transform: none; line-height: normal; letter-spacing: normal; word-spacing: normal; font-size: 40px; font-weight: normal; font-style: normal; font-family: MathJax_Size1, sans-serif;"></div></div><div id="edui_fixedlayer" class="edui-default" style="position: fixed; left: 0px; top: 0px; width: 0px; height: 0px;"><div id="edui77" class="edui-popup  edui-bubble edui-default" onmousedown="return false;" style="display: none;"> <div id="edui77_body" class="edui-popup-body edui-default"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank" class="edui-default"></iframe> <div class="edui-shadow edui-default"></div> <div id="edui77_content" class="edui-popup-content edui-default">  </div> </div></div><div id="edui229" class="edui-popup  edui-bubble edui-default" onmousedown="return false;" style="display: none;"> <div id="edui229_body" class="edui-popup-body edui-default"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank" class="edui-default"></iframe> <div class="edui-shadow edui-default"></div> <div id="edui229_content" class="edui-popup-content edui-default">  </div> </div></div></div><div id="global-zeroclipboard-html-bridge" class="global-zeroclipboard-container" style="position: absolute; left: 0px; top: -9999px; width: 1px; height: 1px; z-index: 999999999;"><object id="global-zeroclipboard-flash-bridge" name="global-zeroclipboard-flash-bridge" width="100%" height="100%" type="application/x-shockwave-flash" data="https://cdn.acmcoder.com/static/1.0.1/plugins/ueditor/third-party/zeroclipboard/ZeroClipboard.swf?noCache=1505866842721"><param name="allowScriptAccess" value="always"><param name="allowNetworking" value="all"><param name="menu" value="false"><param name="wmode" value="transparent"><param name="flashvars" value="trustedOrigins=kaosys.acmcoder.com%2C%2F%2Fkaosys.acmcoder.com%2Chttps%3A%2F%2Fkaosys.acmcoder.com"></object></div></body></html>