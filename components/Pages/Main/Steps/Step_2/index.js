'use strict';

Vue.component('Step_2', new Promise(function (resolve) {
        axios.get('/components/Pages/Main/Steps/Step_2/ui').then(function (response) {
            resolve({
                template: response.data
            });
        });
    })
);