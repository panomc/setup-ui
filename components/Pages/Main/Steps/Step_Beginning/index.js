'use strict';

Vue.component('Step_Beginning', new Promise(function (resolve) {
    axios.get('/components/Pages/Main/Steps/Step_Beginning/ui').then(function (response) {
      resolve({
        template: response.data,
        data() {
          return {
            nextButtonLoading: false
          }
        },
        methods: {
          start() {
            this.nextButtonLoading = true

            this.$store.dispatch("nextStep", {
              step: 0
            })
          }
        }
      });
    });
  })
);