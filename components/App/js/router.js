const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: function (resolve, reject) {
                loadComponent('Step_1', '/components/Pages/Step_1/js/Step_1.js').then(resolve, reject);
            }
        },
        {
            path: '/contact',
            component: function (resolve, reject) {
                loadComponent('contact', 'contact.js').then(resolve, reject);
            }
        }
    ]
});