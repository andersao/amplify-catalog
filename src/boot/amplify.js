import Amplify from "aws-amplify";
import aws_exports from "./../aws-exports";
import {
  applyPolyfills,
  defineCustomElements,
} from "@aws-amplify/ui-components/loader";
import { Auth, Hub, DataStore } from "aws-amplify";

export default async ({ app, router, store, Vue }) => {
  Vue.prototype.$user = null;

  Amplify.configure(aws_exports);

  applyPolyfills().then(() => {
    defineCustomElements(window);
  });

  Auth.currentAuthenticatedUser()
    .then((user) => (Vue.prototype.$user = user))
    .catch(() => {
      Vue.prototype.$user = null;
    });

  Hub.listen("auth", async (data) => {
    switch (data.payload.event) {
      case "signIn":
        Vue.prototype.$user = data.payload.data;
        await router.push({ path: "/" });
        break;
      case "signOut":
        Vue.prototype.$user = null;
        await DataStore.clear();
        await router.push({ name: "login" });
        break;
    }
  });

  // Register Router Guard
  router.beforeEach(async (to, from, next) => {
    const meta = to.meta || {};
    const authenticated = Vue.prototype.$user !== null;

    if (!meta.public) {
      if (!authenticated && to.name !== "login") return next({ name: "login" });
      return next();
    }

    if (authenticated && to.name === "login") return next({ path: "/" });

    return next();
  });
};
