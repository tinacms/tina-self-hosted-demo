import { NextApiHandler } from "next";
import { databaseRequest } from "../../lib/databaseConnection";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

const withNextAuthApiRoute = (handler: NextApiHandler, opts?: { isLocalDevelopment: boolean }) => {
  return async (req, res) => {
    if (opts?.isLocalDevelopment) {
      Object.defineProperty(req, "session", {
        value: {
          user: {
            name: "local",
          }
        },
        writable: false,
      })
    }
    const session = await getServerSession(req, res, authOptions)
    Object.defineProperty(req, "session", {
      value: session,
      writable: false,
    })

    if (!session?.user?.name) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    return handler(req, res)
  }
}

const nextApiHandler: NextApiHandler = async (req, res) => {
  const { query, variables } = req.body;
  const result = await databaseRequest({ query, variables });
  return res.json(result);
};

export default withNextAuthApiRoute(
  nextApiHandler, { isLocalDevelopment: process.env.TINA_PUBLIC_IS_LOCAL === "true" }
);
