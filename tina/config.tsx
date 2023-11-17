import { Collection, defineConfig, LocalAuthProvider } from "tinacms";
import { PageCollection } from "./collections/page";

import {
  DefaultAuthJSProvider,
  TinaUserCollection,
} from 'tinacms-authjs/dist/tinacms';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true"
export default defineConfig({
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new DefaultAuthJSProvider(),
  contentApiUrlOverride: "/api/tina/gql",
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "",
      static: true,
    },
  },

  schema: {
    collections: [
      {
        ...TinaUserCollection,
        fields: [
          {
            ...TinaUserCollection.fields![0],
            fields: [
              {
                type: 'string',
                label: 'Username',
                name: 'username',
                uid: true,
                required: true,
              },
              {
                type: 'string',
                label: 'Name',
                name: 'name',
              },
              {
                type: 'string',
                label: 'Email',
                name: 'email',

              },
            ]
          }
        ]
      } as Collection,
      PageCollection
    ],
  },
});
