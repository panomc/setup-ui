<h3>Adım: 1-3</h3>
<p>
  Websitenizin adı ve açıklaması arama motorlarında görünecektir. Kurulumdan
  sonra bu bilgileri değiştirebilirsiniz.
</p>
<form on:submit|preventDefault="{submit}">
  <div class="form-group">
    <label for="websiteName">Website Adı:</label>
    <input
      id="websiteName"
      class="form-control"
      placeholder="Panocraft"
      type="text"
      bind:value="{websiteName}"
    />
  </div>
  <div class="form-group">
    <label for="websiteDescription">Açıklama:</label>
    <textarea
      id="websiteDescription"
      class="form-control"
      rows="2"
      bind:value="{websiteDescription}"></textarea>
  </div>

  <hr />

  <div class="w-100 d-flex justify-content-end">
    <a
      href="javascript:void(0);"
      class="btn btn-link"
      role="button"
      class:disabled="{loading}"
      disabled="{loading}"
      on:click="{back}">Geri</a
    >

    <button
      type="submit"
      class="btn btn-primary"
      class:disabled="{loading || disabled}"
      disabled="{loading || disabled}"
    >
      Devam Et
    </button>
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
    if (!loading && !disabled) {
      loading = true;

      backStep({
        step: 1,
      });
    }
  }
</script>
