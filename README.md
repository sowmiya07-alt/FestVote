# Online Voting for Cultural Fest Awards

## Project Overview
This is a modern, responsive, and fully functional Full Stack miniature project tailored for a college cultural fest. It allows students to log in, view cultural fest award categories, view nominees, and vote for their favorite nominee securely. Administrative users can manage categories, nominees, and view live results of the voting. 

## Features
- **Student Portal**: Secure login, viewing categories, browsing nominees, voting (One vote per category), viewing voting history.
- **Admin Portal**: Admin login, dashboard with metrics, adding/editing/deleting award categories and nominees, real-time results viewing.
- **Security**: JWT-based authentication, bcrypt password hashing, unique constraint voting to prevent duplicates.
- **Modern UI**: Smooth components, vibrant design matching a cultural fest vibe, and fully responsive across devices.

## Technologies Used
**Frontend:**
- React.js
- Vite
- React Router
- Plain CSS (Custom, modern design)
- Axios
- Lucide React (Icons)
- React Hot Toast (Notifications)

**Backend:**
- Node.js
- Express.js
- REST API
- JSON Web Tokens (JWT)
- bcrypt

**Database:**
- MySQL

## Database Setup
1. Install MySQL and make sure it is running.
2. Log into your MySQL server as `root` (or another user with privileges to create databases).
3. Run the SQL script provided in `database.sql` to initialize the database `cultural_fest_voting`, tables, and sample data.
   Alternatively, you can run: `mysql -u root -p < database.sql`

## Environment Variables
Create a `.env` file in the `/backend` directory based on `.env.example`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=cultural_fest_voting
JWT_SECRET=super_secret_key_for_cultural_fest
```

## How to Run Frontend
1. Navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. The frontend will typically be running on `http://localhost:5173`.

## How to Run Backend
1. Navigate to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Create the `.env` file as shown above.
4. Run development server: `npm run dev`
5. The backend will typically run on `http://localhost:5000`.

## Test Credentials
**Admin User**
- Email: admin@college.com
- Password: Admin@123

**Student Users**
- Email: student1@college.com
- Password: password123
- Email: student2@college.com
- Password: password123
- Email: student3@college.com
- Password: password123
