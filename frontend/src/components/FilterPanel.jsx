import { Search, ChevronDown } from "lucide-react";

const FilterPanel = ({ filters, setFilters, categories }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Filters</h3>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location or Keyword
        </label>
        <div className="relative">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-gray-50 hover:bg-white hover:border-indigo-300 text-gray-700 font-medium"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <div className="relative">
            <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-gray-50 hover:bg-white hover:border-indigo-300 appearance-none cursor-pointer text-gray-700 font-medium"
            >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
                <option key={index} value={cat}>
                {cat}
                </option>
            ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* State Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          State
        </label>
        <div className="relative">
            <select
            name="state"
            value={filters.state || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-gray-50 hover:bg-white hover:border-indigo-300 appearance-none cursor-pointer text-gray-700 font-medium"
            >
            <option value="">All States</option>
            {[
                "Punjab", "Haryana", "Himachal Pradesh"
            ].map((state, index) => (
                <option key={index} value={state}>
                {state}
                </option>
            ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Max Price: ₹{filters.maxPrice}
        </label>
        <input
          type="range"
          name="maxPrice"
          min="0"
          max="5000"
          step="50"
          value={filters.maxPrice}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹0</span>
          <span>₹5000+</span>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => setFilters({ search: "", category: "", maxPrice: 5000, state: "" })}
        className="w-full py-2 text-sm text-indigo-600 font-medium hover:text-indigo-800 transition border border-indigo-100 rounded-lg hover:bg-indigo-50"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterPanel;
