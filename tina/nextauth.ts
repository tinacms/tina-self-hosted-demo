import { RedisUserStore, TinaCredentialsProvider } from "next-auth-tinacms/dist/index";

const userStore = new RedisUserStore(process.env.NEXTAUTH_CREDENTIALS_KEY, {
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

const authOptions = {
  pages: {
    error: '/auth/signin', // Error code passed in query string as ?error=
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    TinaCredentialsProvider({ userStore })
  ],
}

export { authOptions, userStore }
