import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { GitHubProvider } from "tinacms-gitprovider-github";
import { Redis } from "@upstash/redis";
import { RedisLevel } from "upstash-redis-level";

// Manage this flag in your CI/CD pipeline and make sure it is set to false in production
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const branch = (process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  "main") as string;

if (!branch) {
  throw new Error(
    "No branch found. Make sure that you have set the GITHUB_BRANCH or process.env.VERCEL_GIT_COMMIT_REF environment variable."
  );
}

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        repo: process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG,
        owner: process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER,
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
        branch,
      }),
      databaseAdapter: new RedisLevel<string, Record<string, any>>({
        redis: new Redis({
          url:
            (process.env.KV_REST_API_URL as string) || "http://localhost:8079",
          token: (process.env.KV_REST_API_TOKEN as string) || "example_token",
        }),
        debug: process.env.DEBUG === "true" || false,
        namespace: branch,
      }),
    });
