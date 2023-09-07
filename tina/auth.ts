import DiscordProvider from 'next-auth/providers/discord'
import { AuthOptions } from "next-auth";
import { NextauthAuthManager } from "./nextauth-auth";
import databaseClient from "./__generated__/databaseClient";

const {
  NEXTAUTH_SECRET: secret,
} = process.env;

const authOptions : AuthOptions = {
  callbacks: {
    jwt: async ({ token: jwt, account}) => {
      if (account) { // first time logging in
        try {
          const result = await databaseClient.queries.users({ relativePath: 'index.json' })
          const users = result?.data?.users?.users
          if (users.find((user) => user.email === jwt.email )) {
            jwt.role = 'user'
          } else {
            jwt.role = 'guest'
          }
        } catch (error) {
          console.log(error)
        }
        if (jwt.role === undefined) {
          jwt.role = 'guest'
        }
      }
      return jwt
    },
    session: async ({ session, token: jwt }) => {
      // forward the role to the session
      (session.user as any).role = jwt.role
      return session
    }
  },
  session: {
    strategy: "jwt"
  },
  secret,
  providers: [
    // TinaCredentialsProvider({ name: "Credentials", userStore }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    })
  ],
};

export { authOptions }

export type AuthManager = {
  isAuthenticated: (req: any, res: any) => Promise<boolean>
  isAuthorized: (req: any, res: any) => Promise<boolean>
}

export const authManager = new NextauthAuthManager(authOptions, databaseClient)
