import { redirect } from "@sveltejs/kit";

import { checkCurrentStep, checkRoute } from "$lib/Store.js";

/**  @type {import('./$types').LayoutServerLoad} */
export async function load(input) {
  const {
    url: { pathname },
    locals: { acceptedLanguage, CSRFToken },
  } = input;
  const stepInfo = await checkCurrentStep(input);
  const { step } = stepInfo;

  const route = checkRoute(step, pathname);

  if (route) {
    throw redirect(302, route);
  }

  return { stepInfo, acceptedLanguage, CSRFToken };
}
