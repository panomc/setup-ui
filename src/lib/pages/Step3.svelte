<h3>Adım: 3-3</h3>
<p>
  Çevrimiçi Pano hesabınızı kullanabilir veya yerel bir hesap
  oluşturabilirsiniz.
</p>

<form on:submit|preventDefault="{submit}">
  <div class="alert alert-primary">
    Pano hesabınızı bağladığınızda temalar ve eklentiler için gerekli alışveriş
    işlemlerini kullanabilirsiniz.
    <br />
    <br />
    <a
      class="btn btn-outline-primary"
      target="_blank"
      href="javascript:void(0);"
      role="button">
      Pano Hesabımı Platforma Bağla (Önerilir)
    </a>
  </div>

  <div class="alert alert-success">
    <a
      class="alert-link"
      href="https://panomc.com/user/username"
      target="_blank">
      ???
    </a>
    hesabı başarıyla platforma bağlandı.
    <br />
    <br />
    <a class="btn btn-outline-danger" href="javascript:void(0);">
      Bağlantıyı Kes
    </a>
  </div>

  <div
    class="alert alert-dismissible text-danger"
    id="error"
    style="display: none;">
    <button class="close" type="button" on:click="{dismissErrorBox}">
      <span aria-hidden="true">&times;</span>
    </button>
    {errorCode}
  </div>

  <div class="form-group">
    <label for="admin-email">E-Posta:</label>
    <input
      class="form-control"
      id="admin-email"
      type="email"
      bind:value="{account.email}" />
  </div>
  <div class="row">
    <div class="col-6">
      <div class="form-group">
        <label for="admin-username">Minecraft Kullanıcı Adı:</label>
        <input
          class="form-control"
          id="admin-username"
          type="text"
          bind:value="{account.username}" />
      </div>
    </div>
    <div class="col-6">
      <div class="form-group">
        <label for="admin-password">Şifre:</label>
        <input
          class="form-control"
          id="admin-password"
          placeholder="************"
          bind:value="{account.password}"
          type="password" />
        <small>Minimum: 6 karakter.</small>
      </div>
    </div>
  </div>

  <div class="w-100 d-flex justify-content-end">
    <a
      class="btn btn-link"
      role="button"
      href="javascript:void(0);"
      on:click="{back}"
      class:disabled="{loading}"
      disabled="{loading}">
      Geri
    </a>
    <button
      type="submit"
      class="btn btn-secondary text-white"
      class:disabled="{loading || disabled}"
      disabled="{loading || disabled}">
      Tamamla
    </button>
  </div>
</form>

<script context="module">
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
  import { backStep } from "$lib/Store.js";
  import ApiUtil, { NETWORK_ERROR } from "$lib/api.util.js";
  import { PANEL_URL } from "$lib/variables.js";

  let loading = false;
  let errorCode = "";

  export let account = {
    username: "",
    password: "",
    email: "",
  };

  $: disabled =
    account.username === "" || account.password === "" || account.email === "";

  function submit() {
    loading = true;

    ApiUtil.post({
      path: "/api/setup/finish",
      body: account,
    })
      .then((body) => {
        if (body.result === "ok") {
          window.location.assign(PANEL_URL + "/panel");
        } else if (body.error) {
          const errorCode = body.error;

          showError(errorCode);
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

      backStep({
        step: 3,
      });
    }
  }

  function showError(error) {
    loading = false;

    errorCode = error;

    window.$("#error").fadeIn();
  }

  function dismissErrorBox() {
    window.$("#error").fadeOut("slow");
  }
</script>
