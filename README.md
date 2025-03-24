# task-manager-backend

To get started with above project, you need to have node installed on local machine. To check node version, run

```

node --version

```

To clone this repo, you must have Git installed on local machine.


## Installation

To get started with above code, run the following commands

```
npm i
node index

```

Here index.js is the application startup file.

This will start the local development server on port `3000`.

## Tech Stack

This project is primarily created using Nodejs.


## Routes 

This application has following routes to perform CRUD operation on tasks 

1. GET - tasks
2. POST - tasks
3. PUT - tasks/{taskId}
4. DELETE - tasks/{taskId}
5. GET - tasks/{tasksId}
6. Login = login
7. Signup - signup

## Configure Environment Variables

PORT=3000
DATABASE_URL="mongodb+srv://test:1234@cluster1.bupqh.mongodb.net/"
JWT_SECRET=1234


