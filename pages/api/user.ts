import { Redis } from "@upstash/redis";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../tina/nextauth";

const {
  NEXTAUTH_CREDENTIALS_KEY = "tinacms_users",
  KV_REST_API_URL: url,
  KV_REST_API_TOKEN: token,
} = process.env

const redis = new Redis({ url, token })

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session?.user) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  if ((session?.user as any).role !== 'admin') {
    return res.status(403).json({ message: "Forbidden" })
  }

  const { user, op } = req.body
  if (op === 'add' || op === 'save') {
    await redis.json.set(NEXTAUTH_CREDENTIALS_KEY, `$.["${user.username}"]`, {
      username: user.username,
      role: user.role
    })
  } else if (op === 'delete') {
    await redis.json.del(NEXTAUTH_CREDENTIALS_KEY, `$.["${user.username}"]`)
  } else {
    return res.status(400).json({ message: "Bad request" })
  }

  return res.json({ message: "OK" })
};
