<script>
  import { onMount } from "svelte";
  import jQuery from "jquery";

  import { nextStep, stepState } from "../Store";

  let nextButtonLoading = false;
  let errorCode;
  let nextButtonDisabled = false;

  onMount(async () => {
    jQuery("[data-toggle=\"tooltip\"]").tooltip();

    if ($stepState === 4) {
      showError("PLATFORM_ALREADY_INSTALLED");

      nextButtonDisabled = true;
    }
  });

  function start() {
    if (!nextButtonLoading) {
      nextButtonLoading = true;

      nextStep({
        step: 0
      });
    }
  }

  function showError(error) {
    nextButtonLoading = false;

    errorCode = error;

    jQuery("#error").fadeIn();
  }

  function dismissErrorBox() {
    jQuery("#error").fadeOut("slow");
  }
</script>

<div class="alert alert-dismissible text-danger" id="error" style="display: none;">
  <button class="close" type="button" on:click={dismissErrorBox}>
    <span aria-hidden="true">&times;</span>
  </button>
    {errorCode}
</div>

<h3>Pano Kurulumuna Hoş Geldiniz!</h3>
<p>
  Platformu sunucunuza kurduktan sonra kullanmaya başlayabileceksiniz. Pano'nun
  doğru şekilde çalışabilmesi için aşağıda listelenen bilgiler gerekmekte:
</p>
<ul>
  <li>Web sitenizin adı ve açıklaması</li>
  <li>
    Veritabanı bilgileri
    <a
      data-placement="right"
      data-toggle="tooltip"
      href="javascript:void(0)"
      title="Bu bilgileri web sunucunuzu sağlayan kurum ile iletişime geçerek
      öğrenebilirsiniz.">
      (?)
    </a>
  </li>
  <li>Yönetim paneli için hesap bilgileri</li>
</ul>

<a href="javascript:void(0);" class="btn btn-primary" role="button" on:click={start}
   class:disabled={nextButtonLoading || nextButtonDisabled}
   disabled={nextButtonLoading || nextButtonDisabled}>Başlayalım</a>
