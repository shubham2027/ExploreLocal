import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Users, CheckCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';

const BookingPage = () => {
    const { id } = useParams(); // Experience ID from URL
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [date, setDate] = useState('');
    const [guests, setGuests] = useState(1);
    const [experience, setExperience] = useState(null);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const response = await api.getExperienceById(id);
                setExperience(response.data);
            } catch (err) {
                setError("Failed to load experience details");
            }
        };
        fetchExperience();
    }, [id]);

    const PRICE_PER_PERSON = experience?.price || 0;
    const SERVICE_FEE = 5;
    const totalPrice = (PRICE_PER_PERSON * guests) + SERVICE_FEE;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const bookingData = {
                experienceId: id,
                date,
                guests,
                totalPrice
            };

            if (!experience && !error) {
                return (
                    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                    </div>
                );
            }

            await api.createBooking(bookingData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/explore');
            }, 2000);
        } catch (err) {
            console.error("Booking failed:", err);
            setError(err.response?.data?.message || 'Booking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                    <p className="text-gray-600">Check your email for the confirmation details.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto px-4 py-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-indigo-600 px-6 py-4">
                    <h1 className="text-xl font-bold text-white">Complete Your Booking</h1>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 border-l-4 border-red-500 m-6 mb-0">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                        <div className="relative">
                            <input
                                type="number"
                                min="1"
                                max="10"
                                required
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Price per person</span>
                            <span className="font-medium">₹{PRICE_PER_PERSON}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Service fee</span>
                            <span className="font-medium">₹{SERVICE_FEE}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{totalPrice}</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center"
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Confirm Booking'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingPage;
