'use strict';

const Header = Vue.component('Header', function (resolve, reject) {
	axios.get('/components/Header/ui').then(function (response) {
		resolve({
			template: response.data
		});
	});
});