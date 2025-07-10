import Sidebar from '../components/Sidebar';
import DashboardCard from '../components/DashboardCard';
import './AdminDashboard.css';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Welcome Admin!</h2>
        <div className="card-container">
          <DashboardCard
            title="Total Users"
            count={120}
            style={{ background: "linear-gradient(135deg, #ff9a9e, #fad0c4)" }}
          />
          <DashboardCard
            title="Policies Sold"
            count={75}
            style={{ background: "linear-gradient(135deg, #a1c4fd, #c2e9fb)" }}
          />
          <DashboardCard
            title="Pending Claims"
            count={12}
            style={{ background: "linear-gradient(135deg, #d4fc79, #96e6a1)" }}
          />
        </div>
      </div>
    </div>
  );
}
