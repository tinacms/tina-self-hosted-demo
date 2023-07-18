import { NextApiHandler } from "next";
import { databaseRequest } from "../../lib/databaseConnection";
import { withNextAuthApiRoute } from "next-auth-tinacms/dist/index";
import { authOptions } from "../../tina/nextauth";

const nextApiHandler: NextApiHandler = async (req, res) => {
  const { query, variables } = req.body;
  const result = await databaseRequest({ query, variables });
  return res.json(result);
};

export default withNextAuthApiRoute(
  nextApiHandler, { authOptions, isLocalDevelopment: process.env.TINA_PUBLIC_IS_LOCAL === "true" }
);
