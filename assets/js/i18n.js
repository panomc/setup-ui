const i18n = new VueI18n()

const loadedLanguages = [] // our default language that is preloaded

function setI18nLanguage(lang) {
    i18n.locale = lang
    document.querySelector('html').setAttribute('lang', lang)
    return lang
}

function loadLanguageAsync(lang) {
    if (i18n.locale !== lang) {
        if (!loadedLanguages.includes(lang)) {

            return new Promise(function (resolve) {
                axios.get(`/assets/lang/${lang}.json`).then(function (response) {
                    i18n.setLocaleMessage(lang, response.data)
                    loadedLanguages.push(lang)

                    const result = setI18nLanguage(lang)

                    resolve(
                        result
                    );
                });
            })
        }
        return Promise.resolve(setI18nLanguage(lang))
    }
    return Promise.resolve(lang)
}