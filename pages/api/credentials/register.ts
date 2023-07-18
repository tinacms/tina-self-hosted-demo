import { userStore } from "../../../tina/nextauth";

export default function handler(req, res) {
  const { username, password } = req.body
  if (req.method === 'POST') {
    if (!username || !password) {
      res.status(400).json({ message: 'Missing username or password' })
    } else {
      return userStore.addUser(username, password)
    }
  } else {
    res.status(400).json({ message: 'Invalid request' })
  }
}
