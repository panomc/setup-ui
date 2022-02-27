<div class:opacity-75="{disabled}">
  <h3>Pano kurulumuna hoş geldiniz!</h3>
  <p class="text-muted">
    Pano'nun web sunucunuzda doğru şekilde çalışabilmesi için aşağıda listelenen
    bilgileri belirlemeniz gerekmekte:
  </p>
  <ul>
    <li>Web site adı ve açıklaması</li>
    <li>
      Veritabanı bilgileri
      <a
        href="javascript:void(0)"
        use:tooltip="{['Bu bilgileri web sunucunuzu sağlayan kurum ile iletişime geçerek öğrenebilirsiniz.', { placement: 'right' }]}">
        (?)
      </a>
    </li>
    <li>Yönetim paneli hesap bilgileri</li>
  </ul>
</div>

<div class="row pt-3">
  <div class="col-6">
    <button
      class="btn btn-primary btn-lg w-100"
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

  import tooltip from "$lib/tooltip.util"

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
