import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft, Type, AlignLeft, DollarSign, Tag, MapPin, Image as ImageIcon } from 'lucide-react';
import { api } from '../services/api';

const AddExperience = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;
    
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditMode);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Culture',
        location: '',
        image: ''
    });

    useEffect(() => {
        if (isEditMode) {
            const fetchExperience = async () => {
                try {
                    const response = await api.getExperienceById(id);
                    const exp = response.data;
                    setFormData({
                        title: exp.title,
                        description: exp.description,
                        price: exp.price,
                        category: exp.category,
                        location: exp.location,
                        image: exp.image
                    });
                } catch (error) {
                    console.error("Failed to fetch experience details", error);
                    alert("Failed to load experience details.");
                    navigate('/host/dashboard');
                } finally {
                    setFetching(false);
                }
            };
            fetchExperience();
        }
    }, [id, isEditMode, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Use a placeholder image if none provided
            const dataToSubmit = {
                ...formData,
                image: formData.image || "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            };
            
            if (isEditMode) {
                await api.updateExperience(id, dataToSubmit);
            } else {
                await api.addExperience(dataToSubmit);
            }
            
            navigate('/host/dashboard');
        } catch (error) {
            console.error("Failed to save experience", error);
            alert("Failed to save experience. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{isEditMode ? 'Edit Experience' : 'Create New Experience'}</h1>
                        <p className="text-xs text-gray-500">Step 1 of 1</p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info Section */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                            Basic Details
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="text-sm font-bold text-gray-700 mb-2 block">Experience Title</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl transition outline-none font-medium"
                                        placeholder="e.g., Sunset Yoga on the Beach"
                                    />
                                    <Type className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-2 block">Category</label>
                                    <div className="relative">
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl transition outline-none font-medium appearance-none"
                                        >
                                            <option>Culture</option>
                                            <option>Food</option>
                                            <option>Nature</option>
                                            <option>Workshop</option>
                                            <option>Adventure</option>
                                        </select>
                                        <Tag className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-2 block">Price per person (₹)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                            min="0"
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl transition outline-none font-medium"
                                            placeholder="0.00"
                                        />
                                        <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                            Experience Details
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="text-sm font-bold text-gray-700 mb-2 block">Location</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl transition outline-none font-medium"
                                        placeholder="e.g., Bali, Indonesia"
                                    />
                                    <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 mb-2 block">Description</label>
                                <div className="relative">
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl transition outline-none font-medium resize-none"
                                        placeholder="Describe what guests will do, where they'll go, and what makes this unique..."
                                    ></textarea>
                                    <AlignLeft className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Media Section */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                            Media
                        </h2>

                        <div>
                            <label className="text-sm font-bold text-gray-700 mb-2 block">Cover Image URL</label>
                            <div className="relative">
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl transition outline-none font-medium"
                                    placeholder="https://example.com/image.jpg"
                                />
                                <ImageIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            </div>
                            <p className="text-xs text-gray-500 mt-2 ml-1">Leave empty to use a random high-quality placeholder image.</p>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 transform hover:-translate-y-0.5 min-w-[200px] flex justify-center"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (isEditMode ? 'Update Experience' : 'Create Experience')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddExperience;
