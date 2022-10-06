import { writable } from "svelte/store";

import ApiUtil, { NETWORK_ERROR } from "$lib/api.util.js";
import { goto } from "$app/navigation";

export const stepState = writable(5);
export const stepChecked = writable(false);

export const websiteName = writable("");
export const websiteDescription = writable("");

export const db = writable({
  host: "",
  dbName: "",
  username: "",
  password: "",
  prefix: "pano_",
});

export const host = writable("");
export const ip = writable("");

export const panoAccount = writable({
  username: "",
  email: "",
  access_token: "",
});

export const account = writable({
  username: "",
  email: "",
  password: "",
});

export function checkRoute(step, pathname) {
  const stepLocation = "/step-" + step;

  if (step === 0 && pathname !== "/") {
    return "/";
  } else if (step !== 0 && pathname !== stepLocation) {
    return stepLocation;
  } else {
    return null;
  }
}

export async function checkCurrentStep(request) {
  return ApiUtil.get({ path: "/api/setup/step/check", request })
    .then((body) => {
      if (body.error) {
        return { ...body, step: 0 };
      }

      return body;
    })
    .catch((err) => {
      return { error: NETWORK_ERROR, step: 0 };
    });
}

// export function initializeCurrentStep(response) {
//   const step = response.data.step;
//
//   if (typeof step !== "undefined") {
//     stepState.set(step);
//
//     if (step === 1) {
//       websiteName.set(response.data.websiteName);
//       websiteDescription.set(response.data.websiteDescription);
//     } else if (step === 2) {
//       db.set({
//         host: response.data.db.host,
//         dbName: response.data.db.dbName,
//         username: response.data.db.username,
//         password: response.data.db.password,
//         prefix: response.data.db.prefix,
//       });
//     } else if (step === 3) {
//       websiteName.set(response.data.websiteName);
//       websiteDescription.set(response.data.websiteDescription);
//
//       host.set(response.data.host);
//       ip.set(response.data.ip);
//
//       panoAccount.set({
//         username: response.data.panoAccount.username,
//         email: response.data.panoAccount.email,
//         access_token: response.data.panoAccount.access_token,
//       });
//     }
//   }
//
//   stepChecked.set(true);
// }

function initializeCurrentStep(path) {
  checkCurrentStep().then((stepInfo) => {
    const { step } = stepInfo;

    const redirect = checkRoute(step, path);

    goto(redirect);
  });
}

export function nextStep(body, path) {
  ApiUtil.post({
    path: "/api/setup/step/nextStep",
    body,
  }).then(() => {
    initializeCurrentStep(path);
  });
}

export function backStep(body, path) {
  ApiUtil.post({
    path: "/api/setup/step/backStep",
    body,
  }).then(() => {
    initializeCurrentStep(path);
  });
}
