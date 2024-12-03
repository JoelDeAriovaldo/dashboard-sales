export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'MZN',
    }).format(amount);
};

export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US').format(new Date(date));
};

export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};