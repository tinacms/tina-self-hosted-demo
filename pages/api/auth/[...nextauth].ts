import NextAuth from "next-auth"
import { createClient } from '@vercel/kv'
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      console.log(req.query)
      const kv = createClient({
        url: process.env.REDIS_UPSTASH_URL,
        token: process.env.REDIS_UPSTASH_TOKEN,
      })

      try {
        const user = await kv.json.get(process.env.NEXT_AUTH_USERS, `$.${credentials.username}`)
        // const user = await kv.hget<string>(process.env.NEXT_AUTH, credentials.username)
        if (user) {
          return user
        }
      } catch (e) {
        console.error(e)
      }
      return null
      //
      // // Add logic here to look up the user from the credentials supplied
      // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
      //
      // if (user) {
      //   // Any object returned will be saved in `user` property of the JWT
      //   return user
      // } else {
      //   // If you return null then an error will be displayed advising the user to check their details.
      //   return null
      //
      //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      // }
    }
  })
  ],
}

export default NextAuth(authOptions)
