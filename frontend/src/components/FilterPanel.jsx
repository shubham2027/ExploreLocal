import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MapPin, Tag, IndianRupee, RotateCcw } from "lucide-react";

const FilterSection = ({ title, icon: Icon, isOpen, onToggle, children }) => (
    <div className="border-b border-gray-100 last:border-0">
        <button 
            onClick={onToggle}
            className="w-full flex items-center justify-between py-4 text-left group"
        >
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
                {Icon && <Icon className="h-4 w-4 text-indigo-500" />}
                <span>{title}</span>
            </div>
            {isOpen ? (
                <ChevronUp className="h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition" />
            ) : (
                <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition" />
            )}
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
            {children}
        </div>
    </div>
);

const FilterPanel = ({ filters, setFilters, categories, isMobile }) => {
    const [openSections, setOpenSections] = useState({
        location: true,
        category: true,
        price: true,
        state: true
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className={`bg-white rounded-2xl ${!isMobile ? 'border border-gray-100 shadow-sm p-4' : ''}`}>
            {!isMobile && (
                <div className="flex items-center justify-between mb-2 pb-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                    <button 
                        onClick={() => setFilters({ search: "", category: "", maxPrice: 5000, state: "", sort: "Recommended" })}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded-lg transition"
                    >
                        <RotateCcw className="h-3 w-3" /> Reset
                    </button>
                </div>
            )}

            {/* Search / Location */}
            <FilterSection 
                title="Search" 
                icon={Search}
                isOpen={openSections.location} 
                onToggle={() => toggleSection('location')}
            >
                <div className="relative">
                    <input
                        type="text"
                        name="search"
                        value={filters.search}
                        onChange={handleChange}
                        placeholder="Keyword or location..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition text-sm font-medium text-gray-700 placeholder-gray-400"
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
            </FilterSection>

            {/* Categories */}
            <FilterSection 
                title="Category" 
                icon={Tag}
                isOpen={openSections.category} 
                onToggle={() => toggleSection('category')}
            >
                <div className="space-y-2">
                    <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition group">
                        <input 
                            type="radio" 
                            name="category" 
                            value="" 
                            checked={filters.category === ""} 
                            onChange={handleChange}
                            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className={`text-sm ${filters.category === "" ? 'font-semibold text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>All Categories</span>
                    </label>
                    {categories.map((cat, index) => (
                        <label key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition group">
                            <input 
                                type="radio" 
                                name="category" 
                                value={cat} 
                                checked={filters.category === cat} 
                                onChange={handleChange}
                                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <span className={`text-sm ${filters.category === cat ? 'font-semibold text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>{cat}</span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* State */}
            <FilterSection 
                title="State" 
                icon={MapPin}
                isOpen={openSections.state} 
                onToggle={() => toggleSection('state')}
            >
                <div className="relative">
                    <select
                        name="state"
                        value={filters.state || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition appearance-none cursor-pointer text-sm font-medium text-gray-700"
                    >
                        <option value="">All States</option>
                        {["Punjab", "Haryana", "Himachal Pradesh"].map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection 
                title="Price Range" 
                icon={IndianRupee}
                isOpen={openSections.price} 
                onToggle={() => toggleSection('price')}
            >
                <div className="px-1">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-medium text-gray-500">Max Price</span>
                        <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">₹{filters.maxPrice}</span>
                    </div>
                    <input
                        type="range"
                        name="maxPrice"
                        min="0"
                        max="5000"
                        step="100"
                        value={filters.maxPrice}
                        onChange={handleChange}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium">
                        <span>₹0</span>
                        <span>₹2500</span>
                        <span>₹5000+</span>
                    </div>
                </div>
            </FilterSection>
        </div>
    );
};

export default FilterPanel;
