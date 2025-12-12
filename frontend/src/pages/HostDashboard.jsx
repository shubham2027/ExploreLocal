import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, TrendingUp, Users, DollarSign, Star, Calendar } from 'lucide-react';
import { api } from '../services/api';

const HostDashboard = () => {
    const [experiences, setExperiences] = useState([]);
    const [stats, setStats] = useState({ totalEarnings: 0, activeBookings: 0, totalGuests: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [expRes, statsRes] = await Promise.all([
                    api.getExperiences(),
                    api.getHostStats()
                ]);
                // Filter specifically for this host if getExperiences returns all
                // Assuming backend for getExperiences might return all, but we want to show "My Experiences"
                // Ideally backend should have getMyExperiences. For now assuming filtering or just taking slice as done before but let's try to be more real if possible or stick to the previous mock logic for experiences + real stats.
                // The previous code did: setExperiences(response.data.slice(0, 3));
                setExperiences(expRes.data.slice(0, 3));
                setStats(statsRes.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Mock Stats
    const statCards = [
        { label: 'Total Earnings', value: `$${stats.totalEarnings.toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Active Bookings', value: stats.activeBookings, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Total Guests', value: stats.totalGuests, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Host Dashboard</h1>
                            <p className="text-gray-500 mt-1">Manage your experiences and track your performance</p>
                        </div>
                        <Link
                            to="/host/add-experience"
                            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg shadow-indigo-200 transform hover:-translate-y-1"
                        >
                            <Plus className="h-5 w-5" /> Create Experience
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {statCards.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.bg} p-3 rounded-xl`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <span className={`text-xs font-bold ${stat.color} bg-opacity-10 px-2 py-1 rounded-full`}>
                                    +12%
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content: My Experiences */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <h2 className="text-xl font-bold text-gray-800">My Experiences</h2>
                                <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700">View All</button>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {experiences.map((exp) => (
                                    <div key={exp._id} className="p-6 hover:bg-gray-50 transition group">
                                        <div className="flex items-center gap-6">
                                            <div className="relative w-24 h-24 flex-shrink-0">
                                                <img
                                                    src={exp.image}
                                                    alt={exp.title}
                                                    className="w-full h-full object-cover rounded-xl shadow-sm"
                                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{exp.title}</h3>
                                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                                            <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">{exp.category}</span>
                                                            <span>${exp.price} / person</span>
                                                        </div>
                                                    </div>
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                                        <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Edit">
                                                            <Edit className="h-5 w-5" />
                                                        </button>
                                                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete">
                                                            <Trash2 className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="mt-3 flex items-center gap-4 text-sm font-medium text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                        Active
                                                    </div>
                                                    <div>
                                                        12 Bookings this month
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {experiences.length === 0 && (
                                    <div className="p-12 text-center text-gray-500">
                                        You haven't created any experiences yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Recent Activity */}
                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-3xl p-6 text-white shadow-xl mb-6">
                            <h3 className="font-bold text-lg mb-4">Pro Tips</h3>
                            <ul className="space-y-3 text-indigo-100 text-sm">
                                <li className="flex gap-2">
                                    <div className="bg-white/20 p-1 rounded-full h-fit mt-0.5"><TrendingUp className="w-3 h-3" /></div>
                                    <span>Adding high-quality photos increases bookings by 40%.</span>
                                </li>
                                <li className="flex gap-2">
                                    <div className="bg-white/20 p-1 rounded-full h-fit mt-0.5"><Star className="w-3 h-3" /></div>
                                    <span>Reply to reviews within 24h to boost your ranking.</span>
                                </li>
                            </ul>
                            <button className="mt-6 w-full py-2 bg-white text-indigo-900 rounded-lg font-bold text-sm hover:bg-indigo-50 transition">
                                View Host Guide
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HostDashboard;
