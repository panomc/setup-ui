import { ApiUtil } from "./util/api.util";
import { writable } from "svelte/store";
import page from "page";

export const stepState = writable(4);
export const stepChecked = writable(false);

export const websiteName = writable("");
export const websiteDescription = writable("");

export const db = writable({
  host: "",
  dbName: "",
  username: "",
  password: "",
  prefix: "pano_"
});

export const host = writable("");
export const ip = writable("");

export const panoAccount = writable({
  username: "",
  email: "",
  access_token: ""
});

export const account = writable({
  username: "",
  email: "",
  password: ""
});

function initializeCurrentStep(response) {
  const step = response.data.step;

  if (typeof step !== 'undefined') {
    stepState.set(step);

    if (step === 0) {
      page.redirect("/");
    } else if (step === 1) {
      websiteName.set(response.data.websiteName);
      websiteDescription.set(response.data.websiteDescription);

      page.redirect("/step-1");
    } else if (step === 2) {
      db.set({
        host: response.data.db.host,
        dbName: response.data.db.dbName,
        username: response.data.db.username,
        password: response.data.db.password,
        prefix: response.data.db.prefix
      });

      page.redirect("/step-2");
    } else if (step === 3) {
      websiteName.set(response.data.websiteName);
      websiteDescription.set(response.data.websiteDescription);

      host.set(response.data.host);
      ip.set(response.data.ip);

      panoAccount.set({
        username: response.data.panoAccount.username,
        email: response.data.panoAccount.email,
        access_token: response.data.panoAccount.access_token
      });

      page.redirect("/step-3");
    } else {
      page.redirect("/");
    }
  }

  stepChecked.set(true);
}

export function checkCurrentStep() {
  ApiUtil.get("setup/step/check")
    .then(response => {

      initializeCurrentStep(response);
    })
    .catch(() => {
      stepChecked.set(true);
    });
}

export function nextStep(data) {
  ApiUtil.post("setup/step/nextStep", data)
    .then(() => {
      checkCurrentStep();
    });
}

export function backStep(data) {
  ApiUtil.post("setup/step/backStep", data)
    .then(() => {
      checkCurrentStep();
    });
}