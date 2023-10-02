<h4>Yönetici Hesabı</h4>
<p class="text-muted">
  Mevcut bir Pano hesabı kullanabilir veya yerel hesap oluşturabilirsiniz.
</p>

<form on:submit|preventDefault="{submit}">
  <a target="_blank" href="javascript:void(0);" role="button"> Oturum Aç </a>

  <div class="alert alert-success" style="display: none;">
    <a
      class="alert-link"
      href="https://panomc.com/user/username"
      target="_blank">
      ???
    </a>
    hesabı başarıyla bağlandı.
    <button
      class="btn d-block btn-link link-danger ps-0"
      href="javascript:void(0);">
      Bağlantıyı Kes
    </button>
  </div>

  <ErrorAlert error="{error}" />

  <p class="my-3 text-muted">veya</p>

  <div class="mb-3">
    <label for="admin-email">E-Posta</label>
    <input
      class="form-control"
      id="admin-email"
      type="email"
      bind:value="{account.email}" />
  </div>
  <div class="row">
    <div class="col-6">
      <div class="mb-3">
        <label for="admin-username">Minecraft Kullanıcı Adı</label>
        <input
          class="form-control"
          id="admin-username"
          type="text"
          bind:value="{account.username}" />
      </div>
    </div>
    <div class="col-6">
      <div class="mb-3">
        <label for="admin-password">Şifre</label>
        <input
          class="form-control"
          id="admin-password"
          placeholder="************"
          bind:value="{account.password}"
          type="password" />
        <small>Minimum 6 karakter.</small>
      </div>
    </div>
  </div>

  <div class="row pt-3">
    <div class="col-6">
      <a
        class="btn btn-link w-100"
        role="button"
        href="javascript:void(0);"
        on:click="{back}"
        class:disabled="{loading}"
        disabled="{loading}">
        Geri
      </a>
    </div>
    <div class="col-6">
      <button
        type="submit"
        class="btn btn-secondary w-100"
        class:disabled="{loading || disabled}"
        disabled="{loading || disabled}">
        Tamamla
      </button>
    </div>
  </div>
</form>

<script context="module">
  /**  @type {import('@sveltejs/kit').LayoutLoad} */
  export async function load({ parent }) {
    const {
      stepInfo: { account },
    } = await parent();

    return { stepInfo: { account } };
  }
</script>

<script>
  import { backStep } from "$lib/Store.js";
  import ApiUtil, { NETWORK_ERROR } from "$lib/api.util.js";
  import { PANEL_URL } from "$lib/variables.js";

  import ErrorAlert from "$lib/components/ErrorAlert.svelte";
  import { currentLanguage } from "$lib/language.util.js";

  let loading = false;
  let error = null;

  export let account = {
    username: "",
    password: "",
    email: "",
  };

  $: disabled =
    account.username === "" || account.password === "" || account.email === "";

  function submit() {
    loading = true;
    error = null;

    ApiUtil.post({
      path: "/api/setup/finish",
      body: { ...account, setupLocale: $currentLanguage.locale },
    })
      .then((body) => {
        if (body.result === "ok") {
          window.location.assign(PANEL_URL);
        } else if (body.error) {
          showError(body.error);
        } else {
          showError(NETWORK_ERROR);
          console.log(body);
        }
      })
      .catch(() => {
        showError(NETWORK_ERROR);
      });
  }

  function back() {
    if (!loading) {
      loading = true;
      error = null;

      backStep({
        step: 4,
      });
    }
  }

  async function showError(errorCode) {
    loading = false;

    error = errorCode;
  }
</script>
