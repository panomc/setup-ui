import { load as loadStep } from "$lib/pages/Step2.svelte";

/**  @type {import('@sveltejs/kit').LayoutLoad} */
export async function load(request) {
  return loadStep(request);
}
