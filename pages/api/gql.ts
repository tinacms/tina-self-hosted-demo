import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import databaseClient from '../../tina/__generated__/databaseClient';
import { authManager } from "../../tina/auth";

const isAuthorized = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.TINA_PUBLIC_IS_LOCAL === "true") {
    return true
  }

  return authManager.isAuthorized(req, res)
}

const nextApiHandler: NextApiHandler = async (req, res) => {
  if (await isAuthorized(req, res)) {
    const { query, variables } = req.body;
    const result = await databaseClient.request({ query, variables });
    return res.json(result);
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

export default nextApiHandler
