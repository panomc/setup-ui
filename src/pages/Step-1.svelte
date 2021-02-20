<script>
  import { onDestroy } from "svelte";
  import {
    nextStep,
    backStep,
    websiteName,
    websiteDescription,
  } from "../Store";

  let buttonsLoading = false;
  let nextButtonDisabled = true;

  function submit() {
    if (!buttonsLoading) {
      buttonsLoading = true;

      nextStep({
        step: 1,
        websiteName: $websiteName,
        websiteDescription: $websiteDescription,
      });
    }
  }

  function back() {
    if (!buttonsLoading) {
      buttonsLoading = true;

      backStep({
        step: 1,
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
      bind:value="{$websiteName}" />
  </div>
  <div class="form-group">
    <label for="websiteDescription">Açıklama:</label>
    <textarea
      id="websiteDescription"
      class="form-control"
      rows="2"
      bind:value="{$websiteDescription}"></textarea>
  </div>

  <hr />

  <div class="w-100 d-flex justify-content-end">
    <a
      href="javascript:void(0);"
      class="btn btn-link"
      role="button"
      on:click="{back}"
      class:disabled="{buttonsLoading}"
      disabled="{buttonsLoading}">Geri</a>
    <button
      type="submit"
      class="btn btn-primary"
      role="button"
      class:disabled="{buttonsLoading || nextButtonDisabled}"
      disabled="{buttonsLoading || nextButtonDisabled}">
      Devam Et
    </button>
  </div>
</form>
