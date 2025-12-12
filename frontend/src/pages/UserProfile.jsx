import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { User, Mail, Calendar, MapPin, Edit3, Settings, Shield } from 'lucide-react';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [stats, setStats] = useState({ tripsTaken: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, bookingsRes, statsRes] = await Promise.all([
                    api.getProfile(),
                    api.getMyBookings(),
                    api.getUserStats()
                ]);
                setUser(profileRes.data);
                setBookings(bookingsRes.data);
                setStats(statsRes.data);
            } catch (error) {
                console.error("Failed to fetch profile data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!user) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">Failed to load profile.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Cover Image Section */}
            <div className="h-64 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 sticky top-24">
                            <div className="p-8 text-center border-b border-gray-50">
                                <div className="relative inline-block">
                                    <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-4xl mb-4 mx-auto ring-4 ring-white shadow-lg">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <button className="absolute bottom-4 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition shadow-md" title="Edit Avatar">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                                <p className="text-gray-500 text-sm mb-3">Travel Enthusiast</p>
                                <div className="flex justify-center gap-2 mb-2">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${user.role === 'host' ? 'bg-purple-100 text-purple-700' :
                                        user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'
                                        }`}>
                                        {user.role}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-4 text-gray-600 p-3 hover:bg-gray-50 rounded-xl transition">
                                    <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-xs text-gray-400 font-medium">Email Address</p>
                                        <p className="text-sm font-semibold">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-gray-600 p-3 hover:bg-gray-50 rounded-xl transition">
                                    <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                                        <Calendar className="h-5 w-5" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-xs text-gray-400 font-medium">Member Since</p>
                                        <p className="text-sm font-semibold">{new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-gray-50 border-t border-gray-100">
                                <button className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition py-2">
                                    <Settings className="h-4 w-4" /> Account Settings
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Stats Row (Optional placeholder for future) */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                                <div className="text-3xl font-bold text-indigo-600">{stats.tripsTaken}</div>
                                <div className="text-xs text-gray-500 font-bold uppercase tracking-wide mt-1">Trips Taken</div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                                <div className="text-3xl font-bold text-indigo-600">0</div>
                                <div className="text-xs text-gray-500 font-bold uppercase tracking-wide mt-1">Reviews</div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                                <div className="text-3xl font-bold text-indigo-600">
                                    <Shield className="h-8 w-8 mx-auto text-indigo-400" />
                                </div>
                                <div className="text-xs text-gray-500 font-bold uppercase tracking-wide mt-1">Verified</div>
                            </div>
                        </div>

                        {/* Recent Bookings */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
                                <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700">View All</button>
                            </div>

                            <div className="divide-y divide-gray-50">
                                {bookings.length > 0 ? (
                                    bookings.map((booking) => {
                                        if (!booking.experience) return null;
                                        return (
                                            <div key={booking._id} className="p-6 hover:bg-gray-50 transition group">
                                                <div className="flex flex-col sm:flex-row gap-6">
                                                    <div className="relative w-full sm:w-40 h-40 sm:h-32 flex-shrink-0">
                                                        <img
                                                            src={booking.experience.image}
                                                            alt={booking.experience.title}
                                                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                                                            className="w-full h-full object-cover rounded-2xl shadow-sm group-hover:shadow-md transition"
                                                        />
                                                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                                                            {new Date(booking.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                        </div>
                                                    </div>

                                                    <div className="flex-grow flex flex-col justify-between">
                                                        <div>
                                                            <div className="flex justify-between items-start mb-1">
                                                                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{booking.experience.title}</h3>
                                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                                    }`}>
                                                                    {booking.status}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center text-gray-500 text-sm mb-3">
                                                                <MapPin className="h-4 w-4 mr-1" />
                                                                {booking.experience.location}
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between mt-4 sm:mt-0 pt-4 border-t border-gray-100 sm:border-0 sm:pt-0">
                                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                                <span className='flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg'>
                                                                    <User className="h-3 w-3" /> {booking.guests}
                                                                </span>
                                                                <span className='font-bold text-gray-900'>Total: ${booking.totalPrice}</span>
                                                            </div>
                                                            <button className="text-indigo-600 font-semibold text-sm hover:underline">
                                                                View Ticket
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="p-12 text-center">
                                        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Calendar className="h-8 w-8 text-gray-300" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-1">No bookings yet</h3>
                                        <p className="text-gray-500 mb-6">Time to start your next adventure!</p>
                                        <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                                            Explore Experiences
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
