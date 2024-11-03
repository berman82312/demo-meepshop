# Demo for MeepShop test

## Prerequisites

Make sure [Docker](https://www.docker.com/) is installed and you are able to run the `docker compose` command. 

## Step 1. setup .env

Please copy a `.env` from `.env.example`. Change the env parameters if needed.

```bash
cp .env.example .env
```

## Step 2. build docker containers

Run the following command in terminal to start the services.

```bash
docker compose up -d 
```

## Step 3. migrate DB (only the first time)

If this is the first time your start this project, please remember to migrate the DB first. Otherwise, the backend services (API) might not work as expected.

Make sure your containers are up and running. `docker compose ps`

```bash
make migrate
```

## Step 4. Open the app in browser

Open a browser and visit [http://localhost:3000](http://localhost:3000), you should see the web app page. :D

## Packages used in this project

|Package|Description|
|---|---|
|[Remix](https://remix.run/)|A react framework to build a prototype quickly.|
|[TailwindCSS](https://tailwindcss.com/)|A CSS framework to help us focus on HTML and building components.|
|[Material UI](https://mui.com/material-ui/)|A UI framework with many pre-defined components which help us create an elegant looking prototype.|
|[Sequelize](https://sequelize.org/)|An ORM system written in TypeScript. Using it to communicate with our DB, MySQL.|
|[Nuka Carousel](https://commerce.nearform.com/open-source/nuka-carousel)|A react carousel library.|
|[react-simple-wysiwyg](https://github.com/megahertz/react-simple-wysiwyg)|A simple and lightweight react WYSIWYG editor.|
|[umzug](https://github.com/sequelize/umzug)|A library to help with DB migrations.|
