<Step1 {...stepInfo} />

<script context="module">
  import { load as loadStep } from "$lib/pages/Step1.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(request) {
    return await loadStep(request);
  }
</script>

<script>
  import Step1 from "$lib/pages/Step1.svelte";

  export let stepInfo;
</script>
