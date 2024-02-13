<div
  class="collapse d-lg-flex navbar-collapse justify-content-center"
  id="navbarSupportedContent">
  <ul class="navbar-nav text-lg-center mt-lg-0 mt-3">
    {#each steps as step, index (step)}
      <li class="nav-item">
        <a
          class="nav-link"
          class:active="{$currentStep === index + 1}"
          class:link-success="{$currentStep > index + 1}"
          href="{$currentStep <= index + 1 ? null : 'javascript:void(0);'}"
          on:click="{$currentStep <= index + 1
            ? null
            : () => goStep(index + 1)}">
          {#if $currentStep > index + 1}<i
              class="fa-solid fa-check-circle me-lg-1"></i
            >{:else}
            <i class="{step.icon} me-lg-1"></i>
          {/if}
          {index + 1}. {$_(step.name)}</a>
      </li>
    {/each}
  </ul>
</div>

<script context="module">
  import { currentStep } from "$lib/Store.js";

  const steps = [
    {
      name: "steps.website.title",
      icon: "fa-solid fa-globe",
    },
    {
      name: "steps.database.title",
      icon: "fa-solid fa-database",
    },
    {
      name: "steps.email.title",
      icon: "fa-solid fa-envelope",
    },
    {
      name: "steps.account.title",
      icon: "fa-solid fa-user",
    },
  ];
</script>

<script>
  import { page } from "$app/stores";
  import { goToStep } from "$lib/Store.js";
  import { _ } from "svelte-i18n";

  function goStep(step) {
    goToStep(step, $page.url.pathname);
  }
</script>
