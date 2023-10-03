<div class:opacity-75="{disabled}">
  <h4>Hoş geldiniz</h4>
  <p class="text-muted">
    Yukarıda listelenen adımlarla ilgili gereksinimleri belirleyerek Pano'yu ağ
    sunucunuza kurabilirsiniz.
  </p>
</div>

<h5>Dil seçin</h5>

<ul class="list-group mb-3">
  <li class="list-group-item">
    <input
      class="form-check-input me-1"
      type="radio"
      name="langSelectionRadio"
      value=""
      id="langENRadio"
      aria-checked="true"
      checked />
    <label class="form-check-label" for="langENRadio">ingilizce (US)</label>
  </li>
  <li class="list-group-item">
    <input
      class="form-check-input me-1"
      type="radio"
      name="langSelectionRadio"
      value=""
      id="langTRRadio" />
    <label class="form-check-label" for="langTRRadio">Türkçe (TR)</label>
  </li>
</ul>

<div class="row justify-content-end">
  <div class="col-6">
    <button
      class="btn btn-primary w-100"
      on:click="{start}"
      class:disabled="{loading || disabled}"
      disabled="{loading || disabled}">
      Başla
    </button>
  </div>
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
