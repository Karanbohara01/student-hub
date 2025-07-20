import { create } from 'zustand';

const useAuthStore = create((set) => ({
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    login: (userInfo) => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        set({ userInfo });
    },
    logout: () => {
        localStorage.removeItem('userInfo');
        set({ userInfo: null });
    },
}));

export default useAuthStore;