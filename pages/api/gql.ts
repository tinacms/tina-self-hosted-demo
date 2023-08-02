import { NextApiHandler, NextApiRequest } from "next";
import { databaseRequest } from "../../lib/databaseConnection";
import { Clerk } from "@clerk/backend";
import { isUserAllowed } from "../../tina/config";

const secretKey = process.env.CLERK_SECRET;
const clerk = Clerk({
  secretKey,
});

const isAuthorized = async (req: NextApiRequest) => {
  if (process.env.TINA_PUBLIC_IS_LOCAL === "true") {
    return true;
  }

  const requestState = await clerk.authenticateRequest({
    headerToken: req.headers["authorization"],
  });
  if (requestState.status === "signed-in") {
    const user = await clerk.users.getUser(requestState.toAuth().userId);
    const primaryEmail = user.emailAddresses.find(
      ({ id }) => id === user.primaryEmailAddressId
    );
    if (primaryEmail && isUserAllowed(primaryEmail.emailAddress)) {
      return true;
    }
  }
  return false;
};

const nextApiHandler: NextApiHandler = async (req, res) => {
  if (await isAuthorized(req)) {
    const { query, variables } = req.body;
    const result = await databaseRequest({ query, variables });
    return res.json(result);
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default nextApiHandler;
