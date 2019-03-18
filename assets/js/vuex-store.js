Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        langLoading: false
    },

    mutations: {
        SET_LANG(state, payload) {
            loadLanguageAsync(payload)
            LanguageUtil.saveLanguage(payload)
        },

        auth_success(state, data) {
            state.user = data.user

            state.status = "LOGGED_IN"
            TokenUtil.saveToken(data.token)
            TokenHelperUtil.saveTokenHelper(data.tokenHelper)
        },

        logout(state) {
            state.status = 'NOT_LOGGED_IN'
            TokenUtil.removeToken()
            TokenHelperUtil.removeTokenHelper()
        },

        token_check_success(state, data) {
            state.user = data.user

            state.status = "LOGGED_IN"
        },

        token_checking(state) {
            state.status = "CHECKING"
        }
    },

    actions: {
        setLang({commit}, payload) {
            commit('SET_LANG', payload)
        },

        login(context, user) {
            return new Promise((resolve, reject) => {
                if (TokenUtil.getToken()) {
                    context.dispatch("checkToken")

                    reject()
                } else
                    ApiUtil.post("login", user)
                        .then(response => {
                            if (response.data.result === "ok") {
                                const token = response.data.token
                                const tokenHelper = response.data.tokenHelper
                                const user = response.data.user

                                context.commit('auth_success', {
                                    token: token,
                                    tokenHelper: tokenHelper,
                                    user: user
                                })

                                resolve(response)
                            } else if (response.data.result === "error") {
                                const errorCode = response.data.error

                                reject(errorCode)
                            } else
                                reject(NETWORK_ERROR)
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
                            reject(NETWORK_ERROR)
                        })
            })
        },

        register({commit}, user) {
            return new Promise((resolve, reject) => {
                if (TokenUtil.getToken()) {
                    this.checkToken(commit)

                    reject()
                } else
                    ApiUtil.post("register", user)
                        .then(response => {
                            if (response.data.result === "ok")
                                resolve(response)
                            else if (response.data.result === "error") {
                                const errorCode = response.data.error

                                reject(errorCode)
                            } else
                                reject(NETWORK_ERROR)
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
                            reject(NETWORK_ERROR)
                        })
            })
        },

        resetPassword({commit}, user) {
            return new Promise((resolve, reject) => {
                if (TokenUtil.getToken()) {
                    this.checkToken(commit)

                    reject()
                } else
                    ApiUtil.post("auth/resetPassword", {account: user})
                        .then(response => {
                            if (response.data.result === "ok")
                                resolve(response)
                            else if (response.data.result === "error") {
                                const errorCode = response.data.error

                                reject(errorCode)
                            } else
                                reject(NETWORK_ERROR)
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
                            reject(NETWORK_ERROR)
                        })
            })
        },

        checkToken({commit}) {
            commit('token_checking')

            const token = TokenUtil.getToken()
            const tokenHelper = TokenHelperUtil.getTokenHelper()

            ApiUtil.post("token/check", {token, tokenHelper})
                .then(response => {
                    if (response.data.result === "ok") {
                        const user = response.data.user

                        commit('token_check_success', {
                            user: user
                        })
                    } else
                        commit('logout')
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
                    commit('logout')
                })
        },

        logoutWithoutAPI({commit}) {
            commit('logout')
        }
    },

    getters: {}
})
