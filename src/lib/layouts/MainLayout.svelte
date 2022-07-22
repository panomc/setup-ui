<App>
  <div class="navbar">
    <div class="container px-3">
      <a href="https://panocms.com" target="_blank" class="navbar-brand">
        <img alt="Pano Logo" src="/assets/img/logo-blue.svg" width="18" />
      </a>
      <ul class="nav ml-auto">
        <li class="nav-item">
          <div class="dropdown">
            <a
              href="javascript:void(0);"
              class="nav-link text-muted dropdown-toggle d-inline-block"
              data-bs-toggle="dropdown"
              id="selectLanguage">
              Türkçe
            </a>
            <div
              aria-labelledby="selectLanguage"
              class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="javascript:void(0);"
                >Türkçe (TR)</a>
              <a class="dropdown-item" href="javascript:void(0);"
                >English (US)</a>
            </div>
            <div
              class="spinner-border spinner-border-sm text-primary d-none"
              role="status">
            </div>
          </div>
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-muted"
            href="https://panomc.com"
            target="_blank">
            Yardım
          </a>
        </li>
      </ul>
    </div>
  </div>

  <div class="container pt-lg-5 px-3">
    <ErrorAlert error="{$session.stepInfo.error}" />

    <div class="card card-logomark">
      <div class="card-body py-5 col-md-8 m-auto">
        <slot />
      </div>
    </div>
  </div>
</App>

<script>
  import { session } from "$app/stores";

  import App from "$lib/components/App.svelte";
  import ErrorAlert from "$lib/components/ErrorAlert.svelte";
</script>
