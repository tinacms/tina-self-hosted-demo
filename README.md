# Tina Self Hosted Demo 🦙

Please checkout [this Github discussion](#) for more information about this demo.

## Requirements

- Git, [Node.js Active LTS](https://nodejs.org/en/about/releases/), Yarn installed for local development.

## Local Development

Setup the .env file:

```
cp .env.example .env
```

Fill in the .env file with your own values.

```env
MONGODB_URI=***
GITHUB_OWNER=***
GITHUB_REPO=***
GITHUB_BRANCH=***
GITHUB_PERSONAL_ACCESS_TOKEN=***
TINA_PUBLIC_IS_LOCAL=true

# _optionally_ Use Tina Cloud for user authentication
NEXT_PUBLIC_TINA_CLIENT_ID=***

```

`MONGODB_URI` is the connection string to your MongoDB database. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) to get a free database.

`GITHUB_OWNER` is the owner of the repository you want to use for your content.

`GITHUB_REPO` is the name of the repository you want to use for your content.

`GIT_BRANCH` is the branch of the repository you want to use for your content.

`GITHUB_PERSONAL_ACCESS_TOKEN` is a [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with `repo` access.

`TINA_PUBLIC_IS_LOCAL` is a flag that tells Tina to use the local filesystem as the backend.

`NEXT_PUBLIC_TINA_CLIENT_ID` (_optionally_ use Tina Cloud for auth) is the client id for your Tina Cloud application. You can create a Tina Cloud application [here](https://app.tina.io/projects/choose).

Install the project's dependencies:

```
yarn install
```

Run the project locally:

```
yarn dev
```
