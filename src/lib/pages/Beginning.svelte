<div class:opacity-75="{disabled}">
  <h3>Hoş geldiniz</h3>
  <p class="text-muted">
    Yukarıda listelenen adımlarla ilgili gereksinimleri belirleyerek Pano'yu ağ
    sunucunuza kurabilirsiniz.
  </p>
</div>

<div class="row pt-3">
  <button
    class="btn btn-primary"
    on:click="{start}"
    class:disabled="{loading || disabled}"
    disabled="{loading || disabled}">
    İleri
  </button>
</div>

<script>
  import { page } from "$app/stores";
  import { nextStep } from "$lib/Store.js";

  export let stepInfo;

  let loading = false;
  $: disabled = !!stepInfo.error;

  function start() {
    if (!disabled) {
      loading = true;

      nextStep({
        step: 0,
        path: $page.url.pathname,
      });
    }
  }
</script>
