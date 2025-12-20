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
        <div className="h-[calc(100vh-4rem)] flex flex-col bg-gray-50">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-100 flex-none z-30">
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

            <div className="flex-grow overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex flex-col lg:flex-row gap-8 h-full">
                        {/* Sidebar Filters - Independent Scroll */}
                        <div className={`lg:w-1/4 h-full overflow-y-auto no-scrollbar pb-8 ${showMobileFilters ? 'block absolute inset-0 z-40 bg-white p-4' : 'hidden lg:block'}`}>
                            <div className="py-8 space-y-8">
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

                        {/* Main Content Grid - Independent Scroll */}
                        <div className="lg:w-3/4 w-full h-full overflow-y-auto no-scrollbar pb-8">
                            <div className="py-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-gray-700 font-semibold">
                                        Showing {filteredExperiences.length} results
                                    </h2>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <span className="hidden sm:inline">Sort by:</span>
                                        <div className="relative">
                                            <select 
                                                value={filters.sort}
                                                onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                                                className="bg-white border border-gray-200 text-gray-700 font-medium py-2 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer appearance-none shadow-sm hover:border-indigo-300 transition"
                                            >
                                                <option>Recommended</option>
                                                <option>Price: Low to High</option>
                                                <option>Price: High to Low</option>
                                                <option>Newest First</option>
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {filters.state && !["Punjab", "Haryana", "Himachal Pradesh"].includes(filters.state) ? (
                                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                                        <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Map className="h-10 w-10 text-indigo-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon to {filters.state}</h3>
                                        <p className="text-gray-500 max-w-md mx-auto mb-8">
                                            We are currently offering experiences in Punjab, Haryana, and Himachal Pradesh only. 
                                            Stay tuned as we expand to more states!
                                        </p>
                                        <button
                                            onClick={() => setFilters(prev => ({ ...prev, state: '' }))}
                                            className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition"
                                        >
                                            Explore other states
                                        </button>
                                    </div>
                                ) : filteredExperiences.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                            onClick={() => setFilters({ search: '', category: '', maxPrice: 5000, state: '', sort: 'Recommended' })}
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
            </div>
        </div>
    );
};

export default Explore;
