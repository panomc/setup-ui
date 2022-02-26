import NodeAdapter from "@sveltejs/adapter-node";
import SveltePreprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: NodeAdapter(),
  },

  preprocess: SveltePreprocess(),

  onwarn: (warning, handler) => {
    if (warning.code === "a11y-invalid-attribute") return;
    if (warning.code === "a11y-missing-attribute") return;

    handler(warning);
  },
};

export default config;
