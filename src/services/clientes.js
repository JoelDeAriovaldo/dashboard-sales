import api from '../utils/api';

export const customerService = {
    async getAll() {
        const response = await api.get('/customers');
        return response.data;
    },

    async getById(id) {
        const response = await api.get(`/customers/${id}`);
        return response.data;
    },

    async create(customer) {
        const response = await api.post('/customers', customer);
        return response.data;
    },

    async update(id, customer) {
        const response = await api.put(`/customers/${id}`, customer);
        return response.data;
    },

    async delete(id) {
        await api.delete(`/customers/${id}`);
    }
};