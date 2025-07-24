import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Default options for all toasts
          duration: 4000,
          style: {
            background: 'hsl(var(--b1))',
            color: 'hsl(var(--bc))',
            border: '1px solid hsl(var(--b3))',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            padding: '12px 16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
          // Success toasts
          success: {
            duration: 3000,
            style: {
              background: 'hsl(var(--su))',
              color: 'hsl(var(--suc))',
              border: '1px solid hsl(var(--su))',
            },
            iconTheme: {
              primary: 'hsl(var(--suc))',
              secondary: 'hsl(var(--su))',
            },
          },
          // Error toasts
          error: {
            duration: 5000,
            style: {
              background: 'hsl(var(--er))',
              color: 'hsl(var(--erc))',
              border: '1px solid hsl(var(--er))',
            },
            iconTheme: {
              primary: 'hsl(var(--erc))',
              secondary: 'hsl(var(--er))',
            },
          },
          // Loading toasts
          loading: {
            style: {
              background: 'hsl(var(--in))',
              color: 'hsl(var(--inc))',
              border: '1px solid hsl(var(--in))',
            },
            iconTheme: {
              primary: 'hsl(var(--inc))',
              secondary: 'hsl(var(--in))',
            },
          },
        }}
      />
    </div>
  );
};
export default App;