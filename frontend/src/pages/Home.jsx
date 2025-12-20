import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, Compass, Map, CreditCard, Heart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ExperienceCard from '../components/ExperienceCard';

const Home = () => {
    const { isHost } = useAuth();
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const featuredSectionRef = useRef(null);

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

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if (featuredSectionRef.current) {
            featuredSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const filteredExperiences = selectedCategory
        ? experiences.filter(exp => exp.category === selectedCategory)
        : experiences;

    // Limit to 6 for the "Featured" section initially if no category selected
    const displayExperiences = selectedCategory ? filteredExperiences : experiences.slice(0, 6);

    return (
        <div className="flex flex-col min-h-screen font-sans">
            {/* Hero Section */}
            <div className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2021&q=80"
                        alt="Travel background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white animate-slide-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
                        Explore the world like a local
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                        Discover the <span className="text-yellow-500">Soul</span> <br />
                        of Every City
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
                        Book unique local experiences, workshops, and tours led by passionate hosts who love their city.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/explore"
                            className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group"
                        >
                            Start Exploring
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        {isHost ? (
                            <Link
                                to="/host/dashboard"
                                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                            >
                                Host Dashboard
                            </Link>
                        ) : (
                            <Link
                                to="/host/apply"
                                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                            >
                                Become a Host
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Featured Categories */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Curated Categories</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find the perfect experience that matches your passion and style.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Food & Drink", value: "Food", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836" },
                            { title: "Art & Culture", value: "Culture", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f" },
                            { title: "Nature & Outdoors", value: "Nature", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" }
                        ].map((category, index) => (
                            <div
                                key={index}
                                onClick={() => handleCategoryClick(category.value)}
                                className={`group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ${selectedCategory === category.value ? 'ring-4 ring-indigo-500 ring-offset-4' : ''}`}
                            >
                                <img
                                    src={`${category.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                                    alt={category.title}
                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                    <h3 className="text-2xl font-bold text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{category.title}</h3>
                                    <div className="w-12 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dynamic Featured Experiences Section */}
            <section ref={featuredSectionRef} className="py-24 bg-white scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {selectedCategory ? `${selectedCategory} Experiences` : "Featured Experiences"}
                            </h2>
                            <p className="text-lg text-gray-600">
                                {selectedCategory
                                    ? `Explore our best ${selectedCategory} activities.`
                                    : "Handpicked experiences just for you."}
                            </p>
                        </div>
                        {selectedCategory && (
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
                            >
                                View All
                            </button>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
                        </div>
                    ) : displayExperiences.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                            {displayExperiences.map(exp => (
                                <ExperienceCard key={exp._id} experience={exp} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl">
                            <p className="text-gray-500">No experiences found in this category yet.</p>
                            <Link to="/host/apply" className="text-indigo-600 font-semibold hover:underline mt-2 inline-block">
                                Be the first to host one!
                            </Link>
                        </div>
                    )}

                    {!selectedCategory && displayExperiences.length > 0 && (
                        <div className="text-center mt-12">
                            <Link
                                to="/explore"
                                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition-colors"
                            >
                                View All Experiences <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* How it Works */}
            {/* How it Works / Start Your Journey */}
            <section className="py-24 bg-indigo-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-24 translate-x-24 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full translate-y-24 -translate-x-12 blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-indigo-300 font-bold tracking-wider uppercase text-sm mb-2 block">Simple Steps</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Start Your Journey</h2>
                        <p className="text-lg text-indigo-100 max-w-2xl mx-auto">From discovery to departure, we've made exploring the world easier than ever.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Compass,
                                title: "Discover",
                                desc: "Browse authentic experiences curated by passionate locals who know the city best."
                            },
                            {
                                icon: Map,
                                title: "Plan",
                                desc: "Create trips, add guests, and build your perfect itinerary with our trip planner."
                            },
                            {
                                icon: CreditCard,
                                title: "Book",
                                desc: "Secure your spot instantly with transparent pricing. No hidden fees."
                            },
                            {
                                icon: Heart,
                                title: "Share",
                                desc: "Become a host yourself or leave reviews to help the community grow."
                            }
                        ].map((item, index) => (
                            <div key={index} className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                                <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-900/50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                    <item.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-indigo-200 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link to="/explore" className="inline-flex items-center gap-2 bg-white text-indigo-900 px-8 py-4 rounded-full font-bold hover:bg-indigo-50 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Get Started Now <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
