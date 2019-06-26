const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: function (resolve, reject) {
        loadComponent('Step_Beginning', '/src/pages/Steps/Step_Beginning').then(resolve, reject);
      }
    },
    {
      path: 'Step-1',
      component: function (resolve, reject) {
        loadComponent('Step_1', '/src/pages/Steps/Step_1').then(resolve, reject);
      }
    },
    {
      path: 'Step-2',
      component: function (resolve, reject) {
        loadComponent('Step_2', '/src/pages/Steps/Step_2').then(resolve, reject);
      }
    },
    {
      path: 'Step-3',
      component: function (resolve, reject) {
        loadComponent('Step_3', '/src/pages/Steps/Step_3').then(resolve, reject);
      }
    }
  ]
});


router.beforeEach((to, from, next) => {
  const check = function () {
    if (store.state.stepChecked !== false) {
      store.state.routePageLoading = true;

      next()
    } else {
      setTimeout(check, 100); // check again in a second
    }
  };

  check()
});

router.afterEach((to, from) => {
  store.state.routePageLoading = false
});