'use strict';

Vue.component('Step_3', new Promise(function (resolve) {
        axios.get('/components/Pages/Main/Steps/Step_3/ui').then(function (response) {
            resolve({
                template: response.data
            });
        });
    })
);