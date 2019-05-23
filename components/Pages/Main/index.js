'use strict';

Vue.component('Main', new Promise(function (resolve) {
    axios.get('/components/Pages/Main/ui').then(function (response) {
      resolve({
        template: response.data
      });
    });
  })
);