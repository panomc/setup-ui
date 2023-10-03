<ul class="navbar-nav nav-underline text-center">
  {#each steps as step, index (step)}
    <li class="nav-item">
      <a
        class="nav-link"
        class:active="{$currentStep === index + 1}"
        class:link-success="{$currentStep > index + 1}"
        href="#">
        {#if $currentStep > index + 1}<i
            class="fa-solid fa-check-circle me-lg-1 d-lg-inline d-block"></i
          >{:else}
          <i class="{step.icon} me-lg-1 d-lg-inline d-block"></i>
        {/if}
        {index + 1}. {step.name}</a>
    </li>
  {/each}
</ul>

<script context="module">
  import {
    currentStep,
  } from "$lib/Store.js";

  const steps = [
    {
      name: "Site Kimliği",
      icon: "fa-solid fa-i-cursor",
    },
    {
      name: "Veri Tabanı",
      icon: "fa-solid fa-database",
    },
    {
      name: "E-posta Ayarları",
      icon: "fa-solid fa-envelope",
    },
    {
      name: "Yönetici Hesabı",
      icon: "fa-solid fa-user",
    },
  ];
</script>