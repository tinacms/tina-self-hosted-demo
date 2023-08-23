import { NextApiHandler } from "next";
import databaseClient from '../../tina/__generated__/databaseClient';
import { withNextAuthApiRoute } from "tinacms-next-auth/dist/index";
import { authOptions } from "../../tina/nextauth";

const nextApiHandler: NextApiHandler = async (req, res) => {
  const { query, variables } = req.body;
  const result = await databaseClient.request({ query, variables });
  return res.json(result);
};

export default withNextAuthApiRoute(nextApiHandler, {
  authOptions,
  isLocalDevelopment: process.env.TINA_PUBLIC_IS_LOCAL === "true",
});
