<h4>Site Kimliği</h4>

<p class="text-muted">
  Sitenizin başlığı ve açıklaması arama motorlarında yer alacak. Bunları daha
  sonra da yönetim paneli içerisinden düzenleyebilirsiniz.
</p>

<form on:submit|preventDefault="{submit}">
  <label for="websiteName">Başlık</label>
  <input
    id="websiteName"
    class="form-control form-control-lg mb-3"
    placeholder="Panocraft"
    type="text"
    bind:value="{websiteName}" />
  <label for="websiteName">Açıklama</label>
  <textarea
    id="websiteDescription"
    class="form-control mb-3"
    rows="2"
    bind:value="{websiteDescription}"></textarea>

  <div class="row">
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
        ileri
      </button>
    </div>
  </div>
</form>

<script context="module">
  /** @type {import('./$types').PageLoad} */
  export async function load({ parent }) {
    const {
      stepInfo: { websiteName, websiteDescription },
    } = await parent();

    return { stepInfo: { websiteName, websiteDescription } };
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
