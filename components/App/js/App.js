requirejs(["/components/Header/js/Header.js", "/components/Footer/js/Footer.js", "/components/Stage_1/js/Stage_1.js"], function () {
    axios.get('/components/App/ui').then(function (response) {
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!'
            },
            components: {
                Header, Footer, Stage_1,
            },
            template: response.data
        });
    });
});