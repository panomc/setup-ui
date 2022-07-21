<h3>Adım: 3-4</h3>
<p class="text-muted">
  Bla bla mail
</p>
<form on:submit|preventDefault="{submit}">
  <div class="row pt-3">
    <div class="col-6">
      <a
        href="javascript:void(0);"
        class="btn btn-link w-100"
        role="button"
        class:disabled="{loading}"
        disabled="{loading}"
        on:click="{back}">Geri</a>
    </div>
    <div class="col-6">
      <button
        type="submit"
        class="btn btn-primary w-100"
        class:disabled="{loading || disabled}"
        disabled="{loading || disabled}">
        Devam Et
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

  $: disabled = false

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
</script>
