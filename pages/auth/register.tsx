import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Redis } from "@upstash/redis";

export default function Register({ userSetupRequired }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<'initial' | 'loading' | 'success' | 'error'>('initial')

  useEffect(() => {
    if (!userSetupRequired) {
      setStatus('error')
      setMessage('User setup already completed')
    }
  }, [userSetupRequired])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setMessage('')
    if (password !== confirmPassword) {
      setMessage('Password mismatch')
      setStatus('error')
      return
    }
    setMessage('Creating user...')
    setStatus('loading')
    const res = await fetch('/api/credentials/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (res.ok) {
      setStatus('success')
      setMessage('User created')
      await signIn('Credentials', { callbackUrl: '/admin/index.html' })
    } else {
      const { message } = await res.json()
      setMessage(message)
      setStatus('error')
    }
  }

  if (message && status !== 'initial' && status !== 'error') {
    return (
      <div
        className={`grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium`}
      >
        {message}
      </div>
    )
  }

  const disabled = !username || !password || !confirmPassword || !userSetupRequired

  return (
    <div
      className="grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium"
    >
      <div className="w-full max-w-sm rounded-lg bg-slate-700/30 shadow">
        <div className="flex flex-col items-center justify-center gap-4">
          <img src="../tina.svg" alt="TinaCMS Logo" height={100} width={72}/>
          {message && (
            <div className="bg-red-500 text-white rounded-md p-3">
              Error: {message}
            </div>
          )}
        </div>
        <div className="p-4 md:p-5 lg:p-6">
          <div className="grid gap-y-3">
            <input
              className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
              placeholder="Enter username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <button
              className={`flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-400'}}`}
              disabled={disabled}
              onClick={handleSubmit}
            >
              Setup
            </button>
          </div>
        </div>
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
      userSetupRequired
    },
  }
}
