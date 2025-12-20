import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import ExperienceCard from '../components/ExperienceCard';
import FilterPanel from '../components/FilterPanel';
import { Loader2, Search, SlidersHorizontal, Map } from 'lucide-react';

const Explore = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Initialize filters from URL or defaults
    const initialFilters = {
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || '',
        maxPrice: Number(searchParams.get('maxPrice')) || 5000,
        state: searchParams.get('state') || '',
        sort: searchParams.get('sort') || 'Recommended'
    };

    const [filters, setFilters] = useState(initialFilters);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await api.getExperiences();
                setExperiences(response.data);
                
                // Set max price dynamically if not set by user
                if (!searchParams.get('maxPrice') && response.data.length > 0) {
                    const max = Math.max(...response.data.map(e => e.price));
                    setFilters(prev => ({ ...prev, maxPrice: max }));
                }
            } catch (error) {
                console.error("Failed to fetch experiences", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExperiences();
    }, []);

    // Update URL when filters change
    useEffect(() => {
        const params = {};
        if (filters.search) params.search = filters.search;
        if (filters.category) params.category = filters.category;
        if (filters.maxPrice) params.maxPrice = filters.maxPrice;
        if (filters.state) params.state = filters.state;
        if (filters.sort) params.sort = filters.sort;
        setSearchParams(params);
    }, [filters, setSearchParams]);

    // Extract unique categories
    const categories = [...new Set(experiences.map(exp => exp.category))];

    // Filter logic
    const filteredExperiences = useMemo(() => {
        let result = experiences.filter(exp => {
            const matchesSearch = exp.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                exp.location.toLowerCase().includes(filters.search.toLowerCase());
            const matchesCategory = filters.category === '' || exp.category === filters.category;
            const matchesPrice = exp.price <= filters.maxPrice;
            
            // State matching logic
            let matchesState = true;
            if (filters.state) {
                if (["Punjab", "Haryana", "Himachal Pradesh"].includes(filters.state)) {
                    matchesState = exp.location.toLowerCase().includes(filters.state.toLowerCase());
                } else {
                    matchesState = false; // Show nothing for other states (handled in UI)
                }
            }

            return matchesSearch && matchesCategory && matchesPrice && matchesState;
        });

        // Sorting logic
        if (filters.sort === 'Price: Low to High') {
            result.sort((a, b) => a.price - b.price);
        } else if (filters.sort === 'Price: High to Low') {
            result.sort((a, b) => b.price - a.price);
        } else if (filters.sort === 'Newest First') {
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        // Recommended is default order

        return result;
    }, [experiences, filters]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            </div>
        );
    }
    return (
        <div className="h-[calc(150vh-4rem)] bg-gray-50 flex flex-col">
            {/* Mobile Filter Modal */}
            {showMobileFilters && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setShowMobileFilters(false)}
                    ></div>
                    <div className="absolute inset-x-4 top-20 bottom-20 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slideUp">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                <SlidersHorizontal className="h-5 w-5 text-indigo-600" />
                                Filters
                            </h3>
                            <button 
                                onClick={() => setShowMobileFilters(false)}
                                className="p-2 bg-white rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition shadow-sm"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-grow overflow-y-auto p-4">
                            <FilterPanel
                                filters={filters}
                                setFilters={setFilters}
                                categories={categories}
                                isMobile={true}
                            />
                        </div>
                        <div className="p-4 border-t border-gray-100 bg-gray-50">
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition"
                            >
                                Show {filteredExperiences.length} Results
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Fixed Header Section */}
            <div className="bg-white border-b border-gray-200 z-30 shadow-sm flex-shrink-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h1 className="text-2xl font-bold text-gray-900">Explore Experiences</h1>
                        
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setShowMobileFilters(true)}
                                className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 font-medium text-gray-700 hover:bg-gray-50 transition"
                            >
                                <SlidersHorizontal className="h-5 w-5 text-indigo-600" />
                                Filters
                            </button>
                            
                            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 font-medium text-gray-700 hover:bg-gray-50 transition">
                                <Map className="h-5 w-5 text-indigo-600" />
                                <span className="hidden sm:inline">Show Map (Beta)</span>
                            </button>
                        </div>
                    </div>

                    {/* Sort Bar */}
                    <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-100">
                        <p className="text-gray-600 font-medium text-sm">
                            Showing <span className="text-gray-900 font-bold">{filteredExperiences.length}</span> results
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
                            <select
                                value={filters.sort}
                                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                                className="bg-gray-50 border-none text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 font-bold shadow-sm cursor-pointer hover:bg-gray-100 transition"
                            >
                                <option>Recommended</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest First</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Independent Scrollable Content */}
            <div className="flex-1 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex gap-8">
                    {/* Sidebar Filters (Desktop) - Independently Scrollable */}
                    <div className="hidden lg:block w-80 flex-shrink-0 h-full overflow-y-auto py-6 pr-2 custom-scrollbar">
                        <FilterPanel 
                            filters={filters} 
                            setFilters={setFilters} 
                            categories={categories} 
                        />
                    </div>

                    {/* Main Results - Independently Scrollable */}
                    <div className="p-1 flex-1 h-full overflow-y-auto py-6 custom-scrollbar">
                        {filteredExperiences.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
                                {filteredExperiences.map((experience) => (
                                    <ExperienceCard key={experience._id} experience={experience} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="h-10 w-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No experiences found</h3>
                                <p className="text-gray-500 max-w-md mx-auto mb-8">We couldn't find any experiences matching your current filters. Try adjusting your search criteria.</p>
                                <button
                                    onClick={() => setFilters({ search: '', category: '', maxPrice: 5000, state: '', sort: 'Recommended' })}
                                    className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
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
