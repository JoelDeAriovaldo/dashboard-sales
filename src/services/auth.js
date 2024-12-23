import api from '../utils/api';

export const authService = {
    async login(email, password) {
        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async logout() {
        localStorage.removeItem('token');
    }
};