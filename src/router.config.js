export default {
  routes: {
    "/step-1": {
      component: () => import("./pages/Step-1.svelte"),
    },
    "/step-2": {
      component: () => import("./pages/Step-2.svelte"),
    },
    "/step-3": {
      component: () => import("./pages/Step-3.svelte"),
    },
    "*": {
      component: () => import("./pages/Beginning.svelte"),
    },
  },
};
