<script>
  import { isPageLoading } from "./ChunkStore";
  import { stepChecked } from "./Store";

  import PageLoading from "./components/PageLoading.svelte";
  import Router from "./components/Router.svelte";
</script>

<style lang="scss" global>
  @import "commons/scss/main";
  @import "styles/style";
</style>

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
          id="selectLanguage">
          TR
        </a>
        <div
          aria-labelledby="selectLanguage"
          class="dropdown-menu dropdown-menu-right">
          <a class="dropdown-item" href="javascript:void(0);">Türkçe (TR)</a>
          <a class="dropdown-item" href="javascript:void(0);">English (US)</a>
        </div>
        <div
          class="spinner-border spinner-border-sm text-primary"
          role="status" />
      </div>
    </li>
  </ul>
  <div class="card setup-bg">
    <div class="card-body py-5 col-md-8 m-auto">
      {#if $isPageLoading || !$stepChecked}
        <PageLoading />
      {/if}

      {#if $stepChecked}
        <Router hidden={$isPageLoading} />
      {/if}
    </div>
  </div>
  <div class="text-center py-4">
    <small class="text-muted">Pano v.1.0</small>
  </div>
</div>
