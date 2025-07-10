import './DashboardCard.css';

export default function DashboardCard({ title, count, style }) {
  return (
    <div className="dashboard-card" style={style}>
      <h4>{title}</h4>
      <p>{count}</p>
    </div>
  );
}
