import jquery from 'jquery';
import Popper from 'popper.js';
import 'bootstrap';

import App from './App.svelte';

window.jQuery = window.jquery = window.$ = jquery;
window.Popper = Popper;

const app = new App({
  target: document.body
});


export default app;
