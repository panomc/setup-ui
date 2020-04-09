import jquery from "jquery";
import Popper from "popper.js";
import "bootstrap";

import { ApiUtil } from "./util/api.util";
import { checkCurrentStep } from "./Store";

import App from "./App.svelte";

ApiUtil.init("http://localhost:8088/api/");

window.jQuery = window.jquery = window.$ = jquery;
window.Popper = Popper;

checkCurrentStep();

const app = new App({
  target: document.body
});

export default app;
