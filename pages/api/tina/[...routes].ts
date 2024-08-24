import { TinaAuthJSOptions, AuthJsBackendAuthProvider } from "tinacms-authjs";
import { TinaEdgeBackend } from "@tinacms/datalayer/dist/index-edge";

import databaseClient from "../../../tina/__generated__/databaseClient";

const handler = TinaEdgeBackend({
  authProvider: AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: process.env.NEXTAUTH_SECRET!,
        }),
      }) as any,
  databaseClient,
});

export const config = {
  runtime: 'edge',
  unstable_allowDynamic: [
    './pages/api/tina/[...routes].ts',
    '/node_modules/**',
  ],
};

export default async (req: Request): Promise<Response> => {
  return handler(req);
};
