'use strict';

const Stage_1 = Vue.component('Stage_1', function (resolve, reject) {
	axios.get('/components/Stage_1/ui').then(function (response) {
		resolve({
			template: response.data
		});
	});
});