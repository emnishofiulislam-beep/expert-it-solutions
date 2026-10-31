import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import axiosInstance, {
  setAccessToken,
} from "../api/axiosInstance.js";

import authService from "../api/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sessionVersion = useRef(0);

  const clearSession = () => {
    sessionVersion.current += 1;
    setAccessToken(null);
    setToken(null);
    setUser(null);
  };

  const applySession = (newUser, newToken) => {
    setAccessToken(newToken);
    setToken(newToken);
    setUser(newUser);
  };

  // Restore login session after page reload.
  useEffect(() => {
    let active = true;
    const version = sessionVersion.current;

    const restoreSession = async () => {
      try {
        const refresh = await authService.refreshToken();
        const newToken = refresh.data.accessToken;

        setAccessToken(newToken);

        const profile = await authService.getMe();

        if (
          active &&
          sessionVersion.current === version
        ) {
          applySession(profile.data.user, newToken);
        }
      } catch {
        if (
          active &&
          sessionVersion.current === version
        ) {
          clearSession();
        }
      } finally {
        if (active) setIsLoading(false);
      }
    };

    restoreSession();

    const onUnauthorized = () => {
      if (active) clearSession();
    };

    window.addEventListener(
      "auth:unauthorized",
      onUnauthorized
    );

    return () => {
      active = false;
      window.removeEventListener(
        "auth:unauthorized",
        onUnauthorized
      );
    };
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(
      email,
      password
    );

    const { user: loggedUser, accessToken } =
      response.data;

    sessionVersion.current += 1;
    applySession(loggedUser, accessToken);

    return response;
  };

  const register = async (formData) => {
    return authService.register(formData);
  };

  const logout = async () => {
    clearSession();

    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout request failed:", error);
    }
  };

  const verifyEmail = async (verificationToken) => {
    return authService.verifyEmail(verificationToken);
  };

  const resendVerification = async (email) => {
    return authService.resendVerification(email);
  };

  const forgotPassword = async (email) => {
    return authService.forgotPassword(email);
  };

  const resetPassword = async (
    resetToken,
    newPassword
  ) => {
    return authService.resetPassword(
      resetToken,
      newPassword
    );
  };

  const isAuthenticated = Boolean(user && token);


  const updateProfile = async (profileData) => {
    const response = await authService.updateProfile(
      profileData
    );

    setUser(response.data.user);

    return response;
  };

  const changePassword = async (passwordData) => {
    const response = await authService.changePassword(
      passwordData
    );

    clearSession();

    return response;
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        verifyEmail,
        resendVerification,
        forgotPassword,
        resetPassword,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}
