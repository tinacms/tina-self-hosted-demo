import NextAuth from 'next-auth'
import { NextAuthOptions } from "../tina/[...routes]";

export default (req, res) => {
  return NextAuth(NextAuthOptions)(req, res)
}
