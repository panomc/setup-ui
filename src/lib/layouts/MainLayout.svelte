<App>
  <div class="navbar">
    <div class="container px-3">
      <a href="https://panocms.com" target="_blank" class="navbar-brand">
        <img alt="Pano Logo" src="/assets/img/logo-blue.svg" width="18" />
      </a>
      <ul class="nav ml-auto">
        <li class="nav-item">
          <div class="dropdown" class:d-none="{$languageLoading}">
            <a
              href="javascript:void(0);"
              class="nav-link text-muted dropdown-toggle d-inline-block"
              data-bs-toggle="dropdown"
              id="selectLanguage">
              {$currentLanguage.name}
            </a>
            <div
              aria-labelledby="selectLanguage"
              class="dropdown-menu dropdown-menu-right">
              {#each Object.keys(Languages) as language, index (language)}
                <a
                  class="dropdown-item"
                  href="javascript:void(0);"
                  on:click="{() => changeLanguage(Languages[language])}"
                  class:active="{$currentLanguage === Languages[language]}">
                  {Languages[language].name}
                </a>
              {/each}
            </div>
          </div>
          <div
            class="spinner-border spinner-border-sm text-primary"
            class:d-none="{!$languageLoading}"
            role="status">
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
        <span class="navbar-text text-muted">v1.0</span>
      </ul>
    </div>
  </div>

  <div class="container pt-lg-5 px-3">
    <ErrorAlert error="{stepInfo.error}" />

    <div class="card card-logomark">
      <div class="card-body py-5 col-md-8 m-auto">
        <slot />
      </div>
    </div>
  </div>
</App>

<script context="module">
  import { init as initLanguage } from "$lib/language.util";
  import { checkCurrentStep, checkRoute, session } from "$lib/Store.js";
  import { redirect } from "@sveltejs/kit";

  /**  @type {import('./$types').LayoutServerLoad} */
  export async function loadServer(input) {
    const {
      url: { pathname },
      locals: { acceptedLanguage, CSRFToken },
    } = input;
    const stepInfo = await checkCurrentStep(input);
    const { step } = stepInfo;

    const route = checkRoute(step, pathname);

    if (route) {
      throw redirect(302, route);
    }

    return { stepInfo, acceptedLanguage, CSRFToken };
  }

  /**
   * @type {import('@sveltejs/kit').LoadLayout}
   */
  export async function load({ data, data: { acceptedLanguage, CSRFToken } }) {
    session.set({ CSRFToken });

    await initLanguage(acceptedLanguage);

    return data
  }
</script>

<script>
  import App from "$lib/components/App.svelte";
  import ErrorAlert from "$lib/components/ErrorAlert.svelte";
  import {
    changeLanguage,
    currentLanguage,
    languageLoading,
    Languages,
  } from "$lib/language.util";

  export let stepInfo;
</script>
