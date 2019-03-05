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

requirejs(["/assets/js/router.js"], function () {
    axios.get('/components/App/ui').then(function (response) {
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!'
            },
            template: response.data,
            router
        });
    });
});