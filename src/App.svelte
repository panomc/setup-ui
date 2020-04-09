<script>
  import router from "page";
  import { ChunkGenerator } from "svelte-spa-chunk";

  import ChunkComponent from "./Chunk.svelte";
  import { isPageLoading } from "./ChunkStore";

  import { stepChecked } from "./Store";

  import PageLoading from "./components/PageLoading.svelte";

  const Chunk = ChunkGenerator(ChunkComponent);

  let props = {};

  router("/step-1", () => {
    props = {
      component: Chunk(() => import("./pages/Step-1.svelte"))
    };
  });

  router("/step-2", () => {
    props = {
      component: Chunk(() => import("./pages/Step-2.svelte"))
    };
  });

  router("/step-3", () => {
    props = {
      component: Chunk(() => import("./pages/Step-3.svelte"))
    };
  });

  router("*", () => {
    props = {
      component: Chunk(() => import("./pages/Beginning.svelte"))
    };
  });

  router.start();
</script>

<style lang="scss" global>
  @import "commons/scss/main";
</style>

<div class="container">
  <div class="text-center py-4">
    <a href="https://panomc.com" target="_blank" title="Pano">
      <img alt="Pano Logo" src="/assets/img/logo-blue.svg" width="24"/>
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
          role="status"></div>
      </div>
    </li>
  </ul>
  <div class="card">
    <div class="card-body py-5 col-md-8 m-auto">
        {#if $isPageLoading || !$stepChecked}
          <PageLoading/>
        {/if}

        {#if $stepChecked}
          <svelte:component this={props.component} {...props}/>
        {/if}
    </div>
  </div>
  <div class="text-center py-4">
    <small class="text-muted">Pano v.1.0</small>
  </div>
</div>
