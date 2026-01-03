// src/components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { dashboardAPI } from '../../services/api'
import { dashboardAPI } from '../../services/api';
import Navbar from '../Common/Navbar';
import DashboardStats from './DashboardStats';
import RecentActivity from './RecentActivity';
import Loading from '../Common/Loading';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [reportTypes, setReportTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [summaryRes, typesRes] = await Promise.all([
        dashboardAPI.getSummary(),
        dashboardAPI.getReportTypes(),
      ]);
      setSummary(summaryRes.data);
      setReportTypes(typesRes.data);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="dashboard-container">
      <Navbar />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back! Here's your health overview.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <DashboardStats summary={summary} />

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Report Types Distribution</h3>
            <div className="report-types-list">
              {reportTypes.length > 0 ? (
                reportTypes.map((type, index) => (
                  <div key={index} className="report-type-item">
                    <span className="type-name">{type.report_type}</span>
                    <span className="type-count">{type.count}</span>
                  </div>
                ))
              ) : (
                <p className="no-data">No reports yet</p>
              )}
            </div>
            <Link to="/reports" className="card-link">View All Reports →</Link>
          </div>

          <div className="dashboard-card">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button 
                className="action-btn"
                onClick={() => navigate('/reports')}
              >
                📄 Upload Report
              </button>
              <button 
                className="action-btn"
                onClick={() => navigate('/vitals')}
              >
                ❤️ Add Vital
              </button>
              <button 
                className="action-btn"
                onClick={() => navigate('/shared-with-me')}
              >
                👥 Shared Reports
              </button>
            </div>
          </div>
        </div>

        <RecentActivity 
          recentReports={summary?.recentReports || []} 
          recentVitals={summary?.recentVitals || []}
        />
      </div>
    </div>
  );
};

export default Dashboard;