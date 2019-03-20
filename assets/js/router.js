const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '*',
            name: 'Error404',
            component: function (resolve, reject) {
                loadComponent('Error404', '/components/Pages/Error404').then(resolve, reject);
            }
        },
        {
            path: '/',
            name: 'Main',
            component: function (resolve, reject) {
                loadComponent('Main', '/components/Pages/Main').then(resolve, reject);
            },
            children: [
                {
                    path: '',
                    component: function (resolve, reject) {
                        loadComponent('Step_Beginning', '/components/Pages/Main/Steps/Step_Beginning').then(resolve, reject);
                    }
                },
                {
                    path: 'Step-1',
                    component: function (resolve, reject) {
                        loadComponent('Step_1', '/components/Pages/Main/Steps/Step_1').then(resolve, reject);
                    }
                },
                {
                    path: 'Step-2',
                    component: function (resolve, reject) {
                        loadComponent('Step_2', '/components/Pages/Main/Steps/Step_2').then(resolve, reject);
                    }
                },
                {
                    path: 'Step-3',
                    component: function (resolve, reject) {
                        loadComponent('Step_3', '/components/Pages/Main/Steps/Step_3').then(resolve, reject);
                    }
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    const check = function () {
        if (store.state.status !== "" && store.state.status !== "CHECKING") {
            next();
        } else {
            setTimeout(check, 100); // check again in a second
        }
    }

    check();
})