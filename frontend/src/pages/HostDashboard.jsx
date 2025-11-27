import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { api } from '../services/api';

const HostDashboard = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, we would fetch only the host's experiences
        const fetchExperiences = async () => {
            try {
                const response = await api.getExperiences();
                // Mock filtering for current host (assuming hostId 101 for demo)
                setExperiences(response.data.slice(0, 3));
            } catch (error) {
                console.error("Failed to fetch experiences", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExperiences();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Host Dashboard</h1>
                <Link
                    to="/host/add-experience"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition flex items-center gap-2"
                >
                    <Plus className="h-5 w-5" /> Add New Experience
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="font-semibold text-gray-700">My Experiences</h2>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {experiences.map((exp) => (
                            <div key={exp.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition">
                                <div className="flex items-center gap-4">
                                    <img src={exp.image} alt={exp.title} className="w-16 h-16 rounded-lg object-cover" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                                        <p className="text-sm text-gray-500">{exp.category} • ${exp.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="p-2 text-gray-400 hover:text-indigo-600 transition">
                                        <Edit className="h-5 w-5" />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-red-600 transition">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {experiences.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                You haven't created any experiences yet.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HostDashboard;
