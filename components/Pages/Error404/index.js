'use strict';

Vue.component('Error404', new Promise(function (resolve) {
        axios.get('/components/Pages/Error404/ui').then(function (response) {
            resolve({
                template: response.data
            });
        });
    })
);