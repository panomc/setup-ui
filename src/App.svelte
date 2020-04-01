<script>
  import jQuery from 'jquery'

  jQuery(function () {
    jQuery('[data-toggle="tooltip"]').tooltip()
  })
</script>

<div id='MainComponent' class="min-vh-100">

  <div class="container pt-4 mt-4 text-center">
    <a class="d-inline-block" href="https://panomc.com" target="_blank" title="Pano resmi web sitesini ziyaret edin.">
      <img alt="Pano Logo" class="d-inline-block m-auto" src="/img/logo-blue.svg" width="24">
    </a>
  </div>

  <div class="container d-block m-auto py-3">

    <div class="dropdown text-right" v-show="!langLoading">
      <a href="javascript:void(0);" aria-expanded="false" aria-haspopup="true"
         class="nav-link icon-link dropdown-toggle d-inline-block" data-toggle="dropdown" id="selectLanguage"
         role="button">
        TR
      </a>
      <div aria-labelledby="selectLanguage" class="dropdown-menu dropdown-menu-right">
        <a class="dropdown-item" href="javascript:void(0);">Türkçe (TR)</a>
        <a class="dropdown-item" href="javascript:void(0);">English (US)</a>
      </div>
    </div>

    <!--  <div class="text-right" v-show="langLoading">-->
    <!--    <div class="spinner-border spinner-border-sm text-primary" role="status"></div>-->
    <!--  </div>-->

    <div class="card bg-white shadow setup-bg mb-4 p-0">
      <div class="col-lg-6 col-10 m-auto py-5">

        <!--      <router-view v-show="!routePageLoading"></router-view>-->

        <div class="text-center">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="container py-4 text-center">
    <small>Pano v.1.0</small>
  </div>

</div>

<style lang="scss" global>
  @import "commons/scss/main";
</style>