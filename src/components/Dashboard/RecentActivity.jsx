// src/components/Dashboard/RecentActivity.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const RecentActivity = ({ recentReports, recentVitals }) => {
  return (
    <div className="recent-activity">
      <div className="activity-section">
        <div className="section-header">
          <h3>Recent Reports</h3>
          <Link to="/reports" className="view-all">View All</Link>
        </div>
        <div className="activity-list">
          {recentReports && recentReports.length > 0 ? (
            recentReports.map((report) => (
              <div key={report.id} className="activity-item">
                <div className="activity-icon">📄</div>
                <div className="activity-details">
                  <h4>{report.original_name}</h4>
                  <p>{report.report_type} • {new Date(report.date).toLocaleDateString()}</p>
                </div>
                <Link to={`/reports/${report.id}`} className="activity-action">
                  View
                </Link>
              </div>
            ))
          ) : (
            <p className="no-data">No recent reports</p>
          )}
        </div>
      </div>

      <div className="activity-section">
        <div className="section-header">
          <h3>Recent Vitals</h3>
          <Link to="/vitals" className="view-all">View All</Link>
        </div>
        <div className="activity-list">
          {recentVitals && recentVitals.length > 0 ? (
            recentVitals.map((vital) => (
              <div key={vital.id} className="activity-item">
                <div className="activity-icon">❤️</div>
                <div className="activity-details">
                  <h4>{vital.type}</h4>
                  <p>{vital.value} {vital.unit} • {new Date(vital.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No recent vitals</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;