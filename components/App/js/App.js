requirejs(["/components/Stage_1/js/Stage_1.js"], function () {
    axios.get('/components/App/ui').then(function (response) {
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!'
            },
            components: {
                Stage_1,
            },
            template: response.data
        });
    });
});