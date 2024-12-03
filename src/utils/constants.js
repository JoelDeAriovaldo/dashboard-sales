export const API_BASE_URL = 'https://api.example.com';

export const ROUTES = {
    HOME: '/dashboard', // Alterado de '/' para '/dashboard'
    DASHBOARD: '/dashboard', // Rota adicional para clareza
    SALES: '/sales',
    CRM: '/crm',
    PRODUCTS: {
        LIST: '/products',
        DETAILS: '/products/:id',
        NEW: '/products/new',
        EDIT: '/products/:id/edit',
        CATEGORIES: '/products/categories',
        INVENTORY: '/products/inventory'
    },
    ORDERS: '/orders',
};

export const APP_SETTINGS = {
    APP_NAME: 'Dashboard Sales',
    APP_VERSION: '1.0.0',
};

export const generateProductRoute = {
    details: (id) => ROUTES.PRODUCTS.DETAILS.replace(':id', id),
    edit: (id) => ROUTES.PRODUCTS.EDIT.replace(':id', id)
};