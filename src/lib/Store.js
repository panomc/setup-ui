import ApiUtil, { NETWORK_ERROR } from "$lib/api.util.js";
import { goto } from "$app/navigation";
import { writable } from "svelte/store";

export const session = writable({});
export const currentStep = writable(0);

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
    .catch(() => {
      return { error: NETWORK_ERROR, step: 0 };
    });
}

function initializeCurrentStep(path) {
  checkCurrentStep().then((stepInfo) => {
    const { step } = stepInfo;

    currentStep.set(step);

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
