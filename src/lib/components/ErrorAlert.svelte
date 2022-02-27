{#if error}
  <div class="alert alert-danger" transition:fade>
    {error}
  </div>
{/if}

<script>
  import { fade } from "svelte/transition";

  export let error;
</script>
