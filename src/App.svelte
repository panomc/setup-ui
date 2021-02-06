<style lang="scss" global>
  @import "pano/scss/main";
  @import "styles/style";
</style>

<script>
  import Router, { isPageLoading, beforeRouteEnter } from "routve";
  import { onDestroy } from "svelte";
  import { get } from "svelte/store";

  import { stepChecked, checkCurrentStep } from "./Store";
  import RouterConfig from "./router.config";

  import PageLoading from "./components/PageLoading.svelte";

  checkCurrentStep();

  let nextFunction = () => {};

  const stepCheckedUnsubscribe = stepChecked.subscribe((value) => {
    if (value) nextFunction();
  });

  beforeRouteEnter((_, next) => {
    if (get(stepChecked)) next();

    nextFunction = next;
  });

  onDestroy(stepCheckedUnsubscribe);
</script>

<div class="container">
  <div class="text-center pt-5">
    <a href="https://panomc.com" target="_blank" title="Pano">
      <img alt="Pano Logo" src="/assets/img/logo-blue.svg" width="24" />
    </a>
  </div>
  <ul class="nav justify-content-between align-items-center">
    <li class="nav-item">
      <a class="nav-link text-muted" href="https://panomc.com" target="_blank">
        Yardım
      </a>
    </li>
    <li class="nav-item">
      <div class="dropdown">
        <a
          href="javascript:void(0);"
          class="nav-link text-muted dropdown-toggle d-inline-block"
          data-toggle="dropdown"
          id="selectLanguage"
        >
          TR
        </a>
        <div
          aria-labelledby="selectLanguage"
          class="dropdown-menu dropdown-menu-right"
        >
          <a class="dropdown-item" href="javascript:void(0);">Türkçe (TR)</a>
          <a class="dropdown-item" href="javascript:void(0);">English (US)</a>
        </div>
        <div
          class="spinner-border spinner-border-sm text-primary"
          role="status"
        ></div>
      </div>
    </li>
  </ul>
  <div class="card setup-bg">
    <div class="card-body py-5 col-md-8 m-auto">
      <PageLoading hidden="{!$isPageLoading}" />

      <Router hidden="{$isPageLoading}" routerConfig="{RouterConfig}" />
    </div>
  </div>
  <div class="text-center py-4">
    <small class="text-muted">Pano v1.0</small>
  </div>
</div>
