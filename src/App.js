import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddPolicy from './pages/AddPolicy';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProfileInfo from './pages/ProfileInfo';
import Support from './pages/Support';
import MyPolicies from './pages/MyPolicies';
import AvailablePolicies from './pages/AvailablePolicies';
import HospitalSearch from './pages/HospitalSearch';
import Teleconsultation from './pages/Teleconsultation';
import MyDocuments from './pages/MyDocuments';
import ViewPolicies from './pages/ViewPolicies';
import AdminUsers from './pages/AdminUsers';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/profile" element={<ProfileInfo />} />
        <Route path="/support" element={<Support />} />
        <Route path="/my-policies" element={<MyPolicies />} />
        <Route path="/my-documents" element={<MyDocuments />} />
        <Route path="/available-policies/:id" element={<AvailablePolicies  />} />
         <Route path="/hospitals" element={<HospitalSearch />} />
         <Route path="/doctors" element={<Teleconsultation />} />
         <Route path="/admin/add-policy" element={<AddPolicy />} />
         
<Route path="/admin/view-policies" element={<ViewPolicies />} />
<Route path="/admin/users" element={<AdminUsers />} />


      </Routes>
       
    </Router>
  );
}

export default App;
