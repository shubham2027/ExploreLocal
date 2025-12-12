import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(formData.email, formData.password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.error || 'Failed to login');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
                <div className="p-8 sm:p-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="text-gray-600 mt-2">Sign in to continue your adventure</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2 mb-6">
                            <span>• {error}</span>
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-sm font-bold text-gray-700 block mb-1.5">Email Address</label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl transition outline-none font-medium"
                                    placeholder="you@example.com"
                                />
                                <div className="absolute left-0 top-0 h-full w-11 flex items-center justify-center text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                                    <Mail className="h-5 w-5" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-sm font-bold text-gray-700 block">Password</label>
                                <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-500">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl transition outline-none font-medium"
                                    placeholder="••••••••"
                                />
                                <div className="absolute left-0 top-0 h-full w-11 flex items-center justify-center text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                                    <Lock className="h-5 w-5" />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                <>Sign In <ArrowRight className="h-4 w-4" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-500 transition hover:underline">
                                Create an account
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200/60">
                        <div className="text-xs text-gray-500 text-center space-y-1">
                            <p>Demo User: user@example.com / password</p>
                            <p>Demo Host: host@example.com / password</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
