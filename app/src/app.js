const angular = require("angular")
const $ = require("jquery")
const uiRouter = require("angular-ui-router")

import 'src/components/zui/css/zui.css'

const app = angular.module("AOFPortal",[uiRouter])

app.config(function($stateProvider) {
    var helloState = {
        name: 'hello',
        url: '/hello',
        template: '<h3>hello world!</h3>'
    }

    var aboutState = {
        name: 'about',
        url: '/about',
        template: '<h3>Its the UI-Router hello world app!</h3>'
    }

    $stateProvider.state(helloState);
    $stateProvider.state(aboutState);
})