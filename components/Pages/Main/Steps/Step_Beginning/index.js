'use strict';

Vue.component('Step_Beginning', new Promise(function (resolve) {
        axios.get('/components/Pages/Main/Steps/Step_Beginning/ui').then(function (response) {
            resolve({
                template: response.data,
                methods: {
                    start() {
                        this.$store.state.stepState = 1

                        this.$router.push('/step-1')
                    }
                }
            });
        });
    })
);