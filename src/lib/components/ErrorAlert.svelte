{#if error}
  <div class="alert alert-danger" in:fade out:fade>
    {error}
  </div>
{/if}

<script>
  import { fade } from "svelte/transition";

  export let error;
</script>
