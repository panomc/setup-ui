<div class="animate__animated animate__fadeIn">
  <div class="animate__animated animate__slideInUp d-block">
    <h4>{$_("steps.database.title")}</h4>
    <p class="text-muted">
      {$_("steps.database.description")}
      &nbsp;
      <a href="#">
        <i class="fa-solid fa-up-right-from-square me-1"></i>
        {$_("steps.database.help-link-text")}
      </a>
    </p>
  </div>
  <ErrorAlert error="{error}" />
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
          {$_("steps.database.databases.mysql-or-mariadb")}
        </label>
      </div>
    </div>

    <div class="tab-content">
      <div
        aria-labelledby="mysql-tab"
        class="tab-pane fade show active"
        id="mysql"
        role="tabpanel">
        <div class="row">
          <div class="col-6">
            <div class="mb-3">
              <label for="databaseAddress"
                >{$_("steps.database.inputs.address")}</label>
              <input
                class="form-control"
                id="databaseAddress"
                placeholder="localhost:3306"
                bind:value="{db.host}"
                type="text" />
            </div>
          </div>
          <div class="col-6">
            <div class="mb-3">
              <label for="databaseName"
                >{$_("steps.database.inputs.name")}</label>
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
              <label for="databaseUserName"
                >{$_("steps.database.inputs.username")}</label>
              <input
                class="form-control"
                id="databaseUserName"
                placeholder="root"
                bind:value="{db.username}"
                type="text" />
            </div>
          </div>
          <div class="col-6">
            <div class="mb-3">
              <label for="databaseUserPassword"
                >{$_("steps.database.inputs.password")}</label>
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
              <label for="databaseTablePrefix"
                >{$_("steps.database.inputs.prefix")}</label>
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

      <!-- <div
      aria-labelledby="sqlite-tab"
      class="tab-pane fade show"
      id="sqlite"
      role="tabpanel">
      sqlite
    </div> -->
    </div>

    <div class="row">
      <div class="col-6">
        <a
          href="javascript:void(0);"
          class="btn btn-link w-100"
          role="button"
          on:click="{back}"
          class:disabled="{loading}"
          disabled="{loading}">{$_("back-button")}</a>
      </div>
      <div class="col-6">
        <div class="animate__animated animate__zoomIn">
          <button
            type="submit"
            class="btn btn-primary w-100"
            class:disabled="{loading || disabled}"
            disabled="{loading || disabled}"
            >{$_("next-button")}
          </button>
        </div>
      </div>
    </div>
  </form>
</div>

<script context="module">
  /** @type {import('./$types').PageLoad} */
  export async function load({ parent }) {
    const {
      stepInfo: { db },
    } = await parent();

    return { stepInfo: { db } };
  }
</script>

<script>
  import { backStep, nextStep } from "$lib/Store.js";
  import ApiUtil, { NETWORK_ERROR } from "$lib/api.util.js";
  import ErrorAlert from "$lib/components/ErrorAlert.svelte";
  import { _ } from "svelte-i18n";

  let loading = false;
  let error = null;

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
    error = null;

    ApiUtil.post({
      path: "/api/setup/dbConnectionTest",
      body: db,
    })
      .then((body) => {
        if (body.result === "ok") {
          next();
        } else if (body.error) {
          showError(body.error);
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
      error = null;

      backStep({
        step: 2,
      });
    }
  }

  function showError(errorCode) {
    loading = false;

    error = errorCode;
  }
</script>
