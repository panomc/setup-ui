<script>
  import { onMount } from "svelte";
  import jQuery from "jquery";

  import { nextStep } from "../Store";

  onMount(async () => {
    jQuery("[data-toggle=\"tooltip\"]").tooltip();
  });

  let nextButtonLoading = false;

  function start() {
    if (!nextButtonLoading) {
      nextButtonLoading = true;

      nextStep({
        step: 0
      });
    }
  }
</script>

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

<a href="javascript:void(0);" class="btn btn-primary" role="button" on:click={start} class:disabled="{nextButtonLoading}">Başlayalım</a>
