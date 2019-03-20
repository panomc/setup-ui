'use strict';

Vue.component('Step_1', new Promise(function (resolve) {
        axios.get('/components/Pages/Main/Steps/Step_1/ui').then(function (response) {
            resolve({
                template: response.data,
                data() {
                    return {
                        disableNextButton: true
                    }
                },
                methods: {
                    next() {
                        this.$store.state.stepState = 2

                        this.$router.push('/step-2')
                    },

                    back() {
                        this.websiteName = ""
                        this.websiteDescription = ""

                        this.$store.state.stepState = 0

                        this.$router.push('/')
                    },

                    checkForm() {
                        this.disableNextButton = !(this.websiteName !== "" && this.websiteDescription !== "");
                    }
                },
                mounted() {
                    if (this.$store.state.stepState !== 1)
                        this.$router.push('/')
                    else {
                        this.checkForm()
                    }
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
                    },

                    websiteDescription: {
                        get() {
                            return this.$store.state.data.websiteDescription
                        },
                        set(value) {
                            this.$store.state.data.websiteDescription = value

                            this.checkForm()
                        }
                    }
                }
            });
        });
    })
);