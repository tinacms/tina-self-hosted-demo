import { NextApiHandler } from "next";
import { databaseRequest } from "../../lib/databaseConnection";

const nextApiHandler: NextApiHandler = async (req, res) => {
  // Use your own authentication logic here
  if (req.headers.authorization === "Bearer some-token") {
    const { query, variables } = req.body;
    const result = await databaseRequest({ query, variables });
    return res.json(result);
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default nextApiHandler;
