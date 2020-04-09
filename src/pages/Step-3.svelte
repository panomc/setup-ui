<script>
  import { nextStep, backStep } from "../Store";

  let buttonsLoading = false;

  function back() {
    if (!buttonsLoading) {
      buttonsLoading = true;

      backStep({
        step: 3
      });
    }
  }
</script>

<a href="javascript:void(0);" on:click={back} class:disabled="{buttonsLoading}">
  <button class="btn btn-primary" type="button">
    <!--            <span aria-hidden="true"-->
    <!--                  class="spinner-border spinner-border-sm text-light mx-4"-->
    <!--                  role="status"></span>-->
    <!--      <a v-if="!nextButtonLoading">-->
    <i class="fas fa-arrow-alt-circle-right"/>
    Geri Dön
    <!--      </a>-->
  </button>
</a>