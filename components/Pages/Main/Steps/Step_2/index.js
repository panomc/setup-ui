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
                    },

                    checkForm() {
                        this.disableNextButton = !(this.host !== "" && this.dbName !== "" && this.username !== "");
                    }
                },
                mounted() {
                    if (this.$store.state.stepState !== 2) {
                        this.$router.push('/')
                    } else {
                        this.checkForm()
                    }
                },
                computed: {
                    host: {
                        get() {
                            return this.$store.state.data.db.host
                        },
                        set(value) {
                            this.$store.state.data.db.host = value

                            this.checkForm()
                        }
                    },

                    dbName: {
                        get() {
                            return this.$store.state.data.db.dbName
                        },
                        set(value) {
                            this.$store.state.data.db.dbName = value

                            this.checkForm()
                        }
                    },

                    username: {
                        get() {
                            return this.$store.state.data.db.username
                        },
                        set(value) {
                            this.$store.state.data.db.username = value

                            this.checkForm()
                        }
                    },

                    password: {
                        get() {
                            return this.$store.state.data.db.password
                        },
                        set(value) {
                            this.$store.state.data.db.password = value

                            this.checkForm()
                        }
                    }
                }
            });
        });
    })
);