const TOKEN_KEY = 'id_token';

export const Auth = {
    getToken: () => localStorage.getItem(TOKEN_KEY),
    saveToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
    removeToken: () => localStorage.removeItem(TOKEN_KEY),
    isLoggedIn: () => !!localStorage.getItem(TOKEN_KEY)
};