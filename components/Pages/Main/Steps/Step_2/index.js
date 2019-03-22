'use strict';

Vue.component('Step_2', new Promise(function (resolve) {
        axios.get('/components/Pages/Main/Steps/Step_2/ui').then(function (response) {
            resolve({
                template: response.data,
                data() {
                    return {
                        disableNextButton: true,
                        errorCode: "NOTHING",
                        loading: false
                    }
                },
                methods: {
                    submit() {
                        this.checkDB()
                    },

                    back() {
                        this.$store.state.stepState = 1

                        this.$router.push('/step-1')
                    },

                    passStep() {
                        this.$store.state.stepState = 3

                        this.$router.push('/step-3')
                    },

                    checkDB() {
                        this.loading = true

                        const {
                            host,
                            dbName,
                            username,
                            password
                        } = this

                        ApiUtil.post("/api/setup/dbConnectionTest", {
                            host,
                            dbName,
                            username,
                            password
                        })
                            .then(response => {
                                if (response.data.result === "ok") {
                                    this.passStep()

                                } else if (response.data.result === "error") {
                                    const errorCode = response.data.error

                                    this.showError(errorCode)
                                } else
                                    this.showError(NETWORK_ERROR)
                            })
                            .catch(error => {
                                if (error.response) {
                                    // The request was made and the server responded with a status code
                                    // that falls out of the range of 2xx
                                    console.log(error.response.data);
                                    console.log(error.response.status);
                                    console.log(error.response.headers);
                                } else if (error.request) {
                                    // The request was made but no response was received
                                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                                    // http.ClientRequest in node.js
                                    console.log(error.request);
                                } else {
                                    // Something happened in setting up the request that triggered an Error
                                    console.log('Error', error.message);
                                }
                                console.log(error.config);
                                this.showError(NETWORK_ERROR)
                            })
                    },

                    checkForm() {
                        this.disableNextButton = !(this.host !== "" && this.dbName !== "" && this.username !== "");
                    },

                    showError: function (error) {
                        this.loading = false

                        this.errorCode = error;

                        $("#databaseError").fadeIn();
                    },

                    dismissErrorBox() {
                        $("#databaseError").fadeOut("slow");
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