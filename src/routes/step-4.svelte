<Step4 {...stepInfo} />

<script context="module">
  import { load as loadStep } from "$lib/pages/Step4.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(request) {
    return await loadStep(request);
  }
</script>

<script>
  import Step4 from "$lib/pages/Step4.svelte";

  export let stepInfo;
</script>
