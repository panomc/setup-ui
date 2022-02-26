<MainLayout>
  <slot />
</MainLayout>

<script context="module">
  import { checkCurrentStep, checkRoute } from "$lib/Store.js";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(request) {
    const {
      url: { pathname },
      session,
    } = request;

    const stepInfo = await checkCurrentStep(request);
    const { step } = stepInfo;

    session.stepInfo = stepInfo;

    const redirect = checkRoute(step, pathname);

    return redirect ? { status: 302, redirect } : {};
  }
</script>

<script>
  import MainLayout from "$lib/layouts/MainLayout.svelte";
</script>
