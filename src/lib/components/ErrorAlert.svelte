{#if error || alwaysVisible}
  <div class="alert alert-danger" in:fade out:fade>
    {error}
  </div>
{/if}

<script>
  import { fade } from "svelte/transition";

  export let error;

  const alwaysVisible = false;
</script>
