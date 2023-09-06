import { AuthManager, UserManager, User } from "./auth";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "next-auth";
import { UserStore } from "tinacms-next-auth";

export class NextauthUserManager implements UserManager {
  constructor(private userStore: UserStore, private nextauthOptions: AuthOptions) {}

  async createUser(email: string): Promise<void> {
    await this.userStore.addUser(email, '')
  }

  async deleteUser(email: string): Promise<void> {
    await this.userStore.deleteUser(email)
  }

  async listUsers(): Promise<User[]> {
    const users = await this.userStore.getUsers()
    if (!users) {
      return []
    }
    return users.map(user => ({id: user.username || null, email: user.username || null}))
  }
}

export class NextauthAuthManager implements AuthManager {
  constructor(private nextauthOptions: AuthOptions) {
  }

  async isAuthenticated(req: any, res: any): Promise<boolean> {
    const session = await getServerSession(req, res, this.nextauthOptions)
    return !!session?.user
  }

  async isAuthorized(req: any, res: any): Promise<boolean> {
    const session = await getServerSession(req, res, this.nextauthOptions)
    return (session?.user as any).role === 'user'
  }
}
