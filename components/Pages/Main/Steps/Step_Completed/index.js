'use strict';

Vue.component('Step_Beginning', new Promise(function (resolve) {
        axios.get('/components/Pages/Main/Steps/Step_Completed/ui').then(function (response) {
            resolve({
                template: response.data
            });
        });
    })
);