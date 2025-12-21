# 🌍 ExploreLocal

> **Discover the Soul of Every City.**  
> A full-stack MERN application connecting travelers with unique, local experiences curated by passionate hosts.

![Project Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-blueviolet?style=flat-square)

---

## 📖 Table of Contents

- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [📂 Project Structure](#-project-structure)
- [🔌 API Documentation](#-api-documentation)
- [🤝 Contributing](#-contributing)

---

## ✨ Key Features

### 🔐 Authentication & Security
- **Secure Auth**: JWT-based authentication with HTTP-only cookies.
- **Robust Validation**: Real-time password strength indicators and matching checks.
- **Route Protection**: Strict access control for authenticated routes.

### 🌟 Explore & Discover
- **Interactive Exploration**: Browse experiences with a rich, responsive UI.
- **Advanced Filtering**: Filter by category, price range, state, and keywords.
- **Smart Sorting**: Sort by price, newest, or recommended.
- **Independent Scrolling**: Sidebar filters and results grid scroll independently for better UX.

### 📅 Booking & Trips
- **Seamless Booking**: Book experiences directly from the details page.
- **Trip Management**: View your upcoming trips and manage bookings.
- **Duplicate Prevention**: Smart checks to prevent double-booking the same experience.
- **Notifications**: Custom toast notifications for booking updates.

### 🏠 Host Dashboard
- **Manage Experiences**: Hosts can add, edit, and delete their listings.
- **Dashboard Stats**: View earnings and booking statistics (Coming Soon).

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM 7](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose)
- **Authentication**: JWT (JSON Web Tokens) & BcryptJS
- **Security**: CORS, Dotenv

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas)
- Git

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/ExploreLocal.git
    cd ExploreLocal
    ```

2.  **Install Backend Dependencies**
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies**
    ```bash
    cd ../frontend
    npm install
    ```

### Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

### Running the App

1.  **Start the Backend Server**
    ```bash
    # In the backend directory
    npm run dev
    ```
    *Server will start on http://localhost:5000*

2.  **Start the Frontend Development Server**
    ```bash
    # In the frontend directory
    npm run dev
    ```
    *Client will start on http://localhost:5173*

---

## 📂 Project Structure

```
ExploreLocal/
├── backend/                # Express.js Server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth & Error handling
│   │   └── server.js       # Entry point
│   └── package.json
│
└── frontend/               # React Application
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Page views (Home, Explore, Login, etc.)
    │   ├── context/        # Auth context provider
    │   ├── services/       # API service configuration
    │   └── App.jsx         # Main application component
    └── package.json
```

---

## 🔌 API Documentation

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Experiences
- `GET /api/experiences` - Get all experiences (with filters)
- `GET /api/experiences/:id` - Get single experience details
- `POST /api/experiences` - Create a new experience (Host only)
- `PUT /api/experiences/:id` - Update experience (Host only)
- `DELETE /api/experiences/:id` - Delete experience (Host only)

### Bookings
- `POST /api/bookings` - Create a booking
- `GET /api/bookings/my-bookings` - Get user's bookings

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

Made with ❤️ by the ExploreLocal Team
