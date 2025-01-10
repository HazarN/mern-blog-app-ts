# MERN Blog Application

A fully functional blog application built using the MERN (MongoDB, Express, React, Node.js) stack. The application includes features like JWT authentication, CRUD operations for blog posts, and a modern, responsive user interface.

## Features

### Frontend
- **React** for building the user interface.
- **React Router** for client-side routing.
- **Material-UI (MUI)** for responsive and modern styling.
- **Context API and Reducers** for state management.
- **Axios** for making API requests.
- Built with **Vite** and **TypeScript** for faster development and type safety.

### Backend
- **Node.js** with **Express** for server-side logic.
- **MongoDB** for storing user and post data.
- **Mongoose** for database modeling and querying.
- **Morgan** for logging HTTP requests.
- **jsonwebtoken (JWT)** for authentication.
- **Bcrypt** for secure password hashing.
- Cookie-based JWT authentication for enhanced security.

### Architecture
- **MVC Pattern**: Implements a clean separation of concerns with routes, controllers, models, and services.

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### Backend Setup
1. Navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` folder with the following variables:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   COOKIE_SECRET=<your-cookie-secret>
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm run dev
   ```

### Running the Application
1. Ensure MongoDB is running locally or use a cloud-based service like MongoDB Atlas.
2. Start both the frontend and backend servers using the steps above.
3. Access the application at `http://localhost:5173` (or the port specified by Vite).

## Project Structure

### Backend (`/server`)
- `routes/`: Defines the API endpoints.
- `controllers/`: Handles the logic for each endpoint.
- `models/`: Defines MongoDB schemas and models.
- `utils/`: Helper functions and utilities.

### Frontend (`/client`)
- `src/components/`: Reusable React components.
- `src/pages/`: Pages for routing (e.g., Home, Login, Signup).
- `src/contexts/`: Context and reducer logic for state management.
- `public/`: Static files like images and icons.

## Scripts

### Backend
- `npm run dev`: Start the backend in development mode.
- `npm run build`: Build the backend for production.

### Frontend
- `npm run dev`: Start the frontend in development mode.
- `npm run build`: Build the frontend for production.
- `npm run preview`: Preview the production build locally.

## Technologies Used

### Frontend
- React
- React Router
- Material-UI (MUI)
- Context API
- Axios
- Vite
- TypeScript

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- Morgan
- JSON Web Tokens (JWT)
- Bcrypt
- TypeScript

## Authentication
The application uses **cookie-based JWT authentication**:
- Users login and receive a signed JWT stored as an HTTP-only cookie.
- Cookies are validated on protected routes to ensure security.
