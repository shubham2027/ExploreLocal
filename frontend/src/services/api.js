import axios from 'axios';

// Mock Data
const MOCK_EXPERIENCES = [
    {
        id: 1,
        title: "Traditional Pottery Workshop",
        description: "Learn the art of pottery from a local master. Create your own clay pot and paint it with traditional patterns. Includes a tour of the workshop and tea.",
        price: 45,
        category: "Workshop",
        location: "Kyoto, Japan",
        image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        hostId: 101
    },
    {
        id: 2,
        title: "Midnight Street Food Tour",
        description: "Explore the hidden culinary gems of the city. Taste 5 different local dishes and learn about the history of street food culture.",
        price: 60,
        category: "Food",
        location: "Bangkok, Thailand",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        hostId: 102
    },
    {
        id: 3,
        title: "Rice Terrace Trekking",
        description: "A guided hike through the breathtaking rice terraces. Learn about sustainable farming and enjoy a local lunch with a view.",
        price: 35,
        category: "Nature",
        location: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        hostId: 103
    },
    {
        id: 4,
        title: "Historical Temple Walk",
        description: "Walk through centuries of history. Visit ancient temples and learn about the spiritual heritage of the region.",
        price: 25,
        category: "Culture",
        location: "Siem Reap, Cambodia",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        hostId: 104
    },
    {
        id: 5,
        title: "Organic Farm Stay",
        description: "Experience life on a farm. Help with daily chores, harvest vegetables, and cook a farm-to-table dinner.",
        price: 80,
        category: "Farm Stay",
        location: "Tuscany, Italy",
        image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        hostId: 105
    }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    getExperiences: async () => {
        await delay(500);
        return { data: MOCK_EXPERIENCES };
    },

    getExperienceById: async (id) => {
        await delay(300);
        const exp = MOCK_EXPERIENCES.find(e => e.id === parseInt(id));
        if (!exp) throw new Error("Experience not found");
        return { data: exp };
    },

    login: async (email, password) => {
        await delay(800);
        // Mock login logic
        if (email === "user@example.com" && password === "password") {
            return {
                data: {
                    token: "mock-jwt-token-user",
                    user: { id: 1, name: "John Doe", email, role: "user" }
                }
            };
        }
        if (email === "host@example.com" && password === "password") {
            return {
                data: {
                    token: "mock-jwt-token-host",
                    user: { id: 2, name: "Jane Host", email, role: "host" }
                }
            };
        }
        throw new Error("Invalid credentials");
    },

    register: async (userData) => {
        await delay(800);
        return {
            data: {
                token: "mock-jwt-token-new",
                user: { id: Date.now(), ...userData, role: "user" }
            }
        };
    },

    addExperience: async (experienceData) => {
        await delay(600);
        const newExp = {
            id: Date.now(),
            ...experienceData,
            hostId: 2 // Mock host ID
        };
        MOCK_EXPERIENCES.push(newExp);
        return { data: newExp };
    }
};
