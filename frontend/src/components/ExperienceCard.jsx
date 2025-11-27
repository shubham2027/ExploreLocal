import { MapPin, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExperienceCard = ({ experience }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm text-indigo-600">
                    {experience.category}
                </div>
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
                        <span className="text-lg font-bold text-indigo-600">${experience.price}</span>
                    </div>
                    <Link
                        to={`/experience/${experience.id}`}
                        className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ExperienceCard;
