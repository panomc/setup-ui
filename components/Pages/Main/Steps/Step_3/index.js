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
                    popupCenter(url, title, w, h) {
                        // Fixes dual-screen position                         Most browsers      Firefox
                        const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
                        const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

                        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
                        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

                        const systemZoom = width / window.screen.availWidth;
                        const left = (width - w) / 2 / systemZoom + dualScreenLeft;
                        const top = (height - h) / 2 / systemZoom + dualScreenTop;
                        const newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=no, copyhistory=no, scrollbars=yes, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);

                        // Puts focus on the newWindow
                        if (window.focus) newWindow.focus();
                    },

                    connectPanoAccount() {
                        const vue = this

                        this.popupCenter("http://localhost:8080/login-platform", "Pano Giriş", "550", "620")

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