/**
 * Created by lifubang on 2015/5/31.
 */
var ngCompApp = angular.module('ngCompApp', ['ngRoute','quesControllers']);

ngCompApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/list', {
        templateUrl: '/partials/hr/ques/list.html',
        controller: 'ListController'
    }).
    when('/add', {
        templateUrl: '/partials/hr/ques/add.html',
        controller: 'AddController'
    }).
    when('/add/onlinecode', {
        templateUrl: '/partials/hr/ques/onlinecode.html',
        controller: 'AddOnlineCodeController'
    }).
    when('/add/webcode', {
        templateUrl: '/partials/hr/ques/webcode.html',
        controller: 'AddWebCodeController'
    }).
    when('/add/onlinecode/:positionId/:paperId', {
        templateUrl: '/partials/hr/ques/onlinecode.html',
        controller: 'AddOnlineCodeController'
    }).
    when('/add/webcode/:positionId/:paperId', {
        templateUrl: '/partials/hr/ques/webcode.html',
        controller: 'AddWebCodeController'
    }).
    when('/add/webcode/:positionId/:paperId', {
        templateUrl: '/partials/hr/ques/webcode.html',
        controller: 'AddWebCodeController'
    }).
    when('/edit/onlinecode/:questionId', {
        templateUrl: '/partials/hr/ques/onlinecode.html',
        controller: 'EditOnlineCodeController'
    }).
    when('/edit/webcode/:questionId', {
        templateUrl: '/partials/hr/ques/webcode.html',
        controller: 'EditWebCodeController'
    }).
    when('/add/:option', {
        templateUrl: '/partials/hr/ques/add.html',
        controller: 'AddController'
    }).
    when('/add/:positionId/:paperId', {
        templateUrl: '/partials/hr/ques/add.html',
        controller: 'AddInPaperController'
    }).
    when('/edit/:questionId', {
        templateUrl: '/partials/hr/ques/add.html',
        controller: 'EditController'
    }).
    when('/import', {
        templateUrl: '/partials/hr/ques/import.html',
        controller: 'ImportController'
    }).
    when('/import/:positionId/:paperId', {
        templateUrl: '/partials/hr/ques/import.html',
        controller: 'ImportController'
    }).
    when('/manager/:positionId/:paperId', {
        templateUrl: '/partials/hr/ques/man.html',
        controller: 'ManController'
    }).
    when('/select/:positionId/:paperId', {
        templateUrl: '/partials/hr/ques/select.html',
        controller: 'SelectController'
    }).
    otherwise({
        redirectTo: '/list'
    });
}]);

ng_aefs.ckeditor.apply(ngCompApp);
ng_aefs.ckeditorInline.apply(ngCompApp);
ng_aefs.uploadFile.apply(ngCompApp);

