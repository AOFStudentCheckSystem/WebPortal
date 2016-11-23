const angular = require("angular")
const $ = require("jquery")
const uiRouter = require("angular-ui-router")

import 'src/components/zui/css/zui.css'

const app = angular.module("AOFPortal",[uiRouter],function ($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    let param = function (obj) {
        let query = '', name, value, fullSubName, subName, subValue, innerObj, i;
        for (name in obj) {
            value = obj[name];
            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
        return query.length ? query.substr(0, query.length - 1) : query;
    };
    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
});
app.factory('httpInterceptor', ['$q', '$injector', function ($q, $injector) {
    return {
        'responseError': function (response) {
            if (response.status == 401) {
                window.localStorage.clear();
                window.location.href = "/";
            }
            return $q.reject(response);
        },
        'response': function (response) {
            return response;
        },
        'request': function (config) {
            return config;
        },
        'requestError': function (config) {
            return $q.reject(config);
        }
    };
}]);
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
}]);
app.factory("userdata", function ($http) {
    let data = {};
    return {
        getSession:function () {
            return window.localStorage.getItem("session")
        },
        setSession: function (sessionKey) {
            window.localStorage.setItem("session",sessionKey)
        }
    };
});
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('','/index')
    $urlRouterProvider.when('/','/index')

    const routes = require("./routes.js").routes
    routes.forEach( route => {
        $stateProvider.state(route)
    })
})
//Controllers
app.controller("indexCtrl",require("controllers/indexCtrl.js").controller)
app.controller("loginCtrl",require("controllers/loginCtrl.js").controller)
