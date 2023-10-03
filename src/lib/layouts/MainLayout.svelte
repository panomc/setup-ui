<svelte:head>
  <title>Pano Installer{$currentStep !== 0 ? ` ${$currentStep}/4` : ""}</title>
</svelte:head>

<App>
  <div class="navbar navbar-light my-2 px-4">
    <div
      class="d-flex flex-row justify-content-between align-items-start w-100">
      <a href="https://panocms.com" target="_blank" class="navbar-brand">
        <img alt="Pano" src="/assets/img/logo-blue.svg" width="18" />
      </a>

      <ul class="nav nav-underline">
        <li class="nav-item">
          <a class="nav-link link-success" href="#">
            <i class="fa-solid fa-i-cursor me-2"></i>
            <i class="fa-solid fa-check-circle me-2"></i>
            1. Site Kimliği</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">
            <i class="fa-solid fa-database me-2"></i>
            2. Veri Tabanı</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" aria-disabled="true">
            <i class="fa-solid fa-envelope me-2"></i>
            3. E-posta Ayarları</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" aria-disabled="true">
            <i class="fa-solid fa-user me-2"></i>
            Yönetici Hesabı</a>
        </li>
      </ul>

      <ul class="nav ml-auto">
        <li class="nav-item">
          <div class="dropdown" class:d-none="{$languageLoading}">
            <a
              href="javascript:void(0);"
              class="nav-link d-inline-block"
              data-bs-toggle="dropdown"
              id="selectLanguage">
              <i class="fa-solid fa-earth-americas"></i>
            </a>
            <div
              aria-labelledby="selectLanguage"
              class="dropdown-menu dropdown-menu-end">
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
          <a class="nav-link" href="https://panomc.com" target="_blank">
            <i class="fa-solid fa-circle-question"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>

  <div class="container">
    <div class="card">
      <div class="card-body">
        <ErrorAlert error="{stepInfo.error}" />
        <slot />
      </div>
    </div>
  </div>
</App>

<script context="module">
  import { init as initLanguage } from "$lib/language.util";
  import {
    checkCurrentStep,
    checkRoute,
    currentStep,
    session,
  } from "$lib/Store.js";
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
  export async function load({
    data,
    data: {
      stepInfo: { step },
      acceptedLanguage,
      CSRFToken,
    },
  }) {
    session.set({ CSRFToken });
    currentStep.set(step);

    await initLanguage(acceptedLanguage);

    return data;
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
