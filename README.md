# Satellite Tracker

<img width="1726" alt="satMap" src="https://github.com/user-attachments/assets/64b74a17-28ee-457d-9c77-a92603e7a20f" />

Satellite Tracker is a tool for tracking satellites via NORAD id.

## Environment Variables
To run this project, you will need to add the following environment variables to your server/.env file:

`N2YO_KEY`  N2YO API key

`DB_CONNECTION` MongoDB Atlas connection string

You will need a MongoDB Atlas account and an N2YO account.

## Database Setup
MongoDB Atlas is used for the database. This project uses "satellite_tracker" for the database name, and it has the collection "satellites."

## Run Locally
Go to the server directory

```bash
cd server
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm run dev
```

Go to the client directory

```bash
cd client
```

Install dependencies

```bash
npm install
```

Start the client

```bash
npm run dev
```

## Build for Deployment
Go to the server directory

```bash
cd server
```

Run build script

```bash
npm run build
```

Go to the client directory

```bash
cd client
```

Run build script

```bash
npm run build
```

## Run for Production
Go to the server directory

```bash
cd server
```

Start the server

```bash
npm run start
```

Go to the client directory

```bash
cd client
```

Run the client

```bash
npm run preview
```

Note: Running the client in "preview" mode is only to check if the production build looks ok. The client will need to be deployed with an outside service - https://vite.dev/guide/static-deploy.html.
