# Recipe Management Application

## Description
This is a Recipe Management Application built with React for the frontend and Node.js/Express with SQLite for the backend. It allows users to browse, view, and add recipes to a database.

## Features
- Browse a list of recipes
- View detailed recipe information
- Add new recipes
- Preloaded with 10 sample recipes

## Setup

### Backend (Server)
The backend is built with Node.js and Express and uses SQLite as the database.

1. **Install backend dependencies:**
   ```bash
   npm install
   ```
2. **Run the Server:**
    ```bash
    npm start
    ```
3. **Seed the database with sample recipes (optional):**
    ```bash
    npm run seed
    ```
This will insert 10 sample recipes into the SQLite database

### Frontend (Client)
The frontend is a React application that communicates with the backend API

1. **Install the frontend dependencies:**
Go to the client folder and run:
    ```bash
    npm install
    ```
2. **Run the frontend:**
    ```bash
    npm start
    ```
This will start the React development server, typically running on http://localhost:3000.

### Running Both Servers Simultaneously
To make it easier to run both the backend and frontend simultaneously, we can use a tool like concurrently.

1. **Install concurrently (in the root folder):**
    ```bash
    npm install concurrently --save-dev
    ```

2. **Update package.json scripts (in the root folder):**
In the scripts section, add a dev script to run both servers:
    ```json
    "scripts": {
         "start": "node index.js",      // For backend
         "seed": "node seed.js",        // For seeding the database
        "dev": "concurrently \"npm run start --prefix server\" \"npm run start --prefix client\""
    }
    ```
The dev script will start both the backend and frontend servers simultaneously.

3. **Run both servers:**
    ```bash
    npm run dev
    ```
This will start both the backend and frontend servers, making it easier to work on both parts of the application simultaneously.

### Final Steps
1. **Test everything:**
Ensure that both servers are running by visiting:
    - Frontend: http://localhost:3000
	- Backend: http://localhost:5001 