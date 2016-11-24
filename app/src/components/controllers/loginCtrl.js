export function controller($scope, $state, $http, userdata) {
    const rootUrl = require("src/consts.js").rootURL
    const md5 = require("md5")
    $scope.login = function () {
        $http.post(rootUrl+ "/web/auth",{username:$scope.username, password:md5($scope.password)})
            .then(function (result) {
                userdata.setSession(result.data.token)
                $state.go("index")
            }, function (failure) {
                new $.zui.Messager('Wrong username or password', {
                    icon: 'heart',
                    type: 'danger',
                    fade: false,
                    placement: 'center' // 定义显示位置
                }).show();
            })
    }
}