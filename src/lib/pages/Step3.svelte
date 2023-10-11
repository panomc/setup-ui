<h4>{$_("steps.email.title")}</h4>
<p class="text-muted">
  {$_("steps.email.description")}
  <br />
  <a href="#">
    <i class="fa-solid fa-up-right-from-square me-2"></i>
    {$_("steps.email.help-link-text")}
  </a>
</p>

<ErrorAlert error="{error}" />

<form on:submit|preventDefault="{next}">
  {#if !chosenService}
    <div class="list-group mb-3">
      {#each Object.keys(services) as service, index (service)}
        <a
          href="javascript:void(0)"
          class="list-group-item list-group-item-action"
          on:click="{() => chooseService(service)}"
          in:fade>
          {$_(services[service].name) || services[service].name}</a>
      {/each}
    </div>
  {:else}
    <div in:fade>
      <button
        class="btn btn-link mb-3 ps-0"
        on:click="{() => (chosenService = null)}">
        <i class="fa-solid fa-arrow-left me-1"></i> {$_("steps.email.return-back-to-service-list-text")}
      </button>

      <h5>{services[chosenService].name}</h5>

      <div class="row">
        <div class="col-6">
          <label for="mailUsername">{$_("steps.email.inputs.username")}</label>
          <input
            class="form-control"
            id="mailUsername"
            type="text"
            placeholder="no-reply"
            bind:value="{mailConfiguration[chosenService].username}"
            on:input="{onUsernameChange}" />
        </div>
        <div class="col-6">
          <label for="mailUserPassword">{$_("steps.email.inputs.password")}</label>
          <input
            class="form-control"
            id="mailUserPassword"
            placeholder="****************"
            type="password"
            bind:value="{mailConfiguration[chosenService].password}" />
        </div>
      </div>

      <details>
        <summary class="h6 text-primary my-3">{$_("steps.email.inputs.details-button")}</summary>

        <div class="row">
          <div class="col-6 mb-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                name="useSSLCheck"
                id="useSSLCheck"
                aria-checked="{mailConfiguration[chosenService].useSSL}"
                bind:checked="{mailConfiguration[chosenService].useSSL}"
              />
              <label class="form-check-label" for="useSSLCheck">
                {$_("steps.email.inputs.use-ssl")}
              </label>
            </div>
          </div>
          <div class="col-6 mb-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                name="useTLSCheck"
                id="useTLSCheck"
                aria-checked="{mailConfiguration[chosenService].useTLS}"
                bind:checked="{mailConfiguration[chosenService].useTLS}"
              />
              <label class="form-check-label" for="useTLSCheck">
                {$_("steps.email.inputs.use-tls")}
              </label>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <div class="mb-3">
              <label for="sendingAdress">{$_("steps.email.inputs.sending-address")}</label>
              <input
                class="form-control"
                id="sendingAdress"
                type="text"
                placeholder="no-reply@forexample.com"
                bind:value="{mailConfiguration[chosenService].address}" />
            </div>
          </div>

          <div class="col-6">
            <div class="mb-3">
              <label for="hostAddress">{$_("steps.email.inputs.host")}</label>
              <input
                class="form-control"
                id="hostAddress"
                type="text"
                placeholder="smtp.forexample.com"
                bind:value="{mailConfiguration[chosenService].host}" />
            </div>
          </div>

          <div class="col-6">
            <div class="mb-3">
              <label for="port">{$_("steps.email.inputs.port")}</label>
              <input
                class="form-control"
                id="port"
                placeholder="465"
                type="number"
                bind:value="{mailConfiguration[chosenService].port}" />
            </div>
          </div>

          <div class="col-6">
            <div class="mb-3">
              <label for="port">{$_("steps.email.inputs.auth-method")}</label>
              <select class="form-select" bind:value="{mailConfiguration[chosenService].authMethod}">
                <option value="PLAIN">PLAIN</option>
                <option value=""></option>
              </select>
            </div>
          </div>
        </div>
      </details>
    </div>
  {/if}
  <div class="row">
    <div class="col-6">
      <a
        href="javascript:void(0);"
        class="btn btn-link w-100"
        role="button"
        class:disabled="{loading}"
        disabled="{loading}"
        on:click="{back}">{$_("back-button")}</a>
    </div>
    <div class="col-6">
      <button
        type="submit"
        class="btn btn-primary w-100"
        class:disabled="{loading || disabled}"
        disabled="{loading || disabled}">
        {$_("next-button")}
      </button>
    </div>
  </div>
</form>

<script context="module">
  const defaultMailConfiguration = Object.freeze({
    useSSL: true,
    useTLS: true,
    port: 465,
    authMethod: ""
  });

  export const services = Object.freeze({
    GMAIL: {
      name: "GMail",
      config: {
        ...defaultMailConfiguration,
        host: "smtp.gmail.com",
        port: 587,
        useSSL: false,
        useTLS: true,
        authMethod: "PLAIN"
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
        port: 465,
        useSSL: true,
        useTLS: false,
        authMethod: "PLAIN"
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
      name: "other-button",
      config: {
        ...defaultMailConfiguration,
      },
    },
  });

  /** @type {import('./$types').PageLoad} */
  export async function load({ parent }) {
    const { stepInfo } = await parent();
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
        chosenService = "OTHER";
      }
    }

    const mailConfiguration = {
      [chosenService]: stepInfo,
    };

    return { stepInfo: { mailConfiguration, chosenService } };
  }
</script>

<script>
  import { backStep, nextStep } from "$lib/Store.js";

  import { fade } from "svelte/transition";
  import ApiUtil, { NETWORK_ERROR } from "$lib/api.util.js";
  import ErrorAlert from "$lib/components/ErrorAlert.svelte";
  import { _ } from "svelte-i18n";

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
      path: "/api/setup/verifyMailConfiguration",
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

  function onUsernameChange() {
    mailConfiguration[chosenService].address =
      mailConfiguration[chosenService].username;
  }
</script>
