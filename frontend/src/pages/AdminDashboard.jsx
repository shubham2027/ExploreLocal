import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Check, X, Shield, Clock, Users, Activity, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, activeBookings: 0 });
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        try {
            const [requestsRes, statsRes] = await Promise.all([
                api.getPendingHosts(),
                api.getAdminStats()
            ]);
            setRequests(requestsRes.data);
            setStats(statsRes.data);
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleApprove = async (userId) => {
        try {
            await api.approveHost(userId);
            setRequests(requests.filter(req => req._id !== userId));
        } catch (error) {
            alert("Failed to approve");
        }
    };

    const handleReject = async (userId) => {
        try {
            await api.rejectHost(userId);
            setRequests(requests.filter(req => req._id !== userId));
        } catch (error) {
            alert("Failed to reject");
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-red-100 p-3 rounded-2xl">
                            <Shield className="h-8 w-8 text-red-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Admin Command Center</h1>
                            <p className="text-gray-500 mt-1">System Overview & Moderation</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* System Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-2 text-gray-500 font-medium text-sm">
                            <Users className="h-4 w-4" /> Total Users
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{stats.totalUsers}</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-2 text-gray-500 font-medium text-sm">
                            <Activity className="h-4 w-4" /> Active Bookings
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{stats.activeBookings}</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-2 text-red-500 font-medium text-sm">
                            <AlertCircle className="h-4 w-4" /> Pending Approvals
                        </div>
                        <div className="text-3xl font-bold text-red-600">{requests.length}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Pending Requests List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-800">Host Applications</h2>
                                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">{requests.length} Pending</span>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {requests.length > 0 ? (
                                    requests.map((user) => (
                                        <div key={user._id} className="p-8 hover:bg-gray-50 transition">
                                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                                <div className="flex-grow">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                                                        <span className="text-sm text-gray-400">• {user.email}</span>
                                                    </div>

                                                    {user.hostApplication && (
                                                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-sm text-gray-600 mb-4">
                                                            <div className="grid grid-cols-2 gap-2 mb-2">
                                                                <div>
                                                                    <span className="font-semibold text-gray-900">Category:</span> {user.hostApplication.category}
                                                                </div>
                                                                <div>
                                                                    <span className="font-semibold text-gray-900">Name:</span> {user.hostApplication.firstName} {user.hostApplication.lastName}
                                                                </div>
                                                            </div>
                                                            <div className="italic text-gray-500 border-t border-gray-200 pt-2 mt-2">
                                                                "{user.hostApplication.bio}"
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full w-fit font-medium">
                                                        <Clock className="h-4 w-4" />
                                                        <span>Awaiting Review</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-3 justify-center min-w-[140px]">
                                                    <button
                                                        onClick={() => handleApprove(user._id)}
                                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium shadow-sm"
                                                    >
                                                        <Check className="h-4 w-4" /> Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(user._id)}
                                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                                                    >
                                                        <X className="h-4 w-4" /> Reject
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-12 text-center text-gray-400">
                                        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Check className="h-8 w-8 text-green-500" />
                                        </div>
                                        <p>All caught up! No pending requests.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Quick Actions */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 text-white rounded-3xl p-8 shadow-xl">
                            <h3 className="font-bold text-lg mb-4">System Health</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-1 text-gray-400">
                                        <span>Server Load</span>
                                        <span>12%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1 text-gray-400">
                                        <span>DB Connection</span>
                                        <span className="text-green-400">Stable</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-700 my-6"></div>

                            <button className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold transition">
                                Maintenance Mode
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
