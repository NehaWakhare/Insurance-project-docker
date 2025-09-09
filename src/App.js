import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AddPolicy from "./pages/AddPolicy";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AuthPage from "./pages/UserLogin/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";
import Support from "./pages/Support";
import AvailablePolicies from "./pages/AvailablePolicies";
import HospitalSearch from "./pages/HospitalSearch";
import Teleconsultation from "./pages/Teleconsultation";
import ViewPolicies from "./pages/ViewPolicies";
import AdminUsers from "./pages/AdminUsers";
import UserDashboard from "./pages/UserDashboard";
import Footer from "./components/Footer";
import Claims from "./pages/Claims";
import { AuthProvider } from "./context/AuthContext";
import AdminRegister from "./pages/Admin/AdminRegister";
import AdminLogin from './pages/Admin/AdminLogin';
import SuperAdminLogin from "./pages/SuperAdmin/SuperAdminLogin";
import SuperAdminDashboard from "./pages/SuperAdmin/SuperAdminDashboard";
import AdminList from './pages/SuperAdmin/AdminList';

function App() {
  const location = useLocation();

  // Routes where Navbar should not be visible
  const hideNavbarRoutes = [
    "/auth",
    "/superadmin/login",
    "/superadmin/dashboard",
  ];

  // Routes where Footer should not be visible
  const hideFooterRoutes = [
    "/admin/dashboard",
    "/admin/users",
    "/admin/add-policy",
    "/admin/view-policies",
    "/superadmin/login",
    "/superadmin/dashboard",
  ];

  const shouldHideNavbar = hideNavbarRoutes.some((route) =>location.pathname.startsWith(route));
  const shouldHideFooter = hideFooterRoutes.some((route) => location.pathname.startsWith(route) );
  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {!shouldHideNavbar && <div className="navbar-spacer" />}

      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/support" element={<Support />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/hospital-search" element={<HospitalSearch />} />
        <Route path="/teleconsultation" element={<Teleconsultation />} />
        <Route path="/wellness"element={  <div style={{ padding: "2rem" }}> <h2>Wellness Coming Soon</h2></div> } />
        <Route path="/dashboard/*" element={<UserDashboard />} />
        <Route path="/available-policies/:id"element={<AvailablePolicies />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-policy" element={<AddPolicy />} />
        <Route path="/admin/view-policies" element={<ViewPolicies />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/Admin/AdminRegister" element={<AdminRegister />} />
        
         <Route path="/Admin/AdminLogin" element={<AdminLogin />} />  
                                                                  
        <Route path="/superadmin/login" element={<SuperAdminLogin />} />
        <Route path="/superadmin/dashboard/*" element={<SuperAdminDashboard />} />
        <Route path="/superadmin/dashboard/admins" element={<AdminList />} />

      </Routes>

      {!shouldHideFooter && <Footer />}
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}
