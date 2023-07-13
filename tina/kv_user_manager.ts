import "isomorphic-fetch";
import bcrypt from "bcryptjs";
import chalk from "chalk";
import dotenv from "dotenv";
import fs from "fs";
import inquirer from "inquirer";
import { Redis } from "@upstash/redis";

const CHOICES = {
  ADD: "Add a user",
  UPDATE: "Update a user's password",
  DELETE: "Delete a user",
  EXIT: "Exit",
};

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

const promptUserForToken = async () => {
  console.log("Did not find KV store url and token in .env file.");
  // Prompt user for KV store url and token
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "url",
      message: `Enter your Vercel KV Database URL (see https://vercel.com/dashboard/stores):`,
    },
    {
      type: "input",
      name: "token",
      message: `Enter your Vercel KV Database token:`,
    },
    {
      type: "input",
      name: "credentials_key",
      message: `Enter your Credentials key (default: 'tinacms_users'):`,
      default: "tinacms_users",
    },
  ]);

  if (!process.env.KV_REST_API_URL) {
    fs.writeFileSync(".env", `KV_REST_API_URL=${answers.url}\n`, { flag: "a" });
    process.env.KV_REST_API_URL = answers.url;
  }
  if (!process.env.KV_REST_API_TOKEN) {
    fs.writeFileSync(".env", `KV_REST_API_TOKEN=${answers.token}\n`, {
      flag: "a",
    });
    process.env.KV_REST_API_TOKEN = answers.token;
  }
  if (!process.env.NEXTAUTH_CREDENTIALS_KEY) {
    fs.writeFileSync(
      ".env",
      `NEXTAUTH_CREDENTIALS_KEY=${answers.credentials_key}\n`,
      { flag: "a" }
    );
    process.env.NEXTAUTH_CREDENTIALS_KEY = answers.credentials_key;
  }
};

const addUser = async (kv, name, password, passwordConfirm, users) => {
  if (password !== passwordConfirm) {
    console.log(chalk.red("Passwords do not match!"));
    process.exit(1);
  }
  const user = {
    name,
    username: name,
    password: await hashPassword(password),
  };
  if (!users) {
    await kv.json.set(process.env.NEXTAUTH_CREDENTIALS_KEY, "$", {});
  }
  const res = await kv.json.set(
    process.env.NEXTAUTH_CREDENTIALS_KEY,
    `$.["${name}"]`,
    user
  );
  if (res === "OK") {
    console.log(chalk.green(`User ${name} added!`));
  } else {
    console.log(chalk.red(`Error adding user ${name}!`));
  }
};

export const updatePassword = async (kv, name, password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    console.log(chalk.red("Passwords do not match!"));
    process.exit(1);
  }
  const user = await kv.json.get(
    process.env.NEXTAUTH_CREDENTIALS_KEY,
    `$.["${name}"]`
  );
  if (!user) {
    console.log(chalk.red(`User ${name} not found!`));
    process.exit(1);
  }
  const hash = await hashPassword(password);
  const res = await kv.json.set(
    process.env.NEXTAUTH_CREDENTIALS_KEY,
    `$.["${name}"].password`,
    `"${hash}"`
  );
  if (res === "OK") {
    console.log(chalk.green(`User ${name} password updated!`));
  } else {
    console.log(chalk.red(`Error updating user ${name} password!`));
  }
};

export const deleteUser = async (kv, name) => {
  const user = await kv.json.get(
    process.env.NEXTAUTH_CREDENTIALS_KEY,
    `$.["${name}"]`
  );
  if (!user) {
    console.log(chalk.red(`User ${name} not found!`));
    process.exit(1);
  }
  const res = await kv.json.del(
    process.env.NEXTAUTH_CREDENTIALS_KEY,
    `$.["${name}"]`
  );
  if (res === 1) {
    console.log(chalk.green(`User ${name} deleted!`));
  } else {
    console.log(chalk.red(`Error deleting user ${name}!`));
  }
};

(async () => {
  await fs.promises.stat(".env").catch((_) => {
    fs.copyFileSync(".env.example", ".env");
  });
  dotenv.config();

  console.log(chalk.green("Welcome to TinaCMS!"));

  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    await promptUserForToken();
  }

  let done = false;
  const kv = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });

  // Loop until user exits
  while (!done) {
    let users = null;
    try {
      users = await kv.json.get(process.env.NEXTAUTH_CREDENTIALS_KEY);
    } catch (e) {} // eslint-disable-line

    if (!users || Object.keys(users).length === 0) {
      console.log(chalk.red("No users found! Please add a user."));
    } else {
      console.log(chalk.green("Users:"));
      console.table(
        Object.keys(users).map((username) => {
          return {
            name: username,
          };
        })
      );
    }

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: `What would you like to do?`,
        choices: [CHOICES.ADD, CHOICES.UPDATE, CHOICES.DELETE, CHOICES.EXIT],
      },
      {
        type: "input",
        name: "name",
        message: `Enter a username:`,
        when: (answers) =>
          answers.choice === CHOICES.ADD ||
          answers.choice === CHOICES.UPDATE ||
          answers.choice === CHOICES.DELETE,
      },
      {
        type: "password",
        name: "password",
        message: `Enter a user password:`,
        when: (answers) =>
          answers.choice === CHOICES.ADD || answers.choice === CHOICES.UPDATE,
      },
      {
        type: "password",
        name: "passwordConfirm",
        message: `Confirm the user password:`,
        when: (answers) =>
          answers.choice === CHOICES.ADD || answers.choice === CHOICES.UPDATE,
      },
    ]);

    if (answers.choice === CHOICES.ADD) {
      const { name, password, passwordConfirm } = answers;
      try {
        await addUser(kv, name, password, passwordConfirm, users);
      } catch (e) {
        console.log(
          chalk.red(
            `An unexpected error occurred while adding a user. ${e.message}}`
          )
        );
      }
    } else if (answers.choice === CHOICES.UPDATE) {
      const { name, password, passwordConfirm } = answers;
      try {
        await updatePassword(kv, name, password, passwordConfirm);
      } catch (e) {
        console.log(
          chalk.red(
            `An unexpected error occurred while adding a updating the password for ${name}. ${e.message}}`
          )
        );
      }
    } else if (answers.choice === CHOICES.DELETE) {
      const { name } = answers;
      try {
        await deleteUser(kv, name);
      } catch (e) {
        console.log(
          chalk.red(
            `An unexpected error occurred while deleting the user ${name}. ${e.message}}`
          )
        );
      }
    } else if (answers.choice === CHOICES.EXIT) {
      done = true;
    }
  }
})();
