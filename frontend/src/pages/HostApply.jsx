import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Loader2, Sparkles, DollarSign, Users, Globe } from 'lucide-react';
import { api } from '../services/api';

const HostApply = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        bio: '',
        category: 'Food & Drink'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.requestHost(formData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/profile');
            }, 3000);
        } catch (error) {
            console.error(error);
            const errMsg = error.response?.data?.message || error.message || "Unknown error";
            alert("Failed to apply: " + errMsg);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100 animate-fadeIn">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome Aboard!</h2>
                    <p className="text-gray-600 text-lg">Your application has been submitted successfully. Redirecting you to your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Hero Section */}
            <div className="bg-indigo-900 text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Turn Your Passion Into Income</h1>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto">Join our community of local experts and share your world with travelers.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Benefits Sidebar */}
                    <div className="lg:w-1/3 space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-indigo-600" /> Why Host?
                            </h3>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="bg-indigo-50 p-3 rounded-2xl h-fit">
                                        <DollarSign className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Earn Extra Income</h4>
                                        <p className="text-sm text-gray-500 mt-1">Set your own prices and keep up to 95% of your earnings.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="bg-purple-50 p-3 rounded-2xl h-fit">
                                        <Globe className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Reach Global Travelers</h4>
                                        <p className="text-sm text-gray-500 mt-1">Connect with guests from all around the world.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="bg-pink-50 p-3 rounded-2xl h-fit">
                                        <Users className="h-6 w-6 text-pink-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Join a Community</h4>
                                        <p className="text-sm text-gray-500 mt-1">Get support and tips from thousands of other hosts.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Application Form */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Host Application</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl transition outline-none font-medium"
                                            placeholder="Jane"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl transition outline-none font-medium"
                                            placeholder="Doe"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-gray-700">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl transition outline-none font-medium"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Experience Category</label>
                                    <div className="relative">
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl transition outline-none font-medium appearance-none cursor-pointer"
                                        >
                                            <option>Food & Drink</option>
                                            <option>Art & Culture</option>
                                            <option>Nature & Outdoors</option>
                                            <option>Entertainment</option>
                                            <option>Sports</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Tell us about yourself</label>
                                    <textarea
                                        rows="5"
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl transition outline-none font-medium resize-none"
                                        placeholder="Share your expertise, your passion, and what makes you a great host..."
                                    ></textarea>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                                    <input type="checkbox" required id="terms" className="mt-1 rouunded text-indigo-600 focus:ring-indigo-500 h-4 w-4 border-gray-300" />
                                    <label htmlFor="terms" className="text-sm text-gray-600 leading-tight">
                                        I confirm that I am at least 18 years old and agree to the <a href="#" className="text-indigo-600 font-bold hover:underline">Host Terms & Conditions</a>.
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center justify-center shadow-lg shadow-indigo-200 transform hover:-translate-y-0.5"
                                >
                                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Submit Application'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HostApply;
