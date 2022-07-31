<h5>Adım 3/4 - E-Posta Yapılandırması</h5>
<p class="text-muted">
  Bu adımda platformunuz için e-mail bilgilerini yapılandırıyoruz. Pano e-mail
  gönderebilmek için bazı bilgilere ihtiyaç duyar. Platformun hangi e-mail
  adresini kullanmasını istiyorsanız onun bilgilerini girin.
</p>

<ErrorAlert error="{error}" />

<form on:submit|preventDefault="{next}">
  {#if !chosenService}
    {#each Object.keys(services) as service, index (service)}
      <button class="btn" on:click="{() => chooseService(service)}" in:fade
        >{services[service].name}</button
      >
    {/each}
  {:else}
    <div in:fade>
      <button class="btn btn-link" on:click="{() => (chosenService = null)}"
        >← Servisler
      </button>
      <div class="mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            bind:checked="{mailConfiguration[chosenService].useSSL}"
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
              <input
                class="form-control"
                id="sendingAdress"
                type="text"
                placeholder="no-reply@forexample.com"
                bind:value="{mailConfiguration[chosenService].address}"
              />
            </div>
          </div>
          <div class="col-6">
            <div class="mb-3">
              <label for="hostAdress">Sağlayıcı Adresi</label>
              <input
                class="form-control"
                id="hostAdress"
                type="text"
                placeholder="smtp.forexample.com"
                bind:value="{mailConfiguration[chosenService].host}"
              />
            </div>
          </div>
          <div class="w-100"></div>
          <div class="col-6">
            <div class="mb-3">
              <label for="mailUsername">Kullanıcı Adı</label>
              <input
                class="form-control"
                id="mailUsername"
                type="text"
                placeholder="no-reply"
                bind:value="{mailConfiguration[chosenService].username}"
              />
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
                bind:value="{mailConfiguration[chosenService].password}"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="port">Port</label>
              <input
                class="form-control"
                id="post"
                placeholder="465"
                type="text"
                bind:value="{mailConfiguration[chosenService].port}"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
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
  const defaultMailConfiguration = Object.freeze({
    useSSL: true,
    port: 465,
  });

  export const services = Object.freeze({
    GMAIL: {
      name: "GMail",
      config: {
        ...defaultMailConfiguration,
        host: "smtp.google.com",
      },
    },
    YAHOO: {
      name: "Yahoo",
      config: {
        ...defaultMailConfiguration,
        host: "smtp.mail.yahoo.com",
      },
    },
    YANDEX: {
      name: "Yandex",
      config: {
        ...defaultMailConfiguration,
        host: "smtp.yandex.com",
      },
    },
    MAIL_RU: {
      name: "Mail.ru",
      config: {
        ...defaultMailConfiguration,
        host: "smtp.mail.ru",
      },
    },
    OUTLOOK: {
      name: "Hotmail / Outlook",
      config: {
        ...defaultMailConfiguration,
        host: "smtp-mail.outlook.com",
        port: 587,
      },
    },
    OTHER: {
      name: "Diğer",
      config: {
        ...defaultMailConfiguration,
      },
    },
  });

  /**
   * @type {import("@sveltejs/kit").Load}
   */
  export async function load({ session: { stepInfo } }) {
    const { address, host, username, password, port } = stepInfo;

    let chosenService = null;

    if (address && host && username && password && port) {
      Object.keys(services).forEach((service) => {
        const serviceOptions = services[service];

        if (serviceOptions.config.host === host) {
          chosenService = service;
        }
      });

      if (!chosenService) {
        chosenService = "OTHER"
      }
    }

    const mailConfiguration = {
      [chosenService]: stepInfo,
    };

    return { props: { stepInfo: { mailConfiguration, chosenService } } };
  }
</script>

<script>
  import { backStep, nextStep } from "$lib/Store.js";

  import { fade } from "svelte/transition";
  import ApiUtil, { NETWORK_ERROR } from "$lib/api.util.js";
  import ErrorAlert from "$lib/components/ErrorAlert.svelte";

  let loading = false;
  let error = null;
  export let chosenService;

  export let mailConfiguration = {};

  $: disabled =
    !chosenService ||
    (chosenService &&
      (!mailConfiguration[chosenService].port ||
        !mailConfiguration[chosenService].address ||
        !mailConfiguration[chosenService].host ||
        !mailConfiguration[chosenService].username ||
        !mailConfiguration[chosenService].password));

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
    if (!mailConfiguration[service]) {
      mailConfiguration[service] = { ...services[service].config };
    }

    chosenService = service;
  }

  function next() {
    if (disabled) {
      return;
    }

    loading = true;
    error = null;

    ApiUtil.post({
      path: "/api/setup/mailConfigurationTest",
      body: mailConfiguration[chosenService],
    })
      .then((body) => {
        if (body.result === "ok") {
          nextStep({
            step: 3,
            ...mailConfiguration[chosenService],
          });
        } else if (body.error) {
          showError(body.error);
        } else showError(NETWORK_ERROR);
      })
      .catch(() => {
        showError(NETWORK_ERROR);
      });
  }
</script>
