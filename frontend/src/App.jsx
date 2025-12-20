import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ExperienceDetail from './pages/ExperienceDetail';

import Explore from './pages/Explore';
import Login from './pages/Login';
import Register from './pages/Register';

import HostApply from './pages/HostApply';
import HostDashboard from './pages/HostDashboard';
import AddExperience from './pages/AddExperience';
import BookingPage from './pages/BookingPage';
import UserProfile from './pages/UserProfile';

import AdminDashboard from './pages/AdminDashboard';

import MyTrips from './pages/MyTrips';
import TripDetails from './pages/TripDetails';

const Layout = () => {
  const location = useLocation();
  const hideFooter = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/explore" element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          } />
          <Route path="/experience/:id" element={
            <ProtectedRoute>
              <ExperienceDetail />
            </ProtectedRoute>
          } />
          <Route path="/host/apply" element={
            <ProtectedRoute>
              <HostApply />
            </ProtectedRoute>
          } />
          <Route path="/host/dashboard" element={
            <ProtectedRoute>
              <HostDashboard />
            </ProtectedRoute>
          } />
          <Route path="/host/add-experience" element={
            <ProtectedRoute>
              <AddExperience />
            </ProtectedRoute>
          } />
          <Route path="/booking/:id" element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Trip Routes */}
          <Route path="/trips" element={
            <ProtectedRoute>
              <MyTrips />
            </ProtectedRoute>
          } />
          <Route path="/trips/:id" element={
            <ProtectedRoute>
              <TripDetails />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;
