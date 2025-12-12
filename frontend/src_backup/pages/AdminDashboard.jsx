import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Check, X, Shield, Clock } from 'lucide-react';

const AdminDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            const response = await api.getAdminRequests();
            setRequests(response.data);
        } catch (error) {
            console.error("Failed to fetch requests", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
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

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Shield className="h-8 w-8 text-indigo-600" />
                Admin Dashboard
            </h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="font-semibold text-gray-700">Pending Host Requests</h2>
                </div>

                <div className="divide-y divide-gray-100">
                    {requests.length > 0 ? (
                        requests.map((user) => (
                            <div key={user._id} className="p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                    {user.hostApplication && (
                                        <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm border border-gray-100">
                                            <p><span className="font-semibold">Applied as:</span> {user.hostApplication.firstName} {user.hostApplication.lastName}</p>
                                            <p><span className="font-semibold">Category:</span> {user.hostApplication.category}</p>
                                            <p className="mt-1 italic">"{user.hostApplication.bio}"</p>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 mt-2 text-sm text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full w-fit">
                                        <Clock className="h-4 w-4" />
                                        <span>Status: {user.hostRequestStatus}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleApprove(user._id)}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                    >
                                        <Check className="h-5 w-5" /> Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(user._id)}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                    >
                                        <X className="h-5 w-5" /> Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No pending host requests.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
