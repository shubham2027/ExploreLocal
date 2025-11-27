import { useState, useEffect } from 'react';
import { api } from '../services/api';
import ExperienceCard from '../components/ExperienceCard';
import FilterPanel from '../components/FilterPanel';
import { Loader2 } from 'lucide-react';

const Explore = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        maxPrice: 500
    });

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
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className="w-full md:w-1/4">
                    <FilterPanel
                        filters={filters}
                        setFilters={setFilters}
                        categories={categories}
                    />
                </div>

                {/* Main Content */}
                <div className="w-full md:w-3/4">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Explore Experiences</h1>
                        <p className="text-gray-600 mt-2">Found {filteredExperiences.length} experiences</p>
                    </div>

                    {filteredExperiences.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredExperiences.map(exp => (
                                <ExperienceCard key={exp.id} experience={exp} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500 text-lg">No experiences found matching your criteria.</p>
                            <button
                                onClick={() => setFilters({ search: '', category: '', maxPrice: 500 })}
                                className="mt-4 text-indigo-600 font-medium hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Explore;
