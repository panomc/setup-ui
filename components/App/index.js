function loadComponent(componentName, path) {
  return new Promise(function (resolve, reject) {
    requirejs([path], function () {
      const component = Vue.component(componentName);

      if (component) {
        resolve(component);
      } else {
        reject();
      }
    });
  });
}

ApiUtil.init()

axios.get('/components/App/ui').then(function (response) {
  const app = new Vue({
    el: '#app',
    template: response.data,
    router,
    i18n,
    store,
    metaInfo() {
      return {
        title: this.$t("Common.Page.title"),
        meta: [
          {name: 'description', content: this.$t("Common.Page.description")}
        ]
      }
    },
    methods: {
      setLang(lang) {
        this.$store.dispatch('setLang', lang)
      }
    },
    computed: {
      langLoading() {
        return this.$store.state.langLoading
      },

      routePageLoading() {
        return this.$store.state.routePageLoading
      }
    },
    beforeMount() {
      let loadLanguage;

      if (LanguageUtil.isThereLanguage())
        loadLanguage = LanguageUtil.getLanguage()
      else if (navigator.language.toUpperCase() === "tr".toUpperCase() || navigator.language.toUpperCase() === "tr-tr".toUpperCase())
        loadLanguage = "tr"
      else
        loadLanguage = "en"

      loadLanguageAsync(loadLanguage)

      this.$store.dispatch("checkCurrentStep")
    }
  });
});