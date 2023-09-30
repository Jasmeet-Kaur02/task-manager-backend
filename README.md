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

This will start the local development server on port `3000`. Open `localhost:3000` to preview the dev server.
You will see following result in the browser.

```

Task Manager Application

```

## Tech Stack

This project is primarily created using Nodejs.

## Routes

This application has following routes to perform CRUD operation on tasks

1. GET - tasks
2. POST - tasks
3. PUT - tasks/{taskId}
4. DELETE - tasks/{taskId}
5. GET - tasks/{tasksId}

## Additional Information

This application do not have any database. Application use in-memory data store for tasks storage purpose.
All tasks is stored in the tasks.json file.
