<script>
  import { onDestroy } from "svelte";
  import { nextStep, backStep, websiteName, websiteDescription } from "../Store";

  let buttonsLoading = false;
  let nextButtonDisabled = true;

  function submit() {
    if (!buttonsLoading) {
      buttonsLoading = true;

      nextStep({
        step: 1,
        websiteName: $websiteName,
        websiteDescription: $websiteDescription
      });
    }
  }

  function back() {
    if (!buttonsLoading) {
      buttonsLoading = true;

      backStep({
        step: 1
      });
    }
  }

  const websiteNameUnsubscribe = websiteName.subscribe(() => {
    checkForm();
  });

  const websiteDescriptionUnsubscribe = websiteDescription.subscribe(() => {
    checkForm();
  });

  onDestroy(websiteNameUnsubscribe);
  onDestroy(websiteDescriptionUnsubscribe);

  function checkForm() {
    nextButtonDisabled = !($websiteName !== "" && $websiteDescription !== "");
  }
</script>

<h3>Adım - 1/3</h3>
<p>
  Websitenizin adını ve açıklamasını belirleyin. Bunlar arama motorlarında
  görünecektir. Websiteniz hakkında diğer özelleştirmeleri kurulumdan sonra
  Kontrol Paneli üzerinden yapabilirsiniz.
</p>
<h5 class="text-primary">Website Adı ve Açıklaması</h5>
<form on:submit|preventDefault={submit}>
  <div class="form-group">
    <label for="websiteName">Website Adı:</label>
    <input
      id="websiteName"
      class="form-control"
      placeholder="Panocraft"
      type="text"
      bind:value={$websiteName}
    />
  </div>
  <div class="form-group">
    <label for="websiteDescription">Açıklama:</label>
    <textarea id="websiteDescription" class="form-control" rows="2" bind:value={$websiteDescription}></textarea>
  </div>

  <button type="submit" class="btn btn-primary" role="button" class:disabled="{buttonsLoading || nextButtonDisabled}">
    Devam Et
  </button>
  <a href="javascript:void(0);" class="btn btn-outline-primary" role="button" on:click={back}
     class:disabled="{buttonsLoading}">Geri</a>
</form>
