import Amplify from "aws-amplify";
import aws_exports from "./../aws-exports";
import {
  applyPolyfills,
  defineCustomElements,
} from "@aws-amplify/ui-components/loader";

export default async ({ app, router, store, Vue }) => {
  Amplify.configure(aws_exports);
  applyPolyfills().then(() => {
    defineCustomElements(window);
  });
};
