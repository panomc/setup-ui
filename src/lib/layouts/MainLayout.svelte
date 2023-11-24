<svelte:head>
  <title>{$_("title")}{$currentStep !== 0 ? ` ${$currentStep}/4` : ""}</title>
</svelte:head>

<App>
  <div class="navbar bg-primary navbar-dark navbar-expand">
    <div class="container">
      <div
        class="d-flex flex-row justify-content-between align-items-start w-100">
        <div class="navbar-nav">
          <a href="https://panocms.com" target="_blank" class="navbar-brand">
            <img
              alt="Pano"
              src="/assets/img/logo.svg"
              class="d-inline-block align-text-top"
              width="18" />
          </a>
          <span class="navbar-text text-light">Setup</span>
        </div>

        <Navbar />

        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="https://panomc.com" target="_blank">
              <i class="fa-solid fa-circle-question"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="pt-3">
      <div
        class="progress"
        role="progressbar"
        aria-label="Example 20px high"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
        style="height: 8px">
        <div class="progress-bar bg-secondary" style="width: 25%"></div>
      </div>
    </div>

    <ErrorAlert error="{stepInfo.error}" />
  </div>

  <div class="pt-3">
    <div class="container">
      <div class="card bg-white">
        <div class="card-body">
          <slot />
        </div>
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
    const stepInfo = await checkCurrentStep();
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
  import Navbar from "$lib/components/Navbar.svelte";
  import { _ } from "svelte-i18n";

  export let stepInfo;
</script>
