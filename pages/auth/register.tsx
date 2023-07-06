import { useState } from 'react'
import { signIn } from "next-auth/react";

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<'initial' | 'loading' | 'success' | 'error'>('initial')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage('')
    if (password !== confirmPassword) {
      setMessage('Password mismatch')
      setStatus('error')
      return
    }
    setMessage('Creating user...')
    setStatus('loading')
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (res.ok) {
      setStatus('success')
      setMessage('User created')
      await signIn()
    } else {
      const { message } = await res.json()
      setMessage(message)
      setStatus('error')
    }
  }

  if (status === 'error') {
    return (
      <div
        className="grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium"
      >
        {message}
      </div>
    )
  } else if (status === 'success') {
     return (
        <div
          className="grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium"
        >
          {message}
        </div>
      )
  } else if (status === 'loading') {
    return (
      <div
        className="grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium"
      >
        {message}
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
          {message && (
            <div className="bg-red-500 text-white rounded-md p-3">
              Create User Failed [{message}]
            </div>
          )}
        </div>
        <form className="p-4 md:p-5 lg:p-6" onSubmit={handleSubmit}>
          <div className="grid gap-y-3">
            <input
              name="new_username"
              className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
              placeholder="Enter username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              name="new_password"
              className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              name="new_confirmPassword"
              className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <button
              className="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400"
              disabled={!username || !password || !confirmPassword}
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
