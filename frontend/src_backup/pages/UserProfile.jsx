import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { User, Mail, Calendar, MapPin, Clock } from 'lucide-react';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, bookingsRes] = await Promise.all([
                    api.getProfile(),
                    api.getMyBookings()
                ]);
                setUser(profileRes.data);
                setBookings(bookingsRes.data);
            } catch (error) {
                console.error("Failed to fetch profile data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user) {
        return <div className="min-h-screen flex items-center justify-center">Failed to load profile.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-2xl">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                                <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium uppercase mt-1">
                                    {user.role}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Mail className="h-5 w-5 text-gray-400" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Calendar className="h-5 w-5 text-gray-400" />
                                <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bookings Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                            <h2 className="font-semibold text-gray-700">My Bookings</h2>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <div key={booking._id} className="p-6">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <img
                                                src={booking.experience.image}
                                                alt={booking.experience.title}
                                                className="w-full md:w-32 h-32 object-cover rounded-lg"
                                            />
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-lg font-bold text-gray-900">{booking.experience.title}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{booking.experience.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4" />
                                                        <span>{booking.guests} Guest(s)</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-indigo-600">Total: ${booking.totalPrice}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    You haven't made any bookings yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
