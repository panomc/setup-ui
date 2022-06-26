<div class:opacity-75="{disabled}">
  <h3>Pano kurulumuna hoş geldiniz!</h3>
  <p class="text-muted">
    Pano'nun web sunucunuzda çalışabilmesi için aşağıda listelenen
    bilgileri belirlemeniz gerekmekte:
  </p>
  <ul>
    <li>Web site adı ve açıklaması</li>
    <li>Veri tabanı bilgileri</li>
    <li>Kullanıcı hesabı bilgileri</li>
  </ul>
</div>

<div class="row pt-3">
  <div class="col-6">
    <button
      class="btn btn-primary w-100"
      on:click="{start}"
      class:disabled="{loading || disabled}"
      disabled="{loading || disabled}">
      Başlayalım
    </button>
  </div>
</div>

<script>
  import { page, session } from "$app/stores";
  import { nextStep } from "$lib/Store.js";

  let loading = false;
  $: disabled = !!!!$session.stepInfo.error;

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
