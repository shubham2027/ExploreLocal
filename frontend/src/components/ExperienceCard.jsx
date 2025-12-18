import { MapPin, Star, Clock, Heart, CalendarPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddToTripModal from './AddToTripModal';

const ExperienceCard = ({ experience }) => {
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group relative">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={experience.image}
                        alt={experience.title}
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm text-indigo-600">
                        {experience.category}
                    </div>

                    {/* Add to Trip Button (Visible on Hover) */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setShowAddModal(true);
                        }}
                        className="absolute top-3 left-3 bg-white/90 p-2 rounded-full shadow-sm text-gray-600 hover:text-indigo-600 hover:bg-white transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300 z-10"
                        title="Save to Trip"
                    >
                        <CalendarPlus className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{experience.title}</h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                        {experience.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500">From</span>
                            <span className="text-lg font-bold text-indigo-600">₹{experience.price}</span>
                        </div>
                        <Link
                            to={`/experience/${experience._id}`}
                            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>

            {showAddModal && (
                <AddToTripModal
                    experienceId={experience._id}
                    onClose={() => setShowAddModal(false)}
                />
            )}
        </>
    );
};

export default ExperienceCard;
