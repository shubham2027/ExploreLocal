import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/experience/:id" element={<ExperienceDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/host/apply" element={<HostApply />} />
              <Route path="/host/dashboard" element={<HostDashboard />} />
              <Route path="/host/add-experience" element={<AddExperience />} />
              <Route path="/booking/:id" element={<BookingPage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
