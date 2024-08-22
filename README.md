# Project Name

This project is a web application built with Node.js, Express, and MongoDB, providing a robust backend infrastructure for authentication and API handling.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have Node.js and npm installed on your machine. You can download them from [Node.js](https://nodejs.org/).

### Installation

#### Clone the Repository

```bash
git clone https://github.com/ES-3508/AlphaCoders_GreenExpo_backend.git


###project structure
green-expo-backend/
│
├── src/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── utils/
│   └── index.js
│
├── .env
├── .gitignore
├── package.json
└── README.md

## Installation

### Install Dependencies

Install all the necessary packages by running:

```bash
npm install

Install Nodemon (for Development)
Nodemon is used to automatically restart the server during development when file changes are detected. Install it as a development dependency:

```npm install nodemon --save-dev

###Configuration
Environment Variables
Create a .env file in the root of your project and add the following environment variables:

PORT=5000
MONGO_URL=your_mongo_db_connection_string
JWT_SECRET_KEY=your_jwt_secret_key


###Start the Server
You can start the server using either of the following commands:
Using Node:
node src/index.js

###Using Nodemon:
Start the server with nodemon to automatically reload on file changes:
npm start
Note: The npm start command is configured in package.json to run nodemon.



### Dependencies

The project uses the following dependencies:

- **express:** Fast, unopinionated, minimalist web framework for Node.js
- **mongoose:** Elegant MongoDB object modeling for Node.js
- **bcryptjs:** Library to hash passwords
- **dotenv:** Loads environment variables from a `.env` file
- **jsonwebtoken:** For generating and verifying JSON Web Tokens
- **express-async-handler:** Simplifies error handling in async functions
- **cookie-parser:** Parse HTTP request cookies
- **cors:** Middleware to enable Cross-Origin Resource Sharing

### Dev Dependencies

- **nodemon:** Utility that automatically restarts the server when file changes are detected
