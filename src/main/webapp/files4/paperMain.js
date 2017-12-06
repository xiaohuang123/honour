/**
 * Created by wangguoxiang on 2017/04/11.
 */
var ngCompApp = angular.module('ngCompApp', ['ngRoute','paperControllers']);

ngCompApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/list', {
        templateUrl: '/partials/hr/paper/list.html',
        controller: 'ListController'
    }).
    when('/add', {
        templateUrl: '/partials/hr/paper/add.html',
        controller: 'AddController'
    }).
    when('/edit/:prjId', {
        templateUrl: '/partials/hr/paper/add.html',
        controller: 'EditController'
    }).
    when('/view/:positionId', {
        templateUrl: '/partials/hr/paper/view.html',
        controller: 'ViewController'
    }).
    otherwise({
        redirectTo: '/list'
    });
}]);

ng_aefs.ckeditor.apply(ngCompApp);
ng_aefs.ckeditorInline.apply(ngCompApp);

