import { ApiUtil } from "./util/api.util";
import { writable } from "svelte/store";
import page from "page";

export const stepState = writable(0);
export const stepChecked = writable(false);

export const websiteName = writable(false);
export const websiteDescription = writable(false);

export const db = {
  host: writable(""),
  dbName: writable(""),
  username: writable(""),
  password: writable(""),
  prefix: writable("pano_")
};

export const host = writable("");
export const ip = writable("");

export const panoAccount = {
  username: writable(""),
  email: writable(""),
  access_token: writable("")
};

function initializeCurrentStep(response) {
  const step = response.data.step;

  stepState.set(step);

  if (step === 0) {
    page.redirect("/");
  } else if (step === 1) {
    websiteName.set(response.data.websiteName);
    websiteDescription.set(response.data.websiteDescription);

    page.redirect("/step-1");
  } else if (step === 2) {
    db.host.set(response.data.db.host);
    db.dbName.set(response.data.db.dbName);
    db.username.set(response.data.db.username);
    db.password.set(response.data.db.password);
    db.prefix.set(response.data.db.prefix);

    page.redirect("/step-2");
  } else if (step === 3) {
    websiteName.set(response.data.websiteName);
    websiteDescription.set(response.data.websiteDescription);

    host.set(response.data.host);
    ip.set(response.data.ip);

    panoAccount.username.set(response.data.panoAccount.username);
    panoAccount.email.set(response.data.panoAccount.email);
    panoAccount.access_token.set(response.data.panoAccount.access_token);

    page.redirect("/step-3");
  } else {
    page.redirect("/");
  }

  stepChecked.set(true);
}

export function checkCurrentStep() {
  ApiUtil.get("setup/step/check")
    .then(response => {
      initializeCurrentStep(response);
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