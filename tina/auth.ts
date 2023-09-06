import DiscordProvider from 'next-auth/providers/discord'
import { AuthOptions } from "next-auth";
import { RedisUserStore } from "tinacms-next-auth";
import { NextauthAuthManager, NextauthUserManager } from "./nextauth-auth";

const {
  NEXTAUTH_CREDENTIALS_KEY: authCollectionName = "tinacms_users",
  NEXTAUTH_SECRET: secret,
  KV_REST_API_URL: url,
  KV_REST_API_TOKEN: token,
} = process.env;

export const userStore = new RedisUserStore(authCollectionName, { url, token })

const authOptions : AuthOptions = {
  callbacks: {
    jwt: async ({ token: jwt, account}) => {
      if (account) { // first time logging in
        try {
          const email = jwt.email
          // if user store is empty then we add the user as an admin
          const users = await userStore.getUsers()
          if (!users || Object.keys(users).length === 0) {
            await userStore.addUser(email, '')
            jwt.role = 'user'
          } else {
            const user = await userStore.getUser(email)
            if (user) {
              jwt.role = 'user'
            } else {
              jwt.role = 'guest'
            }
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

export type User = {
  id: string
  email: string
}

export type UserManager = {
  listUsers: () => Promise<User[]>
  createUser: (email: string) => Promise<void>
  deleteUser: (email: string) => Promise<void>
}

export type AuthManager = {
  isAuthenticated: (req: any, res: any) => Promise<boolean>
  isAuthorized: (req: any, res: any) => Promise<boolean>
}

export const authManager = new NextauthAuthManager(authOptions)
export const userManager = new NextauthUserManager(userStore, authOptions)

export const makeUserManagementApi = (authManager: AuthManager, userManager: UserManager) => {
  return async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" })
    }

    const authenticated = await authManager.isAuthenticated(req, res)
    if (!authenticated) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const isAuthorized = await authManager.isAuthorized(req, res)
    if (!isAuthorized) {
      return res.status(403).json({ message: "Forbidden" })
    }

    const { user, op } = req.body
    if (op === 'add') {
      await userManager.createUser(user.email)
    } else if (op === 'delete') {
      await userManager.deleteUser(user.email)
    } else {
      return res.status(400).json({ message: "Bad request" })
    }

    return res.json({ message: "OK" })
  }
}
