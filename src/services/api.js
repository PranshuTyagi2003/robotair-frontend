// services/api.js

import axios from 'axios';

const API_BASE_URL = 'https://autofills-backend-1.onrender.com'; // Backend URL

// Fetch all robots data
export const fetchRobots = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/robots`);
        return response.data;
    } catch (error) {
        console.error('Error fetching robots:', error);
        throw error;
    }
};

// Fetch a single robot by ID
export const fetchRobotById = async (robotId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/robots/${robotId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching robot ${robotId}:`, error);
        throw error;
    }
};
