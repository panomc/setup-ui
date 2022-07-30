<h5>Adım 3/4 - E-Posta Yapılandırması</h5>
<p class="text-muted">
  Bu adımda platformunuz için e-mail bilgilerini yapılandırıyoruz. Pano e-mail
  gönderebilmek için bazı bilgilere ihtiyaç duyar. Platformun hangi e-mail
  adresini kullanmasını istiyorsanız onun bilgilerini girin.
</p>

{#if showServices}
  <button on:click="{() => chooseService(services.GMAIL)}">GMail</button>
  <button on:click="{() => chooseService(services.YAHOO)}">Yahoo</button>
  <button on:click="{() => chooseService(services.YANDEX)}">Yandex</button>
  <button on:click="{() => chooseService(services.MAIL_RU)}">Mail.ru</button>
  <button on:click="{() => chooseService(services.OUTLOOK)}"
    >Hotmail / Outlook</button
  >
  <button class="btn btn-link" on:click="{() => chooseService(services.OTHER)}"
    >Diğer</button
  >
{:else}
  <button class="btn btn-link" on:click="{() => (showServices = !showServices)}"
    >← Servisler</button
  >
  <div class="mb-3">
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckChecked"
        checked
      />
      <label class="form-check-label" for="flexSwitchCheckChecked"
        >SSL kullan</label
      >
    </div>
  </div>

  <div class="mb-3">
    <div class="row">
      <div class="col-6">
        <div class="mb-3">
          <label for="sendingAdress">Gönderme Adresi</label>
          <input class="form-control" id="sendingAdress" type="text" />
        </div>
      </div>
      <div class="col-6">
        <div class="mb-3">
          <label for="hostAdress">Sağlayıcı Adresi</label>
          <input class="form-control" id="hostAdress" type="text" />
        </div>
      </div>
      <div class="w-100"></div>
      <div class="col-6">
        <div class="mb-3">
          <label for="mailUsername">Kullanıcı Adı</label>
          <input class="form-control" id="mailUsername" type="text" />
        </div>
      </div>
      <div class="col-6">
        <div class="mb-3">
          <label for="mailUserrPassword">Şifre</label>
          <input
            class="form-control"
            id="mailUserPassword"
            placeholder="****************"
            type="password"
          />
        </div>
      </div>
      <div class="col-12">
        <div class="mb-3">
          <label for="port">Port</label>
          <input class="form-control" id="post" placeholder="465" type="text" />
        </div>
      </div>
    </div>
  </div>
{/if}

<form on:submit|preventDefault="{submit}">
  <div class="row pt-3">
    <div class="col-6">
      <a
        href="javascript:void(0);"
        class="btn btn-link w-100"
        role="button"
        class:disabled="{loading}"
        disabled="{loading}"
        on:click="{back}">Geri</a
      >
    </div>
    <div class="col-6">
      <button
        type="submit"
        class="btn btn-primary w-100"
        class:disabled="{loading || disabled}"
        disabled="{loading || disabled}"
      >
        İleri
      </button>
    </div>
  </div>
</form>

<script context="module">
  export const services = Object.freeze({
    GMAIL: "gmail",
    YAHOO: "yahoo",
    YANDEX: "yandex",
    MAIL_RU: "mail.ru",
    OUTLOOK: "outlook",
    OTHER: "other",
  });

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({
    session: {
      stepInfo: { account },
    },
  }) {
    return { props: { stepInfo: { account } } };
  }
</script>

<script>
  import { backStep, nextStep } from "$lib/Store.js";

  let loading = false;
  let error = null;
  let showServices = true;

  $: disabled = false;

  function submit() {
    error = null;

    if (!loading && !disabled) {
      loading = true;

      nextStep({
        step: 3,
      });
    }
  }

  function back() {
    if (!loading) {
      loading = true;
      error = null;

      backStep({
        step: 3,
      });
    }
  }

  async function showError(errorCode) {
    loading = false;

    error = errorCode;
  }

  function chooseService(service) {
    showServices = false;
  }
</script>
