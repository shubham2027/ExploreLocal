import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft, Trash2, Clock, Loader2, Users, DollarSign, PieChart, CheckCircle } from 'lucide-react';
import { api } from '../services/api';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const TripDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchTrip();
    }, [id]);

    const fetchTrip = async () => {
        try {
            const [tripRes, bookingsRes] = await Promise.all([
                api.getTripById(id),
                api.getMyBookings()
            ]);
            
            const tripData = tripRes.data;
            setTrip(tripData);

            // Check if all experiences in this trip are already booked
            if (tripData.experiences && tripData.experiences.length > 0) {
                const bookedExperienceIds = bookingsRes.data.map(b => b.experience._id || b.experience);
                const allBooked = tripData.experiences.every(item => 
                    bookedExperienceIds.includes(item.experience._id)
                );
                setIsTripBooked(allBooked);
            }
        } catch (error) {
            console.error("Failed to fetch trip details", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTrip = async () => {
        setIsDeleting(true);
        try {
            await api.deleteTrip(id);
            navigate('/trips');
        } catch (error) {
            console.error("Failed to delete trip", error);
            setIsDeleting(false);
        }
    };

    const [bookingLoading, setBookingLoading] = useState(false);
    const [isTripBooked, setIsTripBooked] = useState(false);
    const [notification, setNotification] = useState(null);

    const handleRemoveExperience = async (expId) => {
        try {
            await api.removeExperienceFromTrip(id, expId);
            fetchTrip(); // Refresh
        } catch (error) {
            console.error("Failed to remove experience", error);
            setNotification({ message: 'Failed to remove experience', type: 'error' });
        }
    };

    const handleBookTrip = async () => {
        if (!trip.experiences || trip.experiences.length === 0) return;
        
        setBookingLoading(true);
        try {
            const guests = trip.guests || 1;
            const bookingDate = trip.startDate || new Date();

            // Create booking promises for all experiences
            const bookingPromises = trip.experiences.map(item => {
                return api.createBooking({
                    experienceId: item.experience._id,
                    guests: guests,
                    date: bookingDate,
                    totalPrice: item.experience.price * guests
                });
            });

            await Promise.all(bookingPromises);
            
            setNotification({ message: 'Trip booked successfully! All experiences have been booked.', type: 'success' });
            setIsTripBooked(true);
            setTimeout(() => navigate('/profile'), 2000);
        } catch (error) {
            console.error("Failed to book trip", error);
            setNotification({ message: 'Failed to book some experiences. Please try again.', type: 'error' });
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold">Trip not found</h1>
                <Link to="/trips" className="text-indigo-600 hover:underline">Back to My Trips</Link>
            </div>
        );
    }

    // Group saved experiences by category or date (simple list for now)
    const categorizedExperiences = trip.experiences.reduce((acc, item) => {
        const cat = item.experience?.category || 'Uncategorized';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
    }, {});

    // Calculate stats
    const guests = trip.guests || 1;
    const totalContentCost = trip.experiences.reduce((sum, item) => sum + (item.experience?.price || 0), 0);
    const totalTripCost = totalContentCost * guests;
    const costPerPerson = totalTripCost / guests; // = totalContentCost

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Notification 
                message={notification?.message} 
                type={notification?.type} 
                onClose={() => setNotification(null)} 
            />

            <div className="flex justify-between items-center mb-6">
                <Link to="/trips" className="flex items-center text-gray-500 hover:text-indigo-600 transition">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to My Trips
                </Link>
                <button
                    onClick={() => setShowDeleteModal(true)}
                    className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition"
                >
                    <Trash2 className="h-4 w-4" /> Delete Trip
                </button>
            </div>

            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 relative overflow-hidden">
                <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full mb-3 uppercase tracking-wide">
                        Trip
                    </span>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{trip.title}</h1>
                    <div className="flex items-center gap-6 text-gray-600 mt-4">
                        <div className="flex items-center">
                            <MapPin className="h-5 w-5 mr-2 text-indigo-500" />
                            <span className="font-medium">{trip.location}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
                            {trip.startDate && trip.endDate ? (
                                <span>{new Date(trip.startDate).toLocaleDateString()} — {new Date(trip.endDate).toLocaleDateString()}</span>
                            ) : (
                                <span>Dates not set</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-indigo-50 to-transparent pointer-events-none" />
            </div>

            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteTrip}
                isDeleting={isDeleting}
                title="Delete Trip"
                message={`Are you sure you want to delete "${trip.title}"? This action cannot be undone.`}
            />

            {/* Itinerary Board */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main List */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <Clock className="h-6 w-6 mr-2 text-indigo-600" />
                        Planned Itinerary
                    </h2>

                    {trip.experiences.length === 0 ? (
                        <div className="bg-gray-50 rounded-xl p-12 text-center border border-dashed border-gray-200">
                            <p className="text-gray-500 text-lg mb-4">No experiences added yet.</p>
                            <Link to="/explore" className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition">
                                Browse Experiences to Add
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {Object.entries(categorizedExperiences).map(([category, items]) => (
                                <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                        <h3 className="font-bold text-gray-800">{category}</h3>
                                        <span className="bg-white px-2 py-1 rounded text-xs font-medium text-gray-500 border border-gray-200">{items.length} items</span>
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        {items.map((item) => (
                                            <div key={item._id} className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-gray-50 transition">
                                                <img
                                                    src={item.experience?.image}
                                                    alt={item.experience?.title}
                                                    className="w-full sm:w-24 h-24 object-cover rounded-lg"
                                                />
                                                <div className="flex-grow">
                                                    <h4 className="font-bold text-lg text-gray-900 mb-1">{item.experience?.title}</h4>
                                                    <p className="text-sm text-gray-500 line-clamp-2">{item.experience?.description}</p>
                                                    <div className="mt-2 text-indigo-600 font-bold text-sm">₹{item.experience?.price}</div>
                                                </div>
                                                <div className="flex sm:flex-col gap-2">
                                                    <Link
                                                        to={`/experience/${item.experience?._id}`}
                                                        className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 text-center transition"
                                                    >
                                                        View
                                                    </Link>
                                                    <button
                                                        onClick={() => handleRemoveExperience(item.experience?._id)}
                                                        className="px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 flex items-center justify-center transition"
                                                    >
                                                        <Trash2 className="h-4 w-4 sm:mr-1" /> <span className="hidden sm:inline">Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar Stats */}
                <div className="lg:w-80 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <PieChart className="h-5 w-5 mr-2 text-indigo-600" />
                            Trip Budget
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div className="flex items-center text-gray-600 text-sm font-medium">
                                    <Users className="h-4 w-4 mr-2" />
                                    Guests
                                </div>
                                <div className="font-bold text-gray-900">{guests}</div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div className="flex items-center text-gray-600 text-sm font-medium">
                                    <DollarSign className="h-4 w-4 mr-2" />
                                    Cost / Person
                                </div>
                                <div className="font-bold text-gray-900">₹{costPerPerson.toLocaleString()}</div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div className="text-gray-500 font-medium">Total Cost</div>
                                    <div className="text-2xl font-bold text-indigo-600">₹{totalTripCost.toLocaleString()}</div>
                                </div>
                                <p className="text-xs text-gray-400 mt-1 text-right">
                                    Based on {trip.experiences.length} experiences
                                </p>
                            </div>

                            <button
                                onClick={handleBookTrip}
                                disabled={bookingLoading || trip.experiences.length === 0 || isTripBooked}
                                className={`w-full py-3 rounded-xl font-bold shadow-lg transition flex justify-center items-center gap-2 ${
                                    isTripBooked 
                                    ? 'bg-green-100 text-green-700 cursor-not-allowed shadow-none' 
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'
                                } disabled:opacity-70 disabled:cursor-not-allowed`}
                            >
                                {bookingLoading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Booking...
                                    </>
                                ) : isTripBooked ? (
                                    <>
                                        <CheckCircle className="h-5 w-5" />
                                        Already Booked
                                    </>
                                ) : (
                                    <>
                                        Book Entire Trip
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripDetails;
