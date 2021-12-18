# README

### About

This repository is my submit for exercises on [Full Stack Open 2021](https://fullstackopen.com/). All my submits for the course can be found [here](https://github.com/kosvi/HY_FullStack). (this repository is for the part4/osa4)

## Dev environment with Docker

To run this app in dev-mode using Docker, you need to create file `client/.env` with following content:

```
HOST=front
```
The host given in the .env-file must match what is set in the `docker-compose.dev.yml` or you will receive **"Invalid Host header"** when trying to access the React app. 

Run command `docker-compose -f docker-compose.dev.yml up` and open `localhost:5000` in your browser. Both backend and frontend will reload when you save changes to sources. 

## Backend

To run this app, you have to create file `.env` to project root with following content: 

```
MONGODB_URI=<mongo-url>
MONGODB_URI_TEST=<mongo-url-for-tests>
PORT=<port-number>
SECRET=<secret-for-tokens>
```
App can then be run in development mode with command: `npm run dev`

You can also find tools under `tools` directory. Here is short description of all the available tools:

**addBlog.js**

First run `ln -s ../.env` to make `.env` available for this script. After that you can use this script to add blogs to database with command `node addBlog.js`
