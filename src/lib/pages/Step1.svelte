<h3>Adım: 1-4</h3>
<p class="text-muted">
  Websitenizin adı ve açıklaması arama motorlarında görünecektir. Kurulumdan
  sonra bu bilgileri değiştirebilirsiniz.
</p>
<form on:submit|preventDefault="{submit}">
  <input
    id="websiteName"
    class="form-control mb-3"
    placeholder="Website Adı"
    type="text"
    bind:value="{websiteName}" />
  <textarea
    id="websiteDescription"
    class="form-control"
    rows="2"
    placeholder="Açıklama"
    bind:value="{websiteDescription}"></textarea>

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
      stepInfo: { websiteName, websiteDescription },
    },
  }) {
    return { props: { stepInfo: { websiteName, websiteDescription } } };
  }
</script>

<script>
  import { backStep, nextStep } from "$lib/Store.js";

  let loading = false;

  export let websiteName = "";
  export let websiteDescription = "";

  $: disabled = websiteName === "" || websiteDescription === "";

  function submit() {
    if (!loading && !disabled) {
      loading = true;

      nextStep({
        step: 1,
        websiteName,
        websiteDescription,
      });
    }
  }

  function back() {
    if (!loading) {
      loading = true;

      backStep({
        step: 1,
      });
    }
  }
</script>
