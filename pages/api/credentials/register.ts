import { userStore } from "../../../tina/nextauth";

export default async function handler(req, res) {
  console.log('register handler')
  const { username, password } = req.body
  console.log({username, password})
  if (req.method === 'POST') {
    if (!username || !password) {
      res.status(400).json({ message: 'Missing username or password' })
    } else {
      console.log('calling addUser')
      try {
        const success = await userStore.addUser(username, password)
        if (success) {
          res.status(200).json({ message: 'User added' })
        } else {
          res.status(400).json({ message: 'User already exists' })
        }
      } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Internal server error' })
      }
    }
  } else {
    res.status(400).json({ message: 'Invalid request' })
  }
}
