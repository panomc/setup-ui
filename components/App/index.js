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

requirejs(["/assets/js/router.js", "/assets/js/i18n.js", "/assets/js/storage.util.js"], function () {
    axios.get('/components/App/ui').then(function (response) {
        const app = new Vue({
            el: '#app',
            template: response.data,
            router,
            i18n,
            mounted() {
                let loadLanguage;

                if (LanguageUtil.isThereLanguage())
                    loadLanguage = LanguageUtil.getLanguage()
                else if (navigator.language.toUpperCase() === "tr".toUpperCase() || navigator.language.toUpperCase() === "tr-tr".toUpperCase())
                    loadLanguage = "tr"
                else
                    loadLanguage = "en"

                loadLanguageAsync(loadLanguage)
            },
            metaInfo() {
                return {
                    title: this.$t("Common.Page.title"),
                    meta: [
                        {name: 'description', content: this.$t("Common.Page.description")}
                    ]
                }
            }
        });
    });
});