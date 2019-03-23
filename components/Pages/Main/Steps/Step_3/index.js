'use strict';

Vue.component('Step_3', new Promise(function (resolve) {
        axios.get('/components/Pages/Main/Steps/Step_3/ui').then(function (response) {
            resolve({
                template: response.data,
                data() {
                    return {
                        justVariable: 54,
                        backButtonLoading: false
                    }
                },
                methods: {
                    connectPanoAccount() {
                        const vue = this

                        window.open("http://localhost:8080/login-platform", "", "toolbar=no,scrollbars=false,width=500,height=500,top=300,left=100");

                        // Create IE + others compatible event handler
                        const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
                        const eventer = window[eventMethod];
                        const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

                        // Listen to message from child window
                        eventer(messageEvent, function (e) {
                            console.log('origin: ', e.origin)

                            // Check if origin is proper
                            // if( e.origin !== 'http://localhost' ){ return }
                            console.log('parent received message!: ', e.data);
                        }, false);
                    },
                    finish() {
                    },

                    back() {
                        if (!this.nextButtonLoading) {
                            this.backButtonLoading = true

                            this.$store.dispatch("backStep", {
                                step: 3
                            })
                        }
                    }
                },
                beforeMount() {
                    if (this.$store.state.stepState !== 3)
                        this.$router.push('/')
                }
            });
        });
    })
);