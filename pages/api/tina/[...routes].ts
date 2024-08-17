import { TinaAuthJSOptions, AuthJsBackendAuthProvider } from "tinacms-authjs";
import { TinaEdgeBackend } from "@tinacms/datalayer";

import databaseClient from "../../../tina/__generated__/databaseClient";

const handler = TinaEdgeBackend({
  authProvider: AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: process.env.NEXTAUTH_SECRET!,
        }),
      }),
  databaseClient,
});

export const config = {
  runtime: 'edge'
};

export default async (req: Request): Promise<Response> => {
  return handler(req);
};
