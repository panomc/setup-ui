'use strict';

Vue.component('Step_2', new Promise(function (resolve) {
        axios.get('/components/Pages/Main/Steps/Step_2/ui').then(function (response) {
            resolve({
                template: response.data,
                data() {
                    return {
                        disableNextButton: true
                    }
                },
                methods: {
                    next() {
                        this.$store.state.stepState = 3

                        this.$router.push('/step-3')
                    },

                    back() {
                        this.$store.state.stepState = 1

                        this.$router.push('/step-1')
                    }
                },
                mounted() {
                    if (this.$store.state.stepState !== 2)
                        this.$router.push('/')
                },
                computed: {
                    websiteName: {
                        get() {
                            return this.$store.state.data.websiteName
                        },
                        set(value) {
                            this.$store.state.data.websiteName = value

                            this.checkForm()
                        }
                    }
                }
            });
        });
    })
);