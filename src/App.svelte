<script context="module">
  import {register} from 'svelte-loadable'
  import Loading from "./components/Loading.svelte"

  const BeginningLoader = register({
    loader: () => import('./pages/Beginning.svelte'),
    resolve: () => import('./pages/Beginning.svelte'),
  })

</script>

<script>
  import {Router, Link, Route} from 'svelte-routing'
  import Loadable from 'svelte-loadable'
  import jQuery from 'jquery'

  jQuery(function () {
    jQuery('[data-toggle="tooltip"]').tooltip()
  })
</script>

<style lang="scss" global>
  @import "commons/scss/main";
</style>

<div class="container py-5 text-center">
  <a href="https://panomc.com" target="_blank" title="Pano">
    <img alt="Pano Logo" src="/assets/img/logo-blue.svg" width="24"/>
  </a>
  <div class="row align-items-center justify-content-between">
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
                role="status"></div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <div class="col-lg-6 col-10 m-auto">
        <Router>
          <Route path="*">
            <Loadable loader="{BeginningLoader}">
              <div slot="loading">
                <Loading/>
              </div>
            </Loadable>
          </Route>

          <Route path="/step-1">
          </Route>

          <Route path="/step-2">
          </Route>

          <Route path="/step-3">
          </Route>
        </Router>
      </div>
    </div>
  </div>
</div>
