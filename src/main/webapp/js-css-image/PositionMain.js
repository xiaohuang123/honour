/**
 * Created by lifubang on 2015/5/31.
 */
var ngCompApp = angular.module('ngCompApp', ['ngRoute','PositionControllers']);

ngCompApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/list', {
            templateUrl: '/partials/hr/position/list.html',
            controller: 'ListController'
        }).
        when('/list/:curPage', {
            templateUrl: '/partials/hr/position/list.html',
            controller: 'ListController'
        }).
        when('/stand',{
            templateUrl: '/partials/hr/position/stand.html',
            controller:'standControl'
        }).
        when('/standNext/:positionId',{
            templateUrl: '/partials/hr/position/standNext.html',
            controller:'standNextControl'
        }).
        otherwise({
            redirectTo: '/list'
        });
}]);

ng_aefs.ckeditor.apply(ngCompApp);
ng_aefs.ckeditorInline.apply(ngCompApp);