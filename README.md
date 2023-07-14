# Tina Self Hosted Demo 🦙

Please check out [this](https://github.com/tinacms/tinacms/discussions/3589) GitHub discussion for more information on self-hosting TinaCMS.

# Vercel Quick Start

## Deploy this repository to Vercel

Use the following link to directly deploy this demo to Vercel. You will need a Vercel account and a GitHub personal access token (PAT) with access to the repository (once it has been created).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftinacms%2Ftina-self-hosted-demo&env=GITHUB_PERSONAL_ACCESS_TOKEN,NEXTAUTH_SECRET,NEXTAUTH_CREDENTIALS_KEY&envDescription=Create%20a%20new%20GitHub%20PAT%20at%20https%3A%2F%2Fgithub.com%2Fsettings%2Fpersonal-access-tokens%2Fnew%20with%20content-access.%20See%20the%20self-hosted%20demo%20README%20for%20more%20information&envLink=https%3A%2F%2Fgithub.com%2Ftinacms%2Ftina-self-hosted-demo%2Fblob%2Fmain%2FREADME.md&project-name=tina-self-hosted-demo&repository-name=tina-self-hosted-demo&stores=%5B%7B%22type%22%3A%22kv%22%7D%5D&)

<!-- [TODO insert youtube video here] -->

### Environment Variable Setup
After the repository is created, you will need to do the following steps to get the environment variables setup:

