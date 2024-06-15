import {
  UsernamePasswordAuthJSProvider
} from "tinacms-authjs/dist/tinacms";
import { defineConfig, LocalAuthProvider } from "tinacms";

import { HomePageCollection } from "./collections/home";
import { FooterCollection } from "./collections/footer";
import { ProductCollection } from "./collections/product";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export default defineConfig({
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),
  contentApiUrlOverride: "/api/tina/gql",
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
      static: true,
    },
  },
  schema: {
    collections: [HomePageCollection, FooterCollection, ProductCollection],
  },
});
