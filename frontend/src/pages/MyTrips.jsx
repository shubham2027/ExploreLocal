import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, MapPin, ArrowRight, Loader2, Plane, Globe } from 'lucide-react';
import { api } from '../services/api';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const MyTrips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    
    // Delete Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tripToDelete, setTripToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // New Trip Form State
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        startDate: '',
        endDate: '',
        guests: 1
    });
    const [createLoading, setCreateLoading] = useState(false);

    useEffect(() => {
        fetchTrips();
    }, []);

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

    const handleCreateTrip = async (e) => {
        e.preventDefault();
        setCreateLoading(true);
        try {
            await api.createTrip(formData);
            await fetchTrips();
            setShowModal(false);
            setFormData({ title: '', location: '', startDate: '', endDate: '', guests: 1 });
        } catch (error) {
            console.error("Failed to create trip", error);
        } finally {
            setCreateLoading(false);
        }
    };

    const confirmDelete = (trip) => {
        setTripToDelete(trip);
        setShowDeleteModal(true);
    };

    const handleDeleteTrip = async () => {
        if (!tripToDelete) return;
        setIsDeleting(true);
        try {
            await api.deleteTrip(tripToDelete._id);
            await fetchTrips();
            setShowDeleteModal(false);
            setTripToDelete(null);
        } catch (error) {
            console.error("Failed to delete trip", error);
        } finally {
            setIsDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header Section */}
            <div className="bg-indigo-900 text-white py-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-12 translate-x-12 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full translate-y-24 -translate-x-12 blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-indigo-200 text-sm font-bold uppercase tracking-wider mb-2">
                                <Plane className="h-4 w-4" /> Your Journey Starts Here
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">My Trips</h1>
                            <p className="text-indigo-100 text-lg max-w-xl">Curate your dream itineraries and manage your upcoming adventures.</p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 bg-white text-indigo-900 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg transform hover:-translate-y-1"
                        >
                            <Plus className="h-5 w-5" /> Plan New Trip
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                {trips.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100">
                        <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Globe className="h-10 w-10 text-indigo-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Passport is Empty</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't planned any trips yet. Create your first itinerary to start adding experiences.</p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                        >
                            Create First Trip
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trips.map((trip) => (
                            <Link
                                key={trip._id}
                                to={`/trips/${trip._id}`}
                                className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col relative"
                            >
                                <div className="h-32 bg-gray-200 relative overflow-hidden">
                                    {/* Placeholder Pattern or Map BG */}
                                    <div className="absolute inset-0 bg-indigo-600 opacity-10 pattern-dots"></div>
                                    <div className="absolute -bottom-10 -right-10 text-gray-100 opacity-50">
                                        <MapPin className="w-48 h-48" />
                                    </div>
                                </div>

                                <div className="p-6 pt-0 flex-grow flex flex-col">
                                    <div className="bg-white w-16 h-16 rounded-2xl shadow-lg -mt-10 mb-4 flex items-center justify-center text-2xl font-bold text-indigo-600 relative z-10 group-hover:scale-110 transition-transform">
                                        {trip.title.charAt(0).toUpperCase()}
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{trip.title}</h3>
                                    <div className="flex items-center text-gray-500 text-sm mb-4">
                                        <MapPin className="h-4 w-4 mr-1 text-indigo-400" />
                                        {trip.location}
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                        <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            {trip.startDate ? (
                                                <span className="font-medium">
                                                    {new Date(trip.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {trip.endDate ? new Date(trip.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '...'}
                                                </span>
                                            ) : (
                                                <span className="italic text-gray-400">Dates not set</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Experiences</span>
                                            <span className="bg-white px-2 py-0.5 rounded shadow-sm text-xs font-bold text-indigo-600 border border-gray-100">
                                                {trip.experiences?.length || 0}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                confirmDelete(trip);
                                            }}
                                            className="text-xs font-bold text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors"
                                        >
                                            Delete
                                        </button>
                                        <span className="flex items-center text-indigo-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                                            Manage <ArrowRight className="h-4 w-4 ml-1" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                <DeleteConfirmationModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDeleteTrip}
                    isDeleting={isDeleting}
                    title="Delete Trip"
                    message={`Are you sure you want to delete "${tripToDelete?.title}"? This action cannot be undone.`}
                />

                {/* Create Trip Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fadeIn">
                        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all scale-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">New Adventure</h2>
                            <p className="text-gray-500 mb-6">Where are you heading next?</p>

                            <form onSubmit={handleCreateTrip}>
                                <div className="space-y-4">
                                    <div className="group">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Trip Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition outline-none font-medium"
                                            placeholder="e.g. Summer in Kyoto"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Destination</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition outline-none font-medium"
                                            placeholder="e.g. Kyoto, Japan"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Start Date</label>
                                            <input
                                                type="date"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition outline-none text-gray-600 font-medium"
                                                value={formData.startDate}
                                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">End Date</label>
                                            <input
                                                type="date"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition outline-none text-gray-600 font-medium"
                                                value={formData.endDate}
                                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Number of Guests</label>
                                        <input
                                            type="number"
                                            min="1"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition outline-none font-medium"
                                            value={formData.guests}
                                            onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-bold transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={createLoading}
                                        className="flex-1 px-4 py-3 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl font-bold transition flex justify-center items-center shadow-lg shadow-indigo-200"
                                    >
                                        {createLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create Trip'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
                }
            </div >
        </div >
    );
};

export default MyTrips;
