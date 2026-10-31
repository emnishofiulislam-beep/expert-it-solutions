
import axiosInstance from "./axiosInstance.js";

const authService = {
    // Register new customer
    register: async (userData) => {
        const response = await axiosInstance.post(
            "/auth/register",
            userData
        );
        return response.data;
    },

    // Login
    login: async (email, password) => {
        const response = await axiosInstance.post(
            "/auth/login",
            { email, password }
        );
        return response.data;
    },

    // Restore session / refresh access token
    refreshToken: async () => {
        const response = await axiosInstance.post(
            "/auth/refresh-token"
        );
        return response.data;
    },

    // Logout
    logout: async () => {
        const response = await axiosInstance.post(
            "/auth/logout"
        );
        return response.data;
    },

    // Current user
    getMe: async () => {
        const response = await axiosInstance.get(
            "/auth/me"
        );
        return response.data;
    },

    // Verify email
    verifyEmail: async (token) => {
        const response = await axiosInstance.post(
            "/auth/verify-email",
            { token }
        );
        return response.data;
    },

    // Resend verification
    resendVerification: async (email) => {
        const response = await axiosInstance.post(
            "/auth/resend-verification",
            { email }
        );
        return response.data;
    },

    // Forgot password
    forgotPassword: async (email) => {
        const response = await axiosInstance.post(
            "/auth/forgot-password",
            { email }
        );
        return response.data;
    },

    // Reset password
    resetPassword: async (token, password) => {
        const response = await axiosInstance.post(
            "/auth/reset-password",
            {
                token,
                password,
                confirmPassword: password,
            }
        );
        return response.data;
    },


    updateProfile: async (profileData) => {
        const response = await axiosInstance.patch(
            "/auth/profile",
            profileData
        );
        return response.data;
    },

    changePassword: async (passwordData) => {
        const response = await axiosInstance.patch(
            "/auth/change-password",
            passwordData
        );
        return response.data;
    },

};

export default authService;
