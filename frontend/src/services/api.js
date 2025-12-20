import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const apiAxios = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include the token
apiAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const api = {
    // Experiences
    getExperiences: async () => {
        return apiAxios.get('/experiences');
    },

    getExperienceById: async (id) => {
        return apiAxios.get(`/experiences/${id}`);
    },

    // Auth
    login: async (email, password) => {
        return apiAxios.post('/auth/login', { email, password });
    },

    register: async (userData) => {
        return apiAxios.post('/auth/register', userData);
    },

    getProfile: async () => {
        return apiAxios.get('/auth/profile');
    },

    // Host - Create Experience
    addExperience: async (experienceData) => {
        return apiAxios.post('/experiences', experienceData);
    },

    // Bookings
    createBooking: async (bookingData) => {
        return apiAxios.post('/bookings', bookingData);
    },

    getMyBookings: async () => {
        return apiAxios.get('/bookings/mybookings');
    },

    getHostStats: async () => {
        return apiAxios.get('/bookings/host-stats');
    },

    // User - Host Request
    getUserStats: async () => {
        return apiAxios.get('/users/stats');
    },

    requestHost: async (data) => {
        return apiAxios.post('/users/request-host', data);
    },

    restoreAdmin: async () => {
        return apiAxios.put('/users/restore-admin');
    },

    // Admin
    getAdminStats: async () => apiAxios.get('/admin/stats'),
    getPendingHosts: async () => apiAxios.get('/admin/host-requests'),
    approveHost: async (userId) => apiAxios.put(`/admin/approve-host/${userId}`),
    rejectHost: async (userId) => apiAxios.put(`/admin/reject-host/${userId}`),

    // Trips
    getTrips: async () => apiAxios.get('/trips'),
    getTripById: async (id) => apiAxios.get(`/trips/${id}`),
    createTrip: async (data) => apiAxios.post('/trips', data),
    updateTrip: async (id, data) => apiAxios.put(`/trips/${id}`, data),
    addExperienceToTrip: async (tripId, experienceId) => apiAxios.post(`/trips/${tripId}/experience`, { experienceId }),
    removeExperienceFromTrip: async (tripId, expId) => apiAxios.delete(`/trips/${tripId}/experience/${expId}`),
    deleteTrip: async (id) => apiAxios.delete(`/trips/${id}`),
};
