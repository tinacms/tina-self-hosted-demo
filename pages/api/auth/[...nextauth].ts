import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {Redis} from '@upstash/redis'
import bcrypt from 'bcryptjs'

export const authOptions = {
  pages: {
    error: '/auth/signin', // Error code passed in query string as ?error=
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
    name: 'Credentials',
    credentials: {
      username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
      password: { label: 'Password', type: 'password' }
    },
    async authorize(credentials) {
      const kv = new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      })

      try {
        const keys = await kv.json.objkeys(process.env.NEXTAUTH_CREDENTIALS_KEY, `$.${credentials.username}`)
        if (keys && keys.length > 0) {
          const user = await kv.json.get(process.env.NEXTAUTH_CREDENTIALS_KEY, `$.${credentials.username}`)
          if (user) {
            const match = await bcrypt.compare(credentials.password, user[0].password)
            if (!match) {
              return null
            }
            return user[0]
          }
        }
      } catch (e) {
        console.error(e)
      }
      return null
    }
  })
  ],
}

export default NextAuth(authOptions)
