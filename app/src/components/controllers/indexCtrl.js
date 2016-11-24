export function controller($scope, $state, $rootScope, userdata) {
    $rootScope.siteTitle = "AOF Portal"
    if (!userdata.hasSession()){
        $state.go("login")
    } else {
        userdata.isAlive().then(function (success) {
            userdata.setUsername(success.username)
        }, function (failed) {
            userdata.setSession(null)
            $state.go("login")
        })
    }
}