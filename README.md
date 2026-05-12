ExploreLocal
=============

ExploreLocal is a MERN stack travel marketplace for discovering local experiences, managing trips, booking activities, and handling host/admin workflows.

Current features
----------------
- User authentication with register, login, profile lookup, and protected routes
- Public experience browsing and experience detail pages
- Host-side experience creation
- Trip management with create, update, delete, and experience assignment/removal
- Booking flow with my-bookings and host booking statistics
- Host application flow and host dashboard screens
- Admin dashboard with host-request moderation and stats

Project structure
-----------------
- `backend/` - Express API, MongoDB/Mongoose models, JWT auth, and route controllers
- `frontend/` - React + Vite app with routing, auth context, and shared UI components

Tech stack
----------
- Backend: Node.js, Express, Mongoose, JSON Web Token, bcryptjs, cors, dotenv
- Frontend: React 19, Vite, React Router, Axios, Tailwind CSS, lucide-react
- Database: MongoDB

Development setup
-----------------
1. Backend

```bash
cd backend
npm install
npm run dev
```

The backend starts from `backend/src/server.js` and defaults to port `5000`.

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the API at `http://localhost:5000/api` in `frontend/src/services/api.js`.

Available scripts
-----------------
Backend:
- `npm start` - run the API with Node
- `npm run dev` - run the API with nodemon

Frontend:
- `npm run dev` - start the Vite dev server
- `npm run build` - build for production
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build locally

Environment variables
---------------------
Create `backend/.env` with:

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - secret used to sign authentication tokens

Optional frontend configuration is currently hardcoded to `http://localhost:5000/api`; update `frontend/src/services/api.js` if you need a different backend URL.

Notes
-----
- Protected API routes require a Bearer token stored in local storage by the frontend.
- There is no database seed script in the current project state.

License
-------
ISC
