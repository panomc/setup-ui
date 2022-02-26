<Step3 {...stepInfo} />

<script context="module">
  import { load as loadStep } from "$lib/pages/Step3.svelte";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(request) {
    return await loadStep(request);
  }
</script>

<script>
  import Step3 from "$lib/pages/Step3.svelte";

  export let stepInfo;
</script>
