# Tina Self Hosted Demo 🦙

Please check out [this](https://github.com/tinacms/tinacms/discussions/3589) GitHub discussion for more information on self-hosting TinaCMS.

# Vercel Quick Start

Use the following link to directly deploy this demo to Vercel. You will need a Vercel account and a Vercel KV Database and a GitHub personal access token (PAT) with access to the repository.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftinacms%2Ftina-self-hosted-demo&env=GITHUB_PERSONAL_ACCESS_TOKEN,NEXTAUTH_SECRET,KV_REST_API_URL,KV_REST_API_TOKEN,NEXTAUTH_CREDENTIALS_KEY&envDescription=See%20the%20self-hosted%20demo%20README%20for%20more%20information&envLink=https%3A%2F%2Fgithub.com%2Ftinacms%2Ftina-self-hosted-demo%2Fblob%2Fmain%2FREADME.md&project-name=tina-self-hosted-demo&repository-name=tina-self-hosted-demo)

# Local Development

## Requirements

- Git, [Node.js Active LTS](https://nodejs.org/en/about/releases/), Yarn installed for local development.

Set up the .env file:

```
cp .env.example .env
```

Fill in the .env file with your own values.

```env
GITHUB_OWNER=***
GITHUB_REPO=***
GITHUB_BRANCH=***
GITHUB_PERSONAL_ACCESS_TOKEN=***

NEXTAUTH_SECRET=***
```

Install the project's dependencies:

```
yarn install
```

Run the project locally:

```
yarn dev
```

# Environment Variables

| Variable | Description                                                                                                                                |
| -------- |--------------------------------------------------------------------------------------------------------------------------------------------|
| `GITHUB_OWNER` | The owner of the repository you want to use for your content.                                                                              |
| `GITHUB_REPO` | The name of the repository you want to use for your content.                                                                               |
| `GITHUB_BRANCH` | The branch of the repository you want to use for your content.                                                                             |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | A [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with `repo` access. |
| `NEXTAUTH_SECRET` | A secret used by NextAuth.js to encrypt the NextAuth.js JWT.                                                                               |
| `KV_REST_API_URL` | The URL of the Vercel KV database.                                                                                                         |
| `KV_REST_API_TOKEN` | The token for authenticating to the Vercel KV database.                                                                                    |

# Deploying to Vercel

This demo is configured to use NextAuth for authentication. A Credentials provider using [Vercel KV](https://vercel.com/docs/storage/vercel-kv) is provided by default, but other
NextAuth providers can be used as well other auth solutions.

### Setting up Vercel KV

1. Create a Vercel account and visit the Storage [tab](https://vercel.com/dashboard/stores) in the dashboard.
2. Click Create and select the KV (Durable Redis) option.
3. Give the KV database a name, select the nearest region and click Create.
4. In Quickstart, click `.env.local` and Copy Snippet to get the connection details (save these for later).

### Creating a new authorized user

1. Run `yarn setup:users` to start creating a new user. The user will be stored in the KV database. The first time this command is run, it will prompt for the KV connection details from the previous step (`KV_REST_API_URL` and `KV_REST_API_TOKEN`). It will also prompt for the Credentials key in Redis where user information is stored. The default value is `tinacms_users`.
2. Once the connection information is complete, the script will query for existing users and print "No users found!" if this is the first time running the script. Next you will be prompted to enter the username, email and password for the user.
3. If successful, the script will print out a message confirming user creation.

### Deploying the project in Vercel

1. Create a new project in Vercel and select this Git repository.
2. In the Environment Variables section, you can copy and paste your entire `.env` file into the first input.
3. Click Deploy and wait for the project to build.
4. Visit the project URL and navigate to `/admin/index.html` to log in. Use the username and password you created in the previous step.

```env

`MONGODB_URI` is the connection string to your MongoDB database. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) to get a free database.
`TINA_PUBLIC_IS_LOCAL` is a flag that tells Tina to use the local filesystem as the backend.
`NEXT_PUBLIC_TINA_CLIENT_ID` (_optional_ for using Tina Cloud for auth) is the client id for your Tina Cloud application. You can create a Tina Cloud application [here](https://app.tina.io/projects/choose).

# _optionally_ Use Tina Cloud for user authentication
NEXT_PUBLIC_TINA_CLIENT_ID=***
