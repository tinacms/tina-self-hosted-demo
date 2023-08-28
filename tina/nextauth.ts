import {
  RedisUserStore,
  TinaCredentialsProvider,
} from "tinacms-next-auth/dist/index";
import DiscordProvider from 'next-auth/providers/discord'

const {
  NEXTAUTH_CREDENTIALS_KEY: authCollectionName = "tinacms_users",
  NEXTAUTH_SECRET: secret,
  KV_REST_API_URL: url,
  KV_REST_API_TOKEN: token,
} = process.env;

const userStore = new RedisUserStore(authCollectionName, { url, token });
const authOptions = {
  secret,
  providers: [
    // TinaCredentialsProvider({ name: "Credentials", userStore }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    })
  ],
};

export { authOptions, userStore };
