import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { MapPin, Clock, Users, Star, ArrowLeft, Check, Phone } from 'lucide-react';

const ExperienceDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const [experience, setExperience] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const backLink = location.state?.search ? `/explore${location.state.search}` : '/explore';

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const response = await api.getExperienceById(id);
                setExperience(response.data);
            } catch (err) {
                setError("Experience not found");
            } finally {
                setLoading(false);
            }
        };

        fetchExperience();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    if (!experience) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to={backLink} className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-6 transition">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Explore
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image Section */}
                <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] lg:h-[500px]">
                    <img
                        src={experience.image}
                        alt={experience.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Details Section */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                            {experience.category}
                        </span>
                        <div className="flex items-center text-gray-500 text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            {experience.location}
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{experience.title}</h1>

                    <div className="flex items-center gap-6 mb-8 text-gray-600">
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-indigo-500" />
                            <span>3-4 Hours</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-indigo-500" />
                            <span>Max 10 People</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span>4.9 (120 reviews)</span>
                        </div>
                    </div>

                    <div className="prose prose-indigo text-gray-600 mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">About this experience</h3>
                        <p className="leading-relaxed">{experience.description}</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
                        <h3 className="font-semibold text-gray-900 mb-4">What's included</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-gray-600">
                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span>Professional guide</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-600">
                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span>Equipment and materials</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-600">
                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span>Light refreshments</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
                        <h3 className="font-semibold text-gray-900 mb-2">Host Contact</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                {experience.host?.name?.charAt(0).toUpperCase() || 'H'}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{experience.host?.name || 'Local Host'}</p>
                                {experience.host?.hostApplication?.phone && (
                                    <div className="flex items-center text-sm text-gray-500 mt-0.5">
                                        <Phone className="h-3 w-3 mr-1" />
                                        {experience.host.hostApplication.phone}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-white shadow-lg rounded-xl border border-gray-100 sticky bottom-4">
                        <div>
                            <p className="text-sm text-gray-500">Price per person</p>
                            <p className="text-3xl font-bold text-indigo-600">₹{experience.price}</p>
                        </div>
                        <Link to={`/booking/${experience._id}`} className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block text-center">
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperienceDetail;
