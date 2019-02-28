'use strict';

const Footer = Vue.component('Footer', function (resolve, reject) {
	axios.get('/components/Footer/ui').then(function (response) {
		resolve({
			template: response.data
		});
	});
});