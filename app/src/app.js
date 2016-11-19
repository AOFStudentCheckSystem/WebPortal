const angular = require("angular")
const $ = require("jquery")
const uiRouter = require("angular-ui-router")

import 'src/components/zui/css/zui.css'

const app = angular.module("AOFPortal",[uiRouter])
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
