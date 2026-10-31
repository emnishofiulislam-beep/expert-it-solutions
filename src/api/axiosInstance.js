import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:5000/api/v1",

  timeout: 15000,

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

// Keep access token in memory, not localStorage.
let accessToken = null;
let refreshPromise = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

// Attach access token to protected requests.
axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired access tokens.
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest || !error.response) {
      return Promise.reject(error);
    }

    const status = error.response.status;
    const url = originalRequest.url || "";

    const isAuthEndpoint = [
      "/auth/login",
      "/auth/register",
      "/auth/refresh-token",
      "/auth/logout",
      "/auth/forgot-password",
      "/auth/reset-password",
      "/auth/verify-email",
      "/auth/resend-verification",
    ].some((path) => url.includes(path));

    if (
      status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = axiosInstance
            .post("/auth/refresh-token")
            .then((res) => res.data.data.accessToken)
            .finally(() => {
              refreshPromise = null;
            });
        }

        const newToken = await refreshPromise;

        setAccessToken(newToken);

        originalRequest.headers.Authorization =
          `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);

        window.dispatchEvent(
          new Event("auth:unauthorized")
        );

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
