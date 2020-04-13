<script>
  import router from "page";
  import { ChunkGenerator } from "svelte-spa-chunk";

  import ChunkComponent from "../Chunk.svelte";

  const Chunk = ChunkGenerator(ChunkComponent);

  let props = {};

  router("/step-1", () => {
    props = {
      component: Chunk(() => import("../pages/Step-1.svelte"))
    };
  });

  router("/step-2", () => {
    props = {
      component: Chunk(() => import("../pages/Step-2.svelte"))
    };
  });

  router("/step-3", () => {
    props = {
      component: Chunk(() => import("../pages/Step-3.svelte"))
    };
  });

  router("*", () => {
    props = {
      component: Chunk(() => import("../pages/Beginning.svelte"))
    };
  });

  router.start();

  export let hidden;
</script>

<div hidden={hidden}>
  <svelte:component this={props.component} {...props}/>
</div>