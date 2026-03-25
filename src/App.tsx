import { Routes, Route } from 'react-router-dom';
import { AdminLayout } from './components/layouts/AdminLayout';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Users } from './pages/users/Users';
import { Roles } from './pages/roles/Roles';
import { Products } from './pages/ecommerce/Products';
import { Orders } from './pages/ecommerce/Orders';
import { CRM } from './pages/crm/CRM';
import { Settings } from './pages/settings/Settings';
import { Profile } from './pages/profile/Profile';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { NotFound } from './pages/error/NotFound';
import { Notifications } from '@mantine/notifications';
import { useState, useEffect } from 'react';
import { FullPageLoader } from './components/common/FullPageLoader';
import '@mantine/notifications/styles.css';

function App() {
  const [loading, setLoading] = useState(true);

  // For development, we could skip the loader if needed, but for selling purposes we show it.
  // We can use session storage so it only shows once per session.
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('app-initial-load');
    if (hasLoaded) {
      setLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
    sessionStorage.setItem('app-initial-load', 'true');
  };

  return (
    <>
      {loading && <FullPageLoader onComplete={handleLoadingComplete} />}
      <Notifications position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
