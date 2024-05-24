export const addTokenToRequest = (config: any) => {
    const token = localStorage.getItem('APP_ACCESS_TOKEN');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
};