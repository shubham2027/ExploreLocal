import { useState, useEffect } from 'react';
import { api } from '../services/api';
import ExperienceCard from '../components/ExperienceCard';
import FilterPanel from '../components/FilterPanel';
import { Loader2, Search, SlidersHorizontal, Map } from 'lucide-react';

const Explore = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        maxPrice: 500
    });
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await api.getExperiences();
                setExperiences(response.data);
            } catch (error) {
                console.error("Failed to fetch experiences", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExperiences();
    }, []);

    // Extract unique categories
    const categories = [...new Set(experiences.map(exp => exp.category))];

    // Filter logic
    const filteredExperiences = experiences.filter(exp => {
        const matchesSearch = exp.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            exp.location.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = filters.category === '' || exp.category === filters.category;
        const matchesPrice = exp.price <= filters.maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Explore Experiences</h1>
                            <p className="text-gray-500 mt-1">Discover unique activities hosted by locals</p>
                        </div>

                        {/* Mobile Filter Toggle */}
                        <button
                            className="md:hidden flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-medium"
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                        >
                            <SlidersHorizontal className="h-4 w-4" /> Filters
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters - Sticky on Desktop */}
                    <div className={`lg:w-1/4 lg:block ${showMobileFilters ? 'block' : 'hidden'}`}>
                        <div className="sticky top-40 space-y-8">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold text-lg">
                                    <SlidersHorizontal className="h-5 w-5 text-indigo-600" />
                                    Filters
                                </div>
                                <FilterPanel
                                    filters={filters}
                                    setFilters={setFilters}
                                    categories={categories}
                                />
                            </div>

                            {/* Promo / Map Card Placeholder */}
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white text-center shadow-lg hidden lg:block">
                                <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                    <Map className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Interactive Map</h3>
                                <p className="text-indigo-100 text-sm mb-4">View all experiences on our interactive map to find what's near you.</p>
                                <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition w-full">
                                    Open Map (beta)
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="lg:w-3/4 w-full">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-gray-700 font-semibold">
                                Showing {filteredExperiences.length} results
                            </h2>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>Sort by:</span>
                                <select className="bg-transparent font-medium text-gray-900 focus:outline-none cursor-pointer">
                                    <option>Recommended</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest First</option>
                                </select>
                            </div>
                        </div>

                        {filteredExperiences.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredExperiences.map(exp => (
                                    <ExperienceCard key={exp._id} experience={exp} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="h-10 w-10 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No matches found</h3>
                                <p className="text-gray-500 max-w-md mx-auto mb-8">We couldn't find any experiences matching your current filters. Try adjusting your search criteria.</p>
                                <button
                                    onClick={() => setFilters({ search: '', category: '', maxPrice: 500 })}
                                    className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explore;
