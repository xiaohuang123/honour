/**
 * Created by lifubang on 2015/6/1.
 */
var ng_aefs = {};
ng_aefs.uploadFile = function () {
    this.directive('uploadFile', ['$timeout', function ($timeout) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            replace: true,
            transclude: true,
            templateUrl : '/partials/share/upload.html',
            scope: {
                id: '@'
                , value: '@'
                , text: '@'
                , url: '@'
                , errmsg: '@'
                , mode: '@' //file image
                , style: '@'
            },
            controller : function ($scope, $element,$attrs,$transclude) {
                $scope.updateUI = function(res) {
                    var v = $scope.ngModel.$viewValue;
                    $timeout(function() {
                        if ($scope.mode.toLowerCase() == 'file') {
                            var html = '<a href="showFile?_id={0}" style="{1}" class="ajax-file-upload-statusbar" target="_blank">预览</a>'
                                .Format(v, $scope.style);
                            if (res.files) {
                                html += '(此压缩文件中包含{0}个文件)'.Format(res.files);
                            }
                            $('#{0}Files'.Format($scope.id)).val(res.files)
                            $('#{0}Prev'.Format($scope.id)).html(html).show();
                        } else if ($scope.mode.toLowerCase() == 'image') {
                            $('#{0}Prev'.Format($scope.id)).html('<img src="showFile?_id={0}" style="{1}" border="0" alt="" />'
                                .Format(v, $scope.style)).show();
                        }
                    });
                }
                $scope.updateValue = function(v, res) {
                    $scope.$apply(function () {
                        $scope.ngModel.$setViewValue(v);
                        $scope.value = v;
                        $scope.updateUI(res);
                    });
                }
            },
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) {
                    return;
                }
                scope.ngModel = ngModel;
                ngModel.$render = function (value) {
                    if (!Object.isNullString(ngModel.$viewValue))
                    {
                        scope.updateUI({});
                    }
                }
                $timeout(function() {
                    $("#{0}Btn".Format(scope.id)).uploadFile({
                        url: scope.url,
                        fileName: "myfile",
                        showProgress: true,
                        onSuccess: function (files, data, xhr, pd) {
                            var res = $.parseJSON(data);
                            if (res.err == 0 && !Object.isNullString(res.msg)) {
                                //$('#{0}'.Format(scope.id)).val(res.msg);
                                scope.updateValue(res.msg, res);
                                //$('#compLogoSel').hide();
                            } else {
                                if (res.msg == '-1') {
                                    alert(scope.errmsg);
                                } else {
                                    alert(scope.errmsg);
                                }
                            }
                        }
                    });
                });
            }
        }
    }]);
}
ng_aefs.ckeditorInline = function () {
    this.directive('ckeditorInline', function () {
        return {
            require : '?ngModel',
            replace: true,
            transclude: true,
            link : function(scope, element, attrs, ngModel) {
                if (!ngModel) {
                    return;
                }
                ngModel.$render = function (value) {
                    if (!Object.isNullString(ngModel.$viewValue))
                        element[0].innerHTML = ngModel.$viewValue;
                }
                //setTimeout (function() {
                element[0].onfocus = function() {
                    var ifinit = element[0].getAttribute('ifinit');
                    if (ifinit == '1')
                        return;
                    element[0].innerHTML = '';
                    if (CKEDITOR.instances[element[0].getAttribute('id')]) {
                        CKEDITOR.instances[element[0].getAttribute('id')].destroy();
                    }
                    CKEDITOR.config.extraPlugins = 'toolbar';
                    var ckeditor = CKEDITOR.inline(element[0]);
                    ckeditor.on('instanceReady', function () {
                        ckeditor.setData(ngModel.$viewValue);
                    });

                    ckeditor.on('pasteState', function () {
                        scope.$apply(function () {
                            //ngModel.$setViewValue(ckeditor.getData());
                            ngModel.$setViewValue(element[0].innerHTML);
                        });
                    });

                    ngModel.$render = function (value) {
                        ckeditor.setData(ngModel.$viewValue);
                    };
                    element[0].setAttribute('ifinit', '1');
                };
                //}, 1000);
            }
        }
    });
}
ng_aefs.ckeditor = function (){
    this.directive('ckeditor', function() {
        return {
            require : '?ngModel',
            link : function(scope, element, attrs, ngModel) {
                CKEDITOR.config.extraPlugins = 'toolbar';
                var ckeditor = CKEDITOR.replace(element[0], {
                    //toolbarCanCollapse: true,
                    //toolbarStartupExpanded: false,
                    height: '{0}px'.Format($(element[0]).height())
                });
                if (!ngModel) {
                    return;
                }
                ckeditor.on('instanceReady', function() {
                    ckeditor.setData(ngModel.$viewValue);
                });

                ckeditor.on('pasteState', function() {
                    scope.$apply(function() {
                        ngModel.$setViewValue(ckeditor.getData());
                    });
                });

                ngModel.$render = function(value) {
                    ckeditor.setData(ngModel.$viewValue);
                };
            }
        };
    });
};
ng_aefs.trustHtml = function(){
    this.filter('trustHtml', function ($sce) {

        return function (input) {
            if(typeof input== "number"){
                input = input.toString();
            }
            return $sce.trustAsHtml(input);

        }

    });
};
ng_aefs.quesType = function(){
    this.filter('quesType', function () {

        return function (input) {
            var match = ['单选题', '多选题', '判断题', '填空题', '问答题', '编程题'];
            var ret = '';
            var i = (input);
            if (i>0 && i<=match.length) {
                ret = match[i-1];
            } else {
                if (i==21) {
                    ret = '编程工程题';
                }
            }
            return ret;
        }

    });
};
ng_aefs.quesState = function(){
    this.filter('quesState', function () {
        return function (input) {
            var ret = '';
            switch(input) {
                case undefined:
                case null:
                case '':
                case 10:
                    ret = '<span style="color:green">新试题-初稿</span>';
                    break;
                case 20:
                    ret = '<span style="color:green">新试题-终稿</span>';
                    break;
                case 30:
                    ret = '<span style="color:blue">已验题-合格</span>';
                    break;
                case -10:
                    ret = '<span style="color:red">已验题-不合格</span>';
                    break;
                case -20:
                    ret = '<span style="color:red">赛码发现不合格</span>';
                    break;
                case -30:
                    ret = '<span style="color:red">客户验题-不合格</span>';
                    break;
                default:
                    ret = '<span style="color:blue">已验题-合格</span>';
                    break;
            }
            return ret;
        }

    });
};
ng_aefs.quesAuditState = function(){
    this.filter('quesAuditState', function () {
        return function (input) {
            var ret = '';
            switch(input) {
                case undefined:
                case null:
                case '':
                case 10:
                    ret = '<span style="color:green">新试题-初稿</span>';
                    break;
                case 20:
                    ret = '<span style="color:green">待验题</span>';
                    break;
                case 30:
                    ret = '<span style="color:blue">已验题-合格</span>';
                    break;
                case -10:
                    ret = '<span style="color:red">已验题-不合格</span>';
                    break;
                case -20:
                    ret = '<span style="color:red">赛码发现不合格</span>';
                    break;
                case -30:
                    ret = '<span style="color:red">客户验题-不合格</span>';
                    break;
                default:
                    ret = '<span style="color:blue">已验题-合格</span>';
                    break;
            }
            return ret;
        }

    });
};
ng_aefs.quesPMState = function(){
    this.filter('quesPMState', function () {
        return function (input) {
            var ret = '';
            switch(input) {
                case undefined:
                case null:
                case '':
                case 10:
                    ret = '<span style="color:green">新试题-初稿</span>';
                    break;
                case 20:
                    ret = '<span style="color:green">待验题</span>';
                    break;
                case 30:
                    ret = '<span style="color:yellow">已验收</span>';
                    break;
                case 40:
                    ret = '<span style="color:blue">已选中-未发</span>';
                    break;
                case 50:
                    ret = '<span style="color:pink">已选中-发客户</span>';
                    break;
                case 9999:
                    ret = '<span style="color:pink">已返回大库</span>';
                    break;
                case -10:
                    ret = '<span style="color:red">已验题-不合格</span>';
                    break;
                case -20:
                    ret = '<span style="color:red">赛码发现不合格</span>';
                    break;
                case -30:
                    ret = '<span style="color:red">客户验题-不合格</span>';
                    break;
                default:
                    ret = input;
                    break;
            }
            return ret;
        }

    });
};
ng_aefs.quesClientTechState = function(){
    this.filter('quesClientTechState', function () {
        return function (input) {
            var ret = '';
            switch(input) {
                case undefined:
                case null:
                case '':
                case 10:
                    ret = '<span style="color:green">新试题-初稿</span>';
                    break;
                case 20:
                    ret = '<span style="color:green">待验题</span>';
                    break;
                case 30:
                    ret = '<span style="color:green">已验收</span>';
                    break;
                case 40:
                    ret = '<span style="color:blue">已选中-未发</span>';
                    break;
                case 50:
                    ret = '<span style="color:green">客户未确认</span>';
                    break;
                case 60:
                    ret = '<span style="color:yellow">客户验收-合格</span>';
                    break;
                case -10:
                    ret = '<span style="color:red">已验题-不合格</span>';
                    break;
                case -20:
                    ret = '<span style="color:red">赛码发现不合格</span>';
                    break;
                case -30:
                    ret = '<span style="color:red">客户验收-不合格</span>';
                    break;
                default:
                    ret = input;
                    break;
            }
            return ret;
        }

    });
};