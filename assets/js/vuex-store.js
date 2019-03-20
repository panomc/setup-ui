Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        langLoading: false,
        stepState: 0,
        data: {
            websiteName: "",
            websiteDescription: ""
        }
    },

    mutations: {
        SET_LANG(state, payload) {
            loadLanguageAsync(payload)
            LanguageUtil.saveLanguage(payload)
        }
    },

    actions: {
        setLang({commit}, payload) {
            commit('SET_LANG', payload)
        }
    },

    getters: {}
})
