const angular = require("angular")

let app = angular.module("AOFPortal",[])

app.controller("appCtrl",require('controllers/testCtrl.js').testCtrl)