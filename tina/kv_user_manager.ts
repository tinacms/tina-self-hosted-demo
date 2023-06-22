import "isomorphic-fetch";
import bcrypt from "bcryptjs";
import chalk from "chalk";
import dotenv from "dotenv";
import fs from "fs";
import inquirer from "inquirer";
import { Redis } from "@upstash/redis";


async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

(async () => {
  await fs.promises.stat('.env').catch(_ => {
    fs.copyFileSync('.env.example', '.env')
  })
  dotenv.config()

  console.log(chalk.green('Welcome to Tina Cloud!'))

  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    // Prompt user for KV store url and token
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'url',
        message: `Enter your Vercel KV Database URL (see https://vercel.com/dashboard/stores):`,
      },
      {
        type: 'input',
        name: 'token',
        message: `Enter your Vercel KV Database token:`,
      },
      {
        type: 'input',
        name: 'credentials_key',
        message: `Enter your Credentials key (default: 'users'):`,
        default: 'users',
      }
    ])

    if (!process.env.KV_REST_API_URL) {
      fs.writeFileSync('.env', `KV_REST_API_URL=${answers.url}\n`, { flag: 'a' })
      process.env.KV_REST_API_URL = answers.url
    }
    if (!process.env.KV_REST_API_TOKEN) {
      fs.writeFileSync('.env', `KV_REST_API_TOKEN=${answers.token}\n`, { flag: 'a' })
      process.env.KV_REST_API_TOKEN = answers.token
    }
    if (!process.env.NEXTAUTH_CREDENTIALS_KEY) {
      fs.writeFileSync('.env', `NEXTAUTH_CREDENTIALS_KEY=${answers.credentials_key}\n`, { flag: 'a' })
      process.env.NEXTAUTH_CREDENTIALS_KEY = answers.credentials_key
    }
  }

  const kv = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  })

  const users = await kv.json.get(process.env.NEXTAUTH_CREDENTIALS_KEY)
  if (!users || Object.keys(users).length === 0) {
    console.log(chalk.red('No users found!'))
  } else {
    console.log(chalk.green('Users:'))
    console.table(Object.keys(users).map(username => {
      return {
        name: username,
        email: users[username].email,
      }
    }))
  }

  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'addUser',
      message: `Would you like to add a new user?`,
    },
    {
      type: 'confirm',
      name: 'updatePassword',
      message: `Would you like to update a user's password?`,
      when: (answers) => !answers.addUser,
    },
    {
      type: 'confirm',
      name: 'deleteUser',
      message: `Would you like to delete a user?`,
      when: (answers) => !answers.addUser && !answers.updatePassword,
    },
    {
      type: 'input',
      name: 'name',
      message: `Enter a user name:`,
      when: (answers) => answers.addUser || answers.updatePassword || answers.deleteUser,
    },
    {
      type: 'input',
      name: 'email',
      message: `Enter a user email:`,
      when: (answers) => answers.addUser,
    },
    {
      type: 'password',
      name: 'password',
      message: `Enter a user password:`,
      when: (answers) => answers.addUser || answers.updatePassword,
    },
    {
      type: 'password',
      name: 'passwordConfirm',
      message: `Confirm the user password:`,
      when: (answers) => answers.addUser || answers.updatePassword,
    }
    ])

  if (answers.addUser) {
    const { name, email, password, passwordConfirm } = answers
    if (password !== passwordConfirm) {
      console.log(chalk.red('Passwords do not match!'))
      process.exit(1)
    }
    const user = {
      name,
      email,
      password: await hashPassword(password),
    }
    if (!users) {
      await kv.json.set(process.env.NEXTAUTH_CREDENTIALS_KEY, '$', {})
    }
    const res = await kv.json.set(process.env.NEXTAUTH_CREDENTIALS_KEY, `$.${name}`, user)
    if (res === 'OK') {
      console.log(chalk.green(`User ${name} added!`))
    } else {
      console.log(chalk.red(`Error adding user ${name}!`))
    }
  } else if (answers.updatePassword) {
    const { name, password, passwordConfirm } = answers
    if (password !== passwordConfirm) {
      console.log(chalk.red('Passwords do not match!'))
      process.exit(1)
    }
    const user = await kv.json.get(process.env.NEXTAUTH_CREDENTIALS_KEY, `$.${name}`)
    if (!user) {
      console.log(chalk.red(`User ${name} not found!`))
      process.exit(1)
    }
    const hash = await hashPassword(password)
    const res = await kv.json.set(process.env.NEXTAUTH_CREDENTIALS_KEY, `$.${name}.password`, `"${hash}"`)
    if (res === 'OK') {
      console.log(chalk.green(`User ${name} password updated!`))
    } else {
      console.log(chalk.red(`Error updating user ${name} password!`))
    }
  } else if (answers.deleteUser) {
    const { name } = answers
    const user = await kv.json.get(process.env.NEXTAUTH_CREDENTIALS_KEY, `$.${name}`)
    if (!user) {
      console.log(chalk.red(`User ${name} not found!`))
      process.exit(1)
    }
    const res = await kv.json.del(process.env.NEXTAUTH_CREDENTIALS_KEY, `$.${name}`)
    if (res === 1) {
      console.log(chalk.green(`User ${name} deleted!`))
    } else {
      console.log(chalk.red(`Error deleting user ${name}!`))
    }
  }
})()
