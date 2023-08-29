import DiscordProvider from 'next-auth/providers/discord'
import { AuthOptions } from "next-auth";
import { Redis } from '@upstash/redis'

const {
  NEXTAUTH_CREDENTIALS_KEY: authCollectionName = "tinacms_users",
  NEXTAUTH_SECRET: secret,
  KV_REST_API_URL: url,
  KV_REST_API_TOKEN: token,
} = process.env;

const redis = new Redis({ url, token })

const authOptions : AuthOptions = {
  callbacks: {
    jwt: async ({ token, account, profile}) => {
      if (account) { // first time logging in
        try {
          const username = token.email
          // if user store is empty then we add the user as an admin
          const users = await redis.json.get(authCollectionName)
          if (!users || Object.keys(users).length === 0) {
            await redis.json.set(authCollectionName, '$', {})
            await redis.json.set(authCollectionName, `$.["${username}"]`, {
              name: username,
              username,
              role: 'admin'
            })
            token.role = 'admin'
          } else {
            const keys = await redis.json.objkeys(authCollectionName, `$.["${username}"]`)
            if (keys && keys.length > 0) {
              const user = await redis.json.get(authCollectionName, `$.["${username}"]`)
              if (user) {
                token.role = user[0].role
              } else {
                // if user is not found in the store then we add the user as a guest
                // so that they can be updated by an admin
                await redis.json.set(authCollectionName, `$.["${username}"]`, {
                  username,
                  role: 'guest'
                })
              }
            }
          }
        } catch (error) {
          console.log(error)
        }
        if (token.role === undefined) {
          token.role = 'guest'
        }
      }
      return token
    },
    session: async ({ session, token, user }) => {
      // forward the role to the session
      (session.user as any).role = token.role
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

export { authOptions };
