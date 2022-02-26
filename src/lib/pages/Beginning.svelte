{#if $session.stepInfo.error}
  <div class="alert alert-dismissible text-danger" id="error">
    <button class="close" type="button" on:click="{dismissErrorBox}">
      <span aria-hidden="true">&times;</span>
    </button>
    {$session.stepInfo.error}
  </div>
{/if}

<h3>Pano kurulumuna hoş geldiniz!</h3>
<p>
  Pano'nun web sunucunuzda doğru şekilde çalışabilmesi için aşağıda listelenen
  bilgileri belirlemeniz gerekmekte:
</p>
<ul>
  <li>Web site adı ve açıklaması</li>
  <li>
    Veritabanı bilgileri
    <a
      data-placement="right"
      data-toggle="tooltip"
      href="javascript:void(0)"
      title="Bu bilgileri web sunucunuzu sağlayan kurum ile iletişime geçerek
      öğrenebilirsiniz."
    >
      (?)
    </a>
  </li>
  <li>Yönetim paneli hesap bilgileri</li>
</ul>

<hr />

<div class="w-100 d-flex justify-content-end">
  <button
    class="btn btn-primary"
    role="button"
    on:click="{start}"
    class:disabled="{loading || disabled}"
    disabled="{loading || disabled}"
  >
    Başlayalım
  </button>
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

  function dismissErrorBox() {
    window.$("#error").fadeOut("slow");
  }
</script>
