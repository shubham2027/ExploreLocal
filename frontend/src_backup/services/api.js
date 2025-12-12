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

    // User - Host Request
    requestHost: async (data) => {
        return apiAxios.post('/users/request-host', data);
    },

    restoreAdmin: async () => {
        return apiAxios.put('/users/restore-admin');
    },

    // Admin
    getAdminRequests: async () => {
        return apiAxios.get('/admin/host-requests');
    },

    approveHost: async (userId) => {
        return apiAxios.put(`/admin/approve-host/${userId}`);
    },

    rejectHost: async (userId) => {
        return apiAxios.put(`/admin/reject-host/${userId}`);
    }
};
