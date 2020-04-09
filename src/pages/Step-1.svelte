<script>
  import { nextStep, backStep, websiteName, websiteDescription } from "../Store";

  let buttonsLoading = false;

  function next() {
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
    if(!buttonsLoading) {
      buttonsLoading = true;

      backStep({
        step: 1
      });
    }
  }
</script>

<h3>Adım - 1/3</h3>
<p>
  Websitenizin adını ve açıklamasını belirleyin. Bunlar arama motorlarında
  görünecektir. Websiteniz hakkında diğer özelleştirmeleri kurulumdan sonra
  Kontrol Paneli üzerinden yapabilirsiniz.
</p>
<h5 class="text-primary">Website Adı ve Açıklaması</h5>
<form>
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

  <a href="javascript:void(0);" class="btn btn-primary" role="button" on:click={next} class:disabled="{buttonsLoading}">Devam Et</a>
  <a href="javascript:void(0);" class="btn btn-outline-primary" role="button" on:click={back} class:disabled="{buttonsLoading}">Geri</a>
</form>
