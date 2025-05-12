# Recipe Management Application

## Description
The Recipe Management Application is a full-stack web app that allows users to browse, view, and manage recipes (add, edit, delete). It's designed for users who want to manage and explore a growing personal recipe collection.

## Features

- Full CRUD functionality: Add, view, edit, and delete recipes
- Responsive design for mobile, tablet, and desktop
- Search recipes by title and ingredient
- Persistent data storage with SQLite
- RESTful API for backend communication
- Global state management with Context API
- Sample data preloaded into the database
- Error boundaries for improved user experience
- Component-level testing with Jest and React Testing Library

## Stretch Goals

- Image upload support using Multer and Unsplash in progress

## Tech Stack

- **Frontend:** React, JavaScript, HTML5, CSS3
- **Backend:** Node.js, Express
- **Database:** SQLite
- **Styling:** CSS Modules
- **Image Upload:** Multer, Unsplash
- **Testing:** Jest, React Testing Library
- **Development Tools:** `concurrently`, `nodemon`

## Folder Structure
recipe-management-app/
├── client/                         # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/             # UI components
│   │   │   ├── AddRecipe.js
│   │   │   ├── ErrorBoundary.js
│   │   │   ├── Navbar.js
│   │   │   ├── NotFound.js
│   │   │   ├── RecipeCard.js
│   │   │   ├── RecipeDetail.js
│   │   │   ├── RecipeEdit.js
│   │   │   └── RecipeList.js
│   │   ├── contexts/              # React Context API
│   │   │   └── RecipeContext.js
│   │   ├── styles/                # CSS files
│   │   │   ├── App.css
│   │   │   ├── Navbar.css
│   │   │   ├── RecipeCard.css
│   │   │   ├── RecipeEdit.css
│   │   │   └── RecipeList.css
│   │   ├── tests/                 # Component tests
│   │   │   ├── AddRecipe.test.js
│   │   │   └── EditRecipe.test.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server/                         # Node.js backend
│   ├── db/                         # SQLite database setup
│   │   ├── database.js
│   │   ├── seed.js
│   │   └── test-db.js
│   ├── helpers/                    
│   │   └── fileUpload.js           # Helper for file uploading
│   ├── models/                     # Data models
│   │   └── RecipeModel.js
│   ├── public/  
│   │   └── uploads/                # Holds uploaded images
│   ├── routes/                     # API routes
│   │   └── recipes.js
│   ├── index.js                    # Entry point for Express app
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json                    # Root (for concurrently, etc.)

## Setup Instructions

### Backend (Server)
The backend is built with Node.js and Express and uses SQLite as the database.

1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
4. (Optional) Seed the database with sample recipes:
   ```bash
   npm run seed
   ```


### Frontend (Client)
1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   The frontend will typically run at [http://localhost:3000](http://localhost:3000)

### Running Frontend & Backend Simultaneously

To streamline development, you can run both servers concurrently:

1. From the **project root**, install `concurrently`:
   ```bash
   npm install concurrently --save-dev
   ```

2. Update your root `package.json` with the following scripts:
   ```json
   "scripts": {
     "start": "node server/index.js",
     "seed": "node server/seed.js",
     "dev": "concurrently \"npm run start --prefix server\" \"npm run start --prefix client\""
   }
   ```

3. Start both servers together:
   ```bash
   npm run dev
   ```

## Final Steps
- Visit the frontend at: [http://localhost:3000](http://localhost:3000)
- Ensure the backend API is working at: [http://localhost:5001](http://localhost:5001)

## Contributions
This project is for learning purposes. Contributions, issues, and feedback are welcome and appreciated!

## License
This project currently does not have an open source license. Feel free to fork and explore for personal use.
