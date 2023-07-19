import { NextApiHandler } from "next";
import backendClient from "../../tina/__generated__/backendClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const nextApiHandler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  const isAuthorized =
    process.env.TINA_PUBLIC_IS_LOCAL === "true" || session?.user?.name || false;

  if (isAuthorized) {
    const { query, variables } = req.body;
    const result = await backendClient.request({ query, variables });
    return res.json(result);
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default nextApiHandler;
