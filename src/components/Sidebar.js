import { Link } from 'react-router-dom';
import './Sidebar.css';


export default function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Admin Panel</h3>
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        
       
        <li><Link to="/admin/add-policy">Add Policy</Link></li>
        <li><Link to="/admin/view-policies">View Policies</Link></li>

        <li><Link to="/admin/users">Users</Link></li>
      </ul>
    </div>
  );
}
