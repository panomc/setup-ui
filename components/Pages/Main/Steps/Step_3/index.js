'use strict';

Vue.component('Step_3', new Promise(function (resolve) {
        axios.get('/components/Pages/Main/Steps/Step_3/ui').then(function (response) {
            resolve({
                template: response.data,
                methods: {
                    finish() {
                    },

                    back() {
                        this.$store.state.stepState = 2

                        this.$router.push('/step-2')
                    }
                },
                mounted() {
                    if (this.$store.state.stepState !== 3)
                        this.$router.push('/')
                }
            });
        });
    })
);