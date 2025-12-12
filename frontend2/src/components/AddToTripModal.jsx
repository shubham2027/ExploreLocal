import { useState, useEffect } from 'react';
import { X, Plus, Check, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddToTripModal = ({ experienceId, onClose }) => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingTo, setAddingTo] = useState(null); // Trip ID being added to
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await api.getTrips();
                setTrips(response.data);
            } catch (error) {
                console.error("Failed to fetch trips", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrips();
    }, []);

    const handleAddToTrip = async (tripId) => {
        setAddingTo(tripId);
        try {
            await api.addExperienceToTrip(tripId, experienceId);
            onClose(); // Close modal on success
            // Optional: Show success toast or navigate
        } catch (error) {
            console.error("Failed to add to trip", error);
            alert("Failed to add (maybe duplicate?)");
            setAddingTo(null);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[60] backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-900">Add to Trip</h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto p-2">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                        </div>
                    ) : trips.length === 0 ? (
                        <div className="text-center py-8 px-4">
                            <p className="text-gray-500 mb-4">You haven't created any trips yet.</p>
                            <button
                                onClick={() => navigate('/trips')}
                                className="text-indigo-600 font-semibold hover:underline"
                            >
                                Create a Trip First
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {trips.map((trip) => (
                                <button
                                    key={trip._id}
                                    onClick={() => handleAddToTrip(trip._id)}
                                    disabled={addingTo !== null}
                                    className="w-full flex items-center justify-between p-4 hover:bg-indigo-50 rounded-xl transition-colors group text-left"
                                >
                                    <div>
                                        <div className="font-bold text-gray-900">{trip.title}</div>
                                        <div className="text-xs text-gray-500">{trip.location}</div>
                                    </div>
                                    <div className="h-8 w-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-indigo-200 group-hover:text-indigo-600 transition">
                                        {addingTo === trip._id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Plus className="h-4 w-4" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-center">
                    <button
                        onClick={() => navigate('/trips')}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                        + Create New Trip
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddToTripModal;
