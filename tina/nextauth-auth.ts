import { AuthManager } from "./auth";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "next-auth";
import { GraphQLError } from "graphql";
import { UsersQuery, UsersQueryVariables } from "./__generated__/types";

export class NextauthAuthManager implements AuthManager {
  constructor(private nextauthOptions: AuthOptions, private databaseClient: {
    request: ({ query, variables }: { query: any; variables: any }) => Promise<{
      variables: any;
      data: any;
      query: any;
      errors: ReadonlyArray<GraphQLError>
    }>; queries: {
      users(variables: UsersQueryVariables, options?: { branch?: string }): Promise<{
        data: UsersQuery;
        variables: UsersQueryVariables;
        query: string
      }>;
    }
  }) {
  }

  async isAuthenticated(req: any, res: any): Promise<boolean> {
    const session = await getServerSession(req, res, this.nextauthOptions)
    return !!session?.user
  }

  async isAuthorized(req: any, res: any): Promise<boolean> {
    const session = await getServerSession(req, res, this.nextauthOptions)
    if (session?.user) {
      const result = await this.databaseClient.queries.users({ relativePath: 'index.json' })
      const users = result?.data?.users?.users
      return !!users.find((user) => user.email === session?.user.email )
    }
    return false
  }
}