1. Create a new [GitHub personal access token (PAT)](https://github.com/settings/personal-access-tokens/new) with content access to the new repository and copy the token as the value for the `GITHUB_PERSONAL_ACCESS_TOKEN` environment variable.
2. Fill out the `NEXTAUTH_SECRET` environment variable with a random string.
3. Fill out the `NEXTAUTH_CREDENTIALS_KEY` environment variable with the key you want to use for storing user credentials in the KV database (i.e. `tinacms_users`).

# Local Development

## Requirements

- Git, [Node.js Active LTS](https://nodejs.org/en/about/releases/), Yarn installed for local development.

Set up the .env file:

```
cp .env.example .env
```

Fill in the .env file with your own values.

> Hint: NEXTAUTH_SECRET can be generated with `openssl rand -base64 32`

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

> This will start TinaCMS in "Local Mode", meaning all changes will be made to the local file system and no auth is required.

```
yarn dev
```

Run the project locally with Next Auth and Vercel KV:

> This will start TinaCMS in "Production Mode", meaning all changes will be made to the Vercel KV, and github. Database and auth is required.

First add the following environment variables to your `.env` file:

```env
# The key you want to use for storing user credentials in the KV databas
NEXTAUTH_CREDENTIALS_KEY=tinacms_users


# Get these from vercel if you want to run yarn dev:prod
KV_URL=***
KV_REST_API_URL=***
KV_REST_API_TOKEN=***
KV_REST_API_READ_ONLY_TOKEN=***
```

Then run the following command:

```
yarn dev:prod
```

## Environment Variables

| Variable | Description                                                                                                                                |
| -------- |--------------------------------------------------------------------------------------------------------------------------------------------|
| `GITHUB_OWNER` | The owner of the repository you want to use for your content. Required in local development. Defaults to VERCEL_GIT_REPO_OWNER in Vercel.  |
| `GITHUB_REPO` | The name of the repository you want to use for your content. Required in local development. Defaults to VERCEL_GIT_REPO_SLUG in Vercel.    |
| `GITHUB_BRANCH` | The branch of the repository you want to use for your content. Defaults to `VERCEL_GIT_COMMIT_REF` or `main` if not specified.              |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | A [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with `repo` access. |
| `NEXTAUTH_SECRET` | A secret used by NextAuth.js to encrypt the NextAuth.js JWT.                                                                               |
| `KV_REST_API_URL` | The URL of the Vercel KV database.                                                                                                         |
| `KV_REST_API_TOKEN` | The token for authenticating to the Vercel KV database.                                                                                    |
| `NEXT_PUBLIC_TINA_CLIENT_ID` | The client id for your Tina Cloud application. Only required for Tina Cloud authorization.                                                 |

## Deploying to Vercel

This demo is configured to use NextAuth for authentication. A Credentials provider using [Vercel KV](https://vercel.com/docs/storage/vercel-kv) is provided by default, but other
NextAuth providers can be used, as well other auth solutions.

### Setting up Vercel KV

1. Create a Vercel account and visit the Storage [tab](https://vercel.com/dashboard/stores) in the dashboard.
2. Click Create and select the KV (Durable Redis) option.
3. Give the KV database a name, select the nearest region and click Create.
4. In Quickstart, click `.env.local` and Copy Snippet to get the connection details (save these for later).

![Animation showing how to setup Vercel KV](public/setup-kv-store.gif?raw=true "Setting up Vercel KV")

### Creating a new authorized user

1. Run `yarn setup:users` to start creating a new user. The user will be stored in the KV database. The first time this command is run, it will prompt for the KV connection details from the previous step (`KV_REST_API_URL` and `KV_REST_API_TOKEN`). It will also prompt for the Credentials key in Redis where user information is stored. The default value is `tinacms_users`.
2. Once the connection information is complete, the script will query for existing users and print "No users found!" if this is the first time running the script. Next you will be prompted to enter the username and password for the user.
3. If successful, the script will print out a message confirming user creation.

![Animation showing how to create a new user](public/create-user.gif?raw=true "Creating a new user")

### Create a GitHub personal access token

1. Create a [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with `repo` access. (Note the expiration date of the token.)
2. Add the token to the `.env` file (`GITHUB_PERSONAL_ACCESS_TOKEN`)

![Animation showing how to create a personal access token](public/create-token.gif?raw=true "Creating a personal access token")

### Deploying the project in Vercel

1. Create a new project in Vercel and select this Git repository.
2. In the Environment Variables section, you can copy and paste your entire `.env` file into the first input.
3. Click Deploy and wait for the project to build.
4. Visit the project URL and navigate to `/admin/index.html` to log in. Use the username and password you created in the previous step.

![Animation showing deployment to Vercel](public/deploy-vercel.gif?raw=true "Deploying to Vercel")

# Using Tina Cloud for Authorization

Tina Cloud can be used to manage users and authorization for your TinaCMS application. To use Tina Cloud for auth, you will need to create a new project in the Tina Cloud [dashboard](https://app.tina.io/projects). You will be required to specify a repository, but since the data layer is managed by Vercel KV, you can use any repository. 

## Configuration

Once you have created an application, you will need to add the following environment variable to your project:

```env
NEXT_PUBLIC_TINA_CLIENT_ID=***
```
The value for `NEXT_PUBLIC_TINA_CLIENT_ID` can be found in the Tina Cloud dashboard on the "Overview" page for your project.

In your tina configuration, first remove or comment out the following properties:

- `admin.auth.customAuth`
- `admin.auth.authenticate`
- `admin.auth.getToken`
- `admin.auth.getUser`
- `admin.auth.logout`

Then add the following property:
 
    ```js
    {
    ...
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    }
    ```
## Updating the GraphQL endpoint

The GraphQL endpoint is configured to use NextAuth by default. To use Tina Cloud, you will need to update the endpoint in `pages/api/gql.ts` to use Tina Cloud's auth. 

The updated file should look like this:

```js
import { NextApiHandler } from "next";
import { isUserAuthorized } from "@tinacms/auth";
import { databaseRequest } from "../../lib/databaseConnection";

const nextApiHandler: NextApiHandler = async (req, res) => {
  // Example if using TinaCloud for auth
  const tinaCloudUser = await isUserAuthorized({
    clientID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    token: req.headers.authorization,
  });

  const isAuthorized =
    process.env.TINA_PUBLIC_IS_LOCAL === "true" ||
    tinaCloudUser?.verified ||
    false;

  if (isAuthorized) {
    const { query, variables } = req.body;
    const result = await databaseRequest({ query, variables });
    return res.json(result);
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default nextApiHandler;
```

# Using MongoDB for the datalayer

It's possible to use MongoDB as the data layer for your TinaCMS application instead of Vercel KV. To do this, you will need to add the following environment variables to your project:

```env
`MONGODB_URI` is the connection string to your MongoDB database. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) to get a free database.
```
Next you will need to update the `tina/database.ts` to use the MongoDB level implementation instead of the Redis level implementation.

```ts
import { MongodbLevel } from "mongodb-level"
...
const mongodbLevelStore = new MongodbLevel<string, Record<string, any>>({
  collectionName: "tinacms",
  dbName: "tinacms",
  mongoUri: process.env.MONGODB_URI as string,
})
...
export default createDatabase({
  level: isLocal ? localLevelStore : mongodbLevelStore,
  onPut: isLocal ? localOnPut : githubOnPut,
  onDelete: isLocal ? localOnDelete : githubOnDelete,
})
```
