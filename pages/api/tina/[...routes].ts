import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer'
import DiscordProvider from 'next-auth/providers/discord'
import { TinaAuthJSOptions, AuthJsBackendAuthProvider } from 'tinacms-authjs'

import databaseClient from '../../../tina/__generated__/databaseClient'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

export const NextAuthOptions = TinaAuthJSOptions({
  databaseClient: databaseClient,
  debug: process.env.DEBUG === 'true',
  secret: process.env.NEXTAUTH_SECRET,
  uidProp: 'name',
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    })
  ]
})

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({
      authOptions: NextAuthOptions,
    }),
  databaseClient,
})

export default (req, res) => {
  // Modify the request here if you need to
  return handler(req, res)
}
