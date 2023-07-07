import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getCsrfToken } from "next-auth/react"
import { Redis } from "@upstash/redis"

export default function SignIn({ csrfToken, error, userSetupRequired }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (userSetupRequired) {
    return (
      <div
        className="grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium">
        <div className="w-full max-w-sm rounded-lg bg-slate-700/30 shadow">
          <div className="flex flex-col items-center justify-center gap-4 p-10">
            <img src="../tina.svg" alt="TinaCMS Logo" height={100} width={72}/>
            <div>User setup required. Click <a href={'/auth/register'} className={"text-blue-700"}>here</a> to add your first user.</div>
          </div>
        </div>
      </div>
    )
  }
  return (
      <div
        className="grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium"
      >
        <div className="w-full max-w-sm rounded-lg bg-slate-700/30 shadow">
          <div className="flex flex-col items-center justify-center gap-4">
            <img src="../tina.svg" alt="TinaCMS Logo" height={100} width={72}/>
            {error && (
              <div className="bg-red-500 text-white rounded-md p-3">
                Sign In Failed [{error}]
              </div>
            )}
          </div>
          <form className="p-4 md:p-5 lg:p-6" method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="grid gap-y-3">
              <input
                name="username"
                className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
                placeholder="jsmith"
              />
              <input
                name="password"
                className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
                type="password"
              />
              <button
                className="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let userSetupRequired = false
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN && process.env.NEXTAUTH_CREDENTIALS_KEY) {
    const kv = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
    const users = await kv.json.get(process.env.NEXTAUTH_CREDENTIALS_KEY)
    if (!users || Object.keys(users).length === 0) {
      userSetupRequired = true
    }
  }
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      error: context.query?.error || '',
      userSetupRequired
    },
  }
}
