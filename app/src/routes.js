export const routes = [
    {
        name: 'index', //User Browser landing page. Check cookies etc to proceed
        url: '/index',
        controller: "indexCtrl"
    },
    {
        name: 'login', //User Browser landing page. Check cookies etc to proceed
        url: '/login',
        controller: "loginCtrl",
        template: require("views/login.ng")
    }
]