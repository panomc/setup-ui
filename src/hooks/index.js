import { getAcceptedLanguage } from "$lib/language.util.js";

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession({ request: { headers } }) {
  const acceptedLanguage = getAcceptedLanguage(headers);

  return {
    acceptedLanguage,
  };
}
