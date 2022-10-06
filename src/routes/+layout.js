import { load as loadLayout } from "$lib/layouts/MainLayout.svelte";

/** @type {import('./$types').LayoutLoad} */
export async function load(input) {
  const {data} = input;

  await loadLayout(input);

  return data;
}