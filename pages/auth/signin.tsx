import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken } from "next-auth/react"

export default function SignIn({ csrfToken, error }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
      <div
        className="grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium"
      >
        <div className="w-full max-w-sm rounded-lg bg-slate-700/30 shadow">
          <div className="flex flex-col items-center justify-center gap-4">
            <img src="../tina.svg" alt="TinaCMS Logo" height={100} width={72}/>
            {error && (
              <div className="bg-red-500 text-white rounded-md p-3">
                {error}
              </div>
            )}
          </div>
          <form className="p-4 md:p-5 lg:p-6" method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="grid gap-y-3">
              <input
                name="username"
                className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
                placeholder="email@example.com"
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
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      error: context.params.error || ''
    },
  }
}
