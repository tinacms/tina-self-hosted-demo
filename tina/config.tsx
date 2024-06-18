import {
  TinaUserCollection,
  UsernamePasswordAuthJSProvider
} from "tinacms-authjs/dist/tinacms";
import { defineConfig, LocalAuthProvider } from "tinacms";

import { HomePageCollection } from "./collections/page-collections/home";
import { FooterCollection } from "./collections/footer";
import { ProductCollection } from "./collections/product";
import { BlogCollection } from "./collections/blog";
import { ServiceCollection } from "./collections/page-collections/service";
import { NavbarCollection } from "./collections/navbar";

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
    collections: [TinaUserCollection,HomePageCollection, FooterCollection, ProductCollection, BlogCollection, ServiceCollection, NavbarCollection],
  },
});
