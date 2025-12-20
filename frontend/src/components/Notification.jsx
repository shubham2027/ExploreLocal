import { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const Notification = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!message) return null;

    const isSuccess = type === 'success';

    return (
        <div className="fixed top-24 right-4 z-50 animate-slideIn">
            <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border ${
                isSuccess ? 'bg-white border-green-100' : 'bg-white border-red-100'
            }`}>
                <div className={`p-2 rounded-full ${isSuccess ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {isSuccess ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                </div>
                <div>
                    <h4 className={`font-bold text-sm ${isSuccess ? 'text-gray-900' : 'text-red-900'}`}>
                        {isSuccess ? 'Success' : 'Error'}
                    </h4>
                    <p className="text-sm text-gray-500">{message}</p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-4">
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default Notification;
