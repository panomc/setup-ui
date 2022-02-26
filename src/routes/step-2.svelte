<Step2 {...stepInfo} />

<script context="module">
  import { load as loadStep } from "$lib/pages/Step2.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(request) {
    return await loadStep(request);
  }
</script>

<script>
  import Step2 from "$lib/pages/Step2.svelte";

  export let stepInfo;
</script>
