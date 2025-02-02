# Predicate Take-Home Test

## Instructions

This site is deployed to https://predicate.vercel.app/ but feel free to follow these steps to set up and run the Node.js application on your local machine:

#### 1️⃣ Clone the Repository

```sh
git clone https://github.com/mchrupcala/predicate.git
cd predicate
```

#### 2️⃣ Install Dependencies & Start the Server

```sh
npm install
npm run start
```

#### 3️⃣ API Endpoints

The application runs on **http://localhost:3000**. Here are the key API endpoints:

| Method | Endpoint        | Description                                               |
| ------ | --------------- | --------------------------------------------------------- |
| `GET`  | `/`             | Defaults to get task faff78ce-faaa-459a-a5ab-e23202839d9a |
| `GET`  | `/task/:taskID` | Get a specific task by task-id                            |

## ✨ Features

- Users can fetch tasks and view relevant response data (task status, to/from addresses, policy, timestamps, etc.).
- User can fetch either a default task on the home screen, or check a specific task via /task/:taskID.
- Users can scroll and view Operator responses per each task.;
