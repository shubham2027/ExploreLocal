import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Loader2, ArrowRight, Eye, EyeOff, Check, X } from 'lucide-react';
import Notification from '../components/Notification';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // Password validation state
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        upper: false,
        lower: false,
        number: false,
        special: false
    });

    const { register } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const p = formData.password;
        setPasswordCriteria({
            length: p.length >= 6,
            upper: /[A-Z]/.test(p),
            lower: /[a-z]/.test(p),
            number: /[0-9]/.test(p),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(p)
        });
    }, [formData.password]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNotification(null);

        if (formData.password !== formData.confirmPassword) {
            setNotification({ message: 'Passwords do not match', type: 'error' });
            return;
        }

        const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
        if (!isPasswordValid) {
            setNotification({ message: 'Please meet all password requirements', type: 'error' });
            return;
        }

        setLoading(true);

        const result = await register(formData.name, formData.email, formData.password);

        if (result.success) {
            navigate('/');
        } else {
            setNotification({ message: result.error || 'Failed to register', type: 'error' });
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            </div>

            <div className="relative z-50">
                <Notification 
                    message={notification?.message} 
                    type={notification?.type} 
                    onClose={() => setNotification(null)} 
                />
            </div>

            <div className="relative z-10 max-w-xl w-full space-y-8 bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-gray-100">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Join us and start exploring the world
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition bg-white/50 focus:bg-white"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition bg-white/50 focus:bg-white"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="appearance-none relative block w-full px-3 py-3 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition bg-white/50 focus:bg-white"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            
                            {/* Password Strength Indicators */}
                            {formData.password && (
                                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                                    <div className={`flex items-center gap-1 ${passwordCriteria.length ? 'text-green-600' : 'text-gray-400'}`}>
                                        {passwordCriteria.length ? <Check className="h-3 w-3" /> : <div className="h-3 w-3 rounded-full border border-gray-300" />}
                                        Min 6 chars
                                    </div>
                                    <div className={`flex items-center gap-1 ${passwordCriteria.upper ? 'text-green-600' : 'text-gray-400'}`}>
                                        {passwordCriteria.upper ? <Check className="h-3 w-3" /> : <div className="h-3 w-3 rounded-full border border-gray-300" />}
                                        Uppercase
                                    </div>
                                    <div className={`flex items-center gap-1 ${passwordCriteria.lower ? 'text-green-600' : 'text-gray-400'}`}>
                                        {passwordCriteria.lower ? <Check className="h-3 w-3" /> : <div className="h-3 w-3 rounded-full border border-gray-300" />}
                                        Lowercase
                                    </div>
                                    <div className={`flex items-center gap-1 ${passwordCriteria.number ? 'text-green-600' : 'text-gray-400'}`}>
                                        {passwordCriteria.number ? <Check className="h-3 w-3" /> : <div className="h-3 w-3 rounded-full border border-gray-300" />}
                                        Number
                                    </div>
                                    <div className={`flex items-center gap-1 ${passwordCriteria.special ? 'text-green-600' : 'text-gray-400'}`}>
                                        {passwordCriteria.special ? <Check className="h-3 w-3" /> : <div className="h-3 w-3 rounded-full border border-gray-300" />}
                                        Special Char
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    className="appearance-none relative block w-full px-3 py-3 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition bg-white/50 focus:bg-white"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {formData.confirmPassword && (
                                <div className={`mt-2 text-xs flex items-center gap-1 ${
                                    formData.password === formData.confirmPassword ? 'text-green-600' : 'text-red-500'
                                }`}>
                                    {formData.password === formData.confirmPassword ? (
                                        <>
                                            <Check className="h-3 w-3" /> Passwords match
                                        </>
                                    ) : (
                                        <>
                                            <X className="h-3 w-3" /> Passwords do not match
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-200 transition transform hover:-translate-y-0.5"
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                            <>Sign Up <ArrowRight className="h-4 w-4 ml-2" /></>
                        )}
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
