import {Redis} from '@upstash/redis'
import bcrypt from 'bcryptjs'

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function createUser(username, password, res) {
  const kv = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  })
  const users = await kv.json.get(process.env.NEXTAUTH_CREDENTIALS_KEY)
  if (!users || Object.keys(users).length === 0) {
    const output = await kv.json.set(process.env.NEXTAUTH_CREDENTIALS_KEY, '$', { [username]: { username, password: await hashPassword(password) } })
    if (output === 'OK') {
      res.status(200).json({ message: 'User added' })
    } else {
      res.status(500).json({ message: 'Error adding user' })
    }
  } else {
    res.status(400).json({ message: 'User setup already completed' })
  }
}

export default function handler(req, res) {
  const { username, password } = req.body
  if (req.method === 'POST') {
    if (!username || !password) {
      res.status(400).json({ message: 'Missing username or password' })
    } else {
      return createUser(username, password, res)
    }
  } else {
    res.status(400).json({ message: 'Invalid request' })
  }
}
