import NextAuth from 'next-auth'
import { authOptions } from "../../../tina/auth";

export default NextAuth(authOptions)
