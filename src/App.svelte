<style lang="scss" global>
  @import "commons/scss/main";
</style>

<script>
  import router from 'page';
  import {ChunkGenerator} from 'svelte-spa-chunk'

  import ChunkComponent from "./Chunk.svelte";
  import { isPageLoading } from "./ChunkStore";

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

  let isPageLoadingValue;

  const unsubscribe = isPageLoading.subscribe(value => {
    isPageLoadingValue = value;
  });
</script>

<div class="container py-5">
  <div class="row align-items-center justify-content-between">
    <div class="col-12 text-center">
      <a href="https://panomc.com" target="_blank" title="Pano">
        <img alt="Pano Logo" src="/assets/img/logo-blue.svg" width="24"/>
      </a>
    </div>
    <div class="col-auto">
      <small class="m-0">Pano v.1.0</small>
    </div>
    <div class="col-auto">
      <div class="dropdown">
        <a
                href="javascript:void(0);"
                class="nav-link icon-link dropdown-toggle d-inline-block"
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
                role="status"/>
      </div>
    </div>
  </div>

  <!-- Main Content Card -->
  <div class="card">
    <div class="card-body py-5 col-md-8 m-auto">
      {#if isPageLoadingValue}
        <PageLoading/>
      {/if}

      <svelte:component this={props.component} {...props}/>
    </div>
  </div>
</div>