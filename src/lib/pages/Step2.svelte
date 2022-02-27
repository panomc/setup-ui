<h3>Adım: 2-3</h3>
<p class="text-muted">
  Veritabanı bilgilerini bilmiyorsanız sunucunuzu sağlayan kurum ile iletişime
  geçin.
</p>

<div
  class="alert alert-danger alert-dismissible"
  style="display: none;"
  id="error">
  {errorCode}
</div>

<form on:submit|preventDefault="{submit}">
  <div class="mb-3">
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="dbMysqlMariaDB"
        id="dbMysqlMariaDB"
        checked />
      <label class="form-check-label" for="dbMysqlMariaDB">
        MySQL veya MariaDB
      </label>
    </div>
  </div>

  <div class="mb-3 tab-content">
    <div
      aria-labelledby="mysql-tab"
      class="tab-pane fade show active"
      id="mysql"
      role="tabpanel">
      <div class="row">
        <div class="col-6">
          <div class="mb-3">
            <label for="databaseAddress">Veri Tabanı Adresi</label>
            <input
              class="form-control"
              id="databaseAddress"
              placeholder="localhost:80"
              bind:value="{db.host}"
              type="text" />
          </div>
        </div>
        <div class="col-6">
          <div class="mb-3">
            <label for="databaseName">Veri Tabanı Adı</label>
            <input
              class="form-control"
              id="databaseName"
              placeholder="pano"
              bind:value="{db.dbName}"
              type="text" />
          </div>
        </div>
        <div class="w-100"></div>
        <div class="col-6">
          <div class="mb-3">
            <label for="databaseUserName">Veri Tabanı Kullanıcı Adı</label>
            <input
              class="form-control"
              id="databaseUserName"
              placeholder="admin"
              bind:value="{db.username}"
              type="text" />
          </div>
        </div>
        <div class="col-6">
          <div class="mb-3">
            <label for="databaseUserPassword">Veri Tabanı Şifresi</label>
            <input
              class="form-control"
              id="databaseUserPassword"
              placeholder="****************"
              bind:value="{db.password}"
              type="password" />
          </div>
        </div>
        <div class="col-12">
          <div class="mb-3">
            <label for="databaseTablePrefix">Veri Tabanı Tablo Öneki</label>
            <input
              class="form-control"
              id="databaseTablePrefix"
              placeholder="pano_"
              bind:value="{db.prefix}"
              type="text" />
          </div>
        </div>
      </div>
    </div>

    <div
      aria-labelledby="sqlite-tab"
      class="tab-pane fade show"
      id="sqlite"
      role="tabpanel">
      sqlite
    </div>
  </div>

  <hr />

  <div class="row">
    <div class="col-6">
      <a
        href="javascript:void(0);"
        class="btn btn-link w-100"
        role="button"
        on:click="{back}"
        class:disabled="{loading}"
        disabled="{loading}">Geri</a>
    </div>
    <div class="col-6">
      <button
        type="submit"
        class="btn btn-primary w-100"
        class:disabled="{loading || disabled}"
        disabled="{loading || disabled}"
        >Devam Et
      </button>
    </div>
  </div>
</form>

<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({
    session: {
      stepInfo: { db },
    },
  }) {
    return { props: { stepInfo: { db } } };
  }
</script>

<script>
  import { backStep, nextStep } from "$lib/Store.js";
  import ApiUtil, { NETWORK_ERROR } from "$lib/api.util.js";

  let loading = false;
  let errorCode = "";

  export let db = {
    host: "",
    dbName: "",
    username: "",
    password: "",
    prefix: "",
  };

  $: disabled = db.host === "" || db.dbName === "" || db.username === "";

  function submit() {
    loading = true;

    ApiUtil.post({
      path: "/api/setup/dbConnectionTest",
      body: db,
    })
      .then((body) => {
        if (body.result === "ok") {
          next();
        } else if (body.error) {
          const errorCode = body.error;

          showError(errorCode);
        } else showError(NETWORK_ERROR);
      })
      .catch(() => {
        showError(NETWORK_ERROR);
      });
  }

  function next() {
    loading = true;

    nextStep({
      step: 2,
      ...db,
    });
  }

  function back() {
    if (!loading) {
      loading = true;

      backStep({
        step: 2,
      });
    }
  }

  function showError(error) {
    loading = false;

    errorCode = error;

    window.$("#error").fadeOut("slow");
    window.$("#error").fadeIn();
  }
</script>
